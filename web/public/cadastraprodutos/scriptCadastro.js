const nome = document.getElementById('nome').value;
const valor = document.getElementById('valor').value;
const desconto = document.getElementById('desconto').value;
const descricao = document.getElementById('descricao').value;
//const imagem = document.getElementById('imagem').files[0];
const carouselInner = document.querySelector('#carousel1 .carousel-inner');

fetch('http://localhost:3000/api/v1/produtos')
    .then(response => response.json())
    .then(data => {
        data.forEach(produto => {
            const productCard = `
                <div class="product-card">
                    <h3>${produto.nome}</h3>
                    <p class="description">${produto.descricao}</p>
                    <p class="price">Preço: R$ ${produto.valor}</p>
                    ${produto.desconto !== null ? `<p class="discount">Desconto: ${produto.desconto}%</p>` : ''}
                    <button class="btnExcluir" onclick="excluirProduto(${produto.id})">Excluir</button>
                </div>
            `;
            carouselInner.innerHTML += productCard;
        });
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));

function excluirProduto(id) {
    fetch(`http://localhost:3000/api/v1/produtos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Produto com ID ${id} excluído com sucesso.`);
        } else {
            console.error(`Erro ao excluir produto com ID ${id}.`);
        }
    })
    .catch(error => console.error('Erro ao excluir produto:', error));
}


function submitProduto() {
    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
    const desconto = document.getElementById('desconto').value;
    const descricao = document.getElementById('descricao').value;
  
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('valor', valor);
    formData.append('desconto', desconto);
    formData.append('descricao', descricao);
  
    fetch('http://localhost:3000/api/v1/cadastro', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Produto cadastrado:', data);
      alert('Produto cadastrado com sucesso!');

      document.getElementById('nome').value = '';
      document.getElementById('valor').value = '';
      document.getElementById('desconto').value = '';
      document.getElementById('descricao').value = '';
    })
    .catch(error => {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto. Por favor, tente novamente.');
    });
  }

function scrollCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const carouselInner = carousel.querySelector('.carousel-inner');
    const scrollAmount = 300;

    if (direction === 'prev') {
        carouselInner.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else if (direction === 'next') {
        carouselInner.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}