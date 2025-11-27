import model from "./model.js";

export default function AssignmentsDao() {
  const findAssignmentsForCourse = (courseId) =>
    model.find({ course: courseId });

  const createAssignment = (assignment) => {
    return model.create(assignment);
  };

  const deleteAssignment = (assignmentId) =>
    model.deleteOne({ _id: assignmentId });

  const updateAssignment = (assignmentId, assignmentUpdates) =>
    model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
