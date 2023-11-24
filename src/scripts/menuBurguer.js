// Seleciona o elemento com a classe 'navbar_mobile' e armazena-o na variável 'navbar'
const navbar = document.querySelector('.navbar_mobile');

export function activeNavbar() {
  // Toggla (altera) a classe 'active' no elemento 'navbar'
  navbar.classList.toggle('active');
}
