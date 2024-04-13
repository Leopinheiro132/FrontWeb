const carouselInner1 = document.querySelector('#carousel1 .carousel-inner');
const carouselInner2 = document.querySelector('#carousel2 .carousel-inner');


fetch('http://localhost:3000/api/v1/produtos')
    .then(response => response.json())
    .then(data => {
        const halfLength = Math.ceil(data.length / 2);
        const firstHalf = data.slice(0, halfLength);
        const secondHalf = data.slice(halfLength);

        let remainder = data.length % 2;

        firstHalf.forEach((produto, index) => {
            const productCard = `
                <div class="product-card">
                    <h3>${produto.nome}</h3>
                    <p class="description">${produto.descricao}</p>
                    <p class="price">Preço: R$ ${produto.valor}</p>
                    ${produto.desconto !== null ? `<p class="discount">Desconto: ${produto.desconto}%</p>` : ''}
                    <button class="btnComprar" onclick="comprar()">Comprar</button>
                </div>
            `;
            carouselInner1.innerHTML += productCard;
            if (remainder > 0 && index === firstHalf.length - 1) {
                carouselInner2.innerHTML += productCard;
                remainder--;
            }
        });
        secondHalf.forEach((produto, index) => {
            const productCard = `
                <div class="product-card">
                    <h3>${produto.nome}</h3>
                    <p class="description">${produto.descricao}</p>
                    <p class="price">Preço: R$ ${produto.valor}</p>
                    ${produto.desconto !== null ? `<p class="discount">Desconto: ${produto.desconto}%</p>` : ''}
                    <button onclick="comprar()" class="btnComprar">Comprar</button>
                </div>
            `;
            carouselInner2.innerHTML += productCard;
            if (remainder > 0 && index === secondHalf.length - 1) {
                carouselInner1.innerHTML += productCard;
                remainder--;
            }
        });
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));
function comprar(){
    alert("Compra realizada com sucesso!")
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
