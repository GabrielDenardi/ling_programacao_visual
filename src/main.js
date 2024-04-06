let meusAlbuns = [];

function organizaEmLinhasEColunas(albuns) {
  const numeroDeColunas = 3;
  const numeroDeLinhas = Math.ceil(albuns.length / numeroDeColunas);

  let linhas = new Array(numeroDeLinhas);

  let indiceAlbuns = 0;

  for (let i = 0; i < numeroDeLinhas; i++) {
    linhas[i] = new Array(numeroDeColunas);

    for (let j = 0; j < numeroDeColunas; j++) {
      if (indiceAlbuns < albuns.length) {
        linhas[i][j] = albuns[indiceAlbuns++];
      }
    }
  }

  return linhas;
}

function criaCardHtmlParaAlbum(album, index) {
  return `
  <div class="card col-4">
    <img class="card-img-top"
      src="data:image/jpeg;base64,${album.imagem_base64}"
      alt="">
    <div class="card-body">
      <h5 class="card-title">${album.nome_do_album}</h5>
      <p class="card-text">${album.nome_da_banda} - <b>${album.ano_do_album}<br> <a href=${album.Link} target="blank_">Spotify</a></b></p>
      <button type="button" class="btn btn-secondary btn-lista-musicas"  data-bs-toggle="modal" data-bs-target="#listaMusicasModal" onclick="atualizarListaMusicas('${encodeURI(album.nome_do_album).replace(/\'/gm,"%27")}')">Lista de músicas</button>
      <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir</button>
      </div>
  </div>
  `;
}

function criaListaHTMLParaAlbum(musicas) {
  return musicas.map((musica) => {
    return `<li class="item-lista-musica list-group-item">
      ${musica.numero_da_faixa} - ${musica.nome} <br>
      <audio controls src="${musica.media_url}" type="audio/ogg" class="audio-musica"></audio>
    </li>`
  }).join("\n");
}

function pegarDadosAPI(nome_do_album) {
  return fetch(`https://api.gvillalta.com/albums/${encodeURIComponent(nome_do_album)}`)
}

async function atualizarListaMusicas(nome_do_album) {
  let musicas = await pegarDadosAPI(nome_do_album).then(response => response.json());

  const titulo_musicas = document.getElementById("titulo_lista_musicas");
  titulo_musicas.innerHTML = `${decodeURI(nome_do_album).replace('%27', '\'')}`

  const lista_musicas = document.getElementById("lista_musicas");
  lista_musicas.innerHTML = criaListaHTMLParaAlbum(musicas);
  
}

function criaLinhaDeAlbuns(uma_linha) {
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = uma_linha.map(coluna => criaCardHtmlParaAlbum(coluna)).join("\n");
  return div;
}

function criaListaDeAlbuns(linhas) {
  const div = document.createElement("div");
  div.classList.add("col-lg-12", "px-0", "container");
  div.setAttribute("id", "album-list");

  linhas.forEach(linha => {
    div.appendChild(criaLinhaDeAlbuns(linha));
  });

  return div;
}

function atualizaListaDeAlbuns() {
  const listaDeAlbuns = document.getElementById("album-list");

  listaDeAlbuns.appendChild(criaListaDeAlbuns(organizaEmLinhasEColunas(meusAlbuns)));
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.getAttribute('data-index');
    meusAlbuns.splice(index, 1);
    localStorage.setItem('meusAlbuns', JSON.stringify(meusAlbuns));
    atualizaListaDeAlbuns();
  }
});


document.getElementById('musicForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var musicaName = document.getElementById('songName').value;
  var artista = document.getElementById('artist').value;
  var ano = document.getElementById('album').value;
  var musicaLink = document.getElementById('songLink').value;
  var foto = document.getElementById('photo').files[0];
  
  var reader = new FileReader();
  reader.onload = function(event) {
    var imagem_base64 = event.target.result.split(',')[1]; 
    
    const novaMusica = {
      "nome_do_album": musicaName,
      "nome_da_banda": artista,
      "ano_do_album": ano,
      "imagem_base64": imagem_base64,
      "Link": musicaLink
    };

    meusAlbuns.push(novaMusica);

    localStorage.setItem('meusAlbuns', JSON.stringify(meusAlbuns));

    atualizaListaDeAlbuns();

    document.getElementById('musicForm').reset();
  };
  
  reader.readAsDataURL(foto);
});

function carregarMusicas() {
  const musicasSalvas = localStorage.getItem('meusAlbuns');
  if (musicasSalvas) {
    return JSON.parse(musicasSalvas);
  } else {
    console.log('Nenhuma música encontrada no localStorage.');
    return [];
  }
}

document.addEventListener('DOMContentLoaded', function () {
  meusAlbuns.push(...carregarMusicas());
  atualizaListaDeAlbuns();
});

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

function atualizaListaDeAlbuns() {
  const listaDeAlbuns = document.getElementById("album-list")

    for (let i = meusAlbuns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [meusAlbuns[i], meusAlbuns[j]] = [meusAlbuns[j], meusAlbuns[i]];

    }

  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(meusAlbuns)))
}

window.addEventListener("storage", function() {
  //console.log("Teste");
  carregarMusicas();
  meusAlbuns = carregarMusicas();
  const listaDeAlbuns = document.getElementById("album-list");
  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(meusAlbuns)))
});