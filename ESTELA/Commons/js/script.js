document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const navHeight = header.offsetHeight;
  const hamburger = document.getElementById("js-hamburger");
  const navSp = document.getElementById("js-nav");
  const pageTop = document.getElementById("js-page-top");
  const body = document.body;

  // ページ内スクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href === "#" || href === "" ? "html" : href);
      if (target) {
        e.preventDefault();
        const position = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: position,
          behavior: "smooth"
        });
      }
    });
  });

  // ページトップボタン（存在する場合）
  if (pageTop) {
    pageTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ハンバーガーメニューの開閉
  hamburger.addEventListener("click", () => {
    body.classList.toggle("nav-open");
    body.style.overflow = body.classList.contains("nav-open") ? "hidden" : "auto";
  });

  // SPメニュー内リンクをクリックしたら閉じる
  navSp.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      body.style.overflow = "auto";
    });
  });

  // nav-spの背景クリックで閉じる
  navSp.addEventListener("click", (e) => {
    const navList = navSp.querySelector(".nav-list");
    if (
      e.target === navSp ||
      (!navList.contains(e.target) && !e.target.closest(".hamburger"))
    ) {
      body.classList.remove("nav-open");
      body.style.overflow = "auto";
    }
  });

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