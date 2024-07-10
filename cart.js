document.addEventListener("DOMContentLoaded", function () {
    // Khai báo biến và lấy các phần tử DOM cần thiết từ HTML
    const cart = []; // Mảng lưu trữ các sản phẩm trong giỏ hàng
    const cartQuantityElement = document.getElementById("cart-quantity"); // Phần tử hiển thị số lượng sản phẩm trong giỏ hàng
    const cartItemsContainer = document.querySelector(".cart-items"); // Container chứa các sản phẩm trong giỏ hàng
    const totalElement = document.getElementById("total"); // Phần tử hiển thị tổng tiền đơn hàng

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    function updateCartQuantity() {
        cartQuantityElement.textContent = cart.length;
    }

    // Hàm cập nhật tổng tiền đơn hàng
    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalElement.textContent = total.toLocaleString("vi-VN") + "đ";
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(product, price) {
        const existingItem = cart.find(item => item.product === product);
        if (existingItem) {
            existingItem.quantity += 1; // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
        } else {
            cart.push({ product, price, quantity: 1 }); // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào mảng cart
        }
        updateCartQuantity(); // Cập nhật số lượng sản phẩm hiển thị
        updateCartItems(); // Cập nhật danh sách sản phẩm trong giỏ hàng
        updateTotal(); // Cập nhật tổng tiền đơn hàng
    }

    // Hàm xóa sản phẩm khỏi giỏ hàng
    function removeFromCart(product) {
        const index = cart.findIndex(item => item.product === product);
        if (index !== -1) {
            cart.splice(index, 1); // Xóa sản phẩm khỏi mảng cart
            updateCartQuantity(); // Cập nhật số lượng sản phẩm hiển thị
            updateCartItems(); // Cập nhật danh sách sản phẩm trong giỏ hàng
            updateTotal(); // Cập nhật tổng tiền đơn hàng
        }
    }

    // Hàm cập nhật danh sách sản phẩm trong giỏ hàng trên giao diện
    function updateCartItems() {
        cartItemsContainer.innerHTML = ""; // Xóa các phần tử trong container giỏ hàng
        cart.forEach(item => {
            const cartItem = document.createElement("div"); // Tạo phần tử mới cho từng sản phẩm
            cartItem.classList.add("cart-item"); // Thêm lớp cho phần tử
            cartItem.innerHTML = `
                <span>${item.product} - ${item.quantity} x ${item.price.toLocaleString("vi-VN")}đ</span>
                <button class="remove-from-cart" data-product="${item.product}">Xóa</button>
            `; // HTML cho từng sản phẩm, bao gồm tên, số lượng và giá tiền
            cartItemsContainer.appendChild(cartItem); // Thêm sản phẩm vào container giỏ hàng

            // Lắng nghe sự kiện click vào nút "Xóa" để xóa sản phẩm khỏi giỏ hàng
            cartItem.querySelector(".remove-from-cart").addEventListener("click", function () {
                const product = this.getAttribute("data-product"); // Lấy thông tin sản phẩm cần xóa
                removeFromCart(product); // Gọi hàm xóa sản phẩm
            });
        });
    }

    // Lắng nghe sự kiện click vào nút "Đặt hàng"
    document.getElementById("checkout-btn").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang trống!"); // Nếu giỏ hàng trống, hiển thị thông báo
            return;
        }
        const modal = document.getElementById("myModal"); // Lấy modal đặt hàng
        modal.style.display = "block"; // Hiển thị modal
    });

    // Lắng nghe sự kiện click vào nút đóng modal
    document.querySelector(".close").addEventListener("click", function () {
        const modal = document.getElementById("myModal"); // Lấy modal
        modal.style.display = "none"; // Ẩn modal
    });

    // Lắng nghe sự kiện submit form đặt hàng
    document.getElementById("order-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của form
        const name = document.getElementById("name").value; // Lấy giá trị tên từ form
        const call = document.getElementById("call").value; // Lấy giá trị số điện thoại từ form
        const addres = document.getElementById("addres").value; // Lấy giá trị địa chỉ từ form
        const email = document.getElementById("email").value; // Lấy giá trị email từ form
        const evaluate = document.getElementById("evaluate").value; // Lấy giá trị đánh giá từ form
        alert(`Cảm ơn ${name}, đơn hàng của bạn đã được đặt thành công!`); // Thông báo đặt hàng thành công
        const modal = document.getElementById("myModal"); // Lấy modal đặt hàng
        modal.style.display = "none"; // Ẩn modal
        cart.length = 0; // Xóa hết sản phẩm trong giỏ hàng
        updateCartQuantity(); // Cập nhật số lượng sản phẩm hiển thị
        updateCartItems(); // Cập nhật danh sách sản phẩm trong giỏ hàng
        updateTotal(); // Cập nhật tổng tiền đơn hàng
    });

    // Lắng nghe sự kiện click vào từng nút "Thêm vào giỏ hàng" trên sản phẩm
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement.querySelector("h3").textContent; // Lấy tên sản phẩm
            const price = parseInt(this.getAttribute("data-price").replace(/\./g, "")); // Lấy giá sản phẩm
            addToCart(product, price); // Gọi hàm thêm sản phẩm vào giỏ hàng
        });
    });
});

