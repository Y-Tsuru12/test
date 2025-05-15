// ページ読み込み完了時のアニメーション
window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();

  // 最初にmain-logo以外は非表示に
  gsap.set([".header", "footer", ".button-container .btn"], { opacity: 0 });

  // ロゴを5秒かけて 7% まで透過
  tl.to("#main-logo", {
    duration: 5,
    opacity: 0.07,
    ease: "power2.out"
  });

  // ロゴが透過し終わったらヘッダーとフッターを表示
  tl.to([".header", "footer"], {
    duration: 1,
    opacity: 1,
    ease: "power2.out"
  }, "+=0");

  // ボタンを3秒でフェードイン（0 → 1）
  const buttons = gsap.utils.toArray(".button-container .btn");
  buttons.forEach((el, i) => {
    gsap.fromTo(el,
      {
        opacity: 0,
        scale: 0.95
      },
      {
        opacity: 1,
        scale: 1,
        duration: 3,
        delay: 5 + i * 0.5, // ロゴ透過終了後に開始
        ease: "power2.out"
      }
    );

    // PCのみふわふわアニメーション
    if (window.innerWidth > 768) {
      gsap.to(el, {
        y: "+=10",
        duration: 2.5 + Math.random(),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  });
});