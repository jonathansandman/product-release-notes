import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { SpreadsheetReader } from "./spreadsheetReader";
import { MarkdownGenerator } from "./markdownGenerator";
import { sanitiseFilePath } from "./utils/sanitiseFilepath";

import * as fs from "fs";

async function main() {
	try {
		const rl = readline.createInterface({ input, output });

		const inputFile = sanitiseFilePath(
			await rl.question("Please provide the input spreadsheet file: ")
		);

		rl.close();

		if (!inputFile) {
			console.log("Input file path is required.");
			return;
		}

		const reader = new SpreadsheetReader();
		const data = await reader.readSpreadsheet(inputFile);

		const productNames = Array.from(
			new Set(data.map((row) => row.Product))
		);

		let dataByProduct: { [key: string]: typeof data } = {};

		for (const productName of productNames) {
			dataByProduct[productName] = data.filter(
				(row) => row.Product === productName
			);
		}

		const generator = new MarkdownGenerator();

		let mdString = "";

		for (const productName of Object.keys(dataByProduct)) {
			mdString += `--- ${productName} ---\n\n"latestVersionReleaseNotes": ${JSON.stringify(
				generator.generateMarkdown(dataByProduct[productName])
			)},\n\n`;
		}

		fs.mkdirSync("output", { recursive: true });

		fs.writeFileSync("output/markdown.md", mdString);

		console.log("Markdown files generated successfully.");
	} catch (error) {
		console.error("An error occurred:", error);
	}
}

main();
