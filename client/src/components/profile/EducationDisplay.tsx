import type { IEducation } from "../../../../shared/types";

interface EducationDisplayProps {
	education: IEducation[];
}

export const EducationDisplay: React.FC<EducationDisplayProps> = ({
	education,
}) => {
	if (!education.length)
		return <p className="text-gray-500">No education records added yet.</p>;

	return (
		<div className="space-y-3">
			{education.map((edu, index) => (
				<div
					key={index}
					className="border rounded-md p-3 bg-purple-100 text-purple-900">
					<p className="font-semibold">{edu.institution}</p>
					<p className="text-sm">
						{edu.degree}, {edu.fieldOfStudy}
					</p>
					<p className="text-sm text-purple-700">
						{new Date(edu.startDate).toLocaleDateString()} –{" "}
						{edu.current
							? "Present"
							: edu.endDate
							? new Date(edu.endDate).toLocaleDateString()
							: "N/A"}
					</p>
				</div>
			))}
		</div>
	);
};
