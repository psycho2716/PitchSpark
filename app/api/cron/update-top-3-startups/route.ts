import { updateTop3StartupsPlaylist } from "@/app/actions/update-top-3-startups";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await updateTop3StartupsPlaylist();

    if (result.success) {
      revalidatePath("/");
      return NextResponse.json({
        message: "Top 3 Startups playlist updated successfully",
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
