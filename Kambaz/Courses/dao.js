import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  const findAllCourses = () =>
    model.find({}, { name: 1, description: 1, number: 1, credits: 1, _id: 1 });

  const findCoursesForEnrolledUser = async (userId) => {
    const { enrollments } = db;
    const courses = await model.find(
      {},
      { name: 1, description: 1, number: 1, credits: 1, _id: 1 }
    );
    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  };

  const createCourse = (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  };

  const deleteCourse = (courseId) => {
    return model.deleteOne({ _id: courseId });
  };

  const updateCourse = (courseId, courseUpdates) =>
    model.updateOne({ _id: courseId }, { $set: courseUpdates });

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
