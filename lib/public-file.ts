import fs from "node:fs";
import path from "node:path";

// Server-only: does a file exist under /public? Lets sections opt into a real
// asset (logo, screenshot) when it's present and fall back to a generated
// placeholder when it isn't — so nothing 404s or renders blank in the meantime.
export function publicFileExists(rel: string): boolean {
  const clean = rel.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", clean));
}
