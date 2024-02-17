    const meusAlbuns = [
  {
    "nome_do_album": "Lume",
    "nome_da_banda": "Filipe Ret",
    "ano_do_album": 2022,
    "imagem_da_capa_do_album": "lume.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/4sB8eASUZfGxo2ZZ2lLwkG"
  },
  {
    "nome_do_album": "Imaterial",
    "nome_da_banda": "Filipe Ret",
    "ano_do_album": 2021,
    "imagem_da_capa_do_album": "imaterial.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/74v9BLECHPqKGRLfa24LRn"
  },
  {
    "nome_do_album": "Audaz",
    "nome_da_banda": "Filipe ret",
    "ano_do_album": 2018,
    "imagem_da_capa_do_album": "audaz.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/5qRuTVCxtZJ1HK0mdIUSAa"
  },
  {
    "nome_do_album": "Vivaz",
    "nome_da_banda": "Filipe Ret",
    "ano_do_album": 2012,
    "imagem_da_capa_do_album": "vivaz.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/2UzFlatMqvN6LN8MN6a89g"
  },
  {
    "nome_do_album": "Revel",
    "nome_da_banda": "Filipe Ret",
    "ano_do_album": 2015,
    "imagem_da_capa_do_album": "revel.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/422XU7tl8bg3VIklzD1VGf"
  },
  {
    "nome_do_album": "Celebridade",
    "nome_da_banda": "Orochi",
    "ano_do_album": 2020,
    "imagem_da_capa_do_album": "orochi.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/1O14i0prsw0PrQYgHQ19Pa"
  },
  {
    "nome_do_album": "Vida Cara",
    "nome_da_banda": "Orochi",
    "ano_do_album": 2023,
    "imagem_da_capa_do_album": "vida_cara.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/05O0Z1S7MeE49h8krhErzy"
  },
  {
    "nome_do_album": "Little Hair",
    "nome_da_banda": "MC Cabelinho",
    "ano_do_album": 2021,
    "imagem_da_capa_do_album": "littlhehair.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/1KAZ4CtfGW7JgVvh6lq30V"
  },
  {
    "nome_do_album": "Amor e Ódio",
    "nome_da_banda": "Borges",
    "ano_do_album": 2023,
    "imagem_da_capa_do_album": "amor.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/4XjGW9ICzbGHxtWeI7dUAt"
  },
  {
    "nome_do_album": "A Nova Era",
    "nome_da_banda": "Chefin",
    "ano_do_album": 2022,
    "imagem_da_capa_do_album": "novaera.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/2BbG0JEEVGpO2xscs9AYxT"
  },
  {
    "nome_do_album": "Máquina do Tempo",
    "nome_da_banda": "Matuê",
    "ano_do_album": 2020,
    "imagem_da_capa_do_album": "maquina.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/6ehm0SMBBoSxH8oSrFXre6"
  },
  {
    "nome_do_album": "O Sabio",
    "nome_da_banda": "MC Poze",
    "ano_do_album": 2022,
    "imagem_da_capa_do_album": "sabio.jfif",
    "Link": "https://open.spotify.com/intl-pt/album/6aONODz5AYfzrNESWC9n4W"
  },
  
]

function organizaEmLinhasEColunas(albuns) {
  const numeroDeColunas = 3
  const numeroDeLinhas = Math.ceil(albuns.length / numeroDeColunas)

  let linhas = new Array(numeroDeLinhas)

  let indiceAlbuns = 0;

  for (let i = 0; i < numeroDeLinhas; i++) {
    linhas[i] = new Array(numeroDeColunas)

    for (let j = 0; j < numeroDeColunas; j++) {
      if (indiceAlbuns < albuns.length) {
        linhas[i][j] = albuns[indiceAlbuns++]
      }
    }
  }

  return linhas
}

function criaCardHtmlParaAlbum(album) {
  return `
  <div class="card col-4">
    <img class="card-img-top"
      src="${album.imagem_da_capa_do_album}"
      alt="">
    <div class="card-body">
      <h5 class="card-title">${album.nome_do_album}</h5>
      <p class="card-text">${album.nome_da_banda} - <b>${album.ano_do_album}<br> <a href=${album.Link} target="blank_">Spotify</a></b></p>
    </div>
  </div>
  `
}

function criaLinhaDeAlbuns(uma_linha) {
  const div = document.createElement("div")
  div.classList.add("row")
  div.innerHTML = uma_linha.map(coluna => criaCardHtmlParaAlbum(coluna)).join("\n")
  return div
}

function criaListaDeAlbuns(linhas) {
  const div = document.createElement("div")
  div.classList.add("col-lg-12", "px-0", "container")
  div.setAttribute("id", "album-list")

  linhas.forEach(linha => {
    div.appendChild(criaLinhaDeAlbuns(linha))
  });

  return div
}

function atualizaListaDeAlbuns() {
  const listaDeAlbuns = document.getElementById("album-list")

    for (let i = meusAlbuns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [meusAlbuns[i], meusAlbuns[j]] = [meusAlbuns[j], meusAlbuns[i]];

    }


  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(meusAlbuns)))
}

  const listaDeAlbuns = document.getElementById("album-list")

    for (let i = meusAlbuns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [meusAlbuns[i], meusAlbuns[j]] = [meusAlbuns[j], meusAlbuns[i]];

    }


  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(meusAlbuns)))
  

  document.getElementById('searchButton').addEventListener('click', function () {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {
      var title = card.querySelector('.card-title').textContent.toLowerCase();
      if (title.includes(input)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  document.getElementById('musicForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var musicaName = document.getElementById('songName').value;
  var artista = document.getElementById('artist').value;
  var ano = document.getElementById('album').value;
  var musicaLink = document.getElementById('songLink').value;
  var foto = document.getElementById('photo').files[0];


  var imagemUrl = URL.createObjectURL(foto);

  var musicCard = document.createElement('div');
  musicCard.classList.add('card', 'col-4');
  musicCard.innerHTML = `
  <img class="card-img-top"
    src="${imagemUrl}" alt="">
  <div class="card-body">
    <h5 class="card-title">${musicaName}</h5>
    <p class="card-text">${artista} - <b>${ano}<br> <a href=${musicaLink} target="blank_">Spotify</a></b></p>
  </div>  
  `;



  var albumList = document.getElementById('album-list').querySelector('.row');
  if (albumList.firstChild) {
    albumList.insertBefore(musicCard, albumList.firstChild);
  } else {
    albumList.appendChild(musicCard);
  }

  document.getElementById('musicForm').reset();
  
});

  




