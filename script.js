// Navbar Elements
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

const mobileSearchBtn = document.getElementById("mobileSearchBtn");
const mobileSearchClose = document.getElementById("mobileSearchClose");

const mobileSearchWrapper = document.getElementById("mobileSearchWrapper");
const mobileSearchInput = document.getElementById("mobileSearchInput");
const mobileSearchResults = document.getElementById("mobileSearchResults");
const mobileResultsList = document.getElementById("mobileResultsList");

document.getElementById('continueShopping').addEventListener('click', () => this.toggleCart());

// ============= HAMBURGER MENU TOGGLE =============
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileSearchWrapper.classList.remove('active');
    mobileSearchResults.classList.remove('active');
});

// Close menu when clicking link
document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ============= MOBILE SEARCH TOGGLE =============
if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => {
        mobileSearchWrapper.classList.toggle('active');
        if (mobileSearchWrapper.classList.contains('active')) {
            mobileSearchInput.focus();
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

if (mobileSearchClose) {
    mobileSearchClose.addEventListener('click', () => {
        mobileSearchWrapper.classList.remove('active');
        mobileSearchInput.value = '';
        mobileSearchResults.classList.remove('active');
    });
}

// ============= CLOSE SEARCH WHEN CLICKING OUTSIDE =============
document.addEventListener('click', (e) => {
    if (!e.target.closest('.desktop-search') && !e.target.closest('.search-results-dropdown')) {
        const searchResults = document.getElementById("searchResults");
        if (searchResults) searchResults.classList.remove('active');
    }
});

// ============= CLOSE MENUS ON RESIZE =============
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileSearchWrapper.classList.remove('active');
        mobileSearchResults.classList.remove('active');
    }
});


// ============= LIVE PRODUCT SEARCH =============
const desktopSearch = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");
const searchResults = document.getElementById("searchResults");

// Reference all product card variants
const cards = document.querySelectorAll(".card, .cardB, .p6-card ");

function performSearch(query, resultsContainer, dropdownContainer) {
    resultsContainer.innerHTML = "";
    const keyword = query.toLowerCase().trim();

    if (keyword === "") {
        dropdownContainer.classList.remove("active");
        return;
    }

    let found = false;

    cards.forEach(card => {
        const titleEl = card.querySelector("h3");
        if (!titleEl) return;
        const title = titleEl.innerText;

        const imgEl = card.querySelector("img");
        const image = imgEl ? imgEl.src : "";

        const priceEl = card.querySelector(".price");
        const price = priceEl ? priceEl.innerText : "₹40";

        if (title.toLowerCase().includes(keyword)) {
            found = true;
            const item = document.createElement("div");
            item.className = "search-item";
            item.innerHTML = `
                <img src="${image}" alt="${title}">
                <div>
                    <h4>${title}</h4>
                    <p>${price}</p>
                </div>
            `;

            item.onclick = () => {
                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
                dropdownContainer.classList.remove("active");
                if (desktopSearch) desktopSearch.value = "";
                if (mobileSearchInput) mobileSearchInput.value = "";
                mobileSearchWrapper.classList.remove("active");
            };

            resultsContainer.appendChild(item);
        }
    });

    if (!found) {
        resultsContainer.innerHTML = "<div class='no-result'>No products found</div>";
    }

    dropdownContainer.classList.add("active");
}

if (desktopSearch) {
    desktopSearch.addEventListener("input", function () {
        performSearch(this.value, resultsList, searchResults);
    });
}

if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", function () {
        performSearch(this.value, mobileResultsList, mobileSearchResults);
    });
}


