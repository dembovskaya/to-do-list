import { closeModal } from './helpers';
import { Button } from '../button';

import styles from './styles.module.scss';

export function Modal({ 
  title, 
  body, 
  hasCloseFooterButton,
  footerButtons = []
}) {
  document.querySelector('.modal')?.remove();

  const modal = document.createElement('div');

  modal.classList.add('modal', styles.show);
  modal.setAttribute('tabindex', '-1');
  
  modal.append(ModalDialog({title, body, hasCloseFooterButton,footerButtons}));

  return modal;
};

function ModalDialog({title, body, hasCloseFooterButton, footerButtons}) {
  const modalDialog = document.createElement('div');

  modalDialog.classList.add('modal-dialog');
  modalDialog.append(ModalContent({title, body, hasCloseFooterButton, footerButtons}));

  return modalDialog;
}

function ModalContent({title, body, hasCloseFooterButton, footerButtons}) {
  const modalContent = document.createElement('div');

  modalContent.classList.add('modal-content', styles.modalContent);
  modalContent.append(ModalHeader(title), ModalBody(body), ModalFooter({hasCloseFooterButton, footerButtons}));

  return modalContent;
}

function ModalHeader(title) {
  const modalHeader = document.createElement('div');

  modalHeader.classList.add('modal-header', styles.modalHeader);
  modalHeader.append(ModalTitle(title), ModalCloseHeaderButton());

  return modalHeader;
}

function ModalBody(body) {
  const modalBody = document.createElement('div');

  modalBody.classList.add('modal-body');
  if (typeof body === 'string') {
      modalBody.innerHTML = body;
  } else {
  modalBody.append(body);
  }

  return modalBody;
}

function ModalFooter({hasCloseFooterButton, footerButtons}) {
  const modalFooter = document.createElement('div');

  modalFooter.classList.add('modal-footer', styles.modalFooter);
  if (hasCloseFooterButton) {
      modalFooter.append(ModalCloseFooterButton());
    }

  footerButtons.forEach(btn => {
      modalFooter.append(btn);
  });

  return modalFooter;
}

function ModalTitle(title) {
  const modalTitle = document.createElement('h6');

  modalTitle.classList.add('modal-title', styles.modalTitle);
  modalTitle.textContent = title;

  return modalTitle;
}

function ModalCloseHeaderButton() {
  const btn = Button({classList: 'btn-close'});

  btn.addEventListener('click', closeModal);

  return btn;
}

function ModalCloseFooterButton() {
  const btn = Button({classList: 'btn btn-secondary', content: 'Close'});

  btn.addEventListener('click', closeModal);

  return btn;
}

