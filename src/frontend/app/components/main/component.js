import styles from './styles.module.scss';
import { TasksExpired } from './components/tasks-expired';
import { TasksToday } from './components/tasks-today';
import { TasksTomorrow } from './components/tasks-tomorrow';
import { TasksOther} from './components/tasks-other';

export function Main() {
  const main = document.createElement('main');
  main.classList.add(styles.main);

  main.append(
		TasksExpired(),
		TasksToday(),
		TasksTomorrow(),
		TasksOther()
	);

  return main;
}
