import type { Request, Response, NextFunction } from "express";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log("========== 404 ==========");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("=========================");

  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
};

export default notFoundMiddleware;