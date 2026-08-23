export type ReleaseType = "major" | "minor" | "patch";

export interface ChangelogEntry {
  version: string;
  date: string;
  type: ReleaseType;
  summary: string;
  sections: {
    label: "Added" | "Fixed" | "Changed" | "Removed" | "Security";
    items: string[];
  }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.1.3",
    date: "2026-08-23",
    type: "patch",
    summary: "Consume sb-agent-core from crates.io instead of a git dependency.",
    sections: [
      {
        label: "Changed",
        items: [
          "The shared `sb-agent-core` runtime is now pulled from crates.io as a versioned dependency instead of a git branch reference, matching normal Rust dependency practice.",
        ],
      },
    ],
  },
  {
    version: "0.1.2",
    date: "2026-08-23",
    type: "minor",
    summary: "Partial retrofit onto sb-agent-core: shared config loading, a logging bug fix, and a new local status socket + TUI.",
    sections: [
      {
        label: "Added",
        items: [
          "New `top` CLI command that opens a live, auto-refreshing terminal view of the running agent's status (state, version, uptime, load balancer backends).",
          "`status` command now also prints the JSON snapshot from the local status socket alongside the existing service information.",
        ],
      },
      {
        label: "Fixed",
        items: [
          "The `level` setting under `[logging]` in `config.toml` was loaded but never actually applied — logging always fell back to the hardcoded default. The configured level now takes effect as documented.",
        ],
      },
      {
        label: "Changed",
        items: [
          "Config loading now goes through the shared `sb-agent-core` crate used by SecuryBlack's other Rust agents (same default-on-missing behavior as before). CupraFlow's Windows service registration and its lack of an auto-updater are unchanged — both are genuinely different from the other agents and were left as-is.",
        ],
      },
    ],
  },
  {
    version: "0.1.1",
    date: "2026-07-21",
    type: "patch",
    summary: "Renamed to cupra-flow, Apache 2.0 licensing audit, and version auto-write in config.toml.",
    sections: [
      {
        label: "Changed",
        items: [
          "Repository and binary renamed from `cupraflow` to `cupra-flow` for consistency with SecuryBlack's other agents.",
          "Standardized on the Apache 2.0 license, matching OxiPulse, Ferro Sentry and Nexus Agent.",
          "The agent now writes its running version into `config.toml` on startup, matching the behavior already shipped in the other agents.",
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-05-01",
    type: "minor",
    summary: "Initial public release. Windows Service integration, PowerShell installer, and automated release pipeline.",
    sections: [
      {
        label: "Added",
        items: [
          "CLI built on `clap` with `install` / `uninstall` / `start` / `stop` / `status` / `check` / `version` subcommands.",
          "Native Windows Service Manager integration via the `windows-service` crate, with file logging to `C:\\ProgramData\\CupraFlow` when running as a service.",
          "Config discovery across multiple paths: executable directory, `config/`, and `ProgramData`.",
          "One-line PowerShell installer, modeled after OxiPulse's installer.",
          "Automated cross-platform build and release pipeline (GitHub Actions) producing signed ZIP archives with SHA256 checksums.",
          "Apache 2.0 license.",
        ],
      },
    ],
  },
];
