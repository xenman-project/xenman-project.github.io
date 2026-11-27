// The XenMan documentation: one entry per page, in navigation order.
// Body HTML uses <h2 id> for sections (they make up "In this article"),
// <ol class="steps"> for procedures, and <p class="note">/<p class="important">.
// Build: node tools/build-docs.mjs

export const VERSION = "1.0.5";

const note = (t) => `<p class="note"><strong>Note:</strong> ${t}</p>`;
const important = (t) => `<p class="important"><strong>Important:</strong> ${t}</p>`;
const fig = (src, alt) => `<figure><img src="img/${src}" alt="${alt}" loading="lazy"><figcaption>${alt}</figcaption></figure>`;

export const pages = [
  {
    slug: "index",
    title: "XenMan overview",
    nav: "Overview",
    description: "What XenMan is, what it manages and how this documentation is organized.",
    body: `
<p>XenMan is a web-based management console for XenServer and XCP-ng. You use it to manage pools, hosts and virtual machines (VMs) from a browser, without installing a Windows client. Many workflows follow XenCenter, including its checks and wording.</p>

<h2 id="capabilities">Capabilities</h2>
<ul>
  <li><strong>Pools and hosts</strong> – manage several pools at once, enter maintenance mode, designate a new pool coordinator, add and remove servers.</li>
  <li><strong>Virtual machines</strong> – create, import, start, stop, migrate, copy and delete VMs. Edit CPU, memory, disks, networks and boot settings, and open the console in the browser.</li>
  <li><strong>Storage and networking</strong> – create and repair storage repositories (SRs), including iSCSI. Manage networks, bonds, VLANs and the management interface.</li>
  <li><strong>Updates</strong> – update hosts one by one, with VMs moved away and back automatically.</li>
  <li><strong>Snapshot schedules</strong> – take VM snapshots hourly, daily or weekly.</li>
  <li><strong>GPU and PVS-Accelerator</strong> – manage physical GPUs, vGPUs and PVS read caching.</li>
  <li><strong>Monitoring</strong> – performance graphs, alerts, Recent Tasks and an audit log.</li>
  <li><strong>Users and security</strong> – Administrator, Operator and Viewer roles, two-factor sign-in, Microsoft Entra ID sign-in and HTTPS only.</li>
</ul>

<h2 id="deployment-options">Deployment options</h2>
<p>XenMan is available in two forms:</p>
<ul>
  <li><strong>Appliance</strong> – a ready-to-import XenServer VM (Debian 13). Recommended for most installations. It includes signed in-place updates and automatic Debian security updates.</li>
  <li><strong>Docker container</strong> – the image <code>ghcr.io/xenman-project/xenman</code> for an existing container host.</li>
</ul>
<p>For details, see <a href="install.html">Install XenMan</a>.</p>

<h2 id="scope">Scope</h2>
<p>XenMan focuses on everyday pool and VM administration. The following tasks are not yet available: High Availability configuration, GFS2 clustered storage, OVF import, cross-pool storage migration, vApps, disaster recovery, Active Directory integration, Server Status Reports and Rolling Pool Upgrade. Keep XenCenter available for these tasks.</p>
${note("XenMan is in beta. It is used daily in production, but test it on a non-critical pool before you rely on it.")}

<h2 id="in-this-documentation">In this documentation</h2>
<ul>
  <li><a href="whats-new.html">What's new</a> – changes in the current release.</li>
  <li><a href="system-requirements.html">System requirements</a> – supported versions, sizing and network ports.</li>
  <li><a href="install.html">Install XenMan</a> and <a href="quick-start.html">Quick start</a> – from download to the first managed pool.</li>
  <li><a href="manage-vms.html">Manage VMs</a>, <a href="updates.html">Update hosts and XenMan</a>, <a href="users-and-roles.html">Users and roles</a> – daily tasks.</li>
  <li><a href="security.html">Security</a> and <a href="advanced.html">Advanced configuration</a> – certificates, stored passwords, NAT and reverse proxies.</li>
</ul>`,
  },

  {
    slug: "whats-new",
    title: "What's new",
    nav: "What's new",
    description: "New features and fixes in XenMan releases.",
    body: `
<p>This article describes the new features and fixes in recent XenMan releases. For the complete list, see the <a href="https://github.com/xenman-project/xenman/blob/main/CHANGELOG.md">changelog</a>.</p>

<h2 id="v1-0-5">XenMan 1.0.5</h2>
<p class="meta">Released November 27, 2026 · Beta</p>

<h3 id="snapshot-schedules">Snapshot schedules</h3>
<p>You can now take VM snapshots on a schedule: hourly, daily or weekly, keeping 1 to 10 snapshots per VM. For more information, see <a href="manage-vms.html#snapshot-schedules">Snapshot schedules</a>.</p>
${fig("snapshot-schedules.png", "Snapshot schedules of a pool")}

<h3 id="recent-tasks">Recent Tasks</h3>
<p>A Recent Tasks panel is docked at the bottom of every view. It lists running and finished tasks of the last 24 hours, including tasks started by XenCenter and other clients.</p>

<h3 id="configure-updates">Configure Updates</h3>
<p>You can now set the update channel, automatic synchronization and a proxy server per pool. For more information, see <a href="updates.html#configure-updates">Configure updates</a>.</p>

<h3 id="bulk-vm-actions">Bulk VM actions</h3>
<p>You can now start, shut down or reboot several VMs at once from the <strong>VMs</strong> tab of a pool or host.</p>

<h3 id="vm-tools">VM Tools details</h3>
<p>The VM overview shows the virtualization mode and the versions of the XenServer VM Tools and drivers.</p>

<h3 id="entra-id">Microsoft Entra ID sign-in</h3>
<p>Users can sign in with their Microsoft account. Their role comes from Entra ID app roles, and MFA is handled by Entra ID. For more information, see <a href="users-and-roles.html#entra-id">Sign in with Microsoft Entra ID</a>.</p>

<h3 id="single-host-updates">Updates on single-host pools</h3>
<p>On a pool with one host, the update can shut down running VMs and start them again afterwards.</p>

<h3 id="security-1-0-5">Security</h3>
<p>This release includes hardening from a security review. The XenServer session stays on the server, host restart and shutdown are restricted to administrators, and requests from other sites are refused.</p>

<h2 id="v1-0-4">XenMan 1.0.4</h2>
<p class="meta">Released November 16, 2026 · Beta</p>
<h3 id="nat">Pools behind NAT</h3>
<p>You can now manage pools at other sites that are reached through NAT, including consoles and performance graphs. For more information, see <a href="advanced.html#nat">Pools at other sites</a>.</p>
<h3 id="two-factor">Two-factor sign-in</h3>
<p>Users can protect their account with an authenticator app. Administrators can require it. For more information, see <a href="users-and-roles.html#two-factor">Two-factor sign-in</a>.</p>
<h3 id="pvs">PVS-Accelerator</h3>
<p>You can now manage PVS read caching per VM and the cache per PVS site and server.</p>
<h3 id="iscsi-scan">iSCSI target scan</h3>
<p>When you create an iSCSI SR, XenMan lists the target's IQNs and LUNs, so you no longer type them.</p>
<h3 id="new-coordinator">New pool coordinator</h3>
<p>When you put the pool coordinator into maintenance mode, XenMan offers a new coordinator, as XenCenter does.</p>`,
  },

  {
    slug: "system-requirements",
    title: "System requirements",
    nav: "System requirements",
    description: "Supported XenServer versions, browsers, appliance sizing and network ports.",
    body: `
<p>This article lists the requirements for running XenMan and for the systems it manages.</p>

<h2 id="managed-systems">Managed systems</h2>
<ul>
  <li>XenServer 8 or XCP-ng 8. XenMan is developed and tested on XenServer 8.4.</li>
  <li>XenServer 9. XenMan works with XenServer 9, but it is not yet fully tested.</li>
  <li>A user account on the pool with full administrative rights, typically <code>root</code>.</li>
</ul>

<h2 id="browsers">Browsers</h2>
<p>Use a current version of Microsoft Edge, Google Chrome, Mozilla Firefox or Safari. The browser must allow cookies and WebSocket connections to XenMan.</p>

<h2 id="appliance-sizing">Appliance sizing</h2>
<table>
  <thead><tr><th>Resource</th><th>Default</th></tr></thead>
  <tbody>
    <tr><td>vCPUs</td><td>2</td></tr>
    <tr><td>Memory</td><td>2 GB</td></tr>
    <tr><td>Disk</td><td>20 GB (about 1.5 GB used after import)</td></tr>
    <tr><td>Operating system</td><td>Debian 13, minimal</td></tr>
  </tbody>
</table>
${note("For the Docker container, plan the same memory. XenMan requires Node.js 24 when you run it without a container.")}

<h2 id="ports">Network ports</h2>
<table>
  <thead><tr><th>Direction</th><th>Port</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td>Browser → XenMan</td><td>443 (appliance) or 3001 (Docker)</td><td>Web interface over HTTPS</td></tr>
    <tr><td>Browser → XenMan</td><td>80 (appliance) or 3000 (Docker)</td><td>Redirect to HTTPS only</td></tr>
    <tr><td>XenMan → every host</td><td>443</td><td>XenAPI, consoles, performance data, imports</td></tr>
    <tr><td>XenMan → pool coordinator</td><td>22</td><td>Optional: VM export over SSH</td></tr>
    <tr><td>XenMan → mail server</td><td>25, 465 or 587</td><td>Optional: notifications and password resets</td></tr>
    <tr><td>XenMan → login.microsoftonline.com</td><td>443</td><td>Optional: Microsoft Entra ID sign-in</td></tr>
  </tbody>
</table>
${important("XenMan must reach every host of a pool directly, not only the coordinator. XenServer serves consoles and performance data from each host. For pools behind NAT, see <a href=\"advanced.html#nat\">Pools at other sites</a>.")}`,
  },

  {
    slug: "install",
    title: "Install XenMan",
    nav: "Install",
    description: "Install XenMan as a XenServer appliance or as a Docker container.",
    body: `
<p>You can install XenMan as an appliance on your XenServer pool or as a Docker container. The appliance is recommended: it includes signed in-place updates and automatic Debian security updates.</p>

<h2 id="appliance">Install the appliance</h2>
<p>To install the appliance:</p>
<ol class="steps">
  <li>Download <code>xenman-appliance-v${VERSION}.xva</code> from the <a href="https://github.com/xenman-project/xenman/releases/latest">latest release</a>. Compare its SHA-256 checksum with the value in the release notes.</li>
  <li>Import the file into your pool, either in XenCenter with <strong>File &gt; Import</strong> or on the command line:<br><code>xe vm-import filename=xenman-appliance-v${VERSION}.xva</code></li>
  <li>Start the VM. The console shows the IP address the appliance received by DHCP.</li>
  <li>Open <code>https://&lt;address&gt;/</code> in your browser and accept the self-signed certificate once.</li>
  <li>Sign in as <code>admin</code> with the password <code>admin</code>. XenMan asks for a new password before anything else opens.</li>
</ol>
${note("Without DHCP, sign in on the VM console as <code>root</code> with the password <code>xenman</code>. You must change the password, then a menu opens where you configure the network.")}

<h3 id="appliance-console">Appliance console menu</h3>
<p>The console menu shows and configures the network, tests connectivity, restarts XenMan or the appliance, resets an administrator's password or two-factor sign-in, and switches SSH access on or off. SSH is off by default.</p>

<h3 id="appliance-network">Change the network settings</h3>
<p>In XenMan, go to <strong>Settings &gt; Appliance &gt; Network</strong> to set DHCP or a static address, DNS servers and the host name. Changes are applied on probation: if you do not confirm the new address within 90 seconds, the previous settings return.</p>

<h2 id="docker">Install with Docker</h2>
<p>To run XenMan as a container:</p>
<ol class="steps">
  <li>Download the Compose file:<br><code>curl -O https://raw.githubusercontent.com/xenman-project/xenman/main/docker-compose.yml</code></li>
  <li>Start the container:<br><code>docker compose up -d</code></li>
  <li>Open <code>https://&lt;host&gt;:3001</code> and sign in as <code>admin</code> / <code>admin</code>. Choose a new password when prompted.</li>
</ol>
<p>Data persists in the <code>xen-data</code> volume. To pin a release, use an image tag such as <code>ghcr.io/xenman-project/xenman:v${VERSION}</code>.</p>

<h2 id="next-steps">Next steps</h2>
<p>Add your first pool as described in <a href="quick-start.html">Quick start</a>.</p>`,
  },

  {
    slug: "quick-start",
    title: "Quick start",
    nav: "Quick start",
    description: "Connect XenMan to your first pool and verify the host certificate.",
    body: `
<p>This article describes how to connect XenMan to a pool and what to do after the first sign-in.</p>

<h2 id="add-pool">Add a pool</h2>
<p>To add a pool:</p>
<ol class="steps">
  <li>Go to <strong>Settings &gt; Pools</strong> and select <strong>Add Host</strong>.</li>
  <li>Enter a name, the address of the pool coordinator, the port (443) and the credentials of a pool administrator, typically <code>root</code>.</li>
  <li>Select <strong>Save</strong>. XenMan shows the SHA-256 fingerprint of the coordinator's certificate.</li>
  <li>Compare the fingerprint with the value on the host, then trust the certificate. On the host, run:<br><code>openssl x509 -noout -fingerprint -sha256 -in /etc/xensource/xapi-ssl.pem</code></li>
</ol>
<p>XenMan learns the other hosts of the pool and their certificates over this verified connection. The pool appears in the navigation on the left.</p>
${important("Do not trust a fingerprint you have not compared. XenMan connects only to hosts that present a trusted certificate.")}

<h2 id="after-sign-in">After the first sign-in</h2>
<p>We recommend the following steps:</p>
<ul>
  <li><strong>Mail</strong> – configure an SMTP server under <strong>Settings &gt; Mail &amp; Logging</strong> for notifications and password resets.</li>
  <li><strong>Users</strong> – create accounts for your team under <strong>Users</strong> and assign roles and pools. See <a href="users-and-roles.html">Users and roles</a>.</li>
  <li><strong>Two-factor sign-in</strong> – turn it on for your account under <strong>Settings &gt; Account</strong>.</li>
  <li><strong>Certificate</strong> – replace the self-signed certificate under <strong>Settings &gt; Appliance &gt; HTTPS Certificate</strong>. See <a href="security.html#https">HTTPS certificate</a>.</li>
</ul>`,
  },

  {
    slug: "manage-vms",
    title: "Manage VMs",
    nav: "Manage VMs",
    description: "Console access, actions on several VMs and snapshot schedules.",
    body: `
<p>This article describes common VM tasks in XenMan. Operators and administrators can perform them. Viewers can see VMs but cannot change them.</p>

<h2 id="console">Open the console</h2>
<p>To open a VM's console, select the VM and select <strong>Console</strong>. The console opens in the browser and supports keyboard shortcuts such as Ctrl+Alt+Del and pasting text from the clipboard. For Windows VMs, you can also download an RDP file.</p>

<h2 id="several-vms">Start, shut down or reboot several VMs</h2>
<p>To act on several VMs at once:</p>
<ol class="steps">
  <li>Select a pool or a host, then the <strong>VMs</strong> tab.</li>
  <li>Select the check boxes of the VMs, or the check box in the header for all VMs.</li>
  <li>Select <strong>Start</strong>, <strong>Shut Down</strong> or <strong>Reboot</strong>. The buttons show how many of the selected VMs the action applies to.</li>
  <li>Confirm the action. For a shutdown, you can select <strong>Force shut down</strong>.</li>
</ol>
${fig("bulk-vms.png", "Several VMs selected in the VMs tab")}

<h2 id="snapshot-schedules">Snapshot schedules</h2>
<p>A snapshot schedule takes snapshots of its VMs hourly, daily or weekly and keeps the most recent 1 to 10. A VM can belong to one schedule only.</p>
<p>To create a snapshot schedule:</p>
<ol class="steps">
  <li>Select the pool, then the <strong>Snapshot Schedules</strong> tab.</li>
  <li>Select <strong>New Schedule</strong>.</li>
  <li>Enter a name and select the VMs.</li>
  <li>Select the snapshot type: <strong>Disk only snapshot</strong>, or <strong>Disk and memory snapshot</strong> where your license allows it.</li>
  <li>Select the frequency and the time. Times are in the pool coordinator's local time.</li>
  <li>Select how many snapshots to keep.</li>
  <li>Optionally, turn on <strong>Take the first snapshots now</strong>, then select <strong>Create Schedule</strong>.</li>
</ol>
${fig("snapshot-schedules.png", "The Snapshot Schedules tab")}
${note("Snapshot schedules require a XenServer license that includes them. Without it, XenMan says so and does not offer the action.")}
<p>The tab lists each schedule with its VMs, the next run in pool time and your local time, and the result of the last run. Use the buttons of a schedule to edit, disable, run it now or delete it. A VM's <strong>Snapshots</strong> tab shows the schedule it belongs to.</p>

<h2 id="vm-tools">VM Tools details</h2>
<p>The overview of a VM shows the virtualization mode and state, and the versions of the XenServer VM Tools Management Agent and drivers. Use it to check whether a VM runs current tools.</p>
${fig("vm-tools.png", "Virtualization and VM Tools in a VM's overview")}`,
  },

  {
    slug: "updates",
    title: "Update hosts and XenMan",
    nav: "Updates",
    description: "Install XenServer updates on a pool, configure the update channel and update XenMan itself.",
    body: `
<p>This article describes how to update the XenServer hosts of a pool and how to keep XenMan itself up to date.</p>

<h2 id="update-hosts">Update XenServer hosts</h2>
<p>XenMan updates the hosts of a pool one at a time. Before a host is updated, its VMs are moved to other hosts. Afterwards they are moved back. Workload Balancing is paused during the update. Only administrators can install updates.</p>
<p>To install updates:</p>
<ol class="steps">
  <li>Select the pool, then the <strong>Updates</strong> tab.</li>
  <li>Select <strong>Check for Updates</strong> to synchronize with the update channel.</li>
  <li>Select <strong>Install Updates</strong>, review the plan and start it.</li>
</ol>
<p>The progress appears in the tab and in Recent Tasks. When the update finishes, or when it needs an administrator, XenMan sends an email if mail is configured.</p>
${note("On a pool with one host, VMs cannot be moved away. Turn on <strong>Shut down running VMs and start them again after the update</strong> in the dialog. VMs that do not shut down within 10 minutes are forced off.")}

<h2 id="configure-updates">Configure updates</h2>
<p>To set the update channel and synchronization for a pool:</p>
<ol class="steps">
  <li>Select the pool, then the <strong>Updates</strong> tab.</li>
  <li>Select <strong>Configure Updates</strong>.</li>
  <li>Select the update channel: <strong>Normal</strong> or <strong>Early Access</strong>.</li>
  <li>Optionally, turn on automatic synchronization, daily or weekly on a chosen day.</li>
  <li>Optionally, enter a proxy server for the synchronization, then select <strong>Save</strong>.</li>
</ol>
${fig("configure-updates.png", "The Configure Updates dialog")}

<h2 id="update-xenman">Update the XenMan appliance</h2>
<p>XenMan releases are published as signed update packages (<code>.xenup</code>). The appliance verifies the signature before it installs a package.</p>
<p>To update the appliance:</p>
<ol class="steps">
  <li>Download <code>xenman-v&lt;version&gt;.xenup</code> from the <a href="https://github.com/xenman-project/xenman/releases/latest">latest release</a>.</li>
  <li>In XenMan, go to <strong>Settings &gt; Appliance</strong> and select <strong>Upload update package</strong>.</li>
  <li>Select the file and confirm the installation. XenMan restarts and reconnects your browser.</li>
</ol>
<p>Debian security updates are installed automatically in a maintenance window that you set under <strong>Settings &gt; Appliance</strong>.</p>

<h2 id="update-docker">Update the Docker container</h2>
<p>Pull the new image and recreate the container:<br><code>docker compose pull &amp;&amp; docker compose up -d</code></p>`,
  },

  {
    slug: "users-and-roles",
    title: "Users and roles",
    nav: "Users and roles",
    description: "Roles and permissions, pool access, two-factor sign-in and Microsoft Entra ID.",
    body: `
<p>XenMan controls access with three roles. Administrators manage users under <strong>Users</strong>.</p>

<h2 id="roles">Roles and permissions</h2>
<table>
  <thead><tr><th>Role</th><th>Permissions</th></tr></thead>
  <tbody>
    <tr><td>Administrator</td><td>All tasks, including pools, hosts, storage, networking, updates, licensing, users and settings.</td></tr>
    <tr><td>Operator</td><td>VM tasks on the assigned pools: create, import, start, stop, migrate, snapshot, console and snapshot schedules.</td></tr>
    <tr><td>Viewer</td><td>Read-only access to the assigned pools.</td></tr>
  </tbody>
</table>
<p>Operators and viewers see only the pools that an administrator assigns to them under <strong>Users</strong>.</p>

<h2 id="add-user">Add a user</h2>
<p>To add a user:</p>
<ol class="steps">
  <li>Go to <strong>Users</strong> and select <strong>Add User</strong>.</li>
  <li>Enter the user name and select the role.</li>
  <li>For operators and viewers, select the pools.</li>
  <li>Set a password, or send an invitation by email if mail is configured.</li>
</ol>

<h2 id="two-factor">Two-factor sign-in</h2>
<p>Users can protect their account with a time-based code from an authenticator app, such as Microsoft Authenticator or Google Authenticator.</p>
<p>To turn on two-factor sign-in for your account:</p>
<ol class="steps">
  <li>Go to <strong>Settings &gt; Account</strong>.</li>
  <li>Turn on two-factor sign-in and scan the QR code with your authenticator app.</li>
  <li>Enter the code from the app to confirm.</li>
  <li>Store the ten recovery codes in a safe place. Each code works once.</li>
</ol>
<p>Administrators can require two-factor sign-in for administrators or for all users under <strong>Settings &gt; Security</strong>, and can reset it for a user under <strong>Users</strong>.</p>

<h2 id="entra-id">Sign in with Microsoft Entra ID</h2>
<p>Users can sign in with their Microsoft account. XenMan takes the role from Entra ID app roles at every sign-in. MFA and Conditional Access are handled by Entra ID.</p>
<p>To set up Entra ID sign-in:</p>
<ol class="steps">
  <li>In the Microsoft Entra admin center, create an app registration with platform <strong>Web</strong> and the redirect URI <code>https://&lt;xenman address&gt;/api/auth/sso/callback</code>.</li>
  <li>Create a client secret and copy its value.</li>
  <li>Create the app roles <code>XenMan.Admin</code>, <code>XenMan.Operator</code> and <code>XenMan.Viewer</code>.</li>
  <li>In <strong>Enterprise applications</strong>, assign users or groups to the roles. Set <strong>Assignment required</strong> to <strong>Yes</strong>.</li>
  <li>In XenMan, go to <strong>Settings &gt; Security &gt; Microsoft Entra ID</strong>. Enter the tenant ID, client ID, client secret and XenMan's address, then turn it on. Use <strong>Test</strong> to check the connection.</li>
</ol>
${note("Users without an app role cannot sign in. Pool access for operators and viewers is still set in XenMan under <strong>Users</strong>.")}
<p>Optionally, allow password sign-in for administrators only. This keeps a way in when Entra ID cannot be reached.</p>`,
  },

  {
    slug: "security",
    title: "Security",
    nav: "Security",
    description: "HTTPS certificates, XenServer host certificates and stored passwords.",
    body: `
<p>This article describes how XenMan protects connections and stored credentials.</p>

<h2 id="https">HTTPS certificate</h2>
<p>XenMan serves its web interface over HTTPS only. On first start it creates a self-signed certificate, so browsers show a warning once.</p>
<p>To use a certificate from your own certificate authority, go to <strong>Settings &gt; Appliance &gt; HTTPS Certificate</strong> and upload PEM files (certificate, key and optional intermediate certificates) or a PFX file. XenMan checks that the key matches the certificate and switches over without a restart. Administrators see a notice 30 days before the certificate expires.</p>
${note("For the Docker container, place <code>cert.pem</code> and <code>key.pem</code>, or <code>cert.pfx</code>, in the data directory before you start XenMan.")}

<h2 id="host-certificates">XenServer host certificates</h2>
<p>XenServer hosts use self-signed certificates. XenMan checks them in the same way that SSH checks host keys:</p>
<ul>
  <li>When you add a pool, you compare and trust the coordinator's certificate fingerprint.</li>
  <li>XenMan learns the certificates of the other hosts from the pool over this verified connection.</li>
  <li>XenMan connects to a host only if it presents a trusted certificate. If a certificate changes unexpectedly, XenMan refuses the connection, records it in the audit log, notifies administrators by email and shows a warning.</li>
</ul>
<p>Trusted certificates are listed under <strong>Settings &gt; Pools &gt; Host certificates</strong>. An administrator can accept a certificate that was renewed on purpose.</p>

<h2 id="stored-passwords">Stored passwords</h2>
<p>XenMan stores pool and mail server passwords encrypted with AES-256-GCM. On the appliance, the key is kept outside the data directory and protected by the appliance's own system key (and its TPM, if available). A copy of the data directory alone cannot be decrypted.</p>
${important("If you restore a data directory onto another appliance, XenMan marks the pool passwords as unreadable. Enter them again under <strong>Settings &gt; Pools</strong>.")}

<h2 id="audit-log">Audit log</h2>
<p>XenMan records sign-ins and every change in an audit log, with the user, the time and the result. Administrators can view it under <strong>Audit Log</strong> and forward events to a syslog server under <strong>Settings &gt; Mail &amp; Logging</strong>.</p>`,
  },

  {
    slug: "advanced",
    title: "Advanced configuration",
    nav: "Advanced configuration",
    description: "Pools at other sites behind NAT, and consoles behind a reverse proxy such as NetScaler.",
    body: `
<p>This article describes configurations for pools at other sites and for XenMan behind a reverse proxy.</p>

<h2 id="nat">Pools at other sites</h2>
<p>XenMan can manage a pool that it reaches only through NAT, for example a firewall's virtual IP in front of a pool at another site. Without further configuration, consoles, performance graphs, imports and SSH exports do not work, because XenServer provides them at each host's own management address. XenCenter has the same limitation.</p>
<p>To make these features work:</p>
<ol class="steps">
  <li>When you add the pool, or later under <strong>Settings &gt; Pools &gt; Edit</strong>, turn on <strong>Hosts are behind NAT</strong>.</li>
  <li>For each host, enter the address at which XenMan reaches it. Use either an address per host with port 443 forwarded, or one address with a port per host, such as <code>203.0.113.10:4431</code>.</li>
  <li>Save the settings.</li>
</ol>
${important("Every host must be reachable, and the firewall must pass TLS through unchanged. XenMan checks every host's certificate as usual.")}

<h2 id="reverse-proxy">Consoles behind a reverse proxy</h2>
<p>When XenMan runs behind a reverse proxy such as NetScaler, configure the proxy as follows:</p>
<ul>
  <li>Enable WebSocket in the HTTP profile of the virtual server.</li>
  <li>Do not apply compression, App Firewall or bot checks to <code>/api/vnc-proxy</code>.</li>
  <li>Use a TCP profile with a large window and SACK, and turn off Nagle.</li>
  <li>Set client and server idle timeouts of at least a few minutes.</li>
</ul>
<p>Start XenMan with <code>XENMAN_TRUST_PROXY=1</code> so that it takes the client address and <code>X-Forwarded-Proto: https</code> from the proxy. The proxy must set both headers.</p>
<p>To compare console performance, open <strong>View &gt; Connection info</strong> in the console. It shows frames per second, data rate and encoding.</p>`,
  },
];
