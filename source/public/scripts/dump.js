/* function renderTask(key) {
  const retrievedTask = localStorage.getItem(key.toString());
  const parsedTask = JSON.parse(retrievedTask);
  taskList.insertAdjacentHTML(
    'beforeend',
    `<article id="${parsedTask.id}" class="task-container
     ${(parsedTask.completion) ? 'completed' : ''}">
      <input type="checkbox" name="completion" class="taskCheckbox"
       ${(parsedTask.completion) ? 'checked' : ''}/>
      <div class="task-content">
      <h3 class="task-title">${parsedTask.title}</h3>
      <p class="task-description">${parsedTask.description}</p>
      </div>
      <p class="task-due-date">Due ${parsedTask.dueDate}</p>
      <p class="task-created-date" >Created ${parsedTask.dueDate}</p>
      <p >Importance: <span class="task-importance">${parsedTask.importance}</span></p>
      <div class="buttongroup">
      <button class="btn task-delete">Delete</button>
      <button class="btn task-edit">Edit</button>
      </div>
      </article>`,
  );
}

function loopExistingLocalStorageKeys() {
  for (let i = 0; i < localStorage.length; i += 1) {
    const myKey = localStorage.key(i);
    if (myKey.toString().at(0) === 'z') {
      renderTask((myKey));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // loopExistingLocalStorageKeys();
});

*/
