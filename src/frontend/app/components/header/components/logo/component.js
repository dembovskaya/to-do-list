import styles from './styles.module.scss';

export function Logo() {
  const logo = document.createElement('img');
  logo.setAttribute('src', 'https://images.vexels.com/media/users/3/195638/isolated/preview/28475bbde64b796bc6a7f17038d43a89-fox-silhouette-cute-by-vexels.png');

  logo.classList.add(styles.logo);

  return logo;
}