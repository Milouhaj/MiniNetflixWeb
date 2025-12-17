fetch("playlist.json")
  .then(response => response.json())
  .then(list => {
    if (!list || list.length === 0) return;

    const video = document.getElementById("video");
    const first = list[0];

    // MP4 direct
    if (first.url.endsWith(".mp4")) {
      video.src = first.url;
      video.load();
    }
  })
  .catch(err => console.error(err));
