import { FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { links } from "@/lib/data/links";

const channels = [
  {
    label: links.email,
    href: `mailto:${links.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: links.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    href: links.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "Resume",
    href: links.resume,
    icon: FileText,
    download: true,
  },
];

export function Contact() {
  return (
    <section aria-label="Contact" className="section-container section-pad">
      <SectionHeading sub="Open to Winter 2027 co-op — reach out anytime.">
        Contact
      </SectionHeading>
      {/* Roomier rows on a phone so each channel is a comfortable tap target;
          the desktop list keeps its tighter 12px rhythm. */}
      <ul className="-my-1 flex flex-col gap-4 text-sm sm:my-0 sm:gap-3">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...(channel.download ? { download: true } : {})}
                className="inline-flex items-center gap-2.5 py-1 font-medium text-foreground/90 transition-colors hover:text-accent-amber sm:py-0"
              >
                <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                {channel.label}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
