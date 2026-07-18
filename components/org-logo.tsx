import { publicFileExists } from "@/lib/public-file";

// A square logo chip for Experience / Education rows. Renders the real
// organization logo (rendered as a monochrome silhouette via .org-logo so it
// fits the palette in both themes) when the file is present under /public,
// otherwise a clean initial-based monogram so a row never looks broken.
export function OrgLogo({ src, name }: { src?: string; name: string }) {
  const show = src ? publicFileExists(src) : false;

  return (
    <span
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-foreground/[0.03]"
    >
      {show ? (
        // eslint-disable-next-line @next/next/no-img-element -- small logo; the monochrome silhouette filter matters more than optimization, and a plain <img> avoids next/image's dangerouslyAllowSVG config.
        <img
          src={`/${src!.replace(/^\//, "")}`}
          alt=""
          className="org-logo size-6 object-contain"
        />
      ) : (
        <span className="font-heading text-sm font-semibold text-foreground/70">
          {name.charAt(0)}
        </span>
      )}
    </span>
  );
}
