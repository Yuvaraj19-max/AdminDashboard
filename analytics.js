
// ========================================
// 1. MONTHLY BUSINESS DATA
// ========================================

const monthlyData = {

    labels: [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ],

    revenue: [
        25000, 30000, 28000, 35000,
        40000, 38000, 45000, 50000,
        48000, 55000, 60000, 65000
    ],

    sales: [
        120, 150, 140, 180,
        200, 190, 220, 250,
        240, 280, 300, 320
    ],

    customers: [
        20, 25, 22, 30,
        35, 32, 40, 45,
        42, 50, 55, 60
    ]

};


// ========================================
// 2. YEARLY BUSINESS DATA
// ========================================

const yearlyData = {

    labels: [
        "2022", "2023", "2024", "2025", "2026"
    ],

    revenue: [
        250000, 350000, 450000, 600000, 750000
    ],

    sales: [
        1200, 1800, 2400, 3200, 4100
    ],

    customers: [
        200, 350, 500, 700, 950
    ]

};


// ========================================
// 3. UPDATE STATISTICS
// ========================================

function updateStatistics(data) {

    // Calculate total revenue
    const totalRevenue = data.revenue.reduce(
        (sum, amount) => sum + amount,
        0
    );


    // Calculate total sales
    const totalSales = data.sales.reduce(
        (sum, amount) => sum + amount,
        0
    );


    // Calculate total customers
    const totalCustomers = data.customers.reduce(
        (sum, amount) => sum + amount,
        0
    );


    // Calculate average revenue
    const averageRevenue =
        totalRevenue / data.revenue.length;


    // Display statistics
    document.getElementById("revenueValue").textContent ="₹" + totalRevenue.toLocaleString("en-IN");
    document.getElementById("salesValue").textContent = "₹" + totalSales.toLocaleString("en-IN");
    document.getElementById("customerValue").textContent ="₹" + totalCustomers.toLocaleString("en-IN");
    document.getElementById("averageValue").textContent ="₹" + Math.round(averageRevenue).toLocaleString("en-IN");

}


// ========================================
// 4. CHART VARIABLES
let revenueChart;
let salesChart;
let customerChart;
// ========================================
// 5. CREATE ANALYTICS CHARTS

function createCharts(data) {

    // Destroy previous charts
    if (revenueChart) {
        revenueChart.destroy();
    }

    if (salesChart) {
        salesChart.destroy();
    }

    if (customerChart) {
        customerChart.destroy();
    }


    // Revenue Chart
    revenueChart = new Chart(
        document.getElementById("revenueChart"),
        {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Revenue",
                    data: data.revenue,
                    borderColor: "#3478f6",
                    backgroundColor: "rgba(52, 120, 246, 0.15)",
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }

                }

            }

        }
    );


    // Sales Chart

    salesChart = new Chart(
        document.getElementById("salesChart"),
        {
            type: "bar",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Sales",
                    data: data.sales,
                    backgroundColor: "#16a085",
                    borderRadius: 6
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }

                }

            }

        }
    );


    // Customer Growth Chart

    customerChart = new Chart(
        document.getElementById("customerChart"),
        {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "New Customers",
                    data: data.customers,
                    borderColor: "#e67e22",
                    backgroundColor: "rgba(230, 126, 34, 0.15)",
                    fill: true,
                    tension: 0.4
                }]

            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }

                }

            }

        }
    );

}


// ========================================
// 6. LOAD ANALYTICS
// ========================================

function loadAnalytics(period) {

    let selectedData;
    if (period === "monthly") {
        selectedData = monthlyData;
    } else {
        selectedData = yearlyData;
    }
    updateStatistics(selectedData);
    createCharts(selectedData);
}


// ========================================
// 7. FILTER EVENT
// ========================================

const periodFilter = document.getElementById("periodFilter");
periodFilter.addEventListener("change", function() {
    loadAnalytics(this.value);
});


// ========================================
// 8. INITIAL DASHBOARD LOADING
// ========================================

loadAnalytics("monthly");
