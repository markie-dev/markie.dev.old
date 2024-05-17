let lastScrollTop = 0;
let isScrolling;
const banner = document.querySelector('.banner');
const threshold = 50;

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let clientHeight = document.documentElement.clientHeight;

  if (scrollTop > lastScrollTop && scrollTop > threshold){
    banner.classList.add('hide');
  } else {
    if (scrollTop + clientHeight < scrollHeight) {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function() {
        banner.classList.remove('hide');
      }, 10);
    }
  }
  lastScrollTop = scrollTop;
});