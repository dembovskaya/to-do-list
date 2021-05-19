import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-en-GB';
import { Status } from '../../../base/status/component';

import styles from './styles.module.scss';

export function FormAddTask(taskToEdit) {
  const form = document.createElement('form');
  const titleInput = document.createElement('input');
  const descriptionTextarea = document.createElement('textarea');
  const deadlineInput = document.createElement('input');
  const statusSelect = Status();

  form.classList.add('form', styles.form);
  statusSelect.classList.add('form-control-sm', 'shadow-none', 'status', styles.status);
  titleInput.classList.add('form-control', 'title', 'shadow-none',  styles.title);
  descriptionTextarea.classList.add('form-control', 'shadow-none', 'description', styles.description);
  deadlineInput.classList.add('form-control', 'shadow-none', 'deadline', styles.deadline);

  deadlineInput.id = 'datepicker';

  titleInput.setAttribute('placeholder', 'title');
  titleInput.setAttribute('required', '');
  descriptionTextarea.setAttribute('placeholder', 'description');
  descriptionTextarea.setAttribute('required', '');
  deadlineInput.setAttribute('placeholder', 'deadline');
  deadlineInput.setAttribute('autocomplete', 'off');
  deadlineInput.setAttribute('required', '');

  if (taskToEdit) {
    titleInput.value = taskToEdit.taskTitle;
    descriptionTextarea.value = taskToEdit.taskText;
    deadlineInput.setAttribute('deadline', taskToEdit.taskDeadline);
  }

  form.append(statusSelect, titleInput, descriptionTextarea, deadlineInput);

  datepickerFactory($);
  datepickerJAFactory($);
  $(function () {
      $("#datepicker").datepicker({
          dateFormat: "@",
          onSelect: (date, obj) => {
            document.getElementById("datepicker").setAttribute('deadline', +date);
          },
          altFormat: "yy-mm-dd",
          altField: '#datepicker',
      });
      const currentDate = taskToEdit ? new Date(taskToEdit.taskDeadline) : null;
      $("#datepicker").datepicker("setDate", currentDate);
  });

  return form;
}
