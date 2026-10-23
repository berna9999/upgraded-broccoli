import { fillTemplate, formatDate } from "@/lib/format";
import type { LegalDocument } from "@/types/restaurant";

interface LegalPageProps {
  doc: LegalDocument;
  vars: Record<string, string>;
  locale: string;
  labels: { lastUpdated: string; backHome: string };
}

export function LegalPage({ doc, vars, locale, labels }: LegalPageProps) {
  const fill = (text: string) => fillTemplate(text, vars);

  return (
    <article className="container max-w-3xl pb-24 pt-36 sm:pt-44">
      <a href="/" className="text-sm text-primary underline-offset-4 hover:underline">
        ← {labels.backHome}
      </a>
      <h1 className="mt-6 font-heading text-4xl font-medium sm:text-5xl">{doc.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {labels.lastUpdated}: <time dateTime={doc.updatedAt}>{formatDate(doc.updatedAt, locale)}</time>
      </p>
      {doc.intro && <p className="mt-8 text-lg leading-relaxed">{fill(doc.intro)}</p>}
      {doc.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-heading text-2xl font-medium">{section.heading}</h2>
          <div className="mt-3 space-y-3 leading-relaxed text-muted">
            {section.body.map((paragraph, i) => (
              <p key={i}>{fill(paragraph)}</p>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
