export function formatToSingleLine(str: string): string {
	return str
		.trim()
		.replace(/(\r\n|\n|\r)/g, "\r\n")
		.trim();
}
