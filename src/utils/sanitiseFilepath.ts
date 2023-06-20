export function sanitiseFilePath(filePath: string): string {
	// Remove single quotes
	const sanitizedPath = filePath.replace(/\'/g, "");

	return sanitizedPath;
}
