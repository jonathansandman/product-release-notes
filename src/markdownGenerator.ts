import { IReleaseNote } from "./spreadsheetReader";
import dayjs from "dayjs";
import { oaDateToDate } from "./utils/oaDateToDate";
import { formatToSingleLine } from "./utils/formatToSingleLine";

export class MarkdownGenerator {
	generateMarkdown(data: IReleaseNote[]): string {
		let markdownContent = "";

		data.sort((a,b) => b.Date-a.Date)

		data.forEach((row, index) => {
			markdownContent += `## ${row.Version} (${dayjs(
				oaDateToDate(row.Date)
			).format("MMMM YYYY")})\r\n\r\n${row.Features}\r\n\r\n`;
		});
		return formatToSingleLine(markdownContent);
	}
}
