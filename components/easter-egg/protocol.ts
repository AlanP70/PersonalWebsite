// Shared "was the Konami protocol activated" flag, exposed as a
// useSyncExternalStore-compatible store so the header's SYSTEM NOTE readout can
// reflect activation without prop-drilling through the shell. The Konami
// listener lives outside SiteShell (mounted in layout.tsx), so an event-free
// module store is the lightest bridge between the two. Once flipped it stays
// true for the session — closing the terminal doesn't reset it.
let activated = false;
const listeners = new Set<() => void>();

export function activateProtocol() {
  if (activated) return;
  activated = true;
  listeners.forEach((l) => l());
}

export function subscribeProtocol(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getProtocolActive() {
  return activated;
}
