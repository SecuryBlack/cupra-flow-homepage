import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "CLI & Live Status",
  description: "CupraFlow's command line: install, service control, config check, and a live status view.",
};

export default function CliPage() {
  return (
    <Prose>
      <h1>CLI & live status</h1>
      <p>
        CupraFlow ships its own <code>clap</code>-based CLI rather than the shared{" "}
        <code>--version</code>/<code>status</code>/<code>top</code> dispatcher used by
        OxiPulse, Ferro Sentry, and Nexus Agent — but as of v0.1.2 it exposes the same status
        socket underneath.
      </p>

      <h2>Subcommands</h2>
      <CodeBlock
        code={`cupraflow install     # register the Windows Service
cupraflow uninstall   # unregister it
cupraflow start        # start via the Service Control Manager
cupraflow stop         # stop via the Service Control Manager
cupraflow status       # print service info + local status socket snapshot
cupraflow top          # live-refreshing terminal view of the status socket
cupraflow check        # validate config.toml and print a summary
cupraflow version      # print version info`}
        language="bash"
      />

      <h2><code>status</code></h2>
      <p>Prints the service info alongside a JSON snapshot from the local status socket:</p>
      <CodeBlock
        code={`cupraflow status`}
        language="powershell"
      />
      <CodeBlock
        code={`Estado del servicio CupraFlow:
  Nombre:      CupraFlow
  Descripcion: Agente de gestion de red y balanceo de carga
  Estado:      Usa 'sc query CupraFlow' para ver estado real
  API:         0.0.0.0:8080
  Socket:      {
  "agent": "cupraflow",
  "version": "0.1.3",
  "state": "running",
  "since_unix": 1755970483,
  "details": {
    "loadbalancer_enabled": false,
    "backends": 0
  }
}`}
        language="bash"
        filename="Output"
        showCopy={false}
      />

      <h2><code>top</code></h2>
      <p>
        Opens a live, auto-refreshing terminal view backed by the same status socket. Press{" "}
        <code>q</code> or <code>Esc</code> to quit.
      </p>
      <CodeBlock code={`cupraflow top`} language="powershell" />

      <Callout variant="info">
        <code>status</code> and <code>top</code> only reflect reality while the CupraFlow service
        is running — they read a local socket, not a remote API.
      </Callout>
    </Prose>
  );
}
