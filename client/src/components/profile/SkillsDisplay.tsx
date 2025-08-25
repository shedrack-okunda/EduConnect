interface SkillsDisplayProps {
	skills: string[];
}

export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ skills }) => {
	if (!skills.length) {
		return <p className="text-gray-400 italic">No skills added yet.</p>;
	}

	return (
		<div className="flex flex-wrap gap-2">
			{skills.map((skill, index) => (
				<span
					key={index}
					className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600/20 text-purple-200 border border-purple-500/30">
					{skill}
				</span>
			))}
		</div>
	);
};
