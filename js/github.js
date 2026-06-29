async function fetchGitHub() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/fevunge"),
      fetch("https://api.github.com/users/fevunge/repos?sort=updated&per_page=5&direction=desc"),
    ]);
    const user = await userRes.json();
    const repos = await reposRes.json();

    document.getElementById("github-bio").textContent = user.bio || "";
    document.getElementById("github-numbers").innerHTML =
      `<div class="github-num"><span>${user.public_repos}</span> repos</div>` +
      `<div class="github-num"><span>${user.followers}</span> followers</div>` +
      `<div class="github-num"><span>${user.following}</span> following</div>`;

    document.getElementById("repos-list").innerHTML = repos
      .map(
        (repo) => `
      <div class="github-repo-card">
        <div class="github-repo-name"><i class="fa-regular fa-bookmark"></i><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
        ${repo.description ? `<div class="github-repo-desc">${repo.description}</div>` : ""}
        <div class="github-repo-meta">
          ${repo.language ? `<span><i class="fa-solid fa-circle" style="color:#c29df1;font-size:0.5em;"></i> ${repo.language}</span>` : ""}
          <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
          <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
        </div>
      </div>`
      )
      .join("");
  } catch (e) {
    console.error("GitHub fetch failed", e);
  }
}

async function fetchDevto() {
  try {
    const res = await fetch("https://dev.to/api/articles?username=fevunge&per_page=5");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const list = document.getElementById("devto-list");
    if (!data || data.length === 0) {
      list.innerHTML = `<div class="devto-card" style="opacity:0.6">no articles yet</div>`;
    } else {
      list.innerHTML = data
        .map(
          (a) => `
        <div class="devto-card">
          <a href="${a.url}" target="_blank">${a.title}</a>
          <div class="devto-tags">${a.tag_list.map((t) => `<span>#${t}</span>`).join("")}</div>
          <div class="devto-meta"><i class="fa-regular fa-heart"></i> ${a.positive_reactions_count} · <i class="fa-regular fa-comment"></i> ${a.comments_count}</div>
        </div>`
        )
        .join("");
    }
  } catch (e) {
    console.error("Dev.to fetch failed", e);
    document.getElementById("devto-list").innerHTML =
      `<div class="devto-card" style="opacity:0.6">dev.to unavailable</div>`;
  }
}

document.querySelectorAll(".github-stats img").forEach((img) => {
  img.addEventListener("error", () => img.remove());
});

fetchGitHub();
fetchDevto();
