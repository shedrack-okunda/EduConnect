interface SkillsDisplayProps {
	skills: string[];
}

export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ skills }) => {
	if (!skills.length)
		return <p className="text-gray-500">No skills added yet.</p>;

	return (
		<div className="flex flex-wrap gap-2">
			{skills.map((skill, index) => (
				<span
					key={index}
					className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
					{skill}
				</span>
			))}
		</div>
	);
};
