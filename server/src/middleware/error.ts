import mongoose from "mongoose";
import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import { envConfig } from "../config/config";

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };

  res.status(statusCode).send(response);
};

const errorMiddleware = {
  errorConverter,
  errorHandler,
};

export default errorMiddleware;
