// Importações dos módulos
import { techsNamesFilter, techsLinksFilter } from "./techsFilter.js"; // Importa função que filtra a lista de tecnologias e retorna o ícone correspondente

// Seleção de elementos do DOM
const slideList = document.querySelector('[data-slide="list"]');
const slide1 = document.querySelector('[data-index="1"]');
let slideItems = document.querySelectorAll('[data-slide="item"]');
let currentIndex = 0;

export function mockupSlideIten({ name, url, topics, homepage }) {
  // Criar o elemento <div> principal com a classe "slide-itens" e os atributos de data
  const slideItem = document.createElement("div");
  slideItem.classList.add("slide-itens");
  slideItem.setAttribute("data-slide", "item");
  slideItem.setAttribute("data-index", currentIndex);

  // Criar o elemento <div> com a classe "slide-content"
  const slideContent = document.createElement("div");
  slideContent.classList.add("slide-content");

  // Criar o elemento <div> com a classe "box_project" para o projeto
  const boxProject = document.createElement("div");
  boxProject.classList.add("box_project");
  boxProject.classList.add("box1");

  // Criar a imagem
  const projectImage = document.createElement("img");
  projectImage.src = "https://vitor-portifolio-eosin.vercel.app/" + "home.webp";
  projectImage.alt = "exemple";
  projectImage.classList.add("box_project_exemple_img");

  // Criar o elemento <h3> com o nome do projeto
  const projectName = document.createElement("h3");
  projectName.textContent = name;

  // Criar o elemento <div> para as habilidades do projeto
  const projectSkills = document.createElement("div");
  projectSkills.classList.add("box_project_skill");

  // Criação dos elementos <a> e <i> com as classes dos ícones presentes em topics
  const skillIconLinks = topics.map((topic) => {
    const iconClassName = techsNamesFilter(topic);
    const documentationLink = techsLinksFilter(topic);
    if (iconClassName) {
      const skillIconLink = document.createElement("a");
      skillIconLink.href = documentationLink;
      skillIconLink.title = "Link da documentação da tecnologia.";
      skillIconLink.classList.add("box_project_skill_icon");
      skillIconLink.target = "_blank";

      const skillIcon = document.createElement("i");
      skillIcon.className = iconClassName;
      skillIconLink.appendChild(skillIcon);

      return skillIconLink;
    }
    return null;
  });

  // Adiciona os elementos criados ao DOM
  if (projectSkills) {
    skillIconLinks.forEach((skillIconLink) => {
      if (skillIconLink) {
        projectSkills.appendChild(skillIconLink);
      }
    });
  } else {
    console.error("Skills container not found");
  }

  // Criar o elemento <div> para os links do projeto
  const projectLinks = document.createElement("div");
  projectLinks.classList.add("box_project_repository");

  // Criar o link "Ver projeto"
  const showProjectLink = document.createElement("a");
  showProjectLink.href = homepage;
  showProjectLink.classList.add("box_project_repository_show_project");
  showProjectLink.ariaLabel = "Ver projeto";
  showProjectLink.textContent = "Ver projeto";

  // Criar o link para o repositorio no GitHub com o ícone
  const githubLink = document.createElement("a");
  githubLink.classList.add("box_project_repository_github");
  githubLink.href = url;
  githubLink.ariaLabel = "Acessar repositorio do projeto";
  githubLink.target = "_blank";

  const githubIcon = document.createElement("i");
  githubIcon.classList.add("fa-brands");
  githubIcon.classList.add("fa-github");

  githubLink.appendChild(githubIcon);

  // Adicionar os elementos criados ao DOM
  projectLinks.appendChild(showProjectLink);
  projectLinks.appendChild(githubLink);

  boxProject.appendChild(projectImage);
  boxProject.appendChild(projectName);
  boxProject.appendChild(projectSkills);
  boxProject.appendChild(projectLinks);

  slideContent.appendChild(boxProject);
  slideItem.appendChild(slideContent);

  // Adicionar o slideItem ao DOM
  slideList.insertBefore(slideItem, slide1);

  // Incrementar o indice do data-index
  currentIndex++;

  // Atualizar a lista de elementos dos slides após criar todos os novos elementos
  slideItems = document.querySelectorAll('[data-slide="item"]');
}
