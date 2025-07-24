import type { IExperience } from "../../../../shared/types";

interface ExperienceDisplayProps {
	experience: IExperience[];
}

export const ExperienceDisplay: React.FC<ExperienceDisplayProps> = ({
	experience,
}) => {
	if (!experience.length)
		return (
			<p className="text-gray-500">No experience records added yet.</p>
		);

	return (
		<div className="space-y-3">
			{experience.map((exp, index) => (
				<div
					key={index}
					className="border rounded-md p-3 bg-purple-100 text-violet-900">
					<p className="font-semibold">{exp.company}</p>
					<p className="text-sm">
						{exp.position}, {exp.description}
					</p>
					<p className="text-sm text-violet-700">
						{new Date(exp.startDate).toLocaleDateString()} –{" "}
						{exp.current
							? "Present"
							: exp.endDate
							? new Date(exp.endDate).toLocaleDateString()
							: "N/A"}
					</p>
				</div>
			))}
		</div>
	);
};
