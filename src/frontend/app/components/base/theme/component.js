import styles from './styles.module.scss';

export const toggle = document.querySelector('.toggle-theme');

if (localStorage.getItem('dark')) {
  document.body.classList.add(styles.dark);
}

export function changeMode(e) {
  e.preventDefault();

  if (document.body.classList.contains(styles.dark)) {
    document.body.classList.remove(styles.dark);
    localStorage.removeItem('dark');
  } else {
    document.body.classList.add(styles.dark);
    localStorage.setItem('dark', true);
  }

  document.querySelector('.bi-sun').classList.toggle(styles.hidden);
  document.querySelector('.bi-moon').classList.toggle(styles.hidden);
}
