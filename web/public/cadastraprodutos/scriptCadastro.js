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
    const img = document.getElementById('img') ? document.getElementById('img').value : '';

    const produto = {
        nome: nome,
        valor: valor,
        desconto: desconto || 0,
        descricao: descricao,
        img: img || null
    };
    fetch('http://localhost:3000/api/v1/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Produto cadastrado:', data);
        alert('Produto cadastrado com sucesso!');

        document.getElementById('nome').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('desconto').value = '';
        document.getElementById('descricao').value = '';
        if (document.getElementById('img')) {
            document.getElementById('img').value = '';
        }
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