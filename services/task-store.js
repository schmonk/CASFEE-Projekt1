import Datastore from "nedb-promises";
import Task from "./task.js";
export class TaskStore {
  constructor(db) {
    const options =
      process.env.DB_TYPE === "FILE" ? { filename: "./data/tasks.db", autoload: true } : {};
    this.db = db || new Datastore(options);
  }

  async add(title, description, dueDate, creationDate, completion, importance) {
    const task = new Task(title, description, dueDate, creationDate, completion, importance);
    return this.db.insert(task);
  }

  async delete(id) {
    await this.db.update({ _id: id }, { $set: { state: "DELETED" } });
    return this.get(id);
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async update(id, title, description, dueDate, creationDate, completion, importance) {
    console.log(`TStore update this title: ${title}`);
    try {
      await this.db.update(
        { _id: id },
        {
          "title": title,
          "description": description,
          "dueDate": dueDate,
          "creationDate": creationDate,
          "completion": completion,
          "importance": importance,
        }
      );
    } catch (error) {
      console.log(`error is: ${error}`);
    }
    return this.get(id);
  }

  async all(sortingType, ascending, filtering) {
    let sortingDirection = ascending ? -1 : 1;
    let sorting = {};
    sorting[sortingType] = sortingDirection;

    console.log("sortingType, ascending, filtering, sorting");
    console.log(sortingType, ascending, filtering, sorting);
    // .find({ state: { $ne: "DELETED" } }) // returns all that do not include "DELETED"
    // .find({completion: "false"}) // all that are open

    return this.db
      .find({ state: { $ne: "DELETED" }, completion: { $ne: filtering } })
      .sort(sorting)
      .exec();
  }
}

export const taskStore = new TaskStore();
