import asyncHandler from "express-async-handler";

const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user.admin) {
    res.status(401);
    throw new Error("You are not admin, soory");
  }

  next();
});

export default isAdmin;
