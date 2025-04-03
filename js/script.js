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

    
      
      const URL_APP = "https://script.google.com/macros/s/AKfycbw4BETMnFDPGNH7288aohHDPnIjBK2w6zf9xcVKmYswfEXLw4IgvkJPxwrZnTHwB-_I/exec";

      const form = document.querySelector(".modal__content");

      form.action = URL_APP;

      function isFilled(details) {
        const {name, phone, email} = details;
        if (!name) return false;
        if (!phone) return false;
        if (!email) return false;
        return true;
      }

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.querySelector("[name=name]");
        const phone = document.querySelector("[name=phone]");
        const email = document.querySelector("[name=email]");

        let details = {
          name: name.value.trim(),
          phone: phone.value.trim(),
          email: email.value.trim(),
        };

        if (!isFilled(details)) return;

        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");

        const result = await fetch(URL_APP, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          cors: "no-cors",
          body: formBody
        })
        .then((res) => res.json())
        .catch((err) => alert("Ошибка!"))

        if (result.type === 'success') {
          name.value = '';
          phone.value = '';
          email.value = '';
          alert('Спасибо за заявку!')
        }
        if (result.type === 'error') {
          alert(`Ошибка(${result.errors}`)
        }
        })
  
      
  

   // Burger

    const burger = document.querySelector('.burger');
        const navMenu = document.querySelector('.nav-menu');
        const closeBtn = document.querySelector('.close-btn');
        const overlay = document.querySelector('.overlay');

        function closeMenu() {
            navMenu.classList.remove('open'); // Закрытие меню
            overlay.classList.remove('active'); // Скрытие затемнения
        }

        function toggleMenu() {
            navMenu.classList.toggle('open'); // Открытие/закрытие меню
            overlay.classList.toggle('active'); // Появление/скрытие затемнения
        }

        burger.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !burger.contains(event.target) && navMenu.classList.contains('open')) {
                closeMenu();
            }
        });

});

/* const form = document.querySelector(".modal__content");

      form.addEventListener("submit", function (e) {
        console.log("Отмена стандартной отправки формы");
        e.preventDefault();

        console.log("Форма отправляется!");

        const formData = {
          name: form.name.value.trim(),
          phone: form.phone.value.trim(),
          email: form.email.value.trim(),
        };

        console.log("Данные формы:", formData);

        fetch("https://script.google.com/macros/s/AKfycby6CUMxAhFUHIgEAJ0lWhVUmh4yZZuFA0kfjltsf33GDJOt8D7UTDugkOGeUKU3df4a/exec", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        })
          .then(response => response.text())
          .then(data => {
            console.log("Ответ сервера:", data);
            alert("Заявка отправлена!");
            form.reset();
          })
          .catch(error => console.error("Ошибка:", error));
      }) */