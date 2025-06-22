"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function UploadPage() {
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setSubmitting(true);
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, public: isPublic }),
    });

    const data = await res.json();
    setSubmitting(false);
    if (data.id) router.push(`/view/${data.id}`);
  }

  return (
    <main className="p-6 min-h-screen">
      <h1 className="text-xl mb-4">$ echo "paste" &gt; /dev/null</h1>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
        className="mb-4"
      />

      <div className="flex items-center gap-2 mb-4">
        <Checkbox
          id="public"
          checked={isPublic}
          onCheckedChange={(v) => setIsPublic(!!v)}
        />
        <Label htmlFor="public">Make paste public</Label>
      </div>

      <Button disabled={submitting} onClick={handleSubmit}>
        Submit
      </Button>
    </main>
  );
}
