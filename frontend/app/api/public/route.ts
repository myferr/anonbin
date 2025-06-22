// app/api/public/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const tunnel = process.env.CF_TUNNEL_URL;
  if (!tunnel) {
    return NextResponse.json(
      { error: "Tunnel URL not configured." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${tunnel}/public`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch from Lua backend." },
      { status: 502 }
    );
  }
}
