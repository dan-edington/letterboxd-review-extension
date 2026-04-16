function debounce(func: Function, wait: number) {
	let timeout: number | undefined;
	return function (this: any, ...args: any[]) {
		const later = () => {
			timeout = undefined;
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = window.setTimeout(later, wait);
	};
}

export { debounce };
