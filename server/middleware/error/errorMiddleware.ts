import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(statusCode);
  console.log("inside errorMiddleware");
  if (statusCode != 200) {
    res.status(statusCode).json({ message: err.message, stack: err.stack });
    console.log(err.message);
  }

  // res.json({
  //   message: err.message,
  //   // stack: process.env.NODE_ENV === "production" ? null : err.stack,
  //   stack: err.stack,
  // });
};

module.exports = errorHandler;
