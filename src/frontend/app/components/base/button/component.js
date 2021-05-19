import styles from './styles.module.scss';

export function Button({
  classList = 'btn btn-outline-secondary shadow-none',
  content = '',
  clickHandler,
  type = 'button',
  id
}) {
  const btn = document.createElement('button');

  btn.setAttribute('type', type);
  btn.classList.add(...classList.split(' '), styles.button);
  btn.innerHTML = content;

  if(id) {
    btn.setAttribute('data-id', id);
  }

  if (clickHandler) {
    btn.addEventListener('click', clickHandler);
  }

  return btn;
}