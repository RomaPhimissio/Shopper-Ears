"use strict";
const burger = document.querySelector(".burger"),
   header = document.querySelector(".header"),
   body = document.querySelector("body");

window.addEventListener("load", () => {
   function qs(element) {
      let newEl = document.querySelector(element);
      if (newEl) return newEl;
   }
   function qa(element) {
      let newEl = document.querySelectorAll(element);
      if (newEl) return newEl;
   }

   // ! Burger
   if (burger) {
      body.addEventListener("click", burgerToggle);
      function burgerToggle(e) {
         if (e.target.closest(".burger")) {
            if (burger.classList.contains("active")) {
               burger.classList.remove("active");
               header.classList.remove("active");
               body.classList.remove("lock");
            } else {
               burger.classList.add("active");
               header.classList.add("active");
               body.classList.add("lock");
               window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
            }
         } else if (!e.target.closest(".burger")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            body.classList.remove("lock");
            window.removeEventListener("scroll", closeBurger);
         }
      }
      function closeBurger() {
         //Необязательная дополнительная проверка
         if (burger.classList.contains("active")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            body.classList.remove("lock");
            window.removeEventListener("scroll", closeBurger);
         }
      }
   }

   // ! Scroll Navigation 

   const menuLinks = document.querySelectorAll('.header__nav-link[data-goto]');
   if (menuLinks.length > 0) {
      menuLinks.forEach(menuLink => {
         menuLink.addEventListener("click", onMenuLinkClick);
      })

      function onMenuLinkClick(e) {
         const menuLink = e.target;
         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            // ! Если шапка с position fixed то тогда нужно отнять высоту шапки
            // const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;


            window.scrollTo({
               top: gotoBlockValue,
               behavior: "smooth"
            })
            e.preventDefault();
         }
      }
   }


   // ! Accordeon

   const previewElements = document.querySelectorAll(".footer__preview");

   previewElements.forEach(function (preview) {
      preview.addEventListener("click", toggleAccordion);
   });

   function toggleAccordion(e) {
      const currentColumn = e.currentTarget.closest(".footer__column");
      const columnText = currentColumn.querySelector(".footer__column-block-text");

      if (currentColumn.classList.contains("opened")) {
         // Если текущий аккордеон уже открыт, закрываем его
         currentColumn.classList.remove("opened");
         columnText.style.height = "0";
      } else {
         // Если текущий аккордеон закрыт, закрываем все остальные и открываем текущий
         const openedColumns = document.querySelectorAll(".footer__column.opened");
         openedColumns.forEach(function (column) {
            column.classList.remove("opened");
            const text = column.querySelector(".footer__column-block-text");
            text.style.height = "0";
         });

         currentColumn.classList.add("opened");
         columnText.style.height = columnText.scrollHeight + "px";
      }
   }


   // ! Dropdown 
   const dropdowns = document.querySelectorAll('.dropdown');

   dropdowns.forEach(dropdown => {
      const select = dropdown.querySelector('.dropdown__select');
      const caret = dropdown.querySelector('.dropdown__caret');
      const menu = dropdown.querySelector('.dropdown__menu');
      const options = dropdown.querySelectorAll('.dropdown__item');
      const selected = dropdown.querySelector('.dropdown__selected');

      select.addEventListener('click', () => {
         caret.classList.toggle('caret-rotate');
         menu.classList.toggle('menu-open');
      })
      options.forEach(option => {
         option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
               option.classList.remove('dropdown-active');
            })
            option.classList.add('dropdown-active');
         })
      })
   })


});

// ! Zoom for img 
const videoBlock = document.querySelector('.hero__block-video-wrap');
const videoPic = document.querySelector('.hero__video-pic img');

videoBlock.addEventListener('mouseover', () => {
   videoPic.classList.add('zoomed');
});

videoBlock.addEventListener('mouseout', () => {
   videoPic.classList.remove('zoomed');
});

