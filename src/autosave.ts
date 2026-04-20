import { getFilmSlug, addReviewButton } from './domFunctions';
import { LoadSavedReviewButton } from './LoadSavedReviewButton';
import { debounce } from './utils';

const autosaveTimer = 3000;

async function initAutoSave(reviewModal: HTMLElement) {
	let reviewButton: LoadSavedReviewButton | undefined;

	const textAreaChangeHandler = debounce(() => {
		if (reviewTextArea instanceof HTMLTextAreaElement) {
			const reviewContent = reviewTextArea.value.trim();

			if (reviewContent === '') {
				localStorage.removeItem(`autosave_${filmSlug}`);
			} else {
				localStorage.setItem(`autosave_${filmSlug}`, reviewContent);
			}

			if (reviewButton instanceof LoadSavedReviewButton) {
				reviewButton.update();
			}
		}
	}, autosaveTimer);

	const reviewTextArea = reviewModal.querySelector(
		'.modal-content .modal-body > form .body .reviewfields textarea'
	);

	const filmSlug = await getFilmSlug(reviewModal);

	if (!filmSlug) {
		throw new Error('Could not retrieve film slug for autosave functionality.');
	}

	if (reviewTextArea) {
		reviewButton = addReviewButton(reviewModal, filmSlug);
		reviewTextArea.addEventListener('input', textAreaChangeHandler);
	}
}

export { initAutoSave };
