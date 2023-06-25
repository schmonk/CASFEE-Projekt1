export default class Task {
  constructor(title, description, dueDate, creationDate, completion, importance) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.creationDate = creationDate;
    this.completion = completion;
    this.importance = importance;
  }
}
