import type { Metadata } from "next";
import { EmptyState } from "@/components/site/EmptyState";
import { PageHeader } from "@/components/site/PageHeader";
import { Testimonials } from "@/components/site/sections/Testimonials";
import { getTestimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Feedback from students, mentees and collaborators.",
};

export default async function TestimonialsPage() {
  const items = await getTestimonials();
  return (
    <>
      <PageHeader
        label="Kind words"
        accent="pink"
        title={
          <>
            From students &amp; <span className="italic text-violet">collaborators</span>
          </>
        }
      />
      {items.length === 0 ? (
        <section className="container-x pb-24">
          <EmptyState text="Testimonials will appear here." />
        </section>
      ) : (
        <div className="-mt-16">
          <Testimonials testimonials={items} showHeading={false} />
        </div>
      )}
    </>
  );
}
