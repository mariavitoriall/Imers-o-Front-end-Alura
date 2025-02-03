const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlist');
const artistCard = document.querySelector('.grid-container');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then(response => response.json())
        .then(result => displayResults(result, searchTerm))
        .catch(error => console.error("Erro na requisição:", error));
}

function displayResults(results, searchTerm) {
    // Limpa os resultados anteriores
    artistCard.innerHTML = "";

    if (results.length === 0) {
        resultArtist.classList.add("hidden");
        resultPlaylist.classList.remove("hidden");
        return;
    }

    // Filtra os resultados com base no searchTerm (para garantir que o nome do artista corresponda)
    const filteredResults = results.filter(element =>
        element.name.toLowerCase().includes(searchTerm)
    );

    if (filteredResults.length === 0) {
        resultArtist.classList.add("hidden");
        resultPlaylist.classList.remove("hidden");
        return;
    }

    // Exibe os resultados filtrados
    filteredResults.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("artist-card");

        card.innerHTML = `
            <div class="card-img">
                <img src="${element.urlImg}" class="artist-img" alt="${element.name}">
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${element.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;
        artistCard.appendChild(card);
    });

    resultArtist.classList.remove("hidden");
    resultPlaylist.classList.add("hidden");
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        resultArtist.classList.add("hidden");
        resultPlaylist.classList.remove("hidden");
        return;
    }

    requestApi(searchTerm);
});
