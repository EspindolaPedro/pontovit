import { NextResponse } from "next/server";
import { errorResponse } from "@/server/http/errors";
import { listCategories } from "@/server/modules/categories/category.service";
export async function GET() { try { return NextResponse.json({ data: await listCategories() }); } catch (error) { return errorResponse(error); } }
