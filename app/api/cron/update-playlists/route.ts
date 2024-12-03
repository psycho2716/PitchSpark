import { updateMostViewedPlaylist } from "@/app/actions/update-most-viewed";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    try {
        const result = await updateMostViewedPlaylist();

        if (result.success) {
            return NextResponse.json({ message: "Playlist updated successfully" });
        } else {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
