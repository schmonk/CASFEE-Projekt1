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
    // await this.db.remove({ _id: id });
    return this.get(id);
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async update(id, title, description, dueDate, creationDate, completion, importance) {
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
    let sortingDirection = ascending === "true" ? -1 : 1;
    let sorting = {};
    sorting[sortingType] = sortingDirection;

    let completed = filtering === "false" ? true : false;

    console.log("filtering is :", filtering, " type:", typeof filtering);
    // console.log("completed is :", completed, " type:", typeof completed);
    // console.log("filter: ", filter);
    return (
      this.db
        // .find(filter)
        // .find({ $and: [{ "state": { $ne: "DELETED" } }, { "completion": { $ne: completed } }] })
        .find({
          $and: [{ "state": { $ne: "DELETED" } }, { "completion": { $ne: completed } }],
        })
        // .find({ $not: filter })
        .sort(sorting)
        .exec()
    );
  }
}

export const taskStore = new TaskStore();
