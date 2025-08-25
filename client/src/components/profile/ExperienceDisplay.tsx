import type { IExperience } from "../../../../shared/types";
import DateRange from "./DateRange";

interface ExperienceDisplayProps {
	experience: IExperience[];
}

export const ExperienceDisplay: React.FC<ExperienceDisplayProps> = ({
	experience,
}) => {
	if (!experience.length) {
		return (
			<p className="text-gray-400 italic">No experience records yet.</p>
		);
	}

	return (
		<div className="space-y-3">
			{experience.map((exp, index) => (
				<div
					key={index}
					className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg shadow-sm">
					<p className="font-semibold text-purple-200">
						{exp.company}
					</p>
					<p className="text-sm text-purple-300">{exp.position}</p>
					{exp.description && (
						<p className="text-xs text-purple-400 mt-1">
							{exp.description}
						</p>
					)}
					<p className="text-xs text-purple-400 mt-1">
						<DateRange
							startDate={exp.startDate}
							endDate={exp.endDate}
							current={exp.current}
						/>
					</p>
				</div>
			))}
		</div>
	);
};
