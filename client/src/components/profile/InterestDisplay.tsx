interface InterestsDisplayProps {
	interests: string[];
}

export const InterestsDisplay: React.FC<InterestsDisplayProps> = ({
	interests,
}) => {
	if (!interests.length)
		return <p className="text-gray-500">No Interests added yet.</p>;

	return (
		<div className="flex flex-wrap gap-2">
			{interests.map((interest, index) => (
				<span
					key={index}
					className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-green-800">
					{interest}
				</span>
			))}
		</div>
	);
};
