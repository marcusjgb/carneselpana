   //Menu desplegable
   const toggleBtn = document.querySelector('.toggle_btn')
   const toggleBtnIcon = document.querySelector('.toggle_btn i')
   const dropDownMenu = document.querySelector('.dropdown_menu')

   toggleBtn.onclick = function () {
       dropDownMenu.classList.toggle('open')
       const isOpen = dropDownMenu.classList.contains('open')

       toggleBtnIcon.classList = isOpen
       ? 'fa-solid fa-xmark'
       : 'fa-solid fa-bars'
   }
   
   //Slider reseñas
    const swiper = new Swiper(".slider-wrapper", {
    
    loop: true,
    spaceBetween: 25,
    grabCursor: true,
  
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
  
    // Flechas
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
  });


