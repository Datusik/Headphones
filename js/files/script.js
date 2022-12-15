const swiper = new Swiper('.hero-swiper', { 
  spaceBetween: 40, 
  speed: 400,       
  autoHeight: true, 
  pagination: { 
    el: ".swiper-pagination", 
    clickable: true, 
       
  }, 
  navigation: { 
    nextEl: ".swiper-button-next", 
    prevEl: ".swiper-button-prev", 
  }, 
   
});

