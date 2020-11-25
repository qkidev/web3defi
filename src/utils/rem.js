(function() {
  const baseSize = 32; // 设计稿为750设置为32， 设计稿为375设置为16
  function setRem() {
    const scale = document.documentElement.clientWidth / 750; // 设计稿宽度
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  }

  window.onresize = function() {
    setRem();
  };
})();