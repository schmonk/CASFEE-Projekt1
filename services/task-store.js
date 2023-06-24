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
    // console.log(`!TStore Delete this ID: ${id}`);
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

  async all(sortingType, ascendingTrue, filteringTrue) {
    /*     function sortByKey(array, key, isAscending) {
        return array.sort((a, b) => {
            const x = a[key];
            const y = b[key];
            const sortingDirection = isAscending ? 1 : -1;
            if (x < y) {
            return -1 * sortingDirection;
            }
            if (x > y) {
            return 1 * sortingDirection;
            }
            return 0;
        });
        } */

    console.log(
      `TStore: sortType: ${sortingType}, ascending is: ${ascendingTrue}, filtering is: ${filteringTrue}`
    );
    const sortingDirection = ascendingTrue ? 1 : -1;
    // console.log(`TStore sorting Type: ${sortingType}`);
    // console.log(`TStore sorting Direction: ${ascendingTrue}`);
    // return this.db.find({ }).sort({ sortingType: +ascendingTrue }).exec();
    // return this.db.find({ state: { $ne: "DELETED" }} ).sort({ title: +1 }).exec(); // returns all except those that are deleted
    /*     const sortOptions = ;
    const findOptions = ; */
    // .find({ state: { $ne: "DELETED" } }) // returns all that do not include "DELETED"
    // .find({completion: "false"}) // all that are open
    return this.db.find({}).sort({ title: sortingDirection }).exec();
  }
}

export const taskStore = new TaskStore();
