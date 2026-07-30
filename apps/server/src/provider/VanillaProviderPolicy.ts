/**
 * Fork policy: providers run as native sessions with T3 acting only as a
 * UI/control surface. GUI token consumption must match the native CLI — no
 * T3-added prompt context, MCP servers, or auxiliary model calls. Keep this
 * file tiny and audit every upstream rebase against these invariants.
 */
export const VANILLA_CODEX = {
  enabled: true,
  injectT3PreviewMcp: false,
  useT3DeveloperInstructions: false,
  allowFreshThreadFallbackAfterResumeFailure: false,
  runFirstTurnAuxiliaryAi: false,
} as const;

export const VANILLA_CLAUDE = {
  enabled: true,
  injectT3PreviewMcp: false,
} as const;

export const VANILLA_OPENCODE = {
  enabled: true,
  injectT3PreviewMcp: false,
} as const;

/**
 * Driver kinds whose first-turn title/branch generation calls are disabled.
 * Those calls fork extra model requests on the first user turn; vanilla
 * threads keep their seeded title and temporary worktree branch name.
 */
const FIRST_TURN_AUXILIARY_AI_VANILLA_DRIVERS: ReadonlySet<string> = new Set([
  "codex",
  "claudeAgent",
  "opencode",
]);

export function shouldRunFirstTurnAuxiliaryAi(driverKind: string): boolean {
  return !FIRST_TURN_AUXILIARY_AI_VANILLA_DRIVERS.has(driverKind);
}
