import * as NodeAssert from "node:assert/strict";

import { describe, it } from "vite-plus/test";

import { shouldRunFirstTurnAuxiliaryAi, VANILLA_CODEX } from "./VanillaCodexPolicy.ts";

describe("VanillaCodexPolicy", () => {
  it("enables vanilla Codex behavior with all augmentations off", () => {
    NodeAssert.equal(VANILLA_CODEX.enabled, true);
    NodeAssert.equal(VANILLA_CODEX.injectT3PreviewMcp, false);
    NodeAssert.equal(VANILLA_CODEX.useT3DeveloperInstructions, false);
    NodeAssert.equal(VANILLA_CODEX.allowFreshThreadFallbackAfterResumeFailure, false);
    NodeAssert.equal(VANILLA_CODEX.runFirstTurnAuxiliaryAi, false);
  });

  it("suppresses first-turn auxiliary AI for Codex only", () => {
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("codex"), false);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("claude"), true);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("claudeAgent"), true);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("cursor"), true);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("grok"), true);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("opencode"), true);
  });
});
