const playBtn = document.getElementById('playBtn');
const video = document.getElementById('video');

playBtn.addEventListener('click', () => {
    let url = document.getElementById('videoUrl').value.trim();
    if (!url) return alert("Veuillez coller un lien vidéo");

    // Proxy CORS intégré
    if(!url.startsWith('https://corsproxy.io/?')) {
        url = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    }

    // Supprimer ancien Hls
    if(window.hls) window.hls.destroy();

    if(url.endsWith('.m3u8') && Hls.isSupported()){
        window.hls = new Hls();
        window.hls.loadSource(url);
        window.hls.attachMedia(video);
        window.hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    } else {
        video.src = url;
        video.play();
    }
});
