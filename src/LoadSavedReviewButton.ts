class LoadSavedReviewButton {
	button: HTMLButtonElement;
	textAreaElement: any;
	filmSlug: string;

	constructor(buttonText: string, filmSlug: string, parent: HTMLElement) {
		this.button = document.createElement('button');
		this.button.textContent = buttonText;
		this.button.classList.add('button');
		this.button.addEventListener('click', this.handleClick.bind(this));
		parent.appendChild(this.button);
		this.filmSlug = filmSlug;
		this.textAreaElement = parent.parentNode?.querySelector('textarea');
		this.update();
	}

	handleClick(evt: PointerEvent) {
		evt.preventDefault();

		if (this.filmSlug && this.textAreaElement) {
			const savedReview = localStorage.getItem(`autosave_${this.filmSlug}`);
			if (savedReview) {
				this.textAreaElement.value = savedReview;
				this.textAreaElement.focus();
			}
		}
	}

	update() {
		if (this.filmSlug) {
			const savedReview = localStorage.getItem(`autosave_${this.filmSlug}`);
			if (savedReview) {
				this.button.disabled = false;
			} else {
				this.button.disabled = true;
			}
		}
	}
}

export { LoadSavedReviewButton };
