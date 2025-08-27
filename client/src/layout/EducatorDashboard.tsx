import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CourseDashboard } from "../components/course/CourseDashboard";
// import { LessonDashboard } from "../components/lesson/LessonDashboard";
import { courseService } from "../services/course";
import { ModuleDashboard } from "../components/module/ModuleDashboard";
import EducatorCourseEnrollments from "../components/course/EducatorCourseEnrollments";

const EducatorDashboard: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	console.log(isVisible);
	const [courseId, setCourseId] = useState<string>("");
	const [moduleId, setModuleId] = useState<string>("");
	console.log(moduleId);
	const { state } = useAuth();
	const { user } = state;

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const courses = await courseService.getCourses();

				const educatorCourse = courses.find(
					(course) => course.instructorId === user?._id
				);

				if (educatorCourse) {
					setCourseId(educatorCourse._id);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchCourse();
		setIsVisible(true);
	}, [user?._id]);

	return (
		<>
			<CourseDashboard />

			{courseId && (
				<>
					<ModuleDashboard
						courseId={courseId}
						onModuleSelect={(id) => setModuleId(id)}
					/>

					{/* Show enrollments table for this course */}
					<EducatorCourseEnrollments courseId={courseId} />
				</>
			)}
		</>
	);
};

export default EducatorDashboard;
