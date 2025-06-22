export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const tunnel = process.env.CF_TUNNEL_URL;
  const id = params.id;

  const res = await fetch(`${tunnel}/view/${id}`);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
