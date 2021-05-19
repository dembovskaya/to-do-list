import styles from './styles.module.scss';

function Option(value, customClass) {
  const option = document.createElement('option');

  option.classList.add(customClass);
  option.value = value;
  option.innerText = value;

  return option;
}

export function Status() {
  const status = document.createElement('select');

  status.classList.add('form-control-sm', 'status', styles.status);

  status.append(
    Option('to do', styles.toDo), 
    Option('in progress', styles.inProgress), 
    Option('done', styles.done), 
    Option('important', styles.important)
  );

  return status;
}