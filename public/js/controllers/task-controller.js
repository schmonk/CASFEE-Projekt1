/* import { taskService } from '../services/task-service.js'

const orderContainer = document.querySelector("#orderContainer");
const orderRenderer = Handlebars.compile(document.querySelector("#order-template").innerHTML);

async function renderTask() {
    orderContainer.innerHTML = orderRenderer(await taskService.getOrder(orderId))
}

orderContainer.addEventListener("click", async event => {
    if (event.target.classList.contains("js-delete")) {
        await taskService.deleteOrder(event.target.dataset.id);
        renderTask()
    }
});

renderTask(); */
