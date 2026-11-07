export function SetupNotice() {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p className="font-display text-2xl">Connect Supabase to use the admin panel</p>
      <p>The public site is running on sample content. To edit content yourself:</p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Create a free project at supabase.com.</li>
        <li>
          In the SQL Editor, run <code className="rounded bg-lavender px-1">supabase/migrations/0001_init.sql</code>, then{" "}
          <code className="rounded bg-lavender px-1">supabase/seed.sql</code>.
        </li>
        <li>
          Copy <code className="rounded bg-lavender px-1">.env.example</code> to{" "}
          <code className="rounded bg-lavender px-1">.env.local</code> and paste your project URL and anon key.
        </li>
        <li>Restart <code className="rounded bg-lavender px-1">npm run dev</code>.</li>
      </ol>
      <p className="text-ink/60">Full steps are in README.md.</p>
    </div>
  );
}
