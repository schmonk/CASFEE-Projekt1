import { orderService } from '../services/order-service.js'

const orderContainer = document.querySelector("#orderContainer");
const orderRenderer = Handlebars.compile(document.querySelector("#order-template").innerHTML);

async function renderOrder() {
    orderContainer.innerHTML = orderRenderer(await orderService.getOrder(orderId))
}

orderContainer.addEventListener("click", async event => {
    if (event.target.classList.contains("js-delete")) {
        await orderService.deleteOrder(event.target.dataset.id);
        renderOrder()
    }
});

renderOrder();