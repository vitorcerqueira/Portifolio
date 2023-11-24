"use strict";

// Importações de módulos
import { mockupSlideIten } from "../scripts/mockupDesignSlide.js"; // Importa função para criação do design dos slides

// Seleção de elementos do DOM
const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide="list"]');
const navPreviousButton = document.querySelector(
  '[data-slide="nav-previous-button"]'
);
const navNextButton = document.querySelector('[data-slide="nav-next-button"]');
const controlsWrapper = document.querySelector(
  '[data-slide="controls-wrapper"]'
);
let slideItems = document.querySelectorAll('[data-slide="item"]');
let controlButtons;
let slideInterval;

// Objeto para armazenar o estado do carrossel
const state = {
  startingPoint: 0,
  savedPosition: 0,
  currentPoint: 0,
  movement: 0,
  currentSlideIndex: 0,
  autoPlay: true,
  timeInterval: 0,
};

// Função para obter dados da API do GitHub
export function initSlider({
  startAtIndex = 0,
  autoPlay = true,
  timeInterval = 3000,
}) {
  // Faz uma requisição à API do GitHub
  fetch(`https://api.github.com/users/vitorcerqueira/repos`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();

      const newData = data.slice(1);

      // Para cada item no novo array, chama a função para adicionar um slide
      newData.forEach((item) => {
        mockupSlideIten({
          name: item.name,
          url: item.html_url,
          topics: item.topics,
          homepage: item.homepage,
        });
      });

      // Atualizar a lista de elementos dos slides após criar todos os novos elementos
      slideItems = document.querySelectorAll('[data-slide="item"]');

      // Função para mover os slides
      function translateSlide({ position }) {
        state.savedPosition = position;
        slideList.style.transform = `translateX(${position}px)`;
      }

      // Função para calcular a posição central do slide
      function getCenterPosition({ index }) {
        const slideItem = slideItems[index];
        const slideWidth = slideItem.clientWidth;
        const slideWrapperWidth = slideWrapper.clientWidth;
        const margin = (slideWrapperWidth - slideWidth) / 2;
        const position = margin - index * slideWidth;
        return position;
      }

      // Função para exibir um slide específico
      function setVisibleSlide({ index, animate }) {
        if (index === 0 || index === slideItems.length - 1) {
          index = state.currentSlideIndex;
        }

        // Calcula a posição central do slide
        const position = getCenterPosition({ index: index });

        // Atualiza o índice do slide atual
        state.currentSlideIndex = index;

        // Define a transição conforme a animação
        slideList.style.transition =
          animate === true ? "transform .5s" : "none";

        // Ativa o botão de controle correspondente ao slide
        activeControlButton({ index });

        // Move o slide para a posição calculada
        translateSlide({ position: position });
      }

      // Função para avançar para o próximo slide
      function nextSlide() {
        setVisibleSlide({ index: state.currentSlideIndex + 1, animate: true });
      }

      // Função para voltar para o slide anterior
      function previousSlide() {
        setVisibleSlide({ index: state.currentSlideIndex - 1, animate: true });
      }

      // Função para criar botões de controle para cada slide
      function createControlButtons() {
        slideItems.forEach(function () {
          const controlButton = document.createElement("button");
          controlButton.classList.add("slide-control-button");
          controlButton.classList.add("fas");
          controlButton.classList.add("fa-circle");
          controlButton.dataset.slide = "control-button";

          // Adiciona o botão de controle ao wrapper de controles
          controlsWrapper.append(controlButton);
        });
      }

      // Função para ativar o botão de controle correspondente ao slide
      function activeControlButton({ index }) {
        const slideItem = slideItems[index];
        const dataIndex = Number(slideItem.dataset.index);
        const controlButton = controlButtons[dataIndex];

        // Remove a classe 'active' de todos os botões de controle
        controlButtons.forEach(function (controlButtonItem) {
          controlButtonItem.classList.remove("active");
        });

        // Se o botão de controle existir, adiciona a classe 'active'
        if (controlButton) controlButton.classList.add("active");
      }

      // Função para criar clones dos slides e adicionar ao carrossel
      function createSlideClones() {
        // Clona o primeiro slide
        const firstSlide = slideItems[0].cloneNode(true);
        firstSlide.classList.add("slide-cloned");
        firstSlide.dataset.index = slideItems.length;

        // Clona o segundo slide
        const secondSlide = slideItems[1].cloneNode(true);
        secondSlide.classList.add("slide-cloned");
        secondSlide.dataset.index = slideItems.length + 1;

        // Clona o penúltimo slide
        const penultimateSlide =
          slideItems[slideItems.length - 2].cloneNode(true);
        penultimateSlide.classList.add("slide-cloned");
        penultimateSlide.dataset.index = -2;

        // Clona o último slide
        const lastSlide = slideItems[slideItems.length - 1].cloneNode(true);
        lastSlide.classList.add("slide-cloned");
        lastSlide.dataset.index = -1;

        // Adiciona os slides clonados ao carrossel
        slideList.append(firstSlide);
        slideList.append(secondSlide);
        slideList.prepend(lastSlide);
        slideList.prepend(penultimateSlide);

        // Atualiza a lista de elementos dos slides
        slideItems = document.querySelectorAll('[data-slide="item"]');
      }

      // Função executada quando o mouse é pressionado em um slide
      function onMouseDown(event, index) {
        const slideItem = event.currentTarget;
        state.startingPoint = event.clientX;
        state.currentPoint = event.clientX - state.savedPosition;
        state.currentSlideIndex = index;

        // Adiciona a classe 'active' ao slide pressionado
        slideItem.classList.add("active");

        // Remove a transição para permitir um movimento suave
        slideList.style.transition = "none";

        // Adiciona evento de mousemove ao slide
        slideItem.addEventListener("mousemove", onMouseMove);
      }

      // Função executada quando o mouse é movido sobre um slide pressionado
      function onMouseMove(event) {
        state.movement = event.clientX - state.startingPoint;
        const position = event.clientX - state.currentPoint;

        // Move o slide de acordo com o movimento do mouse
        translateSlide({ position });
      }

      // Função executada quando o mouse é liberado após pressionar um slide
      function onMouseUp(event) {
        // Define uma quantidade de pontos a serem movidos antes de avançar ou voltar slide
        const pointsToMove = event.type.includes("touch") ? 50 : 150;

        // Verifica se o movimento foi suficiente para avançar ou voltar slide
        if (state.movement < -pointsToMove) {
          nextSlide();
        } else if (state.movement > pointsToMove) {
          previousSlide();
        } else {
          // Caso contrário, mantém o slide atual
          setVisibleSlide({ index: state.currentSlideIndex, animate: true });
        }

        // Reinicia o valor de movimento
        state.movement = 0;
        const slideItem = event.currentTarget;

        // Remove a classe 'active' do slide
        slideItem.classList.remove("active");

        // Remove o evento de mousemove do slide
        slideItem.removeEventListener("mousemove", onMouseMove);
      }

      // Função executada quando o toque é iniciado em um slide
      function onTouchStart(event, index) {
        // Define a coordenada X do toque como a coordenada X do primeiro toque
        event.clientX = event.touches[0].clientX;

        // Chama a função onMouseDown com as coordenadas ajustadas
        onMouseDown(event, index);
        const slideItem = event.currentTarget;

        // Adiciona o evento touchmove ao slide
        slideItem.addEventListener("touchmove", onTouchMove);
      }

      // Função executada quando o toque é movido sobre um slide pressionado
      function onTouchMove(event) {
        // Define a coordenada X do toque como a coordenada X do primeiro toque
        event.clientX = event.touches[0].clientX;

        // Chama a função onMouseMove com as coordenadas ajustadas
        onMouseMove(event);
      }

      // Função executada quando o toque é liberado após pressionar um slide
      function onTouchEnd(event) {
        // Chama a função onMouseUp para lidar com o evento de toque finalizado
        onMouseUp(event);
        const slideItem = event.currentTarget;

        // Remove o evento touchmove do slide
        slideItem.removeEventListener("touchmove", onTouchMove);
      }

      // Função executada quando um botão de controle é clicado
      function onControlButtonClick(index) {
        // Define o índice do slide a ser mostrado com base no índice do controle clicado
        setVisibleSlide({ index: index + 2, animate: true });
      }

      // Função executada quando a transição do carrossel de slides é concluída
      function onSlideListTransitionEnd() {
        const slideItem = slideItems[state.currentSlideIndex];

        // Verifica se o slide atual é um clone e decide se deve ajustar a visibilidade
        if (
          slideItem.classList.contains("slide-cloned") &&
          Number(slideItem.dataset.index) > 0
        ) {
          setVisibleSlide({ index: 2, animate: false });
        }
        if (
          slideItem.classList.contains("slide-cloned") &&
          Number(slideItem.dataset.index) < 0
        ) {
          setVisibleSlide({ index: slideItems.length - 3, animate: false });
        }
      }

      // Função para configurar a reprodução automática dos slides
      function setAutoPlay() {
        if (state.autoPlay) {
          // Define um intervalo para alternar automaticamente os slides
          slideInterval = setInterval(function () {
            setVisibleSlide({
              index: state.currentSlideIndex + 1,
              animate: true,
            });
          }, state.timeInterval);
        }
      }

      // Função para configurar os ouvintes de eventos
      function setListeners() {
        // Seleciona todos os botões de controle
        controlButtons = document.querySelectorAll(
          '[data-slide="control-button"]'
        );

        // Adiciona os ouvintes de evento para os botões de controle
        controlButtons.forEach(function (controlButton, index) {
          controlButton.addEventListener("click", function (event) {
            // Chama a função onControlButtonClick passando o índice do controle
            onControlButtonClick(index);
          });
        });

        // Adiciona os ouvintes de evento para os itens de slide
        slideItems.forEach(function (slideItem, index) {
          slideItem.addEventListener("dragstart", function (event) {
            event.preventDefault();
          });
          slideItem.addEventListener("mousedown", function (event) {
            // Chama a função onMouseDown passando o índice do item de slide
            onMouseDown(event, index);
          });
          slideItem.addEventListener("mouseup", onMouseUp);
          slideItem.addEventListener("touchstart", function (event) {
            // Chama a função onTouchStart passando o índice do item de slide
            onTouchStart(event, index);
          });
          slideItem.addEventListener("touchend", onTouchEnd);
        });

        // Adiciona os ouvintes de evento para os botões de navegação
        navNextButton.addEventListener("click", nextSlide);
        navPreviousButton.addEventListener("click", previousSlide);

        // Adiciona o ouvinte de evento para o fim de transição da lista de slides
        slideList.addEventListener("transitionend", onSlideListTransitionEnd);

        // Adiciona os ouvintes de evento para pausar a reprodução automática no hover
        slideWrapper.addEventListener("mouseenter", function () {
          clearInterval(slideInterval);
        });

        // Configura a reprodução automática novamente após sair do hover
        slideWrapper.addEventListener("mouseleave", function () {
          setAutoPlay();
        });

        let resizeTimeout;

        // Adiciona um ouvinte de evento para redimensionamento da janela
        window.addEventListener("resize", function () {
          clearTimeout(resizeTimeout);

          // Define um timeout para ajustar a visibilidade após o redimensionamento
          resizeTimeout = setTimeout(function () {
            setVisibleSlide({ index: state.currentSlideIndex, animate: true });
          }, 1000);
        });
      }

      // Define o estado de reprodução automática e intervalo de tempo
      state.autoPlay = autoPlay;
      state.timeInterval = timeInterval;

      // Cria os botões de controle, clones dos slides e define ouvintes de eventos
      createControlButtons();
      createSlideClones();
      setListeners();

      // Define o slide inicial a ser exibido e inicia a reprodução automática
      setVisibleSlide({ index: startAtIndex + 2, animate: true });
      setAutoPlay();
    })
    .catch((err) => {
      console.log(err);
    });
}
