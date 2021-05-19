import { removeTask } from "../../../../services/helpers";
import { Button } from "../../../base/button";
import { Modal } from "../../../base/modal/component";

export function ModalToDeleteTask(id) {
  const modal = Modal({
    title: 'REMOVE TASK?',
    body: '',
    hasCloseFooterButton: true,
    footerButtons: [Button({content: 'Delete', clickHandler: removeTask.bind(this, id)})]
  })

  document.querySelector('.modal')?.remove();
  document.body.append(modal);
}