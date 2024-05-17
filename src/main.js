let lastScrollTop = 0;
const banner = document.querySelector('.banner');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let clientHeight = document.documentElement.clientHeight;

  if (scrollTop > lastScrollTop && scrollTop > 0){
    // Downscroll, not at the top of the page
    banner.classList.add('hide');
  } else {
    // Upscroll or at the top of the page
    // Check if user is at the bottom of the page
    if (scrollTop + clientHeight < scrollHeight) {
      banner.classList.remove('hide');
    }
  }
  lastScrollTop = scrollTop;
});