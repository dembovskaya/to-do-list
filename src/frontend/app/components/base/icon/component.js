import styles from './styles.module.scss';
import stylesTheme from '../theme/styles.module.scss';

export function Icon({type, clickHandler}) {
  const icon = document.createElement('i');

  icon.classList.add(styles.icon, 'icon');
  icon.classList.add('bi');
  icon.classList.add(`bi-${type}`);
  icon.classList.add(styles[type]);

  if(type === 'sun') {
    icon.id = 'theme-mode-sun';
  
    if (!localStorage.getItem('dark')) {
      icon.classList.add(stylesTheme.hidden);
    }
  } else if (type === 'moon') {
      icon.id = 'theme-mode-moon';
        if (localStorage.getItem('dark')) {
          icon.classList.add(stylesTheme.hidden);
        }
  }

  if(type === 'edit') {
    icon.classList.add = 'editTask';}

  if (clickHandler) {
    icon.addEventListener('click', clickHandler);
  }

  return icon;
}