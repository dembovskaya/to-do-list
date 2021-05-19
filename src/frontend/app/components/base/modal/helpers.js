import { removeDatepicker } from '../../../services/helpers';

export function closeModal(e) {
    removeDatepicker();
    return e.target.closest('.modal').remove();
}
