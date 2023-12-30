import { custom_middleware } from "@/app/lib/server/middleware";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

const main_handler = (req: NextRequest, res: NextResponse) => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return NextResponse.json({ success: true });
  }

  throw new ApiError(400, "Some error");
};

export const GET = custom_middleware(main_handler);
