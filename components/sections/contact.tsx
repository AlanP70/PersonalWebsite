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
    <section aria-label="Contact" className="section-container py-14 sm:py-16">
      <SectionHeading>Contact</SectionHeading>
      <p className="-mt-4 mb-8 max-w-xl text-muted-foreground">
        Open to internship opportunities — reach out anytime.
      </p>
      <ul className="flex flex-col gap-3 text-sm">
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
                className="inline-flex items-center gap-2.5 font-medium text-foreground/90 transition-colors hover:text-foreground"
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
