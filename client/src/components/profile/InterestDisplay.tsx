interface InterestsDisplayProps {
	interests: string[];
}

export const InterestsDisplay: React.FC<InterestsDisplayProps> = ({
	interests,
}) => {
	if (!interests.length) {
		return <p className="text-gray-400 italic">No interests added yet.</p>;
	}

	return (
		<div className="flex flex-wrap gap-2">
			{interests.map((interest, index) => (
				<span
					key={index}
					className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600/20 text-purple-200 border border-purple-500/30">
					{interest}
				</span>
			))}
		</div>
	);
};
