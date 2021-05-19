import styles from './styles.module.scss';

export function LogoName() {
  const logoName = document.createElement('div');

  logoName.textContent = 'todolist';
  logoName.classList.add(styles.logoName);

  return logoName;
}