import { Icon, IconTypes } from '../../../base/icon';
import { openModalToEditTask } from '../../../header/helpers';
import { ModalToDeleteTask } from './helpers';
import styles from './styles.module.scss';
import styles2 from '../../../base/status/styles.module.scss';

export function Task({
  taskStatus,
  taskTitle,
  taskDeadline,
  taskText = '',
  taskId
}) {
  const task = document.createElement('div');
  const taskStatusElem = document.createElement('div');
  const taskTitleElem = document.createElement('h5');
  const taskDeadlineElem = document.createElement('p');
  const taskTextElem = document.createElement('p');
  const titleContainer = document.createElement('div');
  const deadlineContainer= document.createElement('div');
  const deadline = new Date(+taskDeadline);

  const statusSwitch = {
    'to do': styles2.taskToDo,
    'in progress': styles2.taskInProgress,
    'done': styles2.taskDone,
    'important': styles2.taskImportant
  }

  const editIcon = Icon({
    type: IconTypes.Edit,
    clickHandler: openModalToEditTask.bind(
      this, {
      taskStatus,
      taskTitle,
      taskDeadline,
      taskText,
      taskId
    })
  });
  const banIcon = Icon({
    type: IconTypes.Ban,
    clickHandler: ModalToDeleteTask.bind(
      this,
      taskId
    )
  });

  taskDeadlineElem.textContent = deadline.toDateString();
  taskTitleElem.textContent = taskTitle;
  taskStatusElem.textContent = taskStatus;
  taskTextElem.textContent = taskText;

  task.setAttribute('data-id', taskId);
  task.classList.add('a-task', styles.task);
  taskTitleElem.classList.add('a-task-title', styles.title);
  taskTextElem.classList.add('a-task-description', styles.text);
  taskStatusElem.classList.add('a-task-status', styles.status);
  taskDeadlineElem.classList.add('a-task-deadline', styles.deadline);

  editIcon.classList.add('edit', styles.edit);
  banIcon.classList.add('ban', styles.ban);
  titleContainer.classList.add(styles.titleContainer, 'title-container');
  deadlineContainer.classList.add(styles.deadlineContainer, 'deadline-container');

  task.classList.add(statusSwitch[taskStatus]);

  titleContainer.append(
    taskStatusElem,
    editIcon
  );
  deadlineContainer.append(
    taskDeadlineElem,
    banIcon
  )
  task.append(
    titleContainer,
    deadlineContainer,
		taskTitleElem,
		taskTextElem
  );

  return task;
}
