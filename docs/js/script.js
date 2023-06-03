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

   // ! Spoiler.html
   if (qa(".spoiler")) {
      // ? Если нужно открыть только первый спойлер на странице. Можно прогнать циклом для остальных
      if (qs(".spoiler").classList.contains("opened")) {
         let spoilerWrapper = qa(".spoiler__wrapper")[0];
         spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
      }

      body.addEventListener("click", toggleSpoiler);

      function toggleSpoiler(e) {
         if (e.target.closest(".spoiler__preview")) {
            e.target.closest(".spoiler").classList.toggle("opened");
            let spoilerWrapper = e.target.closest(".spoiler__preview").nextElementSibling;
            if (!e.target.closest(".spoiler").classList.contains("opened")) {
               spoilerWrapper.style.height = null;
            } else {
               spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
            }
         }
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
const videoSign = document.querySelector('.hero__video-sign');
const videoPic = document.querySelector('.hero__video-pic img');

videoSign.addEventListener('mouseover', () => {
   videoPic.classList.add('zoomed');
});

videoSign.addEventListener('mouseout', () => {
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




document.addEventListener('DOMContentLoaded', function () {

   // ! Pop-up с авто запуском видео фрейма 
   const videoBtnSign = document.querySelector('.hero__video-sign');
   const popUp = document.querySelector('.pop-up');
   const popUpClose = document.querySelector('.pop-up__close');
   const videoIframe = document.querySelector('.pop-up__body iframe');

   videoBtnSign.addEventListener('click', toggleVideoPopup);
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
      playVideo();

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

   function playVideo() {
      const videoSrc = videoIframe.src;
      if (videoSrc.includes('autoplay=0')) {
         videoIframe.src = videoSrc.replace('autoplay=0', 'autoplay=1');
      } else {
         videoIframe.src += (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
      }
   }

   function stopVideo() {
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
