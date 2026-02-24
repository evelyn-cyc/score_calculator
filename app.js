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
// let allButton = document.querySelectorAll("button");
// allButton.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     e.preventDefault();
//   });
// });

// After choosing Option in Select, change into the corresponding colors
// let allSelect = document.querySelectorAll("select");
// allSelect.forEach((select) => {
//   select.addEventListener("change", (e) => {
//     changeColor(e.target); // e.target is <select>
//     setGPA();
//   });
// });

// Handle changes from any select—old or new (Attach one listener to a parent that exists forever)
let allInputsContainer = document.querySelector(".all-inputs");
allInputsContainer.addEventListener("change", (e) => {
  if (e.target.matches("select")) {
    changeColor(e.target); // e.target is <select>
    setGPA();
  }
});

// Once changing credits, change GPA immediately
// let allCredits = document.querySelectorAll(".class-credits");
// allCredits.forEach((credit) => {
//   credit.addEventListener("change", () => {
//     setGPA();
//   });
// });

allInputsContainer.addEventListener("change", (e) => {
  if (e.target.matches(".class-credits")) {
    setGPA();
  }
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
  } else if (target.value === "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "black";
  } else {
    target.style.backgroundColor = "white";
  }
}

function converter(grade) {
  switch (grade) {
    case "A+":
      return 4.0;
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credits");
  let selects = document.querySelectorAll("select");
  let sum = 0;
  let creditSum = 0;

  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * converter(selects[i].value);
    }
  }

  let result = 0.0;
  if (creditSum === 0) {
    result = 0.0;
  } else {
    result = sum / creditSum;
  }

  document.getElementById("result-gpa").innerText = result.toFixed(2);
}

// Clone the form while clicking plus button --------------------------
let plusBtn = document.querySelector(".plus-btn");

plusBtn.addEventListener("click", function () {
  let form = document.querySelector("form");
  let formContainer = document.querySelector(".all-inputs");
  let newForm = form.cloneNode(true);

  cleanForm(newForm);

  formContainer.appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

// Trash bin delete the form ------------------------------------------
allInputsContainer.addEventListener("click", (e) => {
  let trashBtn = e.target.closest(".trash-btn");
  if (!trashBtn) return;

  let graderForm = e.target.closest("form");
  if (!graderForm) return;

  if (document.querySelectorAll(".all-inputs > form").length > 1) {
    graderForm.style.animation = "scaleDown 0.5s ease forwards";
    graderForm.addEventListener(
      "animationend",
      () => {
        graderForm.remove();
        setGPA();
      },
      { once: true },
    );
  } else {
    cleanForm(graderForm);
    setGPA();
  }
});

function cleanForm(graderForm) {
  graderForm.querySelectorAll("input, select").forEach((element) => {
    element.value = "";
    element.style.backgroundColor = "";
  });
}

// Sorting -----------------------------------------------------------
let desBtn = document.querySelector(".sort-descending");
let asBtn = document.querySelector(".sort-ascending");

desBtn.addEventListener("click", () => {
  handleSorting("descending");
});

asBtn.addEventListener("click", () => {
  handleSorting("ascending");
});

// Organize the objectArray which includes the converted grade number
function handleSorting(direction) {
  let container = document.querySelector(".all-inputs");
  let graders = document.querySelectorAll(".grader");
  let objectArray = [];
  let emptyForm = [];

  // Put forms with data into an Object array
  for (let i = 0; i < graders.length; i++) {
    let formRef = graders[i].closest("form");
    let class_name = graders[i].querySelector(".class-category").value;
    let class_number = graders[i].querySelector(".class-number").value;
    let class_credit = graders[i].querySelector(".class-credits").value;
    let class_grade = graders[i].querySelector(".select").value;

    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        formRef,
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object);
    } else {
      emptyForm.push(formRef);
    }
  }

  // Convert grade into the grade number and put it as the new attribute into the object
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i]["class_grade_number"] = converter(
      objectArray[i].class_grade,
    );
  }

  objectArray = mergeSort(objectArray);
  if (direction == "descending") objectArray.reverse();
  console.log(objectArray);

  updateForms(container, objectArray, emptyForm);
}

// Split the array into two until it has only one remaining
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let middleIndex = Math.floor(arr.length / 2);
  let rightArr = arr.slice(middleIndex);
  let leftArr = arr.slice(0, middleIndex);

  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

// Merge the array according to its value, and list with the certain direction
function merge(a1, a2) {
  result = [];

  let i = 0;
  let j = 0;

  // Compare and put the smaller one into the array until one of them finish
  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number < a2[j].class_grade_number) {
      result.push(a1[i]);
      i++;
    } else {
      result.push(a2[j]);
      j++;
    }
  }

  // Put the remaining elements into the array
  while (i <= a1.length - 1) {
    result.push(a1[i]);
    i++;
  }

  // Put the remaining elements into the array
  while (j <= a2.length - 1) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

// Manage the forms update display and animation
function updateForms(container, sortedArray, emptyForm) {
  let lackGradeForm = [];

  container.querySelectorAll("form").forEach((form) => {
    form.classList.remove("scaleUp");
    form.style.animation = "none";
  });

  sortedArray.forEach((item) => {
    if (item.class_grade == "") {
      lackGradeForm.push(item);
    } else {
      container.appendChild(item.formRef);
    }
  });

  // Sort the form with data but lack grade following
  lackGradeForm.forEach((item) => {
    container.appendChild(item.formRef);
  });

  // Sort the completely empty form at the end
  emptyForm.forEach((formRef) => {
    container.appendChild(formRef);
  });
}
