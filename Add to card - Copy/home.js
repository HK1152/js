document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-button');
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const likeSectionButton = document.getElementById('likeSectionButton');
    const mainElements = document.querySelectorAll('.main');
    const searchInput = document.getElementById('searchInput');
    let showingLiked = false; 

    function showAllPosts() {
        mainElements.forEach(element => {
            element.style.display = 'block';
        });
        likeSectionButton.textContent = 'like section';
        showingLiked = false;
    }

    function showLikedPosts() {
        mainElements.forEach(element => {
            const postId = element.querySelector('.down').id;
            if (likedPosts.includes(postId)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
        likeSectionButton.textContent = 'all page';
        showingLiked = true;
    }

    likeButtons.forEach(button => {
        const mainElement = button.closest('.main');
        if (mainElement) {
            const postId = mainElement.querySelector('.down').id;

            if (likedPosts.includes(postId)) {
                button.classList.add('liked');
            }

            button.addEventListener('click', () => {
                button.classList.toggle('liked');
                if (button.classList.contains('liked')) {
                    if (!likedPosts.includes(postId)) {
                        likedPosts.push(postId);
                    }
                } else {
                    likedPosts = likedPosts.filter(id => id !== postId);
                }
                localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

  
                if (showingLiked) {
                    showLikedPosts();
                }
            });
        }
    });

    likeSectionButton.addEventListener('click', () => {
        if (showingLiked) {
            showAllPosts();
        } else {
            showLikedPosts();
        }
    });


    showAllPosts();

    // Searchs
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        mainElements.forEach(element => {
            const h1Text = element.querySelector('.midd h1').textContent.toLowerCase();
            if (h1Text.includes(searchTerm)) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    });
});
