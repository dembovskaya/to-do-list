import { addTask } from "../../services";
import { editTask } from "../../services/helpers";
import { Button } from "../base/button";
import { Modal } from "../base/modal/component";
import { FormAddTask } from "./components/form-add-task";

export function openModalToAddTask(e) {
  const modal = Modal({
    title: 'NEW TASK',
    body: FormAddTask(),
    hasCloseFooterButton: true,
    footerButtons: [Button({content: 'Save', clickHandler: addTask})]
  })

  document.querySelector('.modal')?.remove();
  document.body.append(modal);
}

export function openModalToEditTask(task) {
	const modal = Modal({
    title: 'EDIT TASK',
    body: FormAddTask(task),
    hasCloseFooterButton: true,
    footerButtons: [Button({content: 'Save', clickHandler: editTask, id: task.taskId})]
  })

  document.querySelector('.modal')?.remove();
  document.body.append(modal);
}
