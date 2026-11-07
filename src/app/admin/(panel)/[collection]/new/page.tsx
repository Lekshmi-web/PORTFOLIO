import Link from "next/link";
import { notFound } from "next/navigation";
import { ItemForm } from "@/components/admin/ItemForm";
import { getCollection } from "@/lib/admin/collections";

type Props = { params: Promise<{ collection: string }> };

export default async function NewItemPage({ params }: Props) {
  const { collection } = await params;
  const config = getCollection(collection);
  if (!config) notFound();

  return (
    <div className="max-w-6xl">
      <Link href={`/admin/${config.key}`} className="font-grotesk text-sm text-ink/60 hover:text-violet">
        ← {config.label}
      </Link>
      <h1 className="mb-8 mt-3 font-display text-4xl">New {config.singular.toLowerCase()}</h1>
      <ItemForm config={config} id={null} item={null} />
    </div>
  );
}
