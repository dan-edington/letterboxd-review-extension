import { TextStyleButton } from './TextStyleButton';

const prefix = '__LETTERBOXD_REVIEW_EXTENSION__';

function addTextStyleButtons(reviewModal: HTMLElement) {
	if (reviewModal) {
		const reviewTextAreaContainer = reviewModal.querySelector(
			'.modal-content .modal-body > form .body .reviewfields'
		);

		if (reviewTextAreaContainer) {
			const buttonContainer = document.createElement('div');
			buttonContainer.id = `${prefix}-button-container`;
			reviewTextAreaContainer.appendChild(buttonContainer);

			const boldButton = new TextStyleButton('B', 'strong', buttonContainer);
			const italicButton = new TextStyleButton('I', 'em', buttonContainer);
			const blockQuoteButton = new TextStyleButton(
				'Quote',
				'blockquote',
				buttonContainer
			);
			const hrefButton = new TextStyleButton('Link', 'a', buttonContainer);
		}
	}
}

function removeTextStyleButtons() {
	const existingButtonContainer = document.getElementById(
		`${prefix}-button-container`
	);
	if (existingButtonContainer) {
		existingButtonContainer.remove();
	}
}

function getFilmSlug(reviewModal: HTMLElement): string | null {
	if (reviewModal) {
		const posterElement = reviewModal.querySelector(
			'figure.poster-list > div[data-component-class="LazyPoster"]'
		);
		return posterElement?.getAttribute('data-item-slug') || null;
	} else {
		return null;
	}
}

export { addTextStyleButtons, removeTextStyleButtons, getFilmSlug };
