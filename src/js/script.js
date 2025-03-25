window.addEventListener('DOMContentLoaded', () => {
  function tabs() {
    const tabs = document.querySelectorAll('.services-item'),
          tabsParent = document.querySelector('.services-items'),
          tabsContent = document.querySelectorAll('.services-content');
  
    function hideTabContent() {
      tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
      })
  
      tabs.forEach(item => {
        item.classList.remove('active-service');
      })
    }
  
    function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('active-service');
    }
  
    hideTabContent();
    showTabContent();
          
    tabsParent.addEventListener('click', (event) => {
      const target = event.target.closest('.services-item');
  
      if (target) {
        tabs.forEach((item, i) => {
          if (target === item) {
            hideTabContent();
            showTabContent(i);
          }
        })
      }
    })
  }

  tabs();

  // Slider

    $(function() {
      $('.comments__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: '<img class="arrow arrow-left" src="images/arrow-left.png" alt="">',
    nextArrow: '<img class="arrow arrow-right" src="images/arrow-right.png" alt="">'
    });
})


    /* $('.comments__slider').slick({
      dots: true,
    slidesToShow: 4,
    variableWidth: true,
    prevArrow: '<img class="arrow arrow-left" src="images/arrow-left.svg" alt="">',
    nextArrow: '<img class="arrow arrow-right" src="images/arrow-right.svg" alt="">',
    responsive: [
      {
        breakpoint: 361,
        settings: {
          variableWidth: false,
          slidesToShow: 1,
        }
      }
    ]
    }); */
});