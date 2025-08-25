import React from "react";

interface DisplayCardProps {
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
	footer?: React.ReactNode;
	actions?: React.ReactNode;
}

const DisplayCard: React.FC<DisplayCardProps> = ({
	title,
	subtitle,
	children,
	footer,
	actions,
}) => {
	return (
		<div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg shadow-sm space-y-2">
			{/* Header */}
			<div className="flex justify-between items-start">
				<div>
					<h3 className="font-semibold text-purple-200">{title}</h3>
					{subtitle && (
						<p className="text-sm text-purple-300">{subtitle}</p>
					)}
				</div>
				{actions && <div className="ml-2">{actions}</div>}
			</div>

			{/* Content */}
			<div className="text-purple-100">{children}</div>

			{/* Footer */}
			{footer && (
				<div className="pt-2 border-t border-purple-500/20 text-xs text-purple-400">
					{footer}
				</div>
			)}
		</div>
	);
};

export default DisplayCard;