// ===================================
//   DYNAMIC STYLE INJECTION (SYSTEM)
// ===================================
const styleElement = document.createElement("style");
styleElement.innerHTML = `
    /* --- Smooth Scroll Offset Correction for Sticky Navbar --- */
    html {
        scroll-behavior: smooth;
    }
    
    .containerA, 
    .containerB, 
    .about, 
    #groceries, 
    #vegetables, 
    #fruits, 
    #about,
    #autoCarousel {
        scroll-margin-top: 85px !important;
    }

    /* --- Animated Sliding Mobile Drawer Navigation --- */
    .mobile-menu {
        display: flex !important;
        flex-direction: column !important;
        position: absolute !important;
        top: 70px !important;
        left: 0 !important;
        right: 0 !important;
        background: white !important;
        border-bottom: 1px solid var(--border-color) !important;
        z-index: 999 !important;
        transform: translateY(-110%) !important; /* Slide up out of view */
        opacity: 0 !important;
        visibility: hidden !important;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; /* Elastic slide-down ease */
    }
    .mobile-menu.active {
        transform: translateY(0) !important; /* Slide down into view */
        opacity: 1 !important;
        visibility: visible !important;
    }

    @media (max-width: 768px) {
        .mobile-menu {
            top: 60px !important;
        }
    }
    @media (max-width: 480px) {
        .mobile-menu {
            top: 55px !important;
        }
    }

    /* --- Desktop Navbar Dropdown styling --- */
    .nav-dropdown {
        position: relative;
    }
    .dropdown-trigger {
        display: flex;
        align-items: center;
        gap: 5px;
        color: var(--text-dark);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
    }
    .dropdown-trigger:hover {
        color: var(--primary-color);
    }
    .dropdown-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        background: white;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        border-radius: 8px;
        list-style: none;
        padding: 8px 0;
        min-width: 160px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    .nav-dropdown:hover .dropdown-menu {
        display: block;
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }
    .dropdown-menu li {
        width: 100%;
    }
    .dropdown-menu li a {
        padding: 10px 20px;
        display: block;
        color: var(--text-dark, #333) !important;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.9rem;
        transition: background 0.2s, color 0.2s;
    }
    .dropdown-menu li a::after {
        display: none !important; /* Hide standard underline */
    }
    .dropdown-menu li a:hover {
        background: var(--light-color, #f5f5f5);
        color: var(--primary-color, #ff6b6b) !important;
    }

    /* --- Dynamic Layout Adjustments for Cards --- */
    .card, .cardB, .p6-card {
        height: auto !important;
        min-height: 220px !important;
        padding-bottom: 12px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
    }
    .details, .p6-details {
        width: 100% !important;
        margin-left: 0 !important;
        padding: 0 4px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: flex-end !important;
        flex: 1 !important;
    }
    .details h3, .p6-details h3 {
        margin-top: 4px !important;
        margin-bottom: 1px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
    }
    .details p, .p6-details p {
        margin: 0 !important;
         text-align: left;
    }

    /* --- Interactive Star Ratings CSS --- */
    .product-rating {
        display: flex;
        align-items: center;
        gap: 2px;
        margin: 2px 0 5px;
    }
    .product-rating .star {
        font-size: 13px;
        color: #ddd;
        cursor: pointer;
        transition: color 0.15s ease, transform 0.15s ease;
    }
    .product-rating .star:hover {
        transform: scale(1.2);
    }
    .product-rating .star.filled {
        color: #ffcc00;
    }
    .rating-count {
        font-size: 11px;
        color: #777;
        margin-left: 4px;
        font-weight: 600;
    }

    /* --- Interactive Buttons overlay (Quick View & Cart) --- */
    .small-cart-btn, .small-view-btn {
        position: absolute;
        top: 8px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #ffffff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 10;
        opacity: 0;
        transform: translateY(-5px);
    }
    
    .small-cart-btn {
        right: 8px;
        color: var(--primary-color, #ff6b6b);
    }
    .small-view-btn {
        left: 8px;
        color: var(--secondary-color, #4ecdc4);
    }

    .small-cart-btn:hover {
        background-color: var(--primary-color, #ff6b6b);
        color: #ffffff;
        transform: scale(1.1);
    }
    .small-view-btn:hover {
        background-color: var(--secondary-color, #4ecdc4);
        color: #ffffff;
        transform: scale(1.1);
    }

    /* Hover trigger reveal */
    .card:hover .small-cart-btn, .card:hover .small-view-btn,
    .cardB:hover .small-cart-btn, .cardB:hover .small-view-btn,
    .p6-card:hover .small-cart-btn, .p6-card:hover .small-view-btn {
        opacity: 1;
        transform: translateY(0);
    }

    /* --- Mobile Responsive Grid Layout fixes --- */
    @media (max-width: 576px) {
        /* Standard Category Box Grid conversion to large 2-column view */
        .box {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            padding: 10px !important;
            width: 100% !important;
            margin: 0 auto !important;
        }
        .card {
            width: 100% !important;
            margin: 0 !important;
            min-height: 285px !important;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08) !important;
        }
        .image {
            width: 100% !important;
            height: 180px !important;
            max-width: 100% !important;
            max-height: 180px !important;
        }
        
        /* Side Scrolling Category Containers (boxB) */
        .boxB {
            display: flex !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            gap: 12px !important;
            padding: 10px !important;
            justify-content: flex-start !important;
        }
        .cardB {
            width: 155px !important;
            height: auto !important;
            min-height: 235px !important;
            margin: 0 !important;
            flex-shrink: 0 !important;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08) !important;
        }
        .imageB {
            width: 100% !important;
            height: 135px !important;
            max-width: 100% !important;
            max-height: 135px !important;
        }

        /* Float Buttons on mobile screens */
        .small-cart-btn, .small-view-btn {
            opacity: 1 !important;
            transform: translateY(0) !important;
            width: 28px !important;
            height: 28px !important;
            font-size: 11px !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.12);
        }
        .small-cart-btn {
            right: 6px !important;
            top: 6px !important;
        }
        .small-view-btn {
            left: 6px !important;
            top: 6px !important;
        }
    }

    /* --- Pop-up Toast Notifications --- */
    .toast-container {
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
    }
    .cart-toast {
        background: white;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        border-left: 4px solid var(--primary-color, #fc5a5a);
        border-radius: 8px;
        padding: 12px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        pointer-events: auto;
        transform: translateX(150%);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        max-width: 320px;
    }
    .cart-toast.show {
        transform: translateX(0);
        opacity: 1;
    }
    .cart-toast img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 6px;
    }
    .cart-toast-info {
        display: flex;
        flex-direction: column;
    }
    .cart-toast-info h5 {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 700;
        color: #2d3436;
    }
    .cart-toast-info p {
        margin: 2px 0 0;
        font-size: 0.8rem;
        color: #666;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    /* --- Details Modal Layout Styles --- */
    .product-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: 10005;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .product-modal.show {
        display: flex;
        opacity: 1;
    }
    .product-modal-content {
        background: white;
        border-radius: 12px;
        width: 580px;
        max-width: 90%;
        padding: 25px;
        position: relative;
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        transform: scale(0.85);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .product-modal.show .product-modal-content {
        transform: scale(1);
    }
    .close-modal-btn {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 28px;
        cursor: pointer;
        color: #888;
        transition: color 0.2s;
    }
    .close-modal-btn:hover {
        color: var(--primary-color, #ff6b6b);
    }
    .modal-body-layout {
        display: flex;
        gap: 25px;
        align-items: center;
        margin-top: 10px;
    }
    .modal-image-pane {
        width: 220px;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
    }
    .modal-image-pane img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
    }

    .modal-details-pane {
        flex: 1;
    }
    .modal-details-pane h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2d3436;
        margin-bottom: 5px;
    }
    .modal-details-pane h4 {
        font-size: 1.3rem;
        color: var(--primary-color, #ff6b6b);
        font-weight: 700;
        margin: 10px 0;
    }
    .modal-meta-info {
        font-size: 0.9rem;
        color: #555;
        margin: 15px 0;
        line-height: 1.5;
    }
    .modal-meta-info p {
        margin-bottom: 8px;
    }
    .modal-checkout-btn {
        background: var(--primary-color, #ff6b6b);
        color: white;
        border: none;
        padding: 10px 25px;
        font-weight: 600;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .modal-checkout-btn:hover {
        background: #e05353;
        transform: translateY(-2px);
    }

    @media (max-width: 576px) {
        .modal-body-layout {
            flex-direction: column;
            text-align: center;
            gap: 15px;
        }
        .modal-image-pane {
            width: 160px;
        }
        .modal-image-pane img {
            height: 140px;
        }
        .modal-details-pane h2 {
            font-size: 1.25rem;
        }
        .product-modal-content {
            padding: 20px 15px;
        }
    }
`;
document.head.appendChild(styleElement);


