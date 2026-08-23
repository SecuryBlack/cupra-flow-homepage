import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Quick Start",
  description: "Install CupraFlow on Windows in under 5 minutes.",
};

export default function QuickStart() {
  return (
    <Prose>
      <h1>Quick Start</h1>
      <p>
        CupraFlow currently ships as a Windows Service. This guide gets it installed and
        registered in under 5 minutes.
      </p>

      <Callout variant="warning">
        CupraFlow is early-stage software: the load balancer configuration schema (backends,
        algorithm, health checks) exists, but real traffic proxying isn&apos;t implemented yet.
        Install it today to get familiar with the CLI and configuration format.
      </Callout>

      <h2>Step 1 — Install</h2>
      <p>Run as Administrator in PowerShell:</p>
      <CodeBlock
        code={`irm https://install.cupraflow.dev | iex`}
        language="powershell"
        filename="PowerShell (Administrator)"
      />
      <p>
        The installer detects your architecture, downloads the latest release, writes a default{" "}
        <code>config.toml</code> to <code>C:\ProgramData\CupraFlow\</code>, and registers
        CupraFlow as a Windows Service with automatic restart.
      </p>

      <h2>Step 2 — Verify the service is running</h2>
      <CodeBlock code={`Get-Service -Name CupraFlow`} language="powershell" />
      <CodeBlock
        code={`Status   Name               DisplayName
------   ----               -----------
Running  CupraFlow          CupraFlow`}
        language="powershell"
        filename="Expected output"
        showCopy={false}
      />

      <h2>Step 3 — Check the agent's own status</h2>
      <CodeBlock code={`cupraflow status`} language="powershell" />
      <p>
        Or open a live-refreshing view with <code>cupraflow top</code>. See{" "}
        <a href="/docs/cli">CLI & live status</a> for details.
      </p>

      <h2>Step 4 — Validate your configuration</h2>
      <p>Edit backends and settings in the config file, then validate it:</p>
      <CodeBlock
        code={`cupraflow check --config C:\\ProgramData\\CupraFlow\\config.toml`}
        language="powershell"
      />

      <h2>Logs</h2>
      <CodeBlock
        code={`Get-Content C:\\ProgramData\\CupraFlow\\cupraflow.log.* -Tail 20`}
        language="powershell"
      />

      <Callout variant="success">
        That&apos;s it — CupraFlow is installed, registered as a Windows Service, and ready to
        configure.
      </Callout>

      <h2>Next steps</h2>
      <ul>
        <li>
          <a href="/docs/configuration">Configuration reference</a> — the full{" "}
          <code>config.toml</code> schema
        </li>
        <li>
          <a href="/docs/offline-buffer">Backends & health checks</a> — how to declare backends
        </li>
        <li>
          <a href="/docs/auto-update">Updating CupraFlow</a> — no auto-updater yet, how to upgrade
        </li>
      </ul>
    </Prose>
  );
}
