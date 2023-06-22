import Datastore from 'nedb-promises'
import Task from './task.js'
export class TaskStore {
    constructor(db) {
        const options =
            process.env.DB_TYPE === 'FILE'
                ? { filename: './data/orders.db', autoload: true }
                : {}
        this.db = db || new Datastore(options)
    }

    async add(taskTitle, taskDescription, taskDueDate, taskCreationDate, taskCompletion) {
        const task = new Task(taskTitle, taskDescription, taskDueDate, taskCreationDate, taskCompletion);
        console.log(`add task: ${task}`);
        return this.db.insert(task)
    }

    async delete(id) {
        await this.db.update({ _id: id }, { $set: { state: 'DELETED' } })
        return this.get(id)
    }

    async get(id) {
        return this.db.findOne({ _id: id })
    }

    async all(currentUser) {
        return this.db
            .find({ orderedBy: currentUser })
            .sort({ orderDate: -1 })
            .exec()
    }
}

export const taskStore = new TaskStore()
