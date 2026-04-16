class TextStyleButton {
	button: HTMLButtonElement;
	htmlTag: string;
	textAreaElement: any;

	constructor(buttonText: string, htmlTag: string, parent: HTMLElement) {
		this.htmlTag = htmlTag;
		this.button = document.createElement('button');
		this.button.textContent = buttonText;
		this.button.classList.add('button');
		this.button.addEventListener('click', this.handleClick.bind(this));
		parent.appendChild(this.button);
		this.textAreaElement = parent.parentNode?.querySelector('textarea');
	}

	handleClick(evt: PointerEvent) {
		evt.preventDefault();

		const selection = window.getSelection();

		if (selection && this.textAreaElement) {
			const selectedText = selection.toString();
			let formattedText: string;

			if (this.htmlTag === 'a') {
				formattedText = `<${this.htmlTag} href="">${selectedText}</${this.htmlTag}>`;
			} else {
				formattedText = `<${this.htmlTag}>${selectedText}</${this.htmlTag}>`;
			}

			// Insert the formatted text at the cursor position
			const startPos: number = this.textAreaElement.selectionStart;
			const endPos: number = this.textAreaElement.selectionEnd;
			const originalText: string = this.textAreaElement.value;

			this.textAreaElement.value =
				originalText.substring(0, startPos) +
				formattedText +
				originalText.substring(endPos);

			let newCursorPos;
			if (this.htmlTag === 'a') {
				// Move the cursor inside the href quotes
				newCursorPos = startPos + 9;
			} else {
				// Move the cursor to the end of the inserted text
				newCursorPos = startPos + formattedText.length;
			}
			this.textAreaElement.setSelectionRange(newCursorPos, newCursorPos);
			this.textAreaElement.focus();
		}
	}
}

export { TextStyleButton };
