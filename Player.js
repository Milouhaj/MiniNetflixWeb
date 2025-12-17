const video = document.getElementById("video");
const title = document.getElementById("title");

let hls = null;

function playVideo(url, name) {
  title.textContent = name || "Lecture en cours";

  if (hls) {
    hls.destroy();
    hls = null;
  }

  if (url.endsWith(".m3u8") && window.Hls && Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else {
    video.src = url;
  }

  video.play().catch(() => {
    alert("Lecture bloquée par le navigateur");
  });
}

fetch("playlist.json")
  .then(res => res.json())
  .then(list => {
    const container = document.getElementById("playlist");

    list.forEach(item => {
      const btn = document.createElement("button");
      btn.textContent = item.title;
      btn.onclick = () => playVideo(item.url, item.title);
      container.appendChild(btn);
    });
  })
  .catch(() => {
    document.getElementById("playlist").textContent =
      "Impossible de charger la playlist.";
  });
