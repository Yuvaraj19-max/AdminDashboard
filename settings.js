
// ========================================
// 1. DEFAULT ADMIN PROFILE
// ========================================

const defaultProfile = {
    name: "Admin",
    email: "admin@gmail.com"
};


let profile = JSON.parse(
    localStorage.getItem("adminProfile")
) || defaultProfile;


// ========================================
// 2. PROFILE ELEMENTS
// ========================================

const profileForm = document.getElementById("profileForm");

const adminName = document.getElementById("adminName");

const adminEmail = document.getElementById("adminEmail");

const navbarAdmin = document.getElementById("navbarAdmin");


// Display saved profile

function displayProfile() {

    adminName.value = profile.name;

    adminEmail.value = profile.email;

    navbarAdmin.textContent = "Welcome, " + profile.name;

}


// Save profile

profileForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = adminName.value.trim();

    const email = adminEmail.value.trim();

    if (!name || !email) {

        alert("Please enter valid profile details.");

        return;

    }

    profile = {
        name: name,
        email: email
    };

    localStorage.setItem(
        "adminProfile",
        JSON.stringify(profile)
    );

    displayProfile();

    alert("Profile updated successfully!");

});


// ========================================
// 3. PASSWORD FORM
// ========================================

const passwordForm = document.getElementById("passwordForm");

passwordForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const currentPassword =
        document.getElementById("currentPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (newPassword.length < 8) {

        alert("Password must contain at least 8 characters.");

        return;

    }

    if (newPassword !== confirmPassword) {

        alert("New password and confirmation do not match.");

        return;

    }

    if (currentPassword === newPassword) {

        alert("Choose a different new password.");

        return;

    }

    alert(
        "Demo only: Connect a secure backend to actually change your password."
    );

    passwordForm.reset();

});


// ========================================
// 4. DARK AND LIGHT MODE
// ========================================

const themeToggle = document.getElementById("themeToggle");


// Load saved theme

let savedTheme = localStorage.getItem("adminTheme") || "light";


function applyTheme() {

    if (savedTheme === "dark") {

        document.body.classList.add("dark-theme");

        themeToggle.checked = true;

    } else {

        document.body.classList.remove("dark-theme");

        themeToggle.checked = false;

    }

}


// Theme toggle event

themeToggle.addEventListener("change", function() {

    savedTheme = this.checked ? "dark" : "light";

    localStorage.setItem("adminTheme", savedTheme);

    applyTheme();

});


// ========================================
// 5. NOTIFICATION PREFERENCES
// ========================================

const notificationElements = {

    email: document.getElementById("emailNotifications"),

    orders: document.getElementById("orderNotifications"),

    products: document.getElementById("productNotifications")

};


const defaultNotifications = {

    email: true,

    orders: true,

    products: true

};


let notifications = JSON.parse(
    localStorage.getItem("adminNotifications")
) || { ...defaultNotifications };


// Display saved preferences

function displayNotifications() {

    notificationElements.email.checked = notifications.email;

    notificationElements.orders.checked = notifications.orders;

    notificationElements.products.checked = notifications.products;

}


// Save notification preferences

Object.entries(notificationElements).forEach(function([key, element]) {

    element.addEventListener("change", function() {

        notifications[key] = this.checked;

        localStorage.setItem(
            "adminNotifications",
            JSON.stringify(notifications)
        );

    });

});


// ========================================
// 6. LOGOUT
// ========================================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function() {

    const confirmation = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmation) return;

    alert("Demo logout completed.");

    window.location.href = "../index.html";

});


// ========================================
// 7. INITIALIZE SETTINGS
// ========================================

displayProfile();

applyTheme();

displayNotifications();
    