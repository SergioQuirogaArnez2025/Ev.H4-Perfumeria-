/* =========================
   CARRITO
========================= */

let cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];

/* =========================
   ELEMENTOS
========================= */

const cartItems =
document.getElementById("cart-items");

const totalElement =
document.getElementById("total");

/* =========================
   RENDER
========================= */

function renderCart(){

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `
            <p>
                Tu carrito está vacío.
            </p>
        `;

        totalElement.textContent = "0";

        return;
    }

    cart.forEach((item,index)=>{

        const subtotal =
        item.price *
        item.quantity;

        total += subtotal;

        const article =
        document.createElement("article");

        article.classList.add(
            "cart-item"
        );

        article.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Precio: $${item.price}
                </p>

                <p>
                    Subtotal: $${subtotal}
                </p>

            </div>

            <div class="cart-controls">

                <button
                onclick="decrease(${index})">

                -

                </button>

                <span>

                    ${item.quantity}

                </span>

                <button
                onclick="increase(${index})">

                +

                </button>

                <button
                onclick="removeItem(${index})">

                🗑

                </button>

            </div>

        `;

        cartItems.appendChild(
            article
        );

    });

    totalElement.textContent =
    total;

    saveCart();
}

/* =========================
   GUARDAR
========================= */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

/* =========================
   AUMENTAR
========================= */

function increase(index){

    cart[index].quantity++;

    renderCart();
}

/* =========================
   DISMINUIR
========================= */

function decrease(index){

    cart[index].quantity--;

    if(
        cart[index].quantity <= 0
    ){

        cart.splice(index,1);

    }

    renderCart();
}

/* =========================
   ELIMINAR
========================= */

function removeItem(index){

    cart.splice(index,1);

    renderCart();
}

/* =========================
   VACIAR
========================= */

document
.getElementById("clear-cart")
.addEventListener(
"click",
() => {

    const confirmDelete =
    confirm(
        "¿Deseas vaciar el carrito?"
    );

    if(confirmDelete){

        cart = [];

        saveCart();

        renderCart();
    }

});
/* =========================
   COMPRA
========================= */

document
.getElementById("checkout-form")
.addEventListener(
"submit",
function(e){

    e.preventDefault();

    if(cart.length === 0){

        alert(
            "Tu carrito está vacío."
        );

        return;
    }

    const nombre =
    document
    .getElementById("nombre")
    .value
    .trim();

    const correo =
    document
    .getElementById("correo")
    .value
    .trim();

    const telefono =
    document
    .getElementById("telefono")
    .value
    .trim();

    const direccion =
    document
    .getElementById("direccion")
    .value
    .trim();

    const ciudad =
    document
    .getElementById("ciudad")
    .value
    .trim();

    const pago =
    document
    .getElementById("pago")
    .value;

    if(
        !nombre ||
        !correo ||
        !telefono ||
        !direccion ||
        !ciudad ||
        !pago
    ){

        alert(
            "Por favor complete todos los campos."
        );

        return;
    }

    alert(
`¡Compra realizada con éxito!

Gracias por elegir CHANEL Fragrances.`
    );

    cart = [];

    localStorage.removeItem(
        "cart"
    );

    document
    .getElementById("checkout-form")
    .reset();

    renderCart();

});

/* =========================
   INICIAR
========================= */

renderCart();