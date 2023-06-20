import * as XLSX from "xlsx";

export interface IReleaseNote {
	Product: string;
	Version: string;
	Date: number;
	Features: string;
}

export class SpreadsheetReader {
	readSpreadsheet(filePath: string): IReleaseNote[] {
		const workbook = XLSX.readFile(filePath);
		const sheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];
		const jsonData = XLSX.utils.sheet_to_json<IReleaseNote>(worksheet);
		return jsonData;
	}
}
