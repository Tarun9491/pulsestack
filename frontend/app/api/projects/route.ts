import { NextResponse } from "next/server";
import profile from "@/components/ProfileData";

export async function GET() {
    return NextResponse.json(profile.projects);
}
