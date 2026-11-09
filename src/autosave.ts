import { getFilmSlug, addReviewButton } from './domFunctions';
import { LoadSavedReviewButton } from './LoadSavedReviewButton';
import { debounce } from './utils';

const autosaveTimer = 3000;

async function initAutoSave(reviewModal: HTMLElement) {
	if (reviewModal.dataset.autosaveInitialized === 'true') {
		return;
	}

	let reviewButton: LoadSavedReviewButton | undefined;

	const reviewTextArea = reviewModal.querySelector(
		'.modal-content .modal-body > form .body .reviewfields textarea'
	);

	if (!(reviewTextArea instanceof HTMLTextAreaElement)) {
		return;
	}

	const filmSlug = await getFilmSlug(reviewModal);

	if (!filmSlug) {
		throw new Error('Could not retrieve film slug for autosave functionality.');
	}

	const textAreaChangeHandler = debounce(() => {
		const reviewContent = reviewTextArea.value.trim();

		if (reviewContent === '') {
			localStorage.removeItem(`autosave_${filmSlug}`);
		} else {
			localStorage.setItem(`autosave_${filmSlug}`, reviewContent);
		}

		if (reviewButton instanceof LoadSavedReviewButton) {
			reviewButton.update();
		}
	}, autosaveTimer);

	reviewButton = addReviewButton(reviewModal, filmSlug);
	reviewTextArea.addEventListener('input', textAreaChangeHandler);
	reviewModal.dataset.autosaveInitialized = 'true';
}

export { initAutoSave };
