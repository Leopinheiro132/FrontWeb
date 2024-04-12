const nome = document.getElementById('nome').value;
const valor = document.getElementById('valor').value;
const desconto = document.getElementById('desconto').value;
const descricao = document.getElementById('descricao').value;
const imagem = document.getElementById('imagem').files[0];

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
    