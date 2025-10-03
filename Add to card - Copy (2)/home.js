document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-button');
    const cartSectionButton = document.getElementById('cartSectionButton');
    const cartItemCount = document.getElementById('cartItemCount');
    const mainElements = document.querySelectorAll('.main');
    const searchInput = document.getElementById('searchInput');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let showingCart = false;

    const updateCartSummary = () => {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (totalItems > 0) {
            cartItemCount.textContent = `(${totalItems}) - $${totalPrice}`;
            cartItemCount.style.display = 'block';
        } else {
            cartItemCount.style.display = 'none';
        }
    };

    const updateProductCardDisplay = (postId, quantity, totalPrice) => {
        const cardBackDiv = document.querySelector(`.card-back[data-id="${postId}"]`);
        
        if (cardBackDiv) {
            const quantitySpan = cardBackDiv.querySelector('.item-quantity');
            const priceSpan = cardBackDiv.querySelector('.item-total-price');
            const addBtn = document.querySelector(`#${postId} .add-to-cart-button`);

            if (quantity > 0) {
                quantitySpan.textContent = quantity;
                priceSpan.textContent = `$${totalPrice}`;
                addBtn.classList.add('added-to-cart');
            } else {
                addBtn.classList.remove('added-to-cart');
            }
        }
    };

    const showAllProducts = () => {
        mainElements.forEach(element => {
            element.style.display = 'block';
        });
        cartSectionButton.querySelector('.cart-text').textContent = 'Go to Cart';
        showingCart = false;
        updateCartSummary();
    };

    const showCartItems = () => {
        mainElements.forEach(element => {
            const postId = element.querySelector('.down').id;
            const isInCart = cartItems.some(item => item.postId === postId);
            if (isInCart) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
        cartSectionButton.querySelector('.cart-text').textContent = 'Show All Products';
        showingCart = true;
    };

    addToCartButtons.forEach(button => {
        const mainElement = button.closest('.main');
        const postId = mainElement.querySelector('.down').id;
        const postPrice = parseFloat(mainElement.querySelector('.down').dataset.price);

        button.addEventListener('click', () => {
            let existingItem = cartItems.find(item => item.postId === postId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ postId, quantity: 1, price: postPrice });
                existingItem = cartItems[cartItems.length - 1];
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateProductCardDisplay(existingItem.postId, existingItem.quantity, existingItem.quantity * existingItem.price);
            updateCartSummary();
        });
    });

    removeFromCartButtons.forEach(button => {
        const mainElement = button.closest('.main');
        const postId = mainElement.querySelector('.card-back').dataset.id;
        const postPrice = parseFloat(document.querySelector(`#${postId}`).dataset.price);
        let existingItem = cartItems.find(item => item.postId === postId);

        if (existingItem && existingItem.quantity > 0) {
            existingItem.quantity--;
            
            if (existingItem.quantity === 0) {
                cartItems = cartItems.filter(item => item.postId !== postId);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateProductCardDisplay(postId, existingItem ? existingItem.quantity : 0, existingItem ? existingItem.quantity * postPrice : 0);
            updateCartSummary();
        }
    });

    cartSectionButton.addEventListener('click', () => {
        if (showingCart) {
            showAllProducts();
        } else {
            showCartItems();
        }
    });

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        mainElements.forEach(element => {
            const productTitle = element.querySelector('.midd h1').textContent.toLowerCase();
            const productDescription = element.querySelector('.midd p').textContent.toLowerCase();
            if (productTitle.includes(searchTerm) || productDescription.includes(searchTerm)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    });

    cartItems.forEach(item => {
        updateProductCardDisplay(item.postId, item.quantity, item.quantity * item.price);
    });
    updateCartSummary();
    showAllProducts();
});