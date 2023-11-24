// Lista de objetos que contém informações sobre as tecnologias e seus ícones
const skillsList = [
  { 
    techName: 'html', 
    IconClassName: 'fa-brands fa-html5', 
    documentationLink: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5' 
  },
  { 
    techName: 'css', 
    IconClassName: 'fa-brands fa-css3-alt icon-tec', 
    documentationLink: 'https://developer.mozilla.org/en-US/docs/Glossary/CSS' 
  },
  { 
    techName: 'javascript', 
    IconClassName: 'fa-brands fa-square-js icon-tec', 
    documentationLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' 
  },
  { 
    techName: 'typescript', 
    IconClassName: 'devicon-typescript-plain colored',
    documentationLink: 'https://www.typescriptlang.org/' 
  },
  { 
    techName: 'react', 
    IconClassName: 'devicon-react-original colored',
    documentationLink: 'https://react.dev/' 
  }
];

// Função que filtra a lista de tecnologias e retorna o ícone correspondente
export function techsNamesFilter(techName) {
  // Procura na lista de skills a que possui o mesmo nome da tecnologia
  const skill = skillsList.find(skill => skill.techName === techName);
  
  // Se encontrou a skill, retorna o ícone, caso contrário, retorna null
  return skill ? skill.IconClassName : null;
}

// Função que filtra a lista de tecnologias e retorna o link da documentação correspondente
export function techsLinksFilter(techName) {
  // Procura na lista de skills a que possui o mesmo nome da tecnologia
  const link = skillsList.find(skill => skill.techName === techName);
  
  // Se encontrou a skill, retorna o link, caso contrário, retorna null
  return link ? link.documentationLink : null;
}
