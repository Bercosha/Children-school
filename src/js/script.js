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

});

ymaps.ready(init);

function init() {
    var mapElement = document.querySelector(".contacts__map");

    if (!mapElement) {
        console.error("Элемент .contacts__map не найден!");
        return;
    }

    var map = new ymaps.Map(mapElement, {
        center: [59.979952, 30.393959], // Центр карты
        zoom: 12, 
        controls: ["zoomControl", "fullscreenControl"]
    });

    map.behaviors.enable(["drag", "scrollZoom", "dblClickZoom", "multiTouch"]);


    // Две метки
    var placemark1 = new ymaps.Placemark([59.979952, 30.393959], {
        balloonContent: "Кондратьевский пр-кт. дом 62. к 1"
    });

    var placemark2 = new ymaps.Placemark([60.059418, 30.471977], {
        balloonContent: "улю Флотская. дом 7"
    });

    map.geoObjects.add(placemark1);
    map.geoObjects.add(placemark2);

    // Автомасштабирование карты по двум точкам
    var bounds = [
        [59.979952, 30.393959], 
        [60.059418, 30.471977]  
    ];
    map.setBounds(bounds, { checkZoomRange: true, zoomMargin: 20 });
}
