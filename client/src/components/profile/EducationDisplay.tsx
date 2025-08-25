import type { IEducation } from "../../../../shared/types";
import DateRange from "./DateRange";

interface EducationDisplayProps {
	education: IEducation[];
}

export const EducationDisplay: React.FC<EducationDisplayProps> = ({
	education,
}) => {
	if (!education.length) {
		return (
			<p className="text-gray-400 italic">No education records yet.</p>
		);
	}

	return (
		<div className="space-y-3">
			{education.map((edu, index) => (
				<div
					key={index}
					className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg shadow-sm">
					<p className="font-semibold text-purple-200">
						{edu.institution}
					</p>
					<p className="text-sm text-purple-300">
						{edu.degree} – {edu.fieldOfStudy}
					</p>
					<p className="text-xs text-purple-400 mt-1">
						<DateRange
							startDate={edu.startDate}
							endDate={edu.endDate}
							current={edu.current}
						/>
					</p>
				</div>
			))}
		</div>
	);
};
