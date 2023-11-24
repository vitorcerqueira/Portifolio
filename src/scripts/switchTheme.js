// Função para alternar entre os modos claro e escuro
export const darkMode = () => {
  document.body.classList.toggle('dark'); // Adiciona ou remove a classe 'dark' do corpo do documento
};

// Função para carregar o tema do armazenamento local
export const loadTheme = () => {
  // Verifica se há um item 'dark' no armazenamento local
  const checkDarkMode = localStorage.getItem('dark');

  // Se existe a chave 'dark' no armazenamento local, ativa o modo escuro
  if (checkDarkMode) {
    darkMode(); // Chama a função para alternar entre os modos claro e escuro
  }
};
