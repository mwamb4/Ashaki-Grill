const menuItems = [

    {
        id: "beef-choma",
        name: "Beef Choma",
        price: 750,
        category: "grill",
        description: "Tender beef grilled over charcoal with a smoky finish.",
        image: "https://foreignfork.com/wp-content/uploads/2023/08/Nyama-Choma-17.jpg"
    },

    {
        id: "goat-choma",
        name: "Goat Choma",
        price: 850,
        category: "grill",
        description: "Kenyan-style grilled goat meat served with a smoky char.",
        image: "https://images.squarespace-cdn.com/content/v1/52e82a99e4b0a93ab69383f5/1488132186660-A9MZAZCOHSEY0Z61YW8O/image-asset.jpeg"
    },

    {
        id: "grilled-chicken",
        name: "Grilled Chicken",
        price: 650,
        category: "chicken",
        description: "Juicy grilled chicken served with a golden roasted finish.",
        image: "https://casnigir.com/uploads/urunler/8cb1609a288447fa88686edfa81a4ab6.webp"
    },

    {
        id: "chicken-wings",
        name: "Chicken Wings",
        price: 500,
        category: "chicken",
        description: "Grilled chicken wings with a delicious smoky glaze.",
        image: "https://igrovyeavtomaty.org/wp-content/uploads/2022/03/grilled-chicken-wings.jpg"
    },

    {
        id: "beef-pilau",
        name: "Beef Pilau",
        price: 450,
        category: "sides",
        description: "Fragrant Kenyan spiced rice cooked with tender beef.",
        image: "https://afrotools.com/assets/img/kitchen/kenyan-pilau.webp"
    },

    {
        id: "loaded-fries",
        name: "Loaded Fries",
        price: 450,
        category: "sides",
        description: "Golden crispy fries loaded with savoury toppings.",
        image: "https://panpatriot.com/assets/images/1759925646183-0JOS1Tve.webp"
    },

    {
        id: "nyama-fries",
        name: "Nyama Fries",
        price: 550,
        category: "sides",
        description: "Golden fries served together with seasoned grilled meat.",
        image: "https://pbs.twimg.com/media/DBydh--XoAAXmME.jpg"
    },

    {
        id: "fresh-orange-juice",
        name: "Fresh Orange Juice",
        price: 180,
        category: "drinks",
        description: "Freshly squeezed orange juice served chilled.",
        image: "https://orders.wagshals.com/cdn/shop/products/ORANGEJUICESSLOW_4413f4c1-97aa-43de-8165-0b10cbede4ec.jpg?v=1624378758"
    },

    {
        id: "cold-soda",
        name: "Cold Soda",
        price: 100,
        category: "drinks",
        description: "A chilled refreshing carbonated soft drink.",
        image: "https://images.unsplash.com/photo-1617814192855-5bd13c3f0977?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMzfHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=80&w=900"
    }

];


let cartItems = [];


const menuGrid = document.getElementById("menuGrid");
const cart = document.getElementById("cart");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const notification = document.getElementById("notification");


function displayMenu(category = "all") {

    menuGrid.innerHTML = "";

    const items = category === "all"
        ? menuItems
        : menuItems.filter(item => item.category === category);


    items.forEach(item => {

        const card = document.createElement("article");

        card.className = "menu-card";

        card.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy"
            >

            <div class="menu-info">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <div class="menu-bottom">

                    <strong>KSh ${item.price}</strong>

                    <button
                        class="menu-add"
                        data-id="${item.id}"
                    >
                        Add
                    </button>

                </div>

            </div>
        `;

        menuGrid.appendChild(card);

    });

}


function addToCart(id) {

    const item = menuItems.find(
        product => product.id === id
    );

    if (!item) return;


    const existingItem = cartItems.find(
        product => product.id === id
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cartItems.push({
            ...item,
            quantity: 1
        });

    }


    updateCart();

    showNotification(`${item.name} added to cart`);

}


function changeQuantity(id, amount) {

    const item = cartItems.find(
        product => product.id === id
    );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cartItems = cartItems.filter(
            product => product.id !== id
        );

    }


    updateCart();

}


function updateCart() {

    cartItemsContainer.innerHTML = "";


    if (cartItems.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div>🍽️</div>
                <h3>Your cart is empty</h3>
                <p>Add something delicious from our menu.</p>
            </div>
        `;

    } else {

        cartItems.forEach(item => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div>

                    <h4>${item.name}</h4>

                    <p>
                        KSh ${item.price * item.quantity}
                    </p>

                </div>

                <div class="quantity">

                    <button
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>

            `;

            cartItemsContainer.appendChild(cartItem);

        });

    }


    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    cartCount.textContent = totalItems;

    cartTotal.textContent = `KSh ${totalPrice}`;

}


function openCart() {

    cart.classList.add("open");

    cartOverlay.classList.add("open");

    document.body.style.overflow = "hidden";

}


function closeCartPanel() {

    cart.classList.remove("open");

    cartOverlay.classList.remove("open");

    document.body.style.overflow = "";

}


function showNotification(message) {

    notification.textContent = message;

    notification.classList.add("show");


    setTimeout(() => {

        notification.classList.remove("show");

    }, 1800);

}


menuGrid.addEventListener("click", event => {

    const button = event.target.closest(".menu-add");

    if (!button) return;

    addToCart(button.dataset.id);

});


document.querySelectorAll(".category").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".category")
            .forEach(btn => {
                btn.classList.remove("active");
            });


        button.classList.add("active");

        displayMenu(button.dataset.category);

    });

});


cartItemsContainer.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) return;


    const id = button.dataset.id;


    if (button.dataset.action === "plus") {

        changeQuantity(id, 1);

    }


    if (button.dataset.action === "minus") {

        changeQuantity(id, -1);

    }

});


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


checkoutButton.addEventListener(
    "click",
    () => {

        if (cartItems.length === 0) {

            showNotification("Your cart is empty");

            return;
        }


        const total = cartItems.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


        showNotification(
            `Order total: KSh ${total}`
        );

    }
);


displayMenu();

updateCart();
