document.addEventListener("DOMContentLoaded", function () {
    // Create an empty cart array
    const cart = [];

    // Fetch the JSON data
    fetch("product.json")
        .then((response) => response.json())
        .then((data) => {
            const menuCards = document.getElementById("menuCards");

             // Create an empty cart array
             const cart = [];

            // Function to add an item to the cart
            function addItemToCart(id, nama, harga, foto, quantity) {
                // Check if the item with the same ID already exists in the cart
                const existingItem = cart.find((item) => item.id === id);

                if (existingItem) {
                    // Update the quantity if the item exists
                    existingItem.quantity += quantity;
                } else {
                    // Add a new item to the cart
                    cart.push({ id, nama, harga, foto, quantity });
                }

                // Render the cart
                renderCart();
            }

            // Function to calculate the total price of all items in the cart
            function calculateTotalPrice() {
                let totalPrice = 0;
                cart.forEach((item) => {
                    const totalItemPrice = item.harga * item.quantity;
                    totalPrice += totalItemPrice;
                });
                return totalPrice;
            }

            // Function to calculate the total tax of all items in the cart
            function calculateTotalTax() {
                const totalPrice = calculateTotalPrice();
                const totalTax = totalPrice * 0.11;
                return totalTax;
            }

            function calculateTotalWithTax(harga, quantity) {
                const hargaNumber = parseInt(harga);
                const subtotal = hargaNumber * quantity;
                const tax = subtotal * 0.11;
                const total = subtotal + tax;
                return total;
            }

            function calculateSubtotal(harga, quantity) {
                const hargaNumber = parseInt(harga);
                const subtotal = hargaNumber * quantity;
                return subtotal;
            }

            // Function to render the cart items with total price and tax
            function renderCart() {
                const cartItemsContainer = document.getElementById("cartItems");
                const totalContainer = document.getElementById("totalPrice");
                const taxContainer = document.getElementById("taxPrice");
                const subtotalContainer = document.getElementById("subtotalPrice");

                cartItemsContainer.innerHTML = ""; // Clear previous cart items

                let totalPrice = 0;
                let totalTax = 0;
                let subtotal = 0;
                cart.forEach((item) => {
                    const cartItem = document.createElement("div");
                    cartItem.classList.add("col-md-3", "mb-4");

                    const totalItemPrice = calculateTotalWithTax(item.harga, item.quantity);
                    totalPrice += totalItemPrice;
                    subtotal += calculateSubtotal(item.harga, item.quantity);
                    cartItem.innerHTML = `
                        <div class="card">
                            <img src="${item.foto}" class="card-img-top" alt="${item.nama}">
                            <div class="card-body">
                                <h5 class="card-title">${item.nama}</h5>
                                <p class="card-text">Harga: ${item.harga}</p>
                                <p class="card-text">Quantity: ${item.quantity}</p>
                            </div>
                        </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });

                // Calculate total tax
                totalTax = calculateTotalTax();
                // Function to format a number as Indonesian Rupiah (Rp.) currency
                function formatAsRupiah(number) {
                    const formatter = new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                    });
                    return formatter.format(number);
                }
                // Display the total price and tax separately
                subtotalContainer.textContent = `Total Price (Before Tax): ${formatAsRupiah(subtotal)}`;
                taxContainer.textContent = `Tax Price (11% tax): ${formatAsRupiah(totalTax)}`;
                totalContainer.textContent = `Total Price: ${formatAsRupiah(totalPrice)}`;
            }

            // Loop through the JSON data and create Bootstrap cards
            data.forEach((item, index) => {
                // Create a new row for every four cards
                if (index % 4 === 0) {
                    const row = document.createElement("div");
                    row.classList.add("row");
                    menuCards.appendChild(row);
                }

                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4");

                card.innerHTML = `
                    <div class="card">
                        <img src="${item.foto}" class="card-img-top" alt="${item.nama}">
                        <div class="card-body">
                            <h5 class="card-title">${item.nama}</h5>
                            <p class="card-text">${item.harga}</p>
                            <div class="input-group mb-3">
                                <button class="btn btn-outline-secondary decreaseButton" type="button">-</button>
                                <input type="text" class="form-control totalBeli" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" value="0">
                                <button class="btn btn-outline-secondary increaseButton" type="button">+</button>
                            </div>
                            <button type="button" class="btn btn-success addItemButton">Add Items</button>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                menuCards.lastChild.appendChild(card);
                const subtotalContainer = document.createElement("div");
                subtotalContainer.id = "subtotalPrice";
                subtotalContainer.classList.add("col-md-12", "mt-3", "mx-5","text-start");
                document.querySelector("body").appendChild(subtotalContainer);

                const taxContainer = document.createElement("div");
                taxContainer.id = "taxPrice";
                taxContainer.classList.add("col-md-12" ,"mt-3", "mx-5", "text-start");
                document.querySelector("body").appendChild(taxContainer);

                const totalContainer = document.createElement("div");
                totalContainer.id = "totalPrice";
                totalContainer.classList.add("col-md-12", "mt-3", "mx-5","text-start");
                document.querySelector("body").appendChild(totalContainer);

                // Find the quantity input element and buttons within the card
                const quantityInput = card.querySelector(".totalBeli");
                const increaseButton = card.querySelector(".increaseButton");
                const decreaseButton = card.querySelector(".decreaseButton");
                const addItemButton = card.querySelector(".addItemButton");

                // Add event listeners to the buttons
                increaseButton.addEventListener("click", function () {
                    let currentValue = parseInt(quantityInput.value);
                    quantityInput.value = currentValue + 1;
                });

                decreaseButton.addEventListener("click", function () {
                    let currentValue = parseInt(quantityInput.value);
                    if (currentValue > 0) {
                        quantityInput.value = currentValue - 1;
                    } else {
                        alert("Tidak bisa memilih barang kurang dari 0");
                    }
                });

                // Add an event listener to the "Add Items" button
                addItemButton.addEventListener("click", function () {
                    const id = item.id;
                    const nama = item.nama;
                    const harga = item.harga;
                    const foto = item.foto;
                    const quantity = parseInt(quantityInput.value);

                    if (quantity > 0) {
                        addItemToCart(id, nama, harga, foto, quantity);
                        alert(`${quantity} ${nama} telah ditambahkan ke keranjang.`);
                    } else {
                        alert("Tidak ada barang yang ditambahkan ke keranjang.");
                    }
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching JSON data:", error);
        });
});
