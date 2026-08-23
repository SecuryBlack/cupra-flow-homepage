import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Configuration",
  description: "The config.toml reference for CupraFlow's Windows Service.",
};

export default function ConfigurationPage() {
  return (
    <Prose>
      <h1>Configuration</h1>
      <p>
        CupraFlow reads its configuration from a <code>config.toml</code> file. The installer
        writes a default one on first install; there are no environment variable overrides for
        agent settings (only <code>RUST_LOG</code> for log verbosity is read from the
        environment).
      </p>

      <Callout variant="info">
        CupraFlow currently ships as a Windows Service. The default config location is{" "}
        <code>C:\ProgramData\CupraFlow\config.toml</code>.
      </Callout>

      <h2>config.toml reference</h2>
      <CodeBlock
        code={`version = "0.1.3"

[server]
port          = 8080
bind_address  = "0.0.0.0"

[logging]
level  = "info"    # trace, debug, info, warn, error
format = "pretty"  # or "json"

[service]
name        = "CupraFlow"
description = "Agente de gestion de red y balanceo de carga"
startup     = "auto"

[loadbalancer]
enabled                = false
algorithm              = "round_robin"
health_check_interval  = 30

[[loadbalancer.backends]]
name    = "backend-1"
address = "10.0.0.10:8080"
weight  = 1

[update]
channel           = "stable"
check_on_startup  = false
check_interval    = 86400
github_repo       = "securyblack/cupra-flow"`}
        language="toml"
        filename="config.toml"
      />

      <Callout variant="warning">
        The <code>[update]</code> section is reserved for a future auto-updater and is not
        currently read by the agent — see{" "}
        <a href="/docs/auto-update">Updating CupraFlow</a> for how to upgrade today.
      </Callout>

      <h2>Section reference</h2>
      <ul>
        <li>
          <code>[server]</code> — the address and port CupraFlow binds its management/status
          interface to.
        </li>
        <li>
          <code>[logging]</code> — verbosity and output format. <code>RUST_LOG</code>, if set,
          overrides <code>level</code>.
        </li>
        <li>
          <code>[service]</code> — Windows Service registration metadata (display name,
          description, startup type).
        </li>
        <li>
          <code>[loadbalancer]</code> — whether load balancing is active, the distribution
          algorithm, health-check interval, and the list of backend targets under{" "}
          <code>[[loadbalancer.backends]]</code>.
        </li>
        <li>
          <code>[update]</code> — reserved for a future auto-updater (not yet implemented).
        </li>
      </ul>

      <h2>Validate your config</h2>
      <p>Check that a config file parses correctly and see a summary of its contents:</p>
      <CodeBlock code={`cupraflow check --config C:\\ProgramData\\CupraFlow\\config.toml`} language="powershell" />
    </Prose>
  );
}
