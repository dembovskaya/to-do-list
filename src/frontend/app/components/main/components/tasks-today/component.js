import { getAllTasks } from '../../../../services/helpers';
import { Task } from '../task/component';
import styles from '../../styles.module.scss';

export function TasksToday() {
  const tasksToday = document.createElement('div');
  const tasksTodayTitle = document.createElement('div');
  const tasksTodayTitleText = document.createElement('span');

  tasksTodayTitleText.textContent = 'today';

  tasksToday.classList.add('task-today', styles.tasksSection);
  tasksTodayTitle.classList.add('task-today-title', styles.tasksTitle);

  getAllTasks({deadline: 'today'}).then(tasks => {
    tasks.forEach(task => {
      tasksToday.append(Task({
        taskStatus: task.status,
        taskDeadline: task.deadline,
        taskTitle: task.title,
        taskText: task.content,
        taskId: task._id
      }))
    })
  }).catch(console.error);

  tasksToday.append(tasksTodayTitle);
  tasksTodayTitle.append(tasksTodayTitleText);

  return tasksToday;
}
