import { TimeUnit } from './time-unit.enum';

export interface TimeDifference {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isNegative: boolean;
}

export function calculateTimeDifference(
	fromDate: Date,
	toDate: Date,
): TimeDifference {
	const differenceMs = fromDate.valueOf() - toDate.valueOf();
	const differenceMsAbs = Math.abs(fromDate.valueOf() - toDate.valueOf());
	const isNegative = differenceMs < 0;

	const seconds = Math.floor(differenceMsAbs / TimeUnit.Second) % 60;
	const minutes = Math.floor(differenceMsAbs / TimeUnit.Minute) % 60;
	const hours = Math.floor(differenceMsAbs / TimeUnit.Hour) % 24;
	const days = Math.floor(differenceMsAbs / TimeUnit.Day);

	return {
		days,
		hours,
		minutes,
		seconds,
		isNegative,
	};
}
