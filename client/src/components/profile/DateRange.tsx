import React from "react";
import { format } from "date-fns";

interface DateRangeProps {
	startDate?: string | Date;
	endDate?: string | Date;
	isOngoing?: boolean;
	current?: boolean;
}

const DateRange: React.FC<DateRangeProps> = ({
	startDate,
	endDate,
	isOngoing,
}) => {
	const formatDate = (date?: string | Date) =>
		date ? format(new Date(date), "MMM yyyy") : "N/A";

	return (
		<span className="text-sm text-gray-500 dark:text-gray-400">
			{formatDate(startDate)} –{" "}
			{isOngoing ? "Present" : formatDate(endDate)}
		</span>
	);
};

export default DateRange;
