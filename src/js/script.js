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
})

