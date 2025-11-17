import type { Request, Response, NextFunction } from 'express';
import { StructError } from 'superstruct';
import { createErrorLogger } from './logger';
import dayjs from './dayjs';
import { DEFAULT_FORMAT_DAYJS } from './const';
import { errorResponse, type ApiError } from '../helpers/response';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {


  if (err instanceof StructError) {
    const errors = Array.from(err.failures()).map(failure => ({
      field: failure.path.join('.') || 'body', // si no hay path, asumimos todo el body
      message: failure.message
    }));

    return res.status(400).json(errorResponse({
      message: "Validatation error",
      title: "Validation error",
      success: false,
      statusCode: 400,
      data: errors
    }));
  }



 createErrorLogger({
    message: err.message,
    name: err.name,
    route: req.originalUrl,
    method: req.method,
    stack: err.stack,
    cause: err.cause,
    timestamp: dayjs().format(DEFAULT_FORMAT_DAYJS.DATE_TIMEZONE)
  })
  res.status(500).json(errorResponse({
    message: "Internal server error",
    title: "Internal server error",
    statusCode: 500,
    success: false,
 data: err.stack
  }));
}
