const oaDate = new Date(1899, 11, 30);
const millisecondsOfaDay = 24 * 60 * 60 * 1000;

export function oaDateToDate(date: number) {
	var result = new Date();
	result.setTime(date * millisecondsOfaDay + new Date(oaDate).getTime());
	return result;
}
