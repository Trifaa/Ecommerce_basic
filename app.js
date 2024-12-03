document.addEventListener("DOMContentLoaded", () => {
    let products = [
        { id: 1, name: "Producto 1", price: 10, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Producto 2", price: 20, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Producto 3", price: 30, image: "https://via.placeholder.com/150" }
    ];

    const offers = [
        { id: 4, name: "Producto en Oferta 1", price: 5, image: "https://via.placeholder.com/150" },
        { id: 5, name: "Producto en Oferta 2", price: 15, image: "https://via.placeholder.com/150" }
    ];

    const productList = document.getElementById("product-list");
    const offerList = document.getElementById("offer-list");
    const cartButton = document.getElementById("cart-button");
    const addProductButton = document.getElementById("add-product-button");
    const addProductModal = document.getElementById("add-product-modal");
    const cart = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const closeCart = document.getElementById("close-cart");
    const checkoutButton = document.getElementById("checkout-button");
    const addProductForm = document.getElementById("add-product-form");
    const newProductName = document.getElementById("new-product-name");
    const newProductPrice = document.getElementById("new-product-price");
    const newProductImage = document.getElementById("new-product-image");
    const closeAddProduct = document.getElementById("close-add-product");

    let cartContent = [];

    function renderProducts(productArray, container) {
        container.innerHTML = "";
        productArray.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "bg-white p-4 rounded shadow";
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-32 object-cover rounded mb-2">
                <h3 class="text-xl font-bold">${product.name}</h3>
                <p class="text-gray-700">$${product.price}</p>
                <button class="add-to-cart bg-blue-500 text-white py-2 px-4 rounded mt-2" data-id="${product.id}">Agregar al carrito</button>
            `;
            container.appendChild(productDiv);
        });
    }

    function updateCart() {
        cartItems.innerHTML = "";
        cartContent.forEach((item, index) => {
            const itemLi = document.createElement("li");
            itemLi.className = "flex justify-between items-center mb-2";
            itemLi.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <button class="remove-from-cart bg-red-500 text-white py-1 px-2 rounded" data-index="${index}">Eliminar</button>
            `;
            cartItems.appendChild(itemLi);
        });
        cartButton.textContent = `Carrito (${cartContent.length})`;
    }

    productList.addEventListener("click", event => {
        if (event.target.classList.contains("add-to-cart")) {
            const productId = parseInt(event.target.dataset.id, 10);
            const product = products.find(p => p.id === productId) || offers.find(o => o.id === productId);
            cartContent.push(product);
            updateCart();
        }
    });

    cartItems.addEventListener("click", event => {
        if (event.target.classList.contains("remove-from-cart")) {
            const index = parseInt(event.target.dataset.index, 10);
            cartContent.splice(index, 1);
            updateCart();
        }
    });

    cartButton.addEventListener("click", () => {
        cart.classList.remove("hidden");
    });

    addProductButton.addEventListener("click", () => {
        addProductModal.classList.remove("hidden");
    });

    closeCart.addEventListener("click", () => {
        cart.classList.add("hidden");
    });

    closeAddProduct.addEventListener("click", () => {
        addProductModal.classList.add("hidden");
    });

    checkoutButton.addEventListener("click", () => {
        alert("Compra realizada!");
        cartContent = [];
        updateCart();
        cart.classList.add("hidden");
    });

    addProductForm.addEventListener("submit", event => {
        event.preventDefault();
        const productName = newProductName.value.trim();
        const productPrice = parseFloat(newProductPrice.value.trim());
        const productImage = newProductImage.value.trim();
        if (productName && !isNaN(productPrice) && productImage) {
            const newProduct = { id: products.length + 1, name: productName, price: productPrice, image: productImage };
            products.push(newProduct);
            renderProducts(products, productList);
            newProductName.value = "";
            newProductPrice.value = "";
            newProductImage.value = "";
            addProductModal.classList.add("hidden");
        }
    });
    renderProducts(products, productList);
    renderProducts(offers, offerList);
});