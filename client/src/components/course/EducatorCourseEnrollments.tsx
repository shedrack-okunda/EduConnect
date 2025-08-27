import { useEffect, useState } from "react";
import { courseService } from "../../services/course";
import { Loader2, Users } from "lucide-react";
import type { IEnrollment } from "../../../../shared/types";

interface Props {
	courseId: string;
}

const EducatorCourseEnrollments: React.FC<Props> = ({ courseId }) => {
	const [enrollments, setEnrollments] = useState<IEnrollment[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEnrollments = async () => {
			try {
				setLoading(true);

				const enrollmentsData =
					await courseService.getCourseEnrollments(courseId!);
				setEnrollments(enrollmentsData);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch enrollments");
			} finally {
				setLoading(false);
			}
		};

		if (courseId) fetchEnrollments();
	}, [courseId]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-40">
				<Loader2 className="animate-spin w-6 h-6 text-blue-500" />
			</div>
		);
	}

	if (error) {
		return <p className="text-red-500 text-center">{error}</p>;
	}

	return (
		<div className="bg-white rounded-2xl shadow-lg p-6">
			<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
				<Users className="w-5 h-5 text-blue-500" />
				Enrollments
			</h2>

			{enrollments.length === 0 ? (
				<p className="text-gray-500">No students enrolled yet.</p>
			) : (
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3">Student</th>
							<th className="p-3">Email</th>
							<th className="p-3">Progress</th>
						</tr>
					</thead>
					<tbody>
						{enrollments.map((enrollment) => (
							<tr
								key={enrollment.studentId}
								className="border-b hover:bg-gray-50 transition">
								<td className="p-3">{enrollment.name}</td>
								<td className="p-3">{enrollment.email}</td>
								<td className="p-3">
									<div className="w-full bg-gray-200 rounded-full h-2.5">
										<div
											className="bg-blue-500 h-2.5 rounded-full"
											style={{
												width: `${enrollment.progress}%`,
											}}
										/>
									</div>
									<span className="text-xs text-gray-600">
										{enrollment.progress}%
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default EducatorCourseEnrollments;
