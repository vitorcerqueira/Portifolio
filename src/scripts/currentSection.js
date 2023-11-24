// Função que verifica se um elemento está visível na tela
function isElementVisible(element) {
  // Obtém as dimensões e posições do retângulo delimitador do elemento
  const rect = element.getBoundingClientRect();
  
  // Retorna verdadeiro se a parte superior do elemento estiver abaixo de 150px 
  // e a parte inferior estiver acima de 150px
  return rect.top <= 150 && rect.bottom >= 150;
}

// Função para definir os links ativos na barra de navegação
export function setActiveLink() {
  // Seleciona todos os elementos 'section', links da barra de navegação e links móveis
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar_links a');
  const mobileLinks = document.querySelectorAll('.mobile_links a');

  // Itera sobre todas as seções
  sections.forEach((section, index) => {
    // Verifica se a seção atual está visível na tela
    if (isElementVisible(section)) {
      // Remove a classe 'active' de todos os links de navegação (desktop e móvel)
      navLinks.forEach((link) => link.classList.remove('active'));
      mobileLinks.forEach((link) => link.classList.remove('active'));

      // Adiciona a classe 'active' apenas aos links correspondentes à seção atual
      navLinks[index].classList.add('active');
      mobileLinks[index].classList.add('active');
    }
  });
}
