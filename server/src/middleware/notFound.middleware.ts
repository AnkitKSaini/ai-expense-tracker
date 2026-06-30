import type { Request, Response } from "express";

const notFoundMiddleware = (
  _req: Request,
  res: Response
): void => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
};

export default notFoundMiddleware;