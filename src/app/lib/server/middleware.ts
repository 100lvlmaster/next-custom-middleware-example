import { ApiError } from "next/dist/server/api-utils";
import { NextResponse, NextRequest } from "next/server";

export const custom_middleware =
  (...handlers: Function[]) =>
  async (req: NextRequest, res: NextResponse) => {
    try {
      /// Auth middleware
      await auth_middleware(req, res);

      for (const handler of handlers) {
        await handler(req, res);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          { message: error.message },
          { status: error.statusCode }
        );
      } else {
        /// Log server errors using winston or your preferred logger
        console.log(error);
        return NextResponse.json(
          { message: "Server died for some reason" },
          { status: 500 }
        );
      }
    }
  };

export const auth_middleware = async (req: NextRequest, res: NextResponse) => {
  /// Your auth logic
  const isAuthenticated = false;
  if (!isAuthenticated) {
    throw new ApiError(401, "Unauthorized");
  }
};