// ===================================
//      CART STATE & PERSISTENCE
// ===================================
let cart = JSON.parse(localStorage.getItem("fastmart_cart")) || [];

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cart-total-price");
const cartItemsContainer = document.getElementById("cart-items-container");

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cart-drawer");
const closeDrawerBtn = document.getElementById("close-drawer-btn");
const drawerOverlay = document.getElementById("drawer-overlay");

// Initialize container for toast popups
let toastContainer = document.getElementById("toast-container");
if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
}

function toggleCart() {
    if (cartDrawer) {
        cartDrawer.classList.toggle("is-open");
    }
}

if (cartBtn) cartBtn.addEventListener("click", toggleCart);
if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", toggleCart);
if (drawerOverlay) drawerOverlay.addEventListener("click", toggleCart);

// Save current cart list to browser memory
function saveCartState() {
    localStorage.setItem("fastmart_cart", JSON.stringify(cart));
}

// Display popup toast notification for Cart additions
function triggerToastNotification(title, image) {
    const toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.innerHTML = `
        <img src="${image}" alt="${title}">
        <div class="cart-toast-info">
            <h5>${title}</h5>
            <p><i class="fas fa-check-circle" style="color: #2ecc71;"></i> Added to cart!</p>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Trigger transition entry
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    // Fade out and clean up popup after 2.5s
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 2500);
}

// Display feedback toast notification for product Ratings
function triggerRatingToast(title, rating) {
    const toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.style.borderLeftColor = "#f1c40f"; // Gold star left border
    toast.innerHTML = `
        <div style="font-size: 20px; color: #f1c40f;">★</div>
        <div class="cart-toast-info">
            <h5>${title}</h5>
            <p>Rated ${rating} stars! Thank you.</p>
        </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 2500);
}

