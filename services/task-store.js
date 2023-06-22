import Datastore from 'nedb-promises';
import Task from './task.js';
export class TaskStore {
    constructor(db) {
        const options =
            process.env.DB_TYPE === 'FILE'
                ? { filename: './data/tasks.db', autoload: true }
                : {}
        this.db = db || new Datastore(options)
    }

    async add( title, description, dueDate, creationDate, completion) {
        // console.log('beeep');
        const task = new Task(title, description, dueDate, creationDate, completion);
        // console.log(this.db.insert(task));
        return this.db.insert(task);
    }

    async delete(id) {
        await this.db.update({ _id: id }, { $set: { state: 'DELETED' } })
        return this.get(id)
    }

    async get(id) {
        return this.db.findOne({ _id: id })
    }

    async all(sortingType, ascendingTrue) {

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

        console.log(`sType: ${sortingType} and ascending is: ${ascendingTrue}`);
        return this.db.find({ }).sort({ sortingType: +ascendingTrue }).exec();
    }
}

export const taskStore = new TaskStore()
