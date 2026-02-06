let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// (Manipulating object, duration, manipulating object initial state, manipulating object final state)
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut },
  )
  .fromTo(slider, 1, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut });
