// let hero = document.querySelector(".hero");
// let slider = document.querySelector(".slider");
// let animation = document.querySelector("section.animation-wrapper");

// const time_line = new TimelineMax();

// // (Manipulating object,
// //  duration,
// //  manipulating object initial state,
// //  manipulating object final state,
// //  start the animation before a duration beforehands)
// time_line
//   .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
//   .fromTo(
//     hero,
//     1.2,
//     { width: "80%" },
//     { width: "100%", ease: Power2.easeInOut },
//   )
//   .fromTo(
//     slider,
//     1,
//     { x: "-100%" },
//     { x: "0%", ease: Power2.easeInOut },
//     "-=1.2",
//   )
//   .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// setTimeout(() => {
//   animation.style.pointerEvents = "none";
// }, 2500);

//------------------------------------------------------------------

// Avoid the Enter key fresh the page
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// Avoid all buttons submit the form after clicking
let allButton = document.querySelectorAll("button");
allButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// After choosing Option in Select, change into the corresponding colors
let allSelect = document.querySelectorAll("select");
allSelect.forEach((select) => {
  select.addEventListener("change", (e) => {
    changeColor(e.target); // e.target is <select>
  });
});

function changeColor(target) {
  if (target.value === "A+" || target.value === "A" || target.value === "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value === "B+" ||
    target.value === "B" ||
    target.value === "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value === "C+" ||
    target.value === "C" ||
    target.value === "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value === "D+" ||
    target.value === "D" ||
    target.value === "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (
    target.value === "E+" ||
    target.value === "E" ||
    target.value === "E-"
  ) {
    target.style.backgroundColor = "grey";
    target.style.color = "black";
  } else {
    target.style.backgroundColor = "white";
  }
}
