import { ButtonLink } from "@/components/ui/ButtonLink";
import { restaurant } from "@/lib/config";

export default function NotFound() {
  const { labels } = restaurant;
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-40 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-heading text-4xl font-medium sm:text-5xl">{labels.notFoundTitle}</h1>
      <p className="mt-4 max-w-md text-muted">{labels.notFoundText}</p>
      <ButtonLink href="/" className="mt-10">
        {labels.backHome}
      </ButtonLink>
    </section>
  );
}
