"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ViewPastePage() {
  const { id } = useParams() as { id: string };
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/view/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Not found")))
      .then((data) => setContent(data.content))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="p-6 min-h-screen">
      <h1 className="text-lg mb-4">$ cat /view/{id}</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      {!loading && !error && (
        <pre className="whitespace-pre-wrap">{content}</pre>
      )}
      <Button className="mt-6" onClick={() => (window.location.href = "/")}>
        $ cd ..
      </Button>
    </main>
  );
}
