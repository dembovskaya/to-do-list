import { Task } from "../components/main/components/task";
import isTomorrow from 'date-fns/isTomorrow';
import isToday from 'date-fns/isToday';
import { now } from "jquery";

function getColumn(deadlineUnix) {
    const deadline = new Date(deadlineUnix);
		const now = new Date();
		now.setHours(0,0,0,0);

    let column;

    if (isToday(deadline)) {
      column = 'today';
    } else if (isTomorrow(deadline)) {
      column = 'tomorrow';
    } else column = 'other';

    return column;
}

export function removeDatepicker() {
  document.getElementById('ui-datepicker-div')?.remove();
}

export function addTask(e) {
  const title = document.querySelector('.title')?.value;
  const description = document.querySelector('.description')?.value;
  const deadline = document.querySelector('.deadline')?.getAttribute('deadline');
  const status = document.querySelector('.status')?.value;

  removeDatepicker();
  document.querySelector('.modal')?.remove();

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
      body: JSON.stringify({
        status: status,
        title: title,
        content: description,
        deadline: deadline
      }),
      headers: {
        'Content-Type': 'application/json'
      }
  }).then(res => res.json())
    .then(task => {
      
      const columnTitle = getColumn(+task.deadline);
      const column = document.querySelector(`.task-${columnTitle}`);
      const newTask = Task({
        taskStatus: task.status,
        taskTitle: task.title,
        taskText: task.content,
        taskId: task._id,
        taskDeadline: task.deadline
      })
      column.append(newTask);
    });

}

export function removeTask(id) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(removedId => {
			document.querySelector(`[data-id="${id}"]`)?.remove();
			document.querySelector('.modal')?.remove();
  })
}

export function editTask(e) {
  const id = e.target.dataset.id;
  const modalBody = document.querySelector('.modal-body');
  const title = modalBody.querySelector('.title').value;
  const description = modalBody.querySelector('.description').value;
  const status = modalBody.querySelector('.status').value;
  const deadline = +modalBody.querySelector('.deadline')?.getAttribute('deadline');

	fetch(`http://localhost:3000/tasks/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    status: status,
    title: title,
    content: description,
    deadline: deadline
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(task => {
  const { title, content, status, deadline } = task;

  const columnTitle = getColumn(+task.deadline);
  const column = document.querySelector(`.task-${columnTitle}`);

  const taskCard = document.querySelector(`.a-task[data-id="${id}"]`);
  const titleTaskCard = taskCard.querySelector('.a-task-title');
  const descriptionTaskCard = taskCard.querySelector('.a-task-description');
  const statusTaskCard = taskCard.querySelector('.a-task-status');
  const deadlineTaskCard = taskCard.querySelector('.a-task-deadline');

  titleTaskCard.textContent = title;
  descriptionTaskCard.textContent = content;
  statusTaskCard.textContent = status;
  deadlineTaskCard.textContent = new Date(deadline).toDateString();

  column.append(taskCard);
  document.getElementById('ui-datepicker-div')?.remove();
  document.querySelector('.modal')?.remove();
})
}

export function getAllTasks(queryParams) {
  const { deadline, q } = queryParams;
  if (deadline) {
    return fetch(`http://localhost:3000/tasks?deadline=${deadline}`).then(res => res.json());
  } else if (q) {
    const childs = {
      today: [],
      expired: [],
      tomorrow: [],
      other: []
    }

    return fetch(`http://localhost:3000/tasks?q=${q}`).then(res => res.json())

      .then(tasks => {
        tasks.forEach(task => {
          const columnType = getColumn(+task.deadline);
          const newTask = Task({
            taskStatus: task.status,
            taskTitle: task.title,
            taskText: task.content,
            taskId: task._id,
            taskDeadline: task.deadline
          })
          childs[columnType].push(newTask);
        });

        Object.keys(childs).forEach(columnType => {
          const column = document.querySelector(`.task-${columnType}`);
          const title = column.querySelector(`.task-${columnType}-title`);
          column.replaceChildren(...childs[columnType]);
          column.prepend(title);
        });

      })
  } else {
    return fetch('http://localhost:3000/tasks').then(res => res.json())
      .then(tasks => {
        tasks.forEach(task => {
          const columnTitle = getColumn(+task.deadline);
          const column = document.querySelector(`.task-${columnTitle}`);
          const newTask = Task({
            taskStatus: task.status,
            taskTitle: task.title,
            taskText: task.content,
            taskId: task._id,
            taskDeadline: task.deadline
          })
          column.append(newTask);
        });
      });
  }

}
