import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <div className="site min-h-screen">
      <Navbar name={settings.full_name} />
      <main id="main">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
