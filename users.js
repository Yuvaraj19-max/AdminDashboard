let users = JSON.parse(localStorage.getItem("users")) || [
    {
        id: 1,
        name: "Rahul",
        email: "rahul@gmail.com",
        role: "Admin"
    },
    {
        id: 2,
        name: "Priya",
        email: "priya@gmail.com",
        role: "User"
    },
    {
        id: 3,
        name: "Arjun",
        email: "arjun@gmail.com",
        role: "User"
    }
];

const userTableBody = document.getElementById("userTableBody");
function displayUsers(data = users) {
    userTableBody.innerHTML = "";
    data.forEach(function(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editUser(${user.id})">
                    Edit
                </button>

                <button onclick="deleteUser(${user.id})">
                    Delete
                </button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}
displayUsers();


const addUserForm = document.getElementById("addUserBtn");
const userModal = document.getElementById("userModal");
const userForm = document.getElementById("userForm");

// add user button click event
 addUserBtn.addEventListener("click", function() {
    userForm.reset();
    document.getElementById("userId").value = "";
    document.getElementById("modalTitle").textContent = "Add User";
    userModal.style.display = "block";
 });

// submit user form event
userForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    const id = document.getElementById("userId").value;

    if (!name || !email) {
        alert("Please fill all fields");
        return;
    }
    if (id) {
        const user = users.find(u => u.id === Number(id));
        if (user) {
            user.name = name;
            user.email = email;
            user.role = role;
        }
    } else {
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            role: role
        };
        users.push(newUser);
    }
    saveUsers();
    displayUsers();
    userModal.style.display = "none";
    userForm.reset();
});

// editUser functionality
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    document.getElementById("userId").value = user.id;
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("role").value = user.role;
    document.getElementById("modalTitle").textContent ="Edit User";
    userModal.style.display = "flex";

}

// delete functionality
function deleteUser(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    users = users.filter(user => user.id !== id);
    displayUsers();
    saveUsers();
}

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchValue) ||user.email.toLowerCase().includes(searchValue);
    });
    displayUsers(filteredUsers);
});

// Save the user
function saveUsers() {
    localStorage.setItem("users",JSON.stringify(users)
    );
}