// ! Text radius 
document.addEventListener("DOMContentLoaded", function () {
   function handleViewportChange() {
      if (window.innerWidth >= 768) {
         // Ширина экрана 768px и больше
         new CircleType(document.getElementById('circle')).radius(200);
      } else {
         // Ширина экрана меньше 768px
         // Вы можете добавить соответствующую обработку или оставить пустым
      }
   }

   // Вызываем функцию handleViewportChange сразу при загрузке страницы
   handleViewportChange();

   // Добавляем обработчик на изменение размеров окна
   window.addEventListener("resize", handleViewportChange);
});

// ! Pop-up с авто запуском видео фрейма 
document.addEventListener('DOMContentLoaded', function () {
   const videoBtnBlock = document.querySelector('.hero__block-video-wrap');
   const popUp = document.querySelector('.pop-up');
   const popUpClose = document.querySelector('.pop-up__close');

   videoBtnBlock.addEventListener('click', toggleVideoPopup);
   popUpClose.addEventListener('click', toggleVideoPopup);

   function toggleVideoPopup() {
      const isActive = popUp.classList.contains('active');
      if (isActive) {
         closeVideoPopup();
      } else {
         openVideoPopup();
      }
   }

   function openVideoPopup() {
      popUp.classList.add('active');
      body.classList.add('no-scroll');
      loadVideo();

      // Переворачиваем экран в горизонтальное положение (только на поддерживаемых устройствах)
      if (window.screen.orientation && window.screen.orientation.lock) {
         window.screen.orientation.lock('landscape');
      }
   }

   function closeVideoPopup() {
      popUp.classList.remove('active');
      body.classList.remove('no-scroll');
      stopVideo();

      // Разблокируем переворот экрана
      if (window.screen.orientation && window.screen.orientation.unlock) {
         window.screen.orientation.unlock();
      }
   }

   function loadVideo() {
      const videoIframe = document.createElement('iframe');
      videoIframe.src = 'https://www.youtube.com/embed/94K4XNCPTJw';
      videoIframe.title = 'YouTube video player';
      videoIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      videoIframe.allowfullscreen = true;
      videoIframe.loading = 'lazy';

      const popUpBody = document.querySelector('.pop-up__body');
      popUpBody.appendChild(videoIframe);

      playVideo();
   }

   function playVideo() {
      const videoIframe = document.querySelector('.pop-up__body iframe');
      const videoSrc = videoIframe.src;
      if (videoSrc.includes('autoplay=0')) {
         videoIframe.src = videoSrc.replace('autoplay=0', 'autoplay=1');
      } else {
         videoIframe.src += (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
      }
   }

   function stopVideo() {
      const videoIframe = document.querySelector('.pop-up__body iframe');
      const videoSrc = videoIframe.src;
      videoIframe.src = videoSrc.replace('autoplay=1', 'autoplay=0');
   }
});


// ! Breadcrumbs === Breadcrumbs === Breadcrumbs === Breadcrumbs === Breadcrumbs

function handleClick(event) {
   const parent = event.currentTarget.parentNode;
   const breadcrumbs = parent.querySelectorAll('.breadcrumb');

   breadcrumbs.forEach((breadcrumb) => {
      breadcrumb.classList.remove('active');
   });

   event.target.classList.add('active');
}

const breadcrumbs1 = document.querySelectorAll('.products__breadcrumbs .breadcrumb');
const breadcrumbs2 = document.querySelectorAll('.products__breadcrumbs-two .breadcrumb');

function handleBreadcrumbClick1(event) {
   handleClick(event);
}

function handleBreadcrumbClick2(event) {
   handleClick(event);
}

breadcrumbs1.forEach((breadcrumb, index) => {
   breadcrumb.addEventListener('click', handleBreadcrumbClick1);

   // При загрузке страницы устанавливаем класс "active" для первого элемента
   if (index === 0) {
      breadcrumb.classList.add('active');
   }
});

breadcrumbs2.forEach((breadcrumb, index) => {
   breadcrumb.addEventListener('click', handleBreadcrumbClick2);

   // При загрузке страницы устанавливаем класс "active" для первого элемента
   if (index === 0) {
      breadcrumb.classList.add('active');
   }
});




// ! Stars === Stars === Stars === Stars === Stars === Stars === Stars

// Находим все контейнеры с классом "prod-card__block"
const prodCardBlocks = document.querySelectorAll('.prod-card__block');

// Обработчик клика на звездах
function handleStarClick(event) {
   const star = event.target;
   const starsContainer = star.parentNode;
   const rating = parseInt(starsContainer.dataset.rating);
   const starIndex = Array.from(starsContainer.children).indexOf(star);

   // Установить новый рейтинг
   starsContainer.dataset.rating = starIndex + 1;

   // Обновить классы звезд
   Array.from(starsContainer.children).forEach((star, index) => {
      if (index <= starIndex) {
         star.classList.add('selected');
      } else {
         star.classList.remove('selected');
      }
   });
}

// Проходимся по каждому контейнеру "prod-card__block"
prodCardBlocks.forEach((block) => {
   const starsContainer = block.querySelector('.prod-card__stars');
   const stars = block.querySelectorAll('.star');

   // Устанавливаем начальный рейтинг для каждого блока
   starsContainer.dataset.rating = '0';

   // Добавляем обработчик клика на звездах
   stars.forEach((star, index) => {
      star.addEventListener('click', handleStarClick);
   });
});


// ! Swiper === Swiper === Swiper === Swiper === Swiper === Swiper === Swiper

new Swiper('.swiper', {
   // клавиатура
   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true
   },
   // ширина слайда
   slidesPerView: 'auto',

   // Отступ между слайдами


   breakpoints: {
      320: {
         spaceBetween: 30
      },
      480: {
         spaceBetween: 50
      },
      1000: {
         spaceBetween: 93
      }
   }
});


// ! Circles === Circles === Circles === Circles === Circles === Circles

// Находим все элементы с классом "circle"
const circles = document.querySelectorAll('.circle');

// Обработчик клика на элементе
function handleClickTwo(event) {
   const clickedCircle = event.target;

   // Удаляем класс "active" у всех элементов
   circles.forEach(circle => {
      circle.classList.remove('active');
   });

   // Добавляем класс "active" только на кликнутый элемент
   clickedCircle.classList.add('active');
}

// Добавляем обработчик клика на каждый элемент
circles.forEach(circle => {
   circle.addEventListener('click', handleClickTwo);
});

// Добавляем класс "active" к первому элементу
circles[0].classList.add('active');

// ! Отмена скролла при клике на ссылку

const allLinks = document.querySelectorAll('a');

allLinks.forEach((link) => {
   link.addEventListener('click', (event) => {
      event.preventDefault(); // Отменяем действие по умолчанию (скроллинг вверх)

      // Дополнительный код для всех ссылок
      // ...
   });
});

// ! Animation elements 
const titleElement = document.querySelector('.products__title');
const breadcrumbsElement = document.querySelector('.products__breadcrumbs');
const titleTwoElement = document.querySelector('.products__title-two');
const breadcrumbsTwoElement = document.querySelector('.products__breadcrumbs-two');
const blogTitleElement = document.querySelector('.blog__title');
const windowHeight = window.innerHeight;

function checkScroll() {
   const titlePosition = titleElement.getBoundingClientRect().top;
   const titleTwoPosition = titleTwoElement.getBoundingClientRect().top;

   if (titlePosition - windowHeight <= 0) {
      titleElement.classList.add('animate');
      breadcrumbsElement.classList.add('animate-right');
   }

   if (titleTwoPosition - windowHeight <= 0) {
      titleTwoElement.classList.add('animate');
      breadcrumbsTwoElement.classList.add('animate-right');
      blogTitleElement.classList.add('animate');
   }
}

window.addEventListener('scroll', checkScroll);


// ! Preloader 

window.addEventListener('load', function () {
   var preloaderOverlay = document.querySelector('.preloader-overlay');
   preloaderOverlay.classList.add('preloader-overlay-hidden');
});
