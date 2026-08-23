import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Status snapshot",
  description: "What CupraFlow's local status command and socket expose today.",
};

export default function MetricsPage() {
  return (
    <Prose>
      <h1>Status snapshot</h1>
      <p>
        CupraFlow does not export OTLP telemetry — it&apos;s a load balancer, not a monitoring
        agent. What it does expose is a local status snapshot, readable via the{" "}
        <code>status</code> and <code>top</code> commands, describing the load balancer&apos;s
        current configuration.
      </p>

      <CodeBlock code={`cupraflow status`} language="bash" />
      <CodeBlock
        code={`{
  "agent": "cupraflow",
  "version": "0.1.3",
  "state": "running",
  "since_unix": 1755970483,
  "details": {
    "loadbalancer_enabled": false,
    "backends": 0
  }
}`}
        language="json"
        filename="Output"
        showCopy={false}
      />

      <h2>Fields</h2>
      <ul>
        <li><code>state</code> — <code>starting</code>, <code>running</code>, or <code>stopping</code>.</li>
        <li><code>details.loadbalancer_enabled</code> — mirrors <code>[loadbalancer].enabled</code> in <code>config.toml</code>.</li>
        <li><code>details.backends</code> — number of backends currently configured under <code>[[loadbalancer.backends]]</code>.</li>
      </ul>

      <Callout variant="warning">
        CupraFlow is early-stage: the config schema for backends, algorithm, and health-check
        interval already exists, but the actual proxying and health-check loop are not
        implemented yet. See the project{" "}
        <a
          href="https://github.com/securyblack/cupra-flow/blob/main/ROADMAP.md"
          target="_blank"
          rel="noreferrer"
        >
          roadmap
        </a>{" "}
        for what&apos;s planned.
      </Callout>
    </Prose>
  );
}
