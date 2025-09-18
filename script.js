function maskPassword(pass) {
    let str = "";
    for (let i = 0; i < pass.length; i++) str += "*";
    return str;
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => { alert("Clipboard copying failed"); }
    );
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data) || [];
    const arrUpdated = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

function showPasswords() {
    const tb = document.querySelector("table");
    const data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "No Data To Show";
    } else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        const arr = JSON.parse(data);
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy" width="10" height="10"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy" width="10" height="10"></td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy" width="10" height="10"></td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML += str;
    }

    // clear inputs
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

// run when page loads
document.addEventListener("DOMContentLoaded", () => {
    showPasswords();

    const form = document.getElementById("addForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const website = document.getElementById("website").value.trim();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
            if (!website || !username || !password) {
                alert("Please fill all fields.");
                return;
            }
            let json = JSON.parse(localStorage.getItem("passwords") || "[]");
            json.push({ website, username, password });
            localStorage.setItem("passwords", JSON.stringify(json));
            alert("Password Saved");
            showPasswords();
        });
    }
});