// Seleciona todos os elementos com o atributo 'data-anime'
const data = document.querySelectorAll('[data-anime]');

// Função para animar elementos conforme a rolagem da página
export const animeScroll = () => {
  // Calcula a posição superior da janela de visualização, levando em consideração 
  // uma margem inferior de 15% da altura da janela
  let windowTop = window.pageYOffset + window.innerHeight * 0.85;
  
  // Itera sobre cada elemento com o atributo 'data-anime'
  data.forEach(element => {
    // Verifica se o elemento está acima da posição superior da janela
    if (windowTop > element.offsetTop) {
      // Adiciona a classe 'animate' ao elemento para ativar a animação
      element.classList.add('animate');
    } else {
      // Remove a classe 'animate' do elemento para desativar a animação
      element.classList.remove('animate');
    }
  });
};
