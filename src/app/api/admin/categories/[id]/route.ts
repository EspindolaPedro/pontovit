import { NextResponse } from "next/server";
import { requireRole } from "@/server/auth/authorization";
import { errorResponse } from "@/server/http/errors";
import { deleteCategory, updateCategory } from "@/server/modules/categories/category.service";
import { CategorySchema } from "@/server/validation/common";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    await requireRole("EDITOR");
    const { id } = await context.params;
    return NextResponse.json({ data: await updateCategory(id, CategorySchema.parse(await request.json())) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireRole("ADMIN");
    const { id } = await context.params;
    await deleteCategory(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
