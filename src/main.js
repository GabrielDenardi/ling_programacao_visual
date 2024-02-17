const meusAlbuns = [];

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
      <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Excluir</button>
      </div>
  </div>
  `;
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
  listaDeAlbuns.innerHTML = ""; // Limpa a lista antes de atualizar

  listaDeAlbuns.appendChild(criaListaDeAlbuns(organizaEmLinhasEColunas(meusAlbuns)));
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.getAttribute('data-index');
    // Remove a música correspondente do array meusAlbuns
    meusAlbuns.splice(index, 1);
    // Salva as músicas atualizadas no localStorage
    localStorage.setItem('meusAlbuns', JSON.stringify(meusAlbuns));
    // Atualiza a lista de álbuns na página
    atualizaListaDeAlbuns();
  }
});


document.getElementById('musicForm').addEventListener('submit', function (event) {
  event.preventDefault();
  // Obter os valores dos campos do formulário
  var musicaName = document.getElementById('songName').value;
  var artista = document.getElementById('artist').value;
  var ano = document.getElementById('album').value;
  var musicaLink = document.getElementById('songLink').value;
  var foto = document.getElementById('photo').files[0];
  
  var reader = new FileReader();
  reader.onload = function(event) {
    var imagem_base64 = event.target.result.split(',')[1]; // Remove o cabeçalho 'data:image/jpeg;base64,'
    
    // Criar um novo objeto de música
    const novaMusica = {
      "nome_do_album": musicaName,
      "nome_da_banda": artista,
      "ano_do_album": ano,
      "imagem_base64": imagem_base64,
      "Link": musicaLink
    };

    // Adicionar a nova música ao array meusAlbuns
    meusAlbuns.push(novaMusica);

    // Salvar as músicas atualizadas no localStorage
    localStorage.setItem('meusAlbuns', JSON.stringify(meusAlbuns));

    // Atualizar a lista de álbuns na página
    atualizaListaDeAlbuns();

    // Limpar o formulário após adicionar a música
    document.getElementById('musicForm').reset();
  };
  
  // Ler o arquivo de imagem como uma URL de dados
  reader.readAsDataURL(foto);
});

// Função para carregar as músicas do localStorage
function carregarMusicas() {
  // Verifica se há músicas salvas no localStorage
  const musicasSalvas = localStorage.getItem('meusAlbuns');
  // Se houver músicas salvas, desserializa a string JSON para recuperar o array original
  if (musicasSalvas) {
    return JSON.parse(musicasSalvas);
  } else {
    console.log('Nenhuma música encontrada no localStorage.');
    return [];
  }
}

// Carregar as músicas salvas do localStorage quando a página for carregada
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
