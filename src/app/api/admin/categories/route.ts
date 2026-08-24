import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { createCategory, listCategories } from "@/server/modules/categories/category.service";
import { CategorySchema } from "@/server/validation/common";

export async function GET() {
  try {
    await requireRole("AUTHOR");
    return NextResponse.json({ data: await listCategories() });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireRole("EDITOR");
    const category = await createCategory(CategorySchema.parse(await request.json()));
    return NextResponse.json({ data: category }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
