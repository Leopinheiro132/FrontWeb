const carouselInner1 = document.querySelector('#carousel1 .carousel-inner');
const carouselInner2 = document.querySelector('#carousel2 .carousel-inner');


fetch('http://localhost:3000/api/v1/produtos')
    .then(response => response.json())
    .then(data => {
        const carouselInner1 = document.querySelector('#carousel1 .carousel-inner');
        const carouselInner2 = document.querySelector('#carousel2 .carousel-inner');

        const halfLength = Math.ceil(data.length / 2);
        const firstHalf = data.slice(0, halfLength);
        const secondHalf = data.slice(halfLength);

        let remainder = data.length % 2; // Calcula o resto da divisão por 2

        firstHalf.forEach((produto, index) => {
            const productCard = `
                <div class="product-card">
                    <h3>${produto.nome}</h3>
                    <p class="description">${produto.descricao}</p>
                    <p class="price">Preço: R$ ${produto.valor}</p>
                    ${produto.desconto !== null ? `<p class="discount">Desconto: ${produto.desconto}%</p>` : ''}
                </div>
            `;
            carouselInner1.innerHTML += productCard;
            // Se houver restante e estivermos no último item do primeiro carrossel, adicione 1 item extra ao segundo carrossel
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
                </div>
            `;
            carouselInner2.innerHTML += productCard;
            // Se houver restante e estivermos no último item do segundo carrossel, adicione 1 item extra ao primeiro carrossel
            if (remainder > 0 && index === secondHalf.length - 1) {
                carouselInner1.innerHTML += productCard;
                remainder--;
            }
        });
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));



    function scrollCarousel(carouselId, direction) {
        const carousel = document.getElementById(carouselId);
        const carouselInner = carousel.querySelector('.carousel-inner');
        const scrollAmount = 300; // Defina o valor de rolagem desejado
    
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
