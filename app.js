
// Dashboard statistics

const dashboardData = {
    totalUsers: 2450,
    totalRevenue: 85000,
    totalOrders: 1240,
    totalProducts: 320
};

// Function to update dashboard
function updateDashboard() {
    document.getElementById("totalUsers").textContent = dashboardData.totalUsers;

    document.getElementById("totalRevenue").textContent ="₹" + dashboardData.totalRevenue.toLocaleString("en-IN");

    document.getElementById("totalOrders").textContent = dashboardData.totalOrders;

    document.getElementById("totalProducts").textContent = dashboardData.totalProducts;

}
// Call the function
updateDashboard();

// TOTAL USERS
document.getElementById("refreshBtn").addEventListener("click", function() {
        dashboardData.totalUsers += 10;
        updateDashboard();
        console.log("Dashboard refreshed!");
    });

// TOTAL REVENUE
    document.getElementById("refreshBtn").addEventListener("click", function() {
        dashboardData.totalRevenue += 10000;
        updateDashboard();
        console.log("Dashboard refreshed!");
    });

// TOTAL ORDERS
    document.getElementById("refreshBtn").addEventListener("click", function() {
        dashboardData.totalOrders += 5;
        updateDashboard();
        console.log("Dashboard refreshed!");
    });
// TOTAL PRODUCTS
    document.getElementById("refreshBtn").addEventListener("click", function() {
        dashboardData.totalProducts += 2;
        updateDashboard();
        console.log("Dashboard refreshed!");
    });

    