const compareAsc = require('date-fns/compareAsc');
const isToday = require('date-fns/isToday');
const isTomorrow = require('date-fns/isTomorrow');
const differenceInCalendarDays = require('date-fns/differenceInCalendarDays');
const {
    db
} = require('./db.js');
const ObjectId = require('mongodb').ObjectId
const database = db();

function compareExpired(deadline) {
    const now = new Date();
    now.setHours(0,0,0,0);

    const deadlineDate = new Date(deadline);

    return compareAsc(deadlineDate, now) === -1;
}

function compareOthers(deadline) {
    const now = new Date();
    now.setHours(0,0,0,0);

    const deadlineDate = new Date(deadline);

    return differenceInCalendarDays(deadlineDate, now) > 1;
}

async function getTasks(req, res) {
    const {
        q,
        deadline
    } = req.query;
    const tasks = (await database).collection('tasks');
    tasks.find({}).toArray((err, result) => {
        if (err) {
            return res.status(400);
        } else if (q) {
            return res.status(200).json(result.filter(task => task.title.toLowerCase().includes(q.toLowerCase())));
        } else if (deadline) {
            switch(deadline) {
                case 'expired':
                    return res.status(200).json(result.filter(task => compareExpired(+task.deadline)));
                case 'today':
                    return res.status(200).json(result.filter(task => isToday(new Date(+task.deadline))));
                case 'tomorrow':
                    return res.status(200).json(result.filter(task => isTomorrow(new Date(+task.deadline))));
                case 'other':
                    return res.status(200).json(result.filter(task => compareOthers(+task.deadline)));
            }
        } else

            return res.status(200).json(result.sort((nextTask, prevTask) => prevTask.creationDate - nextTask.creationDate));
    });
}

async function getOneTask(req, res) {
    const {
        id
    } = req.params;
    const tasks = (await database).collection('tasks');

    tasks.find({}).toArray((err, result) => {
        if (err) {
            res.status(400);
        };

        res.status(200).json(result.filter(task => '' + task['_id'] === id));
    });
}

async function deleteOneTask(req, res) {
    const {
        id
    } = req.params;
    const task = {
        _id: ObjectId(id)
    };
    const tasks = (await database).collection('tasks');

    tasks.deleteOne(task, (err, result) => {
        if (err) {
            res.status(400);
        };

        res.status(200).json(id);
    });

}

async function updateTask(req, res) {
    const {
        id
    } = req.params;
    const task = {
        _id: ObjectId(id)
    };

    const bodyParams = Object.assign({}, req.body, task);
    const newValues = {
        $set: bodyParams
    };

    const tasks = (await database).collection('tasks');

    tasks.updateOne(task, newValues, (err, result) => {
        if (err) {
            res.status(400);
        };

        res.status(200).json(newValues.$set);
    });
}

async function newTask(req, res) {
    console.log(req.body);
    const task = Object.assign({}, req.body, {
        creationDate: Date.now(),
    });
    console.log(task);
    console.log(typeof task.deadline);
    const tasks = (await database).collection('tasks');

    task.deadline = +task.deadline;
    tasks.insertOne(task, (err, result) => {
        if (err) {
            res.status(400);
        };

        res.status(200).json(task);
    });
}

module.exports = {
    getTasks,
    getOneTask,
    deleteOneTask,
    updateTask,
    newTask
};
