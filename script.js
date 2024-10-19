document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // smooth scroll
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const cards = gsap.utils.toArray(".card");
  const totalScrollHeight = window.innerHeight * 3;
  const positions = [14, 38, 62, 86];
  const rotations = [-15, -7.5, 7.5, 15];

  // pin the cards section
  ScrollTrigger.create({
    trigger: ".cards",
    start: "top top",
    end: () => `+=${totalScrollHeight}`,
    pin: true,
    pinSpacing: true,
  });

  // spread cards
  cards.forEach((card, index) => {
    gsap.to(card, {
      left: `${positions[index]}%`,
      rotation: `${rotations[index]}`,
      ease: "none",
      scrollTrigger: {
        trigger: ".cards",
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        scrub: 0.5,
        id: `spread-${index}`,
      },
    });
  });

  // rotate and flip cards with staggered effect
  cards.forEach((card, index) => {
    const frontEl = card.querySelector(".flip-card-front");
    const backEl = card.querySelector(".flip-card-back");

    const staggerOffset = index * 0.05;
    const startOffset = 1 / 3 + staggerOffset;
    const endOffset = 2 / 3 + staggerOffset;

    ScrollTrigger.create({
      trigger: ".cards",
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      scrub: 1,
      id: `rotate-flip-${index}`,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress >= startOffset && progress <= endOffset) {
          const animationProgress = (progress - startOffset) / (1 / 3);
          const frontRotation = -180 * animationProgress;
          const backRotation = 180 - 180 * animationProgress;
          const cardRotation = rotations[index] * (1 - animationProgress);

          frontEl.style.transform = `rotateY(${frontRotation}deg)`;
          backEl.style.transform = `rotateY(${backRotation}deg)`;
          card.style.transform = `translate(-50%, -50%) rotate(${cardRotation}deg)`;
        }
      },
    });
  });
});
