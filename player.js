const playlistDiv = document.getElementById('playlist');
const categoryFilter = document.getElementById('categoryFilter');
let playlist = [];

// Charger le fichier JSON
fetch('data/playlist.json')
  .then(res => res.json())
  .then(data => {
    playlist = data;
    renderPlaylist(playlist);
  });

// Filtrage par catégorie
categoryFilter.addEventListener('change', () => {
  const cat = categoryFilter.value;
  if(cat === 'all') renderPlaylist(playlist);
  else renderPlaylist(playlist.filter(p => p.category === cat));
});

// Afficher les cartes
function renderPlaylist(list) {
  playlistDiv.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.logo}" alt="${item.title}" />
      <div>${item.title}</div>
      <button disabled>Lire</button>
    `;
    playlistDiv.appendChild(card);
  });
}
