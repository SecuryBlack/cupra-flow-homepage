import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "Updating CupraFlow",
  description: "CupraFlow does not self-update — how to check your version and upgrade manually.",
};

export default function AutoUpdatePage() {
  return (
    <Prose>
      <h1>Updating CupraFlow</h1>

      <Callout variant="warning">
        Unlike OxiPulse, Ferro Sentry, and Nexus Agent, CupraFlow does <strong>not</strong> include
        a background auto-updater yet. You need to re-run the installer to pick up a new release.
      </Callout>

      <h2>Check your current version</h2>
      <CodeBlock code={`cupraflow version`} language="bash" />

      <h2>Upgrade on Windows</h2>
      <p>
        Re-running the installer downloads the latest release, stops the running service, replaces
        the binary, and restarts it — your existing <code>config.toml</code> is left untouched.
      </p>
      <CodeBlock
        code={`irm https://install.cupraflow.dev | iex`}
        language="powershell"
        filename="PowerShell (run as Administrator)"
      />

      <h2>Manual upgrade</h2>
      <p>
        If you prefer not to re-run the installer, you can download a specific release directly
        from GitHub and swap the binary yourself:
      </p>
      <CodeBlock
        code={`# Stop the service first
Stop-Service CupraFlow

# Download and extract the release you want, then replace:
# C:\\Program Files\\CupraFlow\\cupraflow.exe

Start-Service CupraFlow`}
        language="powershell"
      />
      <p>
        Releases are published at{" "}
        <a
          href="https://github.com/securyblack/cupra-flow/releases"
          target="_blank"
          rel="noreferrer"
        >
          github.com/securyblack/cupra-flow/releases
        </a>
        .
      </p>

      <Callout variant="info">
        An automatic updater — matching what OxiPulse, Ferro Sentry, and Nexus Agent already have
        via the shared <code>sb-agent-core</code> runtime — is on the roadmap but not implemented
        yet.
      </Callout>
    </Prose>
  );
}
