import { ButtonLink } from "@/components/ui";
import { isEnabled } from "@/lib/menu";

export default function NotFound() {
  return (
    <section className="grid-glow -mt-16 grid min-h-[80svh] place-items-center px-4 pt-16 text-center lg:-mt-20">
      <div>
        <p className="font-display text-7xl font-bold text-gradient sm:text-8xl">404</p>
        <h1 className="h-display mt-4 text-2xl text-white sm:text-3xl">This page took a wrong turn</h1>
        <p className="mt-3 text-mist">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          {isEnabled("services") && (
            <ButtonLink href="/services" variant="outline">
              View services
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
