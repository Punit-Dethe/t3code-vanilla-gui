import * as NodeAssert from "node:assert/strict";

import { describe, it } from "vite-plus/test";

import {
  shouldRunFirstTurnAuxiliaryAi,
  VANILLA_CLAUDE,
  VANILLA_CODEX,
  VANILLA_OPENCODE,
} from "./VanillaProviderPolicy.ts";

describe("VanillaProviderPolicy", () => {
  it("enables vanilla behavior with all augmentations off", () => {
    NodeAssert.equal(VANILLA_CODEX.enabled, true);
    NodeAssert.equal(VANILLA_CODEX.injectT3PreviewMcp, false);
    NodeAssert.equal(VANILLA_CODEX.useT3DeveloperInstructions, false);
    NodeAssert.equal(VANILLA_CODEX.allowFreshThreadFallbackAfterResumeFailure, false);
    NodeAssert.equal(VANILLA_CODEX.runFirstTurnAuxiliaryAi, false);
    NodeAssert.equal(VANILLA_CLAUDE.enabled, true);
    NodeAssert.equal(VANILLA_CLAUDE.injectT3PreviewMcp, false);
    NodeAssert.equal(VANILLA_OPENCODE.enabled, true);
    NodeAssert.equal(VANILLA_OPENCODE.injectT3PreviewMcp, false);
  });

  it("suppresses first-turn auxiliary AI for vanilla drivers only", () => {
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("codex"), false);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("claudeAgent"), false);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("opencode"), false);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("cursor"), true);
    NodeAssert.equal(shouldRunFirstTurnAuxiliaryAi("grok"), true);
  });
});
