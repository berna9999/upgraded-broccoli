import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { restaurant } from "@/lib/config";
import { toLocaleTag } from "@/lib/format";
import { legalVars } from "@/lib/seo";

export const metadata: Metadata = {
  title: restaurant.legal.cookie.title,
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      doc={restaurant.legal.cookie}
      vars={legalVars(restaurant)}
      locale={toLocaleTag(restaurant.meta.locale)}
      labels={restaurant.labels}
    />
  );
}
