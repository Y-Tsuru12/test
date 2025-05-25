// ページ読み込み完了時のアニメーション
window.addEventListener('DOMContentLoaded', () => {

  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();
  const tl = gsap.timeline();

  // スライドショーの初期化（共通処理）
  function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide-item');
    let currentIndex = 0;
    let slideInterval;

    // スライドが存在するかチェック
    if (slides.length === 0) {
      console.warn('スライドアイテムが見つかりません');
      return null;
    }

    // 初期状態の設定
    function initializeSlides() {
      slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
      });
      
      // 最初のスライドをアクティブに
      if (slides[0]) {
        slides[0].classList.add('active');
        slides[0].style.opacity = '1';
      }
      currentIndex = 0;
    }

    function showSlide(index) {
      // 範囲チェック
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      
      // 現在のスライドを非表示
      slides[currentIndex].classList.remove('active');
      slides[currentIndex].style.opacity = '0';
      
      // インデックスを更新
      currentIndex = index;
      
      // 新しいスライドを表示
      slides[currentIndex].classList.add('active');
      slides[currentIndex].style.opacity = '1';
    }

    // 自動再生
    function startAutoSlide() {
      // 既存のインターバルをクリア
      if (slideInterval) {
        clearInterval(slideInterval);
      }
      
      // 初期化
      initializeSlides();
      
      // インターバル設定（3.5秒間隔）
      slideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 3500);
    }

    // ページの可視性が変更された時の処理
    function handleVisibilityChange() {
      if (document.hidden) {
        // ページが非表示になった時は一時停止
        if (slideInterval) {
          clearInterval(slideInterval);
        }
      } else {
        // ページが表示された時は再開
        startAutoSlide();
      }
    }

    // ウィンドウがフォーカスを失った/得た時の処理
    function handleBlur() {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    }

    function handleFocus() {
      startAutoSlide();
    }

    // イベントリスナーの登録（重複を避けるため一度だけ）
    if (!window.slideshowEventsRegistered) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('blur', handleBlur);
      window.addEventListener('focus', handleFocus);
      window.slideshowEventsRegistered = true;
    }

    return {
      start: startAutoSlide,
      stop: () => {
        if (slideInterval) {
          clearInterval(slideInterval);
        }
      }
    };
  }

  // スライドショーは再訪時も永続
  const slideshow = initializeSlideshow();
  if (slideshow) {
    slideshow.start();
  }

  // 15分以内に再訪した場合はアニメーションをスキップ（ふわふわアニメーションのみ適用）
  if (lastVisit && now - Number(lastVisit) < 15 * 60 * 1000) {
    gsap.set("#main-logo", { opacity: 0.07 });
    gsap.set([".header", "footer", ".button-container .btn", ".scroll-down"], { opacity: 1, scale: 1 });

    const buttons = gsap.utils.toArray(".button-container .btn");
    buttons.forEach((el) => {
      gsap.to(el, {
        y: "+=10",
        duration: 2.5 + Math.random(),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });
    return;
  }

  // 初回と15分以上経過していた場合はアニメーションを実行
  localStorage.setItem('lastVisit', now);

  // main-logo以外は非表示
  gsap.set([".header", "footer", ".button-container .btn", ".scroll-down"], { opacity: 0 });
  gsap.set(["#about", "#staff", "#style", "#news", "#contact", "#store-info"], { opacity: 0 });

  // ロゴを5秒かけて 7% まで透過
  tl.to("#main-logo", {
    duration: 5,
    opacity: 0.07,
    ease: "power2.out"
  });

  // ボタンを5秒でフェードイン（0 → 1）
  const buttons = gsap.utils.toArray(".button-container .btn");
  buttons.forEach((el, i) => {
    gsap.fromTo(el,
      {
        opacity: 0,
        scale: 0.95,
        y: 20
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2,
        delay: 5 + i * 0.5,
        ease: "power2.out"
      }
    );

    // ふわふわアニメーションを全画面幅で適用
    gsap.to(el, {
      y: "+=10",
      duration: 2.5 + Math.random(),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  });

  // ヘッダー・フッター・スクロールダウン・各セクションのフェードイン（ボタンと同時）
  // セクションの初期透明度を0.05に設定
  gsap.set(["#about", "#staff", "#style", "#news", "#contact", "#store-info"], { opacity: 0.1 });
  const totalDelay = 5;
  tl.to(
    [".header", "footer", ".scroll-down"],
    {
      duration: 1,
      opacity: 1,
      ease: "power2.out",
      delay: totalDelay
    }
  );
  tl.to(
    ["#about", "#staff", "#style", "#news", "#contact", "#store-info"],
    {
      duration: 1,
      opacity: 1,
      ease: "power2.out"
    },
    "-=0.5"
  );
});