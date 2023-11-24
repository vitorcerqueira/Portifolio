import { pt } from './locales/pt-BR.js'
import { en } from './locales/en-US.js'

const resources = {
  pt,
  en
}

i18next
  .init({
    lng: 'pt', // Idioma padrão
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false
    }
  }
);

function highlightOptionLang(lang) {
  // Remover a classe 'active' de todas as opções
  const options = document.querySelectorAll('.lang-option');
  options.forEach(option => {
    option.classList.remove('active');
  });

  // Adicionar a classe 'active' à opção selecionada
  const selectedOption = document.getElementById(`toggle-${lang}`);
  if (selectedOption) {
    selectedOption.classList.add('active');
  }
}

// Função para traduzir o conteúdo
export function translateContent() {
  const i18nData = document.querySelectorAll('[data-i18n]');
  
  i18nData.forEach(element => {
    const key = element.dataset.i18n;
    const translatedText = i18next.t(key);
    
    // Chamar a função para substituir o conteúdo de texto nos nós mantendo a estrutura HTML
    replaceTextInNode(element, translatedText);
  });
}

// Função para substituir o conteúdo de texto em um nó mantendo a estrutura HTML
const replaceTextInNode = (node, text) => {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = text;
  } else {
    for (const childNode of node.childNodes) {
      replaceTextInNode(childNode, text);
    }
  }
};

// Alternar idioma para Português
document.getElementById('toggle-pt').addEventListener('click', (ev) => {
  ev.preventDefault();
  i18next.changeLanguage('pt', translateContent);
  highlightOptionLang('pt')
});

// Alternar idioma para Inglês
document.getElementById('toggle-en').addEventListener('click', (ev) => {
  ev.preventDefault();
  i18next.changeLanguage('en', translateContent);
  highlightOptionLang('en')
});