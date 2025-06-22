export default function TermsPage() {
  return (
    <main className="p-6 min-h-screen">
      <h1 className="text-lg text-muted-foreground/50 mb-4 mt-6 pointer-events-none">
        $ cat ~/terms-of-service.txt
      </h1>
      <pre className="whitespace-pre-wrap">
        {`Terms of Service
Effective Date: June 21, 2025
Project: anonbin (https://github.com/myferr/anonbin)

1. No Accounts, No Ownership
You do not need to sign up to use anonbin. There are no accounts, and no ownership claims can be made over submitted content. All pastes are anonymous.

2. Content Responsibility
You are entirely responsible for what you paste. The creator(s), developer(s), or contributor(s) of anonbin do not actively monitor submissions.
However, harmful or illegal content such as doxing, threats, abuse, or content deemed unfit to stay may be removed without notice.

3. No Uptime or Storage Guarantee
anonbin is a free, experimental tool. Content may be deleted at any time without warning. There is no guarantee of permanence or availability.

4. No Liability
anonbin is provided "as is" without warranties of any kind. We are not liable for any damages or loss arising from the use of this service.`}
      </pre>
    </main>
  );
}
