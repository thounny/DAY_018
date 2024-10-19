# DAY_018 | Smooth 3D Card Animation with ScrollTrigger

This project is part of my daily code challenge series, **DAY_018**, where I focus on building an **interactive 3D card animation** using **GSAP**, **ScrollTrigger**, and **Lenis**. The design and animation are inspired by an element from **Lusion**, an **Awwwards** SOTD winner.

[Visit the incredible website by Lusion!](https://lusion.co/)

---

## Preview

![DAY_018 Preview](./assets/DAY_018_1.gif)

## Inspiration

![Lusion](./assets/DAY_018_2.gif)

---

## Project Overview

This project showcases a smooth 3D card flipping animation that reacts to scrolling, leveraging **GSAP** for the animation and **Lenis** for smooth scrolling effects. The inspiration behind this animation comes from **Lusion**, a site that won **Site of the Day** on **Awwwards** for its immersive 3D experience.

---

## Key Features

- **Smooth Scroll**: The webpage utilizes **Lenis** to provide a smooth scrolling experience.
- **3D Card Flip Animation**: Cards flip and rotate on scroll, offering dynamic interaction.
- **GSAP and ScrollTrigger**: Animations are controlled using **GSAP** with **ScrollTrigger** to create a seamless effect as users scroll down the page.

---

## GSAP in Action

**GSAP (GreenSock Animation Platform)** powers the 3D transformations and animations of the cards. The **Lenis** library provides the smooth scroll interaction, and **ScrollTrigger** is used to control animations based on the scroll position.

### Effects Breakdown:

#### 1. Smooth Scroll with Lenis and GSAP Setup:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // smooth scroll
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
```

**Explanation**:

- **Lenis Integration**: Lenis provides smooth scrolling for the page. It’s connected with **GSAP’s** `ScrollTrigger` by updating the scroll state with `ScrollTrigger.update`.
- **GSAP Ticker**: `gsap.ticker.add()` ensures that Lenis' scroll behavior is in sync with GSAP’s ticker, making the animations run smoothly during the scrolling.

---

#### 2. Card Positioning and Rotation on Scroll:

```javascript
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
```

**Explanation**:

- **Cards Setup**: This part gathers all `.card` elements and defines their final positions (`positions[]`) and rotations (`rotations[]`).
- **Pinning the Cards**: Using `ScrollTrigger.create()`, the entire cards section is pinned to the screen during scroll, ensuring they stay visible for the duration of the scroll.

---

#### 3. Spreading and Rotating Cards:

```javascript
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
      },
    });
  });
```

**Explanation**:

- **Card Spread**: Each card is animated to move to its designated position (from `positions[]`) and rotate slightly (from `rotations[]`). These movements are synchronized with the scroll, creating a staggered layout as the user scrolls down.
- **ScrollTrigger**: This triggers the movement based on scroll position and provides a `scrub` effect, meaning the animations are directly tied to the scroll speed for a natural effect.

---

#### 4. Rotating and Flipping Cards:

```javascript
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
```

**Explanation**:

- **Staggered Card Flip**: Each card is set up to flip around the Y-axis as the user scrolls. The flipping effect is applied using a staggered timing (`staggerOffset`), so each card flips at a slightly different time.
- **Dynamic Rotation**: Both the front and back of the cards rotate between `-180deg` and `180deg` as the user scrolls. This creates the flipping effect where the card reveals its back side.
- **Scroll Progress Control**: The entire flipping animation is driven by the scroll progress, making the effect smooth and directly linked to the user's scroll speed.

---

## How to Run

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thounny/DAY_018.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd DAY_018
   ```

3. **Open the `index.html` file** in your browser, or use a local development server like **Live Server** in VSCode.

---

## Project Structure

```bash
DAY_018/
│
├── assets/
├── images/
├── fonts/
├── styles.css
├── index.html
└── script.js
```

---

## Features

- **Smooth Scrolling**: Smooth scrolling interaction powered by **Lenis**.
- **GSAP-Powered 3D Card Animation**: Dynamic card animations with **GSAP** and **ScrollTrigger**.
- **Responsive Design**: Ensures the animation and layout work across all screen sizes.

---

## Technologies Used

- **HTML5**: Structuring content and elements.
- **CSS3**: Styling and animations.
- **JavaScript (ES6)**: Creating interactive features.
- **GSAP (GreenSock Animation Platform)**: Animating the 3D card flipping and transitions.
- **ScrollTrigger**: Linking animations to scroll events.
- **Lenis**: Enhancing scroll behavior for smooth interactions.

---

## Author

![Logo](./assets/index_dwn.gif)

**Thounny Keo**  
Creative Developer & Designer  
Frontend Development Student | Year Up United

---

![miku](./assets/miku.gif)

