import { addTextStyleButtons, removeTextStyleButtons } from './domFunctions';
import { initAutoSave } from './autosave';

const reviewModal = document.getElementById('diary-entry-form-modal');

if (reviewModal) {
	const observerConfig = { attributes: true, attributeFilter: ['aria-hidden'] };

	function reviewModalMutationCallback(
		mutationList: MutationRecord[],
		observer: MutationObserver
	) {
		mutationList.forEach((mutation) => {
			if (
				mutation.target instanceof HTMLElement &&
				mutation.target.ariaHidden === 'true'
			) {
				removeTextStyleButtons();
			} else {
				if (reviewModal) {
					addTextStyleButtons(reviewModal);
					initAutoSave(reviewModal);
				}
			}
		});
	}

	const observer = new MutationObserver(reviewModalMutationCallback);

	observer.observe(reviewModal, observerConfig);
}
