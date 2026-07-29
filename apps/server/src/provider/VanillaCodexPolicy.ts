/**
 * Fork policy: Codex must run as a native app-server session with T3 acting
 * only as a UI/control surface. Keep this file tiny and audit every upstream
 * rebase against the invariants below.
 */
export const VANILLA_CODEX = {
  enabled: true,
  injectT3PreviewMcp: false,
  useT3DeveloperInstructions: false,
  allowFreshThreadFallbackAfterResumeFailure: false,
  runFirstTurnAuxiliaryAi: false,
} as const;

export function shouldRunFirstTurnAuxiliaryAi(driverKind: string): boolean {
  return !(
    VANILLA_CODEX.enabled &&
    driverKind === "codex" &&
    !VANILLA_CODEX.runFirstTurnAuxiliaryAi
  );
}
