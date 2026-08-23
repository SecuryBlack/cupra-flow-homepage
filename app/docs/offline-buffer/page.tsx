import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Backends & Health Checks",
  description: "How CupraFlow's backend and health-check configuration works today.",
};

export default function OfflineBufferPage() {
  return (
    <Prose>
      <h1>Backends & health checks</h1>
      <p>
        Backends are configured under <code>[loadbalancer]</code> in <code>config.toml</code>,
        one <code>[[loadbalancer.backends]]</code> block per target:
      </p>
      <CodeBlock
        code={`[loadbalancer]
enabled                = true
algorithm               = "round_robin"
health_check_interval   = 30

[[loadbalancer.backends]]
name    = "web-1"
address = "10.0.0.10:8080"
weight  = 1

[[loadbalancer.backends]]
name    = "web-2"
address = "10.0.0.11:8080"
weight  = 1`}
        language="toml"
      />

      <Callout variant="warning">
        This configuration schema exists today, and <code>cupraflow check</code> will validate
        and print it back to you — but the actual traffic proxying and periodic health-check
        loop that would use <code>health_check_interval</code> are not implemented yet. CupraFlow
        is early-stage software; see the{" "}
        <a
          href="https://github.com/securyblack/cupra-flow/blob/main/ROADMAP.md"
          target="_blank"
          rel="noreferrer"
        >
          roadmap
        </a>{" "}
        for what&apos;s planned next.
      </Callout>

      <h2>Inspect current backend count</h2>
      <p>
        Until proxying is live, the fastest way to confirm your backends parsed correctly is{" "}
        <code>check</code> or the local status snapshot:
      </p>
      <CodeBlock code={`cupraflow check --config C:\\ProgramData\\CupraFlow\\config.toml`} language="powershell" />
    </Prose>
  );
}
