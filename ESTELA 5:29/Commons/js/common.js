document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const navHeight = header.offsetHeight;
  const hamburger = document.getElementById("js-hamburger");
  const navSp = document.getElementById("js-nav");
  const pageTop = document.getElementById("js-page-top");
  const body = document.body;
  const mv = document.querySelector(".mv");
  if (header && mv) {
    mv.style.marginTop = `${navHeight}px`;
  }

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

  // ハンバーガーメニューの開閉
  hamburger.addEventListener("click", () => {
    // メニューの開閉状態を切り替え
    hamburger.classList.toggle("is-active");
    navSp.classList.toggle("is-active");
    body.classList.toggle("nav-open");

    // メニューが開いている場合は背景のスクロールを無効化
    if (body.classList.contains("nav-open")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  });

  // メニュー内のリンクをクリックしたら閉じる
  const navLinks = document.querySelectorAll(".nav-sp .nav-list a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-active");
      navSp.classList.remove("is-active");
      body.classList.remove("nav-open");
      body.style.overflow = "auto";
    });
  });

  // メニューの背景をクリックしたときに閉じる
  navSp.addEventListener("click", (e) => {
    // クリックした要素が.nav-itemの外側の場合のみ閉じる
    if (!e.target.closest('.nav-item')) {
      hamburger.classList.remove("is-active");
      navSp.classList.remove("is-active");
      body.classList.remove("nav-open");
      body.style.overflow = "auto";
    }
  });

  // 画面サイズ変動時の処理
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      hamburger.classList.remove("is-active");
      navSp.classList.remove("is-active");
      body.classList.remove("nav-open");
      body.style.overflow = "auto";
    }
    if (header && mv) {
      const newHeight = header.offsetHeight;
      mv.style.marginTop = `${newHeight}px`;
    }
  });
});