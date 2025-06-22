import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const tunnel = process.env.CF_TUNNEL_URL;
  const body = await req.text();

  const luaRes = await fetch(`${tunnel}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const text = await luaRes.text();
  return new NextResponse(text, {
    status: luaRes.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
