async function fetchDevto() {
  const list = document.getElementById("devto-list");
  if (!list) return;
  const render = (html) => { list.innerHTML = html; };
  try {
    const res = await fetch("https://dev.to/api/articles?username=fevunge&per_page=5", {
      headers: { "User-Agent": "fevunge.github.io" },
    });
    if (!res.ok) {
      render(`<div class="devto-card" style="opacity:0.6">content: HTTP ${res.status}</div>`);
      return;
    }
    const data = await res.json();
    if (!data || data.length === 0) {
      render(`<div class="devto-card" style="opacity:0.6">no articles yet</div>`);
    } else {
      render(data.map((a) => `
        <div class="devto-card">
          <a href="${a.url}" target="_blank">${a.title}</a>
          <div class="devto-tags">${a.tag_list ? a.tag_list.map((t) => `<span>#${t}</span>`).join("") : ""}</div>
          <div class="devto-meta">${a.readable_publish_date} · ${a.reading_time_minutes} min · <i class="fa-regular fa-heart"></i> ${a.positive_reactions_count} · <i class="fa-regular fa-comment"></i> ${a.comments_count}</div>
        </div>`).join(""));
    }
  } catch (e) {
    console.error("Dev.to fetch failed", e);
    render(`<div class="devto-card" style="opacity:0.6">articles unavailables</div>`);
  }
}

fetchDevto();