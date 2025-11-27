import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const enrollUserInCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollment = await dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    await dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete(
    "/api/users/:userId/courses/:courseId/unenroll",
    unenrollUserFromCourse
  );
}
