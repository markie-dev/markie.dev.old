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
      }, 5);
    }
  }
  lastScrollTop = scrollTop;
});

var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1500, // Speed in milliseconds
    offset: -50, // Offset in pixels
  });

  var scroll = new SmoothScroll();

  document.querySelector('.logo').addEventListener('click', function (event) {
    event.preventDefault();
    scroll.animateScroll(0);
  });