import { isValidLocale, supportedLocales } from "@/lib/i18n";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    redirect("/en");
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center"
      style={{ background: "var(--color-background)" }}
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{ background: "var(--color-primary)" }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="w-12 h-12"
          aria-hidden="true"
        >
          <polygon
            points="20,4 23,14 34,14 25,21 28,32 20,25 12,32 15,21 6,14 17,14"
            fill="white"
          />
        </svg>
      </div>
      <h1
        className="text-4xl font-bold"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-primary)",
        }}
      >
        LilGenius
      </h1>
      <p
        className="text-xl"
        style={{ color: "var(--color-text)", opacity: 0.7 }}
      >
        Learn. Play. Discover. Create.
      </p>
      <p
        className="text-base max-w-md"
        style={{ color: "var(--color-text)", opacity: 0.5 }}
      >
        The full landing page experience is coming soon. Foundation is ready.
      </p>
    </div>
  );
}
