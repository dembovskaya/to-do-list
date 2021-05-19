import { getAllTasks } from '../../../../services/helpers';
import { Task } from '../task/component';
import styles from '../../styles.module.scss';

export function TasksOther() {
  const tasksOther = document.createElement('div');
  const tasksOtherTitle = document.createElement('div');
  const tasksOtherTitleText = document.createElement('span');
  const tasksOtherColumn = document.createElement('div');

  tasksOtherTitleText.textContent = 'other';

  tasksOther.classList.add('task-other', styles.tasksSection);
  tasksOtherTitle.classList.add('task-other-title', styles.tasksTitle);
  tasksOtherColumn.classList.add('tasks-other-column');

  getAllTasks({deadline: 'other'}).then(tasks => {
    tasks.forEach(task => {
      tasksOther.append(Task({
        taskStatus: task.status,
        taskDeadline: task.deadline,
        taskTitle: task.title,
        taskText: task.content,
        taskId: task._id
      }))
    })
  }).catch(console.error);

  tasksOther.append(tasksOtherTitle, tasksOtherColumn);
  tasksOtherTitle.append(tasksOtherTitleText);

  return tasksOther;
}
