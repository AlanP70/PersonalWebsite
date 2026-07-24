import type { Project } from "@/lib/data/projects";

// Pure, client-safe helpers shared by the Projects gallery and the detail modal
// (no fs / server-only imports, so both the server section and the client
// components can use them).

// Strip authoring placeholders like "[add metric — …]" so the public gallery
// never shows a to-do note; the real copy is otherwise untouched.
export function cleanDescription(text: string): string {
  return text.replace(/\s*\[[^\]]*\]/g, "").trim();
}

// Honest live-status readout for the cover band: a real "Live" badge lights the
// crimson pulse; any public link reads "Online"; neither means it's "Private".
export type CoverStatus = { label: string; tone: "live" | "online" | "idle" };
export function coverStatus(project: Project): CoverStatus {
  if (project.badges?.includes("Live")) return { label: "Live", tone: "live" };
  if (project.link) return { label: "Online", tone: "online" };
  return { label: "Private", tone: "idle" };
}
