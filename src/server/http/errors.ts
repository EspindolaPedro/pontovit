import { ZodError } from "zod";
import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
    public readonly code = "BAD_REQUEST",
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "VALIDATION_ERROR", message: "Revise os dados enviados.", details: error.flatten() },
      { status: 422 },
    );
  }
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.code, message: error.message }, { status: error.status });
  }

  console.error(error);
  return NextResponse.json(
    { error: "INTERNAL_SERVER_ERROR", message: "Não foi possível concluir a operação." },
    { status: 500 },
  );
}
