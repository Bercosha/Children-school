window.addEventListener('DOMContentLoaded', () => {

  // Tabs
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

  // Scroll Up

const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    this.el.classList.remove('btn-up_hide');
  },
  hide() {
    this.el.classList.add('btn-up_hide');
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 400 ? this.show() : this.hide();
    });
    document.querySelector('.btn-up').onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();

// Yandex map

ymaps.ready(init);

function init() {
    var mapElement = document.querySelector(".contacts__map");

    if (!mapElement) {
        console.error("Элемент .contacts__map не найден!");
        return;
    }

    var map = new ymaps.Map(mapElement, {
        center: [59.979952, 30.393959], 
        zoom: 12, 
        controls: ["zoomControl", "fullscreenControl"]
    });

    map.behaviors.enable(["drag", "scrollZoom", "dblClickZoom", "multiTouch"]);

    var placemark1 = new ymaps.Placemark([59.979952, 30.393959], {
        balloonContent: "Кондратьевский пр-кт. дом 62. к 1"
    });

    var placemark2 = new ymaps.Placemark([60.059418, 30.471977], {
        balloonContent: "улю Флотская. дом 7"
    });

    map.geoObjects.add(placemark1);
    map.geoObjects.add(placemark2);

    var bounds = [
        [59.979952, 30.393959], 
        [60.059418, 30.471977]  
    ];
    map.setBounds(bounds, { checkZoomRange: true, zoomMargin: 20 });
}

  // Modal

  let sourceElement = null;

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  function closeModal(modal) {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  function modals() {
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const dashedButtons = document.querySelectorAll('.dashed');
    const modal = document.querySelectorAll('.modal');

    modalTrigger.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        openModal(modalId)
      });
    });

    dashedButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        sourceElement = btn.closest('.services-content');
        console.log(sourceElement);
        openModal('modal5');
      })
    })

    modal.forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal__dialog') || e.target.getAttribute('data-close') == '') {
          closeModal(modal);
        }
      })
    })
  }

  modals();

    // Forms

    

    function forms() {
      const forms = document.querySelectorAll('form');

      const message = {
        loading: 'images/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
      };

      forms.forEach(item => {
        bindPostData(item);
      })

      function bindPostData(form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const statusMessage = document.createElement('img');
          statusMessage.src = message.loading;
          statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
          `;
          form.insertAdjacentElement('afterend', statusMessage);

          const formData = new FormData(form);
          console.log(formData);

          const json = JSON.stringify(Object.fromEntries(formData.entries()));

          postData('http://localhost:3000/requests', json)
          .then(data => {
            console.log(data);
          })
          .catch(() => {
            showThanksModal(message.failure);
          })
          .finally(() => {
            form.reset();
             statusMessage.remove();
          })
        })
      }

      function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
    
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);
    
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
          thanksModal.remove();
          prevModalDialog.classList.add('show');
          prevModalDialog.classList.remove('hide');
          closeModal('.modal');
        }, 4000);
      }

      fetch('http://localhost:3000/menu')
      .then(data => data.json())

    }

    forms();



});

const postData = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await res.json();
  } catch (error) {
    console.error('Ошибка отправки данных', error);
  }
}