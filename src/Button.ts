class Button {
	private button: HTMLButtonElement;
	private htmlTag: string;
	private textAreaElement: any;
	private clickFn: (evt?: PointerEvent) => void;

	constructor(
		buttonText: string,
		htmlTag: string,
		parent: HTMLElement,
		clickFn: (evt?: PointerEvent) => void
	) {
		this.htmlTag = htmlTag;
		this.button = document.createElement('button');
		this.button.textContent = buttonText;
		this.button.classList.add('button');
		this.clickFn = clickFn;
		this.button.addEventListener('click', this.handleClick.bind(this));
		parent.appendChild(this.button);
		this.textAreaElement = parent.parentNode?.querySelector('textarea');
	}

	protected handleClick(evt: PointerEvent) {
		evt.preventDefault();
		this.clickFn();
	}
}

export { Button };
