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
        const itemDetailsDiv = document.querySelector(`.item-details[data-id="${postId}"]`);
        const removeButtonContainer = document.querySelector(`.remove-button-container[data-id="${postId}"]`);
        
        if (itemDetailsDiv) {
            const quantitySpan = itemDetailsDiv.querySelector('.item-quantity');
            const priceSpan = itemDetailsDiv.querySelector('.item-total-price');

            if (quantity > 0) {
                quantitySpan.textContent = `Items: ${quantity}`;
                priceSpan.textContent = `Total: $${totalPrice}`;
                itemDetailsDiv.style.display = 'flex';
                removeButtonContainer.style.display = 'block';
            } else {
                itemDetailsDiv.style.display = 'none';
                removeButtonContainer.style.display = 'none';
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
        const postId = mainElement.querySelector('.down').id;
        const postPrice = parseFloat(mainElement.querySelector('.down').dataset.price);

        button.addEventListener('click', () => {
            let existingItem = cartItems.find(item => item.postId === postId);

            if (existingItem && existingItem.quantity > 0) {
                existingItem.quantity--;
                
                if (existingItem.quantity === 0) {
                    cartItems = cartItems.filter(item => item.postId !== postId);
                }

                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateProductCardDisplay(postId, existingItem.quantity, existingItem.quantity * postPrice);
                updateCartSummary();
            }
        });
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