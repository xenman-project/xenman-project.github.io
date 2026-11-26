// Puts the current versions on the download buttons and shows the release candidate,
// if one is newer than the latest stable release. Without it the page still links to the releases.
(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/xenman-project/xenman/releases?per_page=30', {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return
    const releases = (await res.json()).filter((r) => !r.draft)
    // Newest first, so a pre-release before the first stable one is newer than it.
    const stableIndex = releases.findIndex((r) => !r.prerelease)
    const stable = releases[stableIndex]
    if (stable) {
      const button = document.getElementById('download-stable')
      button.textContent = `Download ${stable.tag_name}`
      button.href = stable.html_url
    }
    const rc = releases.slice(0, stableIndex === -1 ? releases.length : stableIndex).find((r) => r.prerelease)
    if (rc) {
      const box = document.getElementById('download-rc')
      box.querySelector('a').href = rc.html_url
      document.getElementById('download-rc-label').textContent = `Release candidate ${rc.tag_name}`
      box.hidden = false
    }
  } catch {
    // Offline or rate limited: keep the static links.
  }
})()
