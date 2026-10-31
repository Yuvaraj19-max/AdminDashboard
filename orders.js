
// ===================================
// 1. INITIAL ORDER DATA
// ===================================

const defaultOrders = [

    {
        id: "ORD101",
        customer: "Rahul",
        product: "Laptop",
        date: "2026-10-20",
        amount: 55000,
        status: "Pending"
    },

    {
        id: "ORD102",
        customer: "Priya",
        product: "Mobile",
        date: "2026-10-21",
        amount: 25000,
        status: "Processing"
    },

    {
        id: "ORD103",
        customer: "Arjun",
        product: "Headphones",
        date: "2026-10-22",
        amount: 3000,
        status: "Shipped"
    },

    {
        id: "ORD104",
        customer: "Sneha",
        product: "Keyboard",
        date: "2026-10-23",
        amount: 2000,
        status: "Delivered"
    },

    {
        id: "ORD105",
        customer: "Kiran",
        product: "Monitor",
        date: "2026-10-24",
        amount: 15000,
        status: "Pending"
    }

];


// Load saved orders or use default data

let orders = JSON.parse(localStorage.getItem("orders"))
    || defaultOrders.map(order => ({ ...order }));


// Save orders

function saveOrders() {
    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

}

// ===================================
// 2. DISPLAY ORDERS
// ===================================

const orderTableBody =
    document.getElementById("orderTableBody");


function displayOrders(data = orders) {

    orderTableBody.innerHTML = "";

    data.forEach(function(order) {

        const row = document.createElement("tr");

        const statusClass = order.status.toLowerCase();

        row.innerHTML = `
            <td>${order.id}</td>

            <td>${order.customer}</td>

            <td>${order.product}</td>

            <td>${order.date}</td>

            <td>₹${order.amount.toLocaleString("en-IN")}</td>

            <td>
                <span class="status ${statusClass}">
                    ${order.status}
                </span>
            </td>

            <td>
                <button
                    class="action-btn"
                    data-action="delete"
                    data-id="${order.id}">
                    Delete
                </button>
            </td>
        `;

        orderTableBody.appendChild(row);

    });

}

// ===================================
// 3. UPDATE ORDER STATISTICS
// ===================================

function updateOrderStatistics() {

    const total = orders.length;

    const pending = orders.filter(
        order => order.status === "Pending"
    ).length;

    const processing = orders.filter(
        order => order.status === "Processing"
    ).length;

    const delivered = orders.filter(
        order => order.status === "Delivered"
    ).length;


    document.getElementById("totalOrders").textContent = total;

    document.getElementById("pendingOrders").textContent = pending;

    document.getElementById("processingOrders").textContent = processing;

    document.getElementById("deliveredOrders").textContent = delivered;

}

// ===================================
// 4. SEARCH ORDERS
// ===================================

const searchOrder = document.getElementById("searchOrder");

searchOrder.addEventListener("input", function() {

    const value = this.value.toLowerCase();

    const filteredOrders = orders.filter(order => {

        return order.id.toLowerCase().includes(value) ||
               order.customer.toLowerCase().includes(value);

    });

    displayOrders(filteredOrders);

});

// ===================================
// 5. FILTER ORDERS
// ===================================

const statusFilter = document.getElementById("statusFilter");

statusFilter.addEventListener("change", function() {

    const selectedStatus = this.value;

    if (selectedStatus === "All") {

        displayOrders();

    } else {

        const filteredOrders = orders.filter(
            order => order.status === selectedStatus
        );

        displayOrders(filteredOrders);

    }

});

// ===================================
// 6. DELETE ORDERS
// ===================================

orderTableBody.addEventListener("click", function(event) {

    const button = event.target.closest(
        'button[data-action="delete"]'
    );

    if (!button) return;

    const orderId = button.dataset.id;

    const confirmation = confirm(
        "Are you sure you want to delete this order?"
    );

    if (!confirmation) return;

    orders = orders.filter(
        order => order.id !== orderId
    );

    saveOrders();

    displayOrders();

    updateOrderStatistics();

});
// ===================================
// 7. INITIALIZE ORDERS PAGE
// ===================================

displayOrders();
updateOrderStatistics();
