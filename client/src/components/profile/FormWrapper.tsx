import React, { type ReactNode } from "react";

interface FormWrapperProps {
	title: string;
	children: ReactNode;
	actions?: ReactNode; // 👈 allow optional actions
}

const FormWrapper: React.FC<FormWrapperProps> = ({
	title,
	children,
	actions,
}) => {
	return (
		<div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">{title}</h2>
				{actions && <div>{actions}</div>}{" "}
				{/* 👈 render actions if provided */}
			</div>
			<div>{children}</div>
		</div>
	);
};

export default FormWrapper;
