import Datastore from 'nedb-promises'

export class Task {
    constructor(task) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.dueDate = task.dueDate;
        this.creationDate = new Date();
        this.completion = false;
        this.state = "OK";
    }
}

export class TaskStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/orders.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async add(task) {
        let task = new Task(task);
        return this.db.insert(order);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return this.get(id);
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async all(currentUser) {
        return this.db.find({orderedBy : currentUser}).sort({ orderDate: -1 }).exec();
    }
}

export const taskStore = new TaskStore();
