import { getAllTasks } from '../../../../services/helpers';
import { Task } from '../task/component';
import styles from '../../styles.module.scss';

export function TasksTomorrow() {
  const tasksTomorrow = document.createElement('div');
  const tasksTomorrowTitle = document.createElement('div');
  const tasksTomorrowTitleText = document.createElement('span');
  const tasksTomorrowColumn = document.createElement('div');

  tasksTomorrowTitleText.textContent = 'tomorrow';

  tasksTomorrow.classList.add('task-tomorrow', styles.tasksSection);
  tasksTomorrowTitle.classList.add('task-tomorrow-title', styles.tasksTitle);
  tasksTomorrowColumn.classList.add('tasks-tomorrow-column'); 

  getAllTasks({deadline: 'tomorrow'}).then(tasks => {
    tasks.forEach(task => {
      tasksTomorrow.append(Task({
        taskStatus: task.status,
        taskDeadline: task.deadline,
        taskTitle: task.title,
				taskText: task.content,
        taskId: task._id
      }))
		})
  }).catch(console.error);

  tasksTomorrow.append(tasksTomorrowTitle, tasksTomorrowColumn);
  tasksTomorrowTitle.append(tasksTomorrowTitleText);

  return tasksTomorrow;
}
