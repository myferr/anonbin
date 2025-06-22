export default function PrivacyPage() {
  return (
    <main className="p-6 min-h-screen">
      <h1 className="text-lg text-muted-foreground/50 mb-4 mt-6 pointer-events-none">
        $ cat ~/privacy-policy.txt
      </h1>
      <pre className="whitespace-pre-wrap">
        {`Privacy Policy
Effective Date: June 21, 2025
Project: anonbin (https://github.com/myferr/anonbin)

anonbin respects your privacy by design. Here's what we do and don't do:

• We do NOT collect personal information.
• We do NOT use cookies or trackers.
• We do NOT use analytics or ads.
• We do NOT store IPs long-term.

When you submit a paste:
• The content is saved with a random ID.
• Public pastes are listed; private ones are only accessible by link.
• Content may be deleted at any time.

There is no guarantee of privacy, persistence, or confidentiality.
If abusive or illegal content is discovered, it may be removed.`}
      </pre>
    </main>
  );
}
