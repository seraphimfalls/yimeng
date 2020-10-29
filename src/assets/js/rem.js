(function() {
  const scale = 100 / 750.0; //设计稿大小
  const html = document.getElementsByTagName("html")[0];
  const resize = function() {
    html.style.fontSize = scale * document.documentElement.clientWidth + "px";
  };
  const resizeEvt = window.orientationchange ? "orientationchange" : "resize";

  document.addEventListener("DOMContentLoaded", resize, false);
  window.addEventListener(resizeEvt, resize, false);
})();
