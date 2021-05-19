import styles from './styles.module.scss';
import { getAllTasks } from '../../../../services/helpers';

export function SearchBarInput() {
  const searchBarInput = document.createElement('input');

  searchBarInput.classList.add('search-bar-input', 'form-control', 'shadow-none', styles.searchBarInput);
  searchBarInput.setAttribute('placeholder', 'Go to ...');

  searchBarInput.addEventListener('keyup', (e) => {
    const q = e.target.value;
    const allTasks = document.querySelectorAll('.a-task');

    allTasks.forEach(task => task.remove());
  
    getAllTasks({q});

  });

  return searchBarInput;
}