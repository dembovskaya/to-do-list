import { getAllTasks } from '../../../../services/helpers';
import { Task } from '../task/component';
import styles from '../../styles.module.scss';

export function TasksExpired() {
  const tasksExpired = document.createElement('div');
  const tasksExpiredTitle = document.createElement('div');
  const tasksExpiredTitleText = document.createElement('span');
  const tasksExpiredColumn = document.createElement('div');

  tasksExpiredTitleText.textContent = 'expired';

  tasksExpired.classList.add('task-expired', styles.tasksSection);
  tasksExpiredTitle.classList.add('task-expired-title', styles.tasksTitle);
  tasksExpiredColumn.classList.add('tasks-expired-column');

  getAllTasks({deadline: 'expired'}).then(tasks => {
    tasks.forEach(task => {
      tasksExpired.append(Task({
        taskStatus: task.status,
        taskDeadline: task.deadline,
        taskTitle: task.title,
        taskText: task.content,
        taskId: task._id
      }))
    })
  }).catch(console.error);

  tasksExpired.append(tasksExpiredTitle, tasksExpiredColumn);
  tasksExpiredTitle.append(tasksExpiredTitleText);

  return tasksExpired;
}
