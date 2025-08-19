
window.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll(".menu");
  const headerHeight = (document.querySelector("header")?.offsetHeight) || 0;

  const onScroll = () => {
    let current = "";
    const scrollPos = window.pageYOffset;

    // About 그룹
    const aboutSections = document.querySelectorAll(".aboutMe, .aboutMe02, .aboutMe03, .strongPoint");
    aboutSections.forEach(section => {
      if (scrollPos >= section.offsetTop - headerHeight &&
          scrollPos < section.offsetTop + section.clientHeight - headerHeight) {
        current = "about";
      }
    });

    // Project 그룹
    const projectSections = document.querySelectorAll(".workIntro, .work1, .work2, .work3");
    projectSections.forEach(section => {
      if (scrollPos >= section.offsetTop - headerHeight &&
          scrollPos < section.offsetTop + section.clientHeight - headerHeight) {
        current = "project";
      }
    });

    // Coding 그룹
    const codingSections = document.querySelectorAll(".clone, .cloneIntro");
    codingSections.forEach(section => {
      if (scrollPos >= section.offsetTop - headerHeight &&
          scrollPos < section.offsetTop + section.clientHeight - headerHeight) {
        current = "coding";
      }
    });

    // main(.main)이나 contact(.contact)에서는 active 제거
    const main = document.querySelector(".main");
    const contact = document.querySelector(".contact");
    if ((main && scrollPos < main.offsetTop + main.clientHeight - headerHeight) ||
        (contact && scrollPos >= contact.offsetTop - headerHeight)) {
      current = "";
    }

    // 메뉴 active 적용
    menuLinks.forEach(link => link.classList.remove("active"));
    if (current) {
      const activeLink = document.querySelector(`.${current}Link`);
      if (activeLink) activeLink.classList.add("active");
    }
  };

  window.addEventListener("scroll", onScroll);
  // 초기 로드 시 상태 반영
  onScroll();

  // 메뉴 클릭 시 부드럽게 스크롤
  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - headerHeight,
        behavior: "smooth"
      });
    });
  });
});

// GSAP 애니메이션은 모든 리소스 로딩 이후 실행 (CDN 로딩 보장)
window.addEventListener('load', () => {
  if (!window.gsap) return;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ── 메인 섹션: 지속 애니메이션들 (DOM 준비 후 실행)
  [".circleY", ".circle", ".circleP1", ".circleP2"].forEach(sel => {
    gsap.to(sel, {
      y: () => gsap.utils.random(-30, 30),
      duration: () => gsap.utils.random(1.2, 2.2),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  gsap.to(".flowerB", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "linear"
  });

  // 빛 반짝임: 밝기/스케일/글로우를 빠르게 깜빡이도록 구성
  gsap.set(".light", {
    opacity: 0.9,
    transformOrigin: "50% 50%",
    filter: "brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0))"
  });

  const sparkleTL = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
  sparkleTL
    .to(".light", {
      duration: 0.12,
      scale: 1.12,
      opacity: 1,
      filter: "brightness(2) drop-shadow(0 0 8px rgba(255,255,255,0.9))",
      ease: "power2.out"
    })
    .to(".light", {
      duration: 0.18,
      scale: 1.0,
      opacity: 0.85,
      filter: "brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0))",
      ease: "power2.in"
    })
    .to(".light", {
      duration: 0.10,
      scale: 1.06,
      opacity: 1,
      filter: "brightness(1.6) drop-shadow(0 0 5px rgba(255,255,255,0.7))",
      ease: "power2.out"
    })
    .to(".light", {
      duration: 0.22,
      scale: 1.0,
      opacity: 0.9,
      filter: "brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0))",
      ease: "power2.in"
    });

//가로스크롤하다안됨1
    // gsap.registerPlugin(ScrollTrigger);

    // gsap.to(".all", {
    //   xPercent: -100,   // 오른쪽으로 100% 이동
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".aboutMe",
    //     pin: true,
    //     scrub: 1,       // 스크롤에 맞춰 서서히 이동
    //     end: "+=1500",  // 스크롤 길이
    //   }
    // });



//가로스크롤하다안됨2
    // const scrollContainer = document.querySelector(".scroll");
    // const scrollYMax = window.innerHeight; // 한 페이지 높이만큼 가로 이동
    
    // window.addEventListener("scroll", () => {
    //   const scrollY = window.scrollY;
    
    //   if (scrollY <= scrollYMax) {
    //     const progress = scrollY / scrollYMax;
    //     const moveX = -100 * progress; // vw 단위
    //     scrollContainer.style.transform = `translateX(${moveX}vw)`;
    //   } else {
    //     scrollContainer.style.transform = `translateX(-100vw)`; // 가로 스크롤 끝
    //   }
    // });
    
  // 성능 최적화: 페인트 힌트
  gsap.set([".cloneIntro .img", ".cloneIntro .textBox", ".cloneIntro .stic"], {
    willChange: "transform, opacity"
  });

  // 1️⃣ 노란 배경 이미지 먼저 등장 (아래로 스크롤할 때마다 재생)
  gsap.fromTo(
    ".cloneIntro .img",
    { y: -120, autoAlpha: 0, force3D: true },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".cloneIntro",
        start: "top 85%",
        toggleActions: "play none none reset",
      }
    }
  );

  // 2️⃣ 나머지 요소 순차적으로 등장 (아래로 스크롤할 때마다 재생)
  gsap.fromTo(
    ".cloneIntro .textBox, .cloneIntro .stic",
    { y: 60, autoAlpha: 0, force3D: true },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".cloneIntro",
        start: "top 70%",
        toggleActions: "play none none reset",
      }
    }
  );

  // ── Coding 섹션: 이미지 → 선 그리기 순차 애니 (섹션별 타임라인)
  gsap.utils.toArray(".coding").forEach(coding => {
    const img = coding.querySelector(".img");
    const paths = coding.querySelectorAll(".line path");

    // path 초기화 (선 숨김)
    paths.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: coding,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5
      }
    });

    // 1) 이미지 등장
    if (img) {
      tl.from(img, {
        autoAlpha: 0,
        y: 40,
        duration: 0.6,
        ease: "power2.out",
        immediateRender: false
      });
    }

    // 2) 선 그리기 (여러 path면 순차로)
    if (paths.length) {
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "none",
        stagger: { each: 0.05 }
      }, ">-0.1");
    }
  });
});

