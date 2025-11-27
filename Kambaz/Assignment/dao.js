// import { v4 as uuidv4 } from "uuid";

// export default function AssignmentsDao(db) {
//   function findAssignmentsForCourse(courseId) {
//     const { assignments } = db;
//     return assignments.filter((assignment) => assignment.course === courseId);
//   }

//   function createAssignment(assignment) {
//     const newAssignment = { ...assignment, _id: uuidv4() };
//     db.assignments = [...db.assignments, newAssignment];
//     return newAssignment;
//   }

//   function deleteAssignment(assignmentId) {
//     db.assignments = db.assignments.filter(
//       (assignment) => assignment._id !== assignmentId
//     );
//   }

//   function updateAssignment(assignmentId, updates) {
//     db.assignments = db.assignments.map((assignment) =>
//       assignment._id === assignmentId
//         ? { ...assignment, ...updates }
//         : assignment
//     );
//     return db.assignments.find((assignment) => assignment._id === assignmentId);
//   }

//   return {
//     findAssignmentsForCourse,
//     createAssignment,
//     deleteAssignment,
//     updateAssignment,
//   };
// }

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
