import { addTextStyleButtons, removeAllButtons } from './domFunctions';
import { initAutoSave } from './autosave';

const reviewModal = document.getElementById('diary-entry-form-modal');

if (reviewModal) {
	let buttonsReady = false;
	let autosaveReady = false;

	async function initializeReviewModal() {
		if (!(reviewModal instanceof HTMLElement)) {
			return;
		}

		if (!buttonsReady) {
			addTextStyleButtons(reviewModal);
			buttonsReady = true;
		}

		if (!autosaveReady) {
			try {
				await initAutoSave(reviewModal);
				autosaveReady = true;
			} catch (error) {
				console.error('Failed to initialize autosave for review modal.', error);
			}
		}
	}

	function reviewModalMutationCallback(mutationList: MutationRecord[]) {
		mutationList.forEach((mutation) => {
			if (!(mutation.target instanceof HTMLElement)) {
				return;
			}

			if (mutation.target.ariaHidden === 'true') {
				removeAllButtons();
				reviewModal!.dataset.autosaveInitialized = '';
				buttonsReady = false;
				autosaveReady = false;
				return;
			}

			initializeReviewModal();
		});
	}

	const reviewModalObserver = new MutationObserver(reviewModalMutationCallback);

	reviewModalObserver.observe(reviewModal, {
		attributes: true,
		attributeFilter: ['aria-hidden'],
	});
}
