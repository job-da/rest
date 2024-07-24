const totalPriceElement = document.querySelector('.total-price');

function toggleQuantity(button) {
    const quantityContainer = button.nextElementSibling;
    const quantityElement = quantityContainer.querySelector('.quantity');

    if (quantityContainer.style.display === 'none' || quantityContainer.style.display === '') {
        quantityContainer.style.display = 'flex';
        quantityElement.textContent = '1';
        button.value = 'Убрать';
    } else {
        quantityContainer.style.display = 'none';
        quantityElement.textContent = '0';
        button.value = 'Добавить';
    }
    updateTotalPrice();
}

function increaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent, 10);
    quantityElement.textContent = quantity + 1;
    updateTotalPrice();
}

function decreaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent, 10);
    if (quantity > 0) {
        quantityElement.textContent = quantity - 1;
    }
    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = 0;
    const productRectangles = document.querySelectorAll('.rectangle');
    
    productRectangles.forEach((rectangle) => {
        const quantity = parseInt(rectangle.querySelector('.quantity').textContent, 10);
        const price = parseInt(rectangle.getAttribute('data-price'), 10);
        totalPrice += quantity * price; // Расчет стоимости
    });

    totalPriceElement.textContent = `Общая сумма: ${totalPrice}`;
}

document.getElementById('order-button').addEventListener('click', function() {
    const orderData = [];
    const customerName = document.getElementById('customer-name').value.trim();

    if (!customerName) {
        alert('Пожалуйста, введите ваше имя.');
        return;
    }

    document.querySelectorAll('.rectangle').forEach(function(rectangle) {
        const name = rectangle.querySelector('.product-name').textContent;
        const quantity = rectangle.querySelector('.quantity').textContent;
        if (parseInt(quantity, 10) > 0) {
            orderData.push({ name, quantity });
        }
    });

    if (orderData.length === 0) {
        alert('Вы не выбрали товары.');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    orders.push({ items: orderData, status: "не готово", customerName });
    
    localStorage.setItem('orders', JSON.stringify(orders));

    window.location.href = 'order.html';
});
