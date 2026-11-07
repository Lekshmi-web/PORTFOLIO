import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { getAdminStatus } from "@/lib/admin/auth";

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const status = await getAdminStatus();
  if (status.state === "admin") redirect("/admin");
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="font-display text-3xl">
          Lekshmi <span className="italic text-violet">R</span>
          <span className="text-pink">.</span>
        </Link>
        <h1 className="mt-8 font-display text-4xl">Admin sign in</h1>
        <p className="mt-2 text-ink/60">Manage your website content.</p>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8">
          {status.state === "not-configured" ? <SetupNotice /> : <LoginForm next={next ?? "/admin"} />}
        </div>
      </div>
    </div>
  );
}
