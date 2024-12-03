import { updateMostViewedPlaylist } from "@/app/actions/update-most-viewed";
import { NextResponse } from "next/server";

export async function POST() {
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