// Add item to cart
function addToCart(title, price, image) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, image, quantity: 1 });
    }
    updateCartUI();
    saveCartState();
    triggerToastNotification(title, image);
}

function updateCartUI() {
    // Update count indicator
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.innerText = totalCount;

    // Render contents
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="empty-msg">Your cart is empty.</p>`;
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>₹${item.price}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                        <button class="remove-item-btn" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Render totals
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.innerText = `₹${totalPrice}`;
}

window.changeQty = function (index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
    saveCartState();
};

window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCartUI();
    saveCartState();
};


// ===================================
//      INTERACTIVE RATINGS ENGINE
// ===================================
function updateStarsDisplay(container, currentRating) {
    const stars = container.querySelectorAll(".star");
    stars.forEach((star, index) => {
        if (index < currentRating) {
            star.classList.add("filled");
        } else {
            star.classList.remove("filled");
        }
    });
    const label = container.querySelector(".rating-count");
    if (label) {
        label.innerText = `(${parseFloat(currentRating).toFixed(1)})`;
    }
}

function injectRatingSystem(card, title) {
    if (card.querySelector(".product-rating")) return;

    const ratingContainer = document.createElement("div");
    ratingContainer.className = "product-rating";

    // Restore rating value from user's localStorage or load persistent mock scores
    const savedRatingKey = `fastmart_rating_${title.replace(/\s+/g, '_')}`;
    const userRating = localStorage.getItem(savedRatingKey);

    // Mock initial generation parameters
    const seedRating = (4.0 + Math.random() * 0.9).toFixed(1);
    const score = userRating ? parseInt(userRating) : parseFloat(seedRating);

    // Build interactive star indicators
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.className = `star ${i <= Math.round(score) ? 'filled' : ''}`;
        star.innerHTML = "★";
        star.setAttribute("data-star-val", i);

        // Bind interactive event loops
        star.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            localStorage.setItem(savedRatingKey, i);
            updateStarsDisplay(ratingContainer, i);
            triggerRatingToast(title, i);
        });

        ratingContainer.appendChild(star);
    }

    // Add numeric rating label
    const label = document.createElement("span");
    label.className = "rating-count";
    label.innerText = `(${score})`;
    ratingContainer.appendChild(label);

    // Inject beneath product title header
    const detailsContainer = card.querySelector(".details") || card.querySelector(".p6-details");
    if (detailsContainer) {
        const titleHeader = detailsContainer.querySelector("h3");
        if (titleHeader) {
            titleHeader.parentNode.insertBefore(ratingContainer, titleHeader.nextSibling);
        } else {
            detailsContainer.insertBefore(ratingContainer, detailsContainer.firstChild);
        }
    }
}


// ===================================
//      PRODUCT DETAILS POPUP MODAL
// ===================================
let productModal = document.getElementById("product-modal");
if (!productModal) {
    productModal = document.createElement("div");
    productModal.id = "product-modal";
    productModal.className = "product-modal";
    productModal.innerHTML = `
        <div class="product-modal-content">
            <span class="close-modal-btn" id="close-modal-btn">✕</span>
            <div class="modal-body-layout">
                <div class="modal-image-pane">
                    <img id="modal-product-img" src="" alt="">
                </div>
                <div class="modal-details-pane">
                    <h2 id="modal-product-title"></h2>
                    <div id="modal-product-rating"></div>
                    <h4 id="modal-product-price"></h4>
                    <div class="modal-meta-info">
                        <p><strong>Benefits / Details:</strong> <span id="modal-product-desc"></span></p>
                        <p id="modal-expiry-row"><strong>Expiration:</strong> <span id="modal-product-expiry"></span></p>
                    </div>
                    <button id="modal-add-to-cart-btn" class="modal-checkout-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(productModal);
}

