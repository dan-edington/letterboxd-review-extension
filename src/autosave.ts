import { getFilmSlug } from './domFunctions';
import { debounce } from './utils';

const autosaveTimer = 3000;

function initAutoSave(reviewModal: HTMLElement) {
	const reviewTextArea = reviewModal.querySelector(
		'.modal-content .modal-body > form .body .reviewfields textarea'
	);

	const textAreaChangeHandler = debounce(() => {
		if (reviewTextArea instanceof HTMLTextAreaElement) {
			const reviewContent = reviewTextArea.value;
			const filmSlug = getFilmSlug(reviewModal);
			console.log(filmSlug, reviewContent);
		}
	}, autosaveTimer);

	if (reviewTextArea) {
		reviewTextArea.addEventListener('input', textAreaChangeHandler);
	}
}

export { initAutoSave };
