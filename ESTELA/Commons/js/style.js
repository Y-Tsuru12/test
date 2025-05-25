document.addEventListener("DOMContentLoaded", () => {

  
  // ===== GLightbox 初期化 =====
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: '.glightbox',
      openEffect: 'zoom',
      closeEffect: 'fade',
      touchNavigation: true,
      loop: true
    });
  }
});