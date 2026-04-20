import { TextStyleButton } from './TextStyleButton';
import { LoadSavedReviewButton } from './LoadSavedReviewButton';

const prefix = '__LETTERBOXD_REVIEW_EXTENSION__';
const maxFilmSlugTries = 50;

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

function addReviewButton(reviewModal: HTMLElement, filmSlug: string) {
	if (reviewModal) {
		const buttonContainer = document.getElementById(
			`${prefix}-button-container`
		);

		if (buttonContainer) {
			const loadSavedReviewButton = new LoadSavedReviewButton(
				'Load Saved Review',
				filmSlug,
				buttonContainer
			);

			return loadSavedReviewButton;
		}
	}
}

function removeAllButtons() {
	const existingButtonContainer = document.getElementById(
		`${prefix}-button-container`
	);
	if (existingButtonContainer) {
		existingButtonContainer.remove();
	}
}

function getFilmSlug(reviewModal: HTMLElement): Promise<string | null> {
	return new Promise((resolve) => {
		if (reviewModal) {
			let intervalId: number;
			let tries = 0;

			intervalId = setInterval(() => {
				tries++;

				const posterElement = reviewModal.querySelector(
					'figure.poster-list > div[data-component-class="LazyPoster"]'
				);

				if (posterElement) {
					clearInterval(intervalId);
					resolve(posterElement.getAttribute('data-item-slug') || null);
				} else if (tries >= maxFilmSlugTries) {
					clearInterval(intervalId);
					resolve(null);
				}
			}, 250);
		} else {
			resolve(null);
		}
	});
}

export { addTextStyleButtons, removeAllButtons, getFilmSlug, addReviewButton };