// Close Modal event listeners
const closeModalBtn = document.getElementById("close-modal-btn");
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        productModal.classList.remove("show");
    });
}
productModal.addEventListener("click", (e) => {
    if (e.target === productModal) {
        productModal.classList.remove("show");
    }
});

// Dynamic benefits & expiry generator
function getProductMeta(title) {
    const cleanTitle = title.toLowerCase();
    
    // Helper to calculate future expiry dates relative to current user date
    const getFutureDateString = (monthsAhead) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        d.setMonth(d.getMonth() + monthsAhead);
        return `${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    // Fresh Produce: Vegetables keywords
    const isVeg = /potato|tomato|onion|carrot|cabbage|chilli|cauliflower|cucumber|garlic|ginger|spinach|capsicum|eggplant|lady/i.test(cleanTitle);
    // Fresh Produce: Fruits keywords
    const isFruit = /apple|banana|mango|grapes|orange|papaya|pomegranate|kiwi|strawberry|watermelon|pineapple|avocado|blueberry|peach|cherry|pear|coconut|dragon/i.test(cleanTitle);
    // Packed Food: Spices keywords
    const isSpice = /cardamom|clove|cinnamon|pepper|cumin|jeera|anise|coriander|mustard|sarso|fenugreek|turmeric|haldi|chilli|masala|amchur|salt/i.test(cleanTitle);
    // Packed Food: Chocolate keywords
    const isChoc = /nut|kitkat|munch|milkybar|galaxy|perk|bar|ferrero|snickers|choco/i.test(cleanTitle);
    // Packed Food: Biscuits keywords
    const isBiscuit = /oreo|bourbon|jam|hide|seek|tiger|good|butter|cashew|almond|marie|doodh|biscuit|parle|digestive|cookie|monaco|krackjack|maska|50-50/i.test(cleanTitle);
    //Packed items: others keywords
    const isOther = /surf|soap|shampoo|Excel/i.test(cleanTitle);

    if (isVeg) {
        return {
            benefits: "Handpicked directly from regional organic farms. High in essential minerals, dietary fibers, and antioxidant vitamins. Promotes standard digestion and natural metabolic rates.",
            expiry: "Fresh Produce - Best consumed within 5 to 7 days. Keep stored inside cool ventilation.",
            isPackaged: false
        };
    } else if (isFruit) {
        return {
            benefits: "Sweet and crisp premium crop pickings. Packed with refreshing vitamins, natural complex sugars, and antioxidant defenses. Boosts natural hydration and immune support.",
            expiry: "Fresh Produce - Best consumed within 4 to 6 days. Best kept in direct cool storage.",
            isPackaged: false
        };
    } else if (isSpice) {
        return {
            benefits: "Rich, aromatic extraction containing natural essential seasoning oils. Elevates culinary flavor, triggers metabolic acceleration, and contains anti-inflammatory benefits.",
            expiry: `Packaged Food - Expiry Date: ${getFutureDateString(12)} (12 Months from packing date). Keep sealed.`,
            isPackaged: true
        };
    } else if (isChoc) {
        return {
            benefits: "An exquisite premium cocoa confection. Great as an occasional dessert, boosts standard serotonin levels, and dissolves into a velvety smooth profile.",
            expiry: `Packaged Food - Expiry Date: ${getFutureDateString(9)} (9 Months from packing date). Keep refrigerated.`,
            isPackaged: true
        };
    } else if (isBiscuit) {
        return {
            benefits: "Crispy, oven-baked golden pastries baked to perfection. A splendid daily snack pairing beautifully alongside standard tea, coffee, or milk servings.",
            expiry: `Packaged Food - Expiry Date: ${getFutureDateString(6)} (6 Months from packing date). Store dry.`,
            isPackaged: true
        };
    } else if (isOther) {
        return{
            benefits:"Washing is a fundamental hygiene process that uses water and detergents to break down and remove dirt, oils, and bacteria from fabrics and items. Proper care involves sorting by color, using the right amount of soap, and drying appropriately to maintain the longevity and cleanliness of your garments.",
            expiry: `Packaged Items - Expiry Date: ${getFutureDateString(5)} (5 Months from packing date). Store dry.`,
            isPackaged:true
        }
    }else {
        // Fallback default details
        return {
            benefits: "Responsible quality packaging checked under FastMart. High hygiene standards, certified freshness, and carefully handled to deliver consistent culinary satisfaction.",
            expiry: "Standard Fresh Pack - Best consumed before date marked on outer package seal.",
            isPackaged: true
        };
    }
}

function openProductModal(title, price, image, cardElement) {
    const modalImg = document.getElementById("modal-product-img");
    const modalTitle = document.getElementById("modal-product-title");
    const modalPrice = document.getElementById("modal-product-price");
    const modalRating = document.getElementById("modal-product-rating");
    const modalDesc = document.getElementById("modal-product-desc");
    const modalExpiry = document.getElementById("modal-product-expiry");
    const modalAddToCartBtn = document.getElementById("modal-add-to-cart-btn");

    // Populate data
    modalImg.src = image;
    modalImg.alt = title;
    modalTitle.innerText = title;
    modalPrice.innerText = `₹${price}`;

    // Replicate rating stars seamlessly
    modalRating.innerHTML = "";
    const cardRating = cardElement.querySelector(".product-rating");
    if (cardRating) {
        modalRating.appendChild(cardRating.cloneNode(true));
    }

    // Load category description and expiration variables
    const meta = getProductMeta(title);
    modalDesc.innerText = meta.benefits;
    modalExpiry.innerText = meta.expiry;

    // Bind Add to Cart action
    modalAddToCartBtn.onclick = () => {
        addToCart(title, price, image);
    };

    // Open Modal Overlay
    productModal.classList.add("show");
}


// ===================================
//     GLOBAL LOGIN / LOGOUT CONTROLS
// ===================================
function performLogout() {
    localStorage.removeItem("fastmart_logged_in");
    localStorage.removeItem("fastmart_username");
    updateLoginUI();

    // Trigger sweet logout confirmation toast
    const toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.style.borderLeftColor = "#ff6b6b";
    toast.innerHTML = `
        <div style="font-size: 20px; color: #ff6b6b;"><i class="fas fa-sign-out-alt"></i></div>
        <div class="cart-toast-info">
            <h5>Logged Out</h5>
            <p>You have logged out successfully!</p>
        </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

function updateLoginUI() {
    const desktopLoginLink = document.getElementById("nav-login-btn");
    const mobileLoginLink = document.getElementById("mobile-login-btn");
    
    const isLoggedIn = localStorage.getItem("fastmart_logged_in") === "true";
    const username = localStorage.getItem("fastmart_username") || "User";

    if (isLoggedIn) {
        if (desktopLoginLink) {
            desktopLoginLink.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout (${username})`;
            desktopLoginLink.href = "#";
            desktopLoginLink.onclick = (e) => {
                e.preventDefault();
                performLogout();
            };
        }
        if (mobileLoginLink) {
            mobileLoginLink.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout (${username})`;
            mobileLoginLink.href = "#";
            mobileLoginLink.onclick = (e) => {
                e.preventDefault();
                performLogout();
            };
        }
    } else {
        if (desktopLoginLink) {
            desktopLoginLink.innerHTML = "Login / Register";
            desktopLoginLink.href = "login.html";
            desktopLoginLink.onclick = null;
        }
        if (mobileLoginLink) {
            mobileLoginLink.innerHTML = "Login / Register";
            mobileLoginLink.href = "login.html";
            mobileLoginLink.onclick = null;
        }
    }
}


// ============= CARD INITIALIZER =============
// Dynamically initializes card structures and injects structured action buttons
function initializeProductCards() {
    cards.forEach(card => {
        const titleEl = card.querySelector("h3");
        if (!titleEl) return;
        const title = titleEl.innerText;

        const imgEl = card.querySelector("img");
        const image = imgEl ? imgEl.src : "";

        // Extract and format numerical prices accurately
        const priceEl = card.querySelector(".price");
        const priceText = priceEl ? priceEl.innerText : "₹40"; // Default baseline
        
        // Split by '/' first to isolate price from suffix quantities (e.g., "₹250/100g" -> "₹250")
        const pricePart = priceText.split('/')[0];
        const priceValue = parseFloat(pricePart.replace(/[^0-9.]/g, '')) || 40;

        // If card does not have a price label (e.g. today's items), add one automatically
        if (!priceEl) {
            const detailsEl = card.querySelector(".details") || card.querySelector(".p6-details");
            if (detailsEl) {
                const newPrice = document.createElement("p");
                newPrice.className = "price";
                newPrice.innerText = `₹${priceValue}`;
                detailsEl.appendChild(newPrice);
            }
        }

        // Dynamically inject user-interactive star ratings
        injectRatingSystem(card, title);

        // Bind interactive Details Modal open listener to Card clicks
        card.addEventListener("click", (e) => {
            // Bypass trigger if user clicked cart button, details view button, or stars
            if (e.target.closest(".small-cart-btn") || e.target.closest(".small-view-btn") || e.target.closest(".star")) {
                return;
            }
            openProductModal(title, priceValue, image, card);
        });

        // Dynamically insert Details/Quick-View overlay buttons
        if (!card.querySelector(".small-view-btn")) {
            const viewBtn = document.createElement("button");
            viewBtn.className = "small-view-btn";
            viewBtn.title = "View Details";
            viewBtn.innerHTML = `<i class="fas fa-eye"></i>`;

            viewBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent duplicate card click triggers
                openProductModal(title, priceValue, image, card);
            });

            card.appendChild(viewBtn);
        }

        // Dynamically insert Add-To-Cart overlay buttons
        if (!card.querySelector(".small-cart-btn")) {
            const btn = document.createElement("button");
            btn.className = "small-cart-btn";
            btn.title = "Add to Cart";
            btn.innerHTML = `<i class="fas fa-shopping-cart"></i>`;

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(title, priceValue, image);
            });

            card.appendChild(btn);
        }
    });
}

// Fire initializations on DOM content load
document.addEventListener("DOMContentLoaded", () => {
    initializeProductCards();
    updateCartUI(); // Restore cart display on load
    updateLoginUI(); // Synchronize global login session links on load
});
