import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const tunnel = process.env.CF_TUNNEL_URL;

  const id = request.nextUrl.pathname.split("/").pop();

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const res = await fetch(`${tunnel}/view/${id}`);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Fetch failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
