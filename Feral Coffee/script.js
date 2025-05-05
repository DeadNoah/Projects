
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelectorAll('.nav-button');

burger.addEventListener('click', () => {
    
    navLinks.classList.toggle('active');
    
  
    burger.classList.toggle('toggle');
});


navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

const products = [
    {
        image: 'images/double.png',
        title: 'DOUBLE ESPRESSO',
        description: 'A classic one-two punch to the system to make sure you get done what needs to.',
        
    },
    {
        image: 'images/vanilla.png',
        title: 'VANILLA',
        description: 'There is nothing plain about this latte. Natural vanilla sweetens the espresso perfectly to make a smooth experience all the way down.',
        
    },
    {
        image: 'images/mocha.png',
        title: 'MOCHA',
        description: 'Made with chocolate so good, even Willy Wonka said "Damn I should\'ve though of this.',
       
    },
    {
        image: 'images/orange.png',
        title: 'ORANGE CREAMSICLE',
        description: 'Thousands of children pointlessly run after ice cream trucks every year when they could\'ve been drinking this the entire time.',

    },
    {
        image: 'images/triple.png',
        title: 'TRIPLE SHOT',
        description: 'For those that need the ultimate kick, consider this our haymaker',
        
    },
    {
        image: 'images/cinnamon.png',
        title: 'CINNAMON',
        description: 'A sin joke is too on the nose. There is, however, nothing cliche about the latte',
    },
];

// DOM elements
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPosition = 0;
let visibleItems = 4; 
let autoScrollInterval;


function initCarousel() {
    renderProducts();
    setupEventListeners();
    updateVisibleItems();
    startAutoScroll();
    
    window.addEventListener('resize', updateVisibleItems);
}

function renderProducts() {
    carousel.innerHTML = products.map(product => `
        <div class="carousel-item">
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3 class="product-title">${product.title}</h3>
            </div>
        </div>
    `).join('');
}

function updateVisibleItems() {
    const width = window.innerWidth;
    
    if (width <= 400) {
        visibleItems = 1;
    } else if (width <= 600) {
        visibleItems = 2;
    } else if (width <= 900) {
        visibleItems = 3;
    } else {
        visibleItems = 4;
    }

    
    updateCarousel();
}

function updateCarousel() {
    const itemWidth = 100 / visibleItems;
    const translateValue = -currentPosition * itemWidth;
    carousel.style.transform = `translateX(${translateValue}%)`;
}

function moveCarousel(direction) {
    const maxPosition = products.length - visibleItems;
    
    currentPosition += direction;
    
    if (currentPosition < 0) {
        currentPosition = maxPosition;
    } else if (currentPosition > maxPosition) {
        currentPosition = 0;
    }
    
    updateCarousel();
    resetAutoScroll();
}


function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        moveCarousel(1);
    }, 3000);
}

function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
}


function setupEventListeners() {
    prevBtn.addEventListener('click', () => moveCarousel(-1));
    nextBtn.addEventListener('click', () => moveCarousel(1));
    
    
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        resetAutoScroll();
    });
}


document.addEventListener('DOMContentLoaded', initCarousel);

const productsList = document.getElementById('products-list');
let currentIndex = 0;


function displayProduct(index) {
    
    productsList.innerHTML = '';
    
    
    const productDiv = document.createElement('div');
    productDiv.className = 'product-container';
    
    
    const product = products[index];
    
    productDiv.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.title}" class="product-image">
        </div>
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p>${product.description}</p>
            <ul>
                <li>100% Arabica Beans</li>
                <li>Made with Filtered Water</li>
                <li>Only Natural Flavors</li>
                <li>Nitro Frothed</li>
                <li>120mg Caffeine</li>
            </ul>
        </div>
        <div class="product-navigation">
            <button class="nav-arrow prev-arrow">&#10094;</button>
            <button class="nav-arrow next-arrow">&#10095;</button>
        </div>
        <div class="reviews-container">
            <div class="reviews-slideshow">
                <div class="star-container">
                    <span class="star" data-value="1">&#9733;</span>
                    <span class="star" data-value="2">&#9733;</span>
                    <span class="star" data-value="3">&#9733;</span>
                    <span class="star" dataflag="active" data-value="4">&#9733;</span>
                    <span class="star" data-value="5">&#9733;</span>
                </div>
                <div class="review active">
                    <p class="review-text">"This is the best cold brew I've ever had! Perfect balance of smoothness and caffeine kick."</p>
                    <div class="reviewer">- Sarah J.</div>
                </div>
                <div class="review">
                    <p class="review-text">"I'm addicted to this cold brew. The nitro froth makes it feel so luxurious every morning."</p>
                    <div class="reviewer">- Michael T.</div>
                </div>
                <div class="review">
                    <p class="review-text">"As a coffee connoisseur, I can say this is top-tier. The 100% Arabica beans make all the difference."</p>
                    <div class="reviewer">- Priya K.</div>
                </div>
                <div class="review">
                    <p class="review-text">"Perfect for my busy mornings. Just the right amount of caffeine to get me going without the jitters."</p>
                    <div class="reviewer">- David L.</div>
                </div>
            </div>
        </div>
    `;
    
    productsList.appendChild(productDiv);
    

    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    prevArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        displayProduct(currentIndex);
    });
    
    nextArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % products.length;
        displayProduct(currentIndex);
    });
}


displayProduct(currentIndex);

let currentReview = 0;
const reviews = document.querySelectorAll('.review');

function showReview(index) {
    reviews.forEach(review => review.classList.remove('active'));
    reviews[index].classList.add('active');
}

function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
}


showReview(0);
setInterval(nextReview, 5000);


