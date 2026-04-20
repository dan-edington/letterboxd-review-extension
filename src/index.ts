import { addTextStyleButtons, removeAllButtons } from './domFunctions';
import { initAutoSave } from './autosave';

const reviewModal = document.getElementById('diary-entry-form-modal');

if (reviewModal) {
	function reviewModalMutationCallback(mutationList: MutationRecord[]) {
		mutationList.forEach((mutation) => {
			if (
				mutation.target instanceof HTMLElement &&
				mutation.target.ariaHidden === 'true'
			) {
				removeAllButtons();
			} else {
				if (reviewModal instanceof HTMLElement) {
					addTextStyleButtons(reviewModal);
					initAutoSave(reviewModal);
				}
			}
		});
	}

	const reviewModalObserver = new MutationObserver(reviewModalMutationCallback);

	reviewModalObserver.observe(reviewModal, {
		attributes: true,
		attributeFilter: ['aria-hidden'],
	});
}
