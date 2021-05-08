(function() {
  const baseSize = 32; // 设计稿为750设置为32， 设计稿为375设置为16
  function setRem() {
    //设置最大宽度防止pc端太大
    const clientWidth = Math.min(document.documentElement.clientWidth, 414);
    const scale = clientWidth / 750; // 设计稿宽度
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  }

  window.onresize = function() {
    setRem();
  };
})();