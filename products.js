
// =====================================
// 1. INITIAL PRODUCT DATA
// =====================================

const defaultProducts = [

    {
        id: 101,
        name: "Laptop",
        category: "Electronics",
        price: 55000,
        stock: 15
    },

    {
        id: 102,
        name: "Wireless Mouse",
        category: "Accessories",
        price: 1200,
        stock: 45
    },

    {
        id: 103,
        name: "Smartphone",
        category: "Electronics",
        price: 25000,
        stock: 8
    },

    {
        id: 104,
        name: "T-Shirt",
        category: "Fashion",
        price: 800,
        stock: 0
    },

    {
        id: 105,
        name: "Table Lamp",
        category: "Home",
        price: 1500,
        stock: 4
    }

];


// Load saved products

let products = JSON.parse(
    localStorage.getItem("products")
) || defaultProducts.map(product => ({ ...product }));


// Save products

function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// Initialize default data

if (!localStorage.getItem("products")) {
    saveProducts();
}


// =====================================
// 2. DISPLAY PRODUCTS
// =====================================

const productTableBody =
    document.getElementById("productTableBody");


function displayProducts(data = products) {

    productTableBody.replaceChildren();

    if (data.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 7;
        cell.textContent = "No products found.";

        row.appendChild(cell);
        productTableBody.appendChild(row);

        return;
    }


    data.forEach(function(product) {

        const row = document.createElement("tr");

        const status = getStockStatus(product.stock);


        const values = [
            product.id,
            product.name,
            product.category,
            "₹" + product.price.toLocaleString("en-IN"),
            product.stock
        ];

        values.forEach(function(value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });


        // Stock status

        const statusCell = document.createElement("td");

        const statusBadge = document.createElement("span");

        statusBadge.className = "stock-status " + status.className;

        statusBadge.textContent = status.label;

        statusCell.appendChild(statusBadge);

        row.appendChild(statusCell);


        // Action buttons

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";

        editButton.dataset.action = "edit";

        editButton.dataset.id = product.id;


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.dataset.action = "delete";

        deleteButton.dataset.id = product.id;


        actionCell.append(editButton, deleteButton);

        row.appendChild(actionCell);


        productTableBody.appendChild(row);

    });

}


// Determine stock status

function getStockStatus(stock) {

    if (stock === 0) {

        return {
            label: "Out of Stock",
            className: "out-of-stock"
        };

    }

    if (stock <= 5) {

        return {
            label: "Low Stock",
            className: "low-stock"
        };

    }

    return {
        label: "In Stock",
        className: "in-stock"
    };

}



// =====================================
// 3. UPDATE PRODUCT STATISTICS
// =====================================

function updateProductStatistics() {

    const totalProducts = products.length;


    const totalStock = products.reduce(
        (sum, product) => sum + product.stock,
        0
    );


    const lowStock = products.filter(
        product => product.stock > 0 && product.stock <= 5
    ).length;


    const outOfStock = products.filter(
        product => product.stock === 0
    ).length;


    document.getElementById("totalProducts").textContent =
        totalProducts;

    document.getElementById("totalStock").textContent =
        totalStock;

    document.getElementById("lowStock").textContent =
        lowStock;

    document.getElementById("outOfStock").textContent =
        outOfStock;

}



// =====================================
// 4. SELECT FORM ELEMENTS
// =====================================

const addProductBtn =
    document.getElementById("addProductBtn");

const productModal =
    document.getElementById("productModal");

const productForm =
    document.getElementById("productForm");

const productId =
    document.getElementById("productId");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productStock =
    document.getElementById("productStock");

const modalTitle =
    document.getElementById("modalTitle");


// Open Add Product modal

addProductBtn.addEventListener("click", function() {

    productForm.reset();

    productId.value = "";

    modalTitle.textContent = "Add Product";

    productModal.style.display = "flex";

});


// =====================================
// 5. SAVE PRODUCT
// =====================================

productForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = productName.value.trim();

    const category = productCategory.value;

    const price = Number(productPrice.value);

    const stock = Number(productStock.value);

    const id = productId.value;


    // Validation

    if (
        !name ||
        !category ||
        !Number.isFinite(price) ||
        !Number.isInteger(stock) ||
        price <= 0 ||
        stock < 0
    ) {

        alert("Please enter valid product details.");

        return;

    }


    // UPDATE PRODUCT

    if (id) {

        const existingProduct = products.find(
            product => product.id === Number(id)
        );

        if (existingProduct) {

            existingProduct.name = name;

            existingProduct.category = category;

            existingProduct.price = price;

            existingProduct.stock = stock;

        }

    }


    // ADD NEW PRODUCT

    else {

        const newProduct = {

            id: Date.now(),

            name: name,

            category: category,

            price: price,

            stock: stock

        };

        products.push(newProduct);

    }


    // Save and refresh

    saveProducts();

    displayProducts();

    updateProductStatistics();

    productForm.reset();

    productModal.style.display = "none";

});



// =====================================
// 6. EDIT PRODUCT
// =====================================

function editProduct(id) {

    const product = products.find(
        product => product.id === Number(id)
    );

    if (!product) return;


    productId.value = product.id;

    productName.value = product.name;

    productCategory.value = product.category;

    productPrice.value = product.price;

    productStock.value = product.stock;


    modalTitle.textContent = "Edit Product";

    productModal.style.display = "flex";

}



// =====================================
// 7. DELETE PRODUCT
// =====================================

function deleteProduct(id) {

    const confirmation = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmation) return;


    products = products.filter(
        product => product.id !== Number(id)
    );


    saveProducts();

    displayProducts();

    updateProductStatistics();

}



// =====================================
// 8. HANDLE PRODUCT ACTIONS
// =====================================

productTableBody.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;


    const action = button.dataset.action;

    const id = Number(button.dataset.id);


    if (action === "edit") {

        editProduct(id);

    }

    else if (action === "delete") {

        deleteProduct(id);

    }

});


// =====================================
// 9. SEARCH PRODUCTS
// =====================================

const searchProduct =
    document.getElementById("searchProduct");


searchProduct.addEventListener("input", function() {

    const value = this.value.toLowerCase();


    const filteredProducts = products.filter(product => {

        return product.name.toLowerCase().includes(value);

    });


    displayProducts(filteredProducts);

});


// =====================================
// 10. FILTER PRODUCTS BY CATEGORY
// =====================================

const categoryFilter =
    document.getElementById("categoryFilter");


categoryFilter.addEventListener("change", function() {

    const selectedCategory = this.value;


    if (selectedCategory === "All") {

        displayProducts();

    }

    else {

        const filteredProducts = products.filter(
            product => product.category === selectedCategory
        );

        displayProducts(filteredProducts);

    }

});

// =====================================
// 11. CANCEL MODAL
// =====================================

document.getElementById("cancelBtn")
    .addEventListener("click", function() {
        productModal.style.display = "none";
        productForm.reset();
    });

// =====================================
// 12. INITIALIZE PRODUCT MANAGEMENT
// =====================================

displayProducts();

updateProductStatistics();