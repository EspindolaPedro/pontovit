import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { getMagnoPhoto, saveMagnoPhoto, updateMagnoFocalPoint } from "@/server/modules/magno/magno.service";

export async function GET() {
  try {
    await requireRole("AUTHOR");
    const photo = await getMagnoPhoto();
    return NextResponse.json({
      data: photo ? { focalPointX: photo.focalPointX, focalPointY: photo.focalPointY, updatedAt: photo.updatedAt, hasPhoto: true } : { hasPhoto: false },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireRole("AUTHOR");
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "VALIDATION_ERROR", message: "Envie um arquivo." }, { status: 422 });
    const focalPointX = Number(form.get("focalPointX") ?? 50);
    const focalPointY = Number(form.get("focalPointY") ?? 50);
    const result = await saveMagnoPhoto(file, focalPointX, focalPointY);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireRole("AUTHOR");
    const body = await request.json();
    const result = await updateMagnoFocalPoint(body);
    return NextResponse.json({ data: result });
  } catch (error) {
    return errorResponse(error);
  }
}
