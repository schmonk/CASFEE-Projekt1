const defaultTasks = [
  {
    id: '01', title: 'Go for a run', dueDate: '22.6.2023', creationDate: '15.6.2023', description: 'Description', importance: 1, completion: false,
  },
  {
    id: '02', title: 'Bring hamster to yoga class', dueDate: '29.6.2023', creationDate: '15.6.2023', description: 'Bring yoga mat', importance: 5, completion: false,
  },
  {
    id: '03', title: 'Create default tasks', dueDate: '29.6.2023', creationDate: '15.6.2023', description: 'With some permutations', importance: 2, completion: true,
  },
];

function compareTasks(task1, task2) {
  return task2.creationDate - task1.creationDate;
}

function testFn(message) {
  console.log(message);
}

function tasksSorted() {
  return defaultTasks;
  // return [...defaultTasks].sort(compareTasks);
}

/* function findSong(id) {
  return defaultTasks.find((song) => parseInt(id, 10) === parseInt(song.id, 10));
} */

/* function rateSong(songId, delta) {
  console.log('sorting songs for you');
  const song = findSong(songId);

  if (song) {
    song.rating += delta;
    return true;
  }
  return false;
} */

export default { tasksSorted, compareTasks, testFn };
