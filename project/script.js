window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();

  // STEP 1: ロゴを5秒かけて 7% まで透過
  tl.to("#main-logo", {
    duration: 5,
    opacity: 0.07,
    ease: "power2.out"
  });

  // STEP 2: ロゴが透過し終わったらヘッダーを表示
  tl.to(".header", {
    duration: 1,
    opacity: 1,
    ease: "power2.out"
  }, "+=0"); // ロゴ終了後すぐ

  // STEP 3: メインエリア表示（同時に開始）
  tl.to("#main-content", {
    duration: 0.1,
    opacity: 1
  }, "-=1.0");

  // STEP 4: ボタンを3秒でフェードイン（0.07 → 1）
  gsap.utils.toArray(".button-container .btn").forEach((el, i) => {
    gsap.fromTo(el,
      {
        opacity: 0.07,
        scale: 0.95
      },
      {
        opacity: 1,
        scale: 1,
        duration: 3,
        delay: 5 + i * 0.2, // ロゴ透過終了後に開始
        ease: "power2.out"
      }
    );

    // STEP 5: ふわふわアニメーション（PCのみ、ロゴ透過完了後にスタート）
    if (window.innerWidth > 768) {
      gsap.to(el, {
        y: "+=10",
        duration: 2.5 + Math.random(),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 8 + i * 0.2 // ボタン表示後
      });
    }
  });

  // ハンバーガーメニュー制御
  const hamburger = document.getElementById('js-hamburger');
  const navSp = document.querySelector('.nav-sp');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navSp.classList.toggle('open');
  });

  document.querySelectorAll('.nav-sp .nav-item a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navSp.classList.remove('open');
    });
  });
});