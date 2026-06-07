/* =========================
   CARRITO LOCAL STORAGE
========================= */

let cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];

/* =========================
   BOTONES AÑADIR
========================= */

const buttons =
document.querySelectorAll(".add-cart");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
        button.dataset.name;

        const price =
        Number(button.dataset.price);

        const existing =
        cart.find(
            item => item.name === name
        );

        if(existing){

            existing.quantity++;

        }else{

            cart.push({
                name,
                price,
                quantity:1
            });

        }

        saveCart();

        showNotification(
            `${name} añadido al carrito`
        );

    });

});

/* =========================
   GUARDAR
========================= */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCounter();

}

/* =========================
   CONTADOR
========================= */

function updateCounter(){

    const counter =
    document.getElementById(
        "cart-count"
    );

    if(!counter) return;

    let totalItems = 0;

    cart.forEach(item => {

        totalItems +=
        item.quantity;

    });

    counter.textContent =
    totalItems;
}

/* =========================
   NOTIFICACIÓN
========================= */

function showNotification(message){

    const notification =
    document.createElement("div");

    notification.classList.add(
        "notification"
    );

    notification.textContent =
    message;

    document.body.appendChild(
        notification
    );

    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    },100);

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

        setTimeout(() => {

            notification.remove();

        },300);

    },2500);

}

/* =========================
   INICIAR
========================= */

updateCounter();