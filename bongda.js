document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartQuantityElement = document.getElementById("cart-quantity");
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalElement = document.getElementById("total");

    function updateCartQuantity() {
        cartQuantityElement.textContent = cart.length;
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalElement.textContent = total.toLocaleString("vi-VN") + "đ";
    }

    function addToCart(product, price) {
        const existingItem = cart.find(item => item.product === product);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ product, price, quantity: 1 });
        }
        updateCartQuantity();
        updateCartItems();
        updateTotal();
    }

    function removeFromCart(product) {
        const index = cart.findIndex(item => item.product === product);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCartQuantity();
            updateCartItems();
            updateTotal();
        }
    }

    function updateCartItems() {
        cartItemsContainer.innerHTML = "";
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.product} - ${item.quantity} x ${item.price.toLocaleString("vi-VN")}đ</span>
                <button class="remove-from-cart" data-product="${item.product}">Xóa</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll(".remove-from-cart").forEach(button => {
            button.addEventListener("click", function () {
                const product = this.getAttribute("data-product");
                removeFromCart(product);
            });
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement.querySelector("h3").textContent;
            const price = parseInt(this.getAttribute("data-price").replace(/\./g, ""));
            addToCart(product, price);
        });
    });

    document.getElementById("checkout-btn").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    });

    document.querySelector(".close").addEventListener("click", function () {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    });

    document.getElementById("order-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const call = document.getElementById("call").value;
        const addres = document.getElementById("addres").value;
        const email = document.getElementById("email").value;
        const evaluate = document.getElementById("evaluate").value;
        alert(`Cảm ơn ${name}, đơn hàng của bạn đã được đặt thành công!`);
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
        cart.length = 0;
        updateCartQuantity();
        updateCartItems();
        updateTotal();
    });
});
    