"use stric";
window.addEventListener("DOMContentLoaded", init);

let elemtoPaint;
let elementToPaint;

const features = {
  featureCouchOne: false,
  featureCouchTwo: false,
  featureCouchThree: false,
  featureCarpetOne: false,
};

async function init() {
  let response = await fetch("./sofaa-01.svg");
  let mySvgData = await response.text();
  console.log(mySvgData);
  document.querySelector("#sofa").innerHTML = mySvgData;
  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));
  startManipulatingTheSvg();
  textAnime();
}

function startManipulatingTheSvg() {
  document.querySelectorAll(".g_to_interact_with").forEach((eachG) => {
    console.log(eachG);

    eachG.addEventListener("click", theClick);
    eachG.addEventListener("mouseover", theMouseover);
    eachG.addEventListener("mouseout", theMouseout);
  });

  document.querySelectorAll(".color_btn").forEach((each_btn) => {
    each_btn.addEventListener("click", colorClick);
  });
}

function theClick() {
  elementToPaint = this;
  this.style.fill = "grey";
}

function theMouseover() {
  console.log(this);
  this.style.stroke = "blue";
}

function theMouseout() {
  console.log(this);
  this.style.stroke = "none";
}

function colorClick() {
  console.log("KLIK", this.getAttribute("fill"));
  if (elementToPaint != undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  }
}

let textSplit;
//animation for text
function textAnime() {
  /* console.log(init); */
  let theText = document.querySelector("#the-animation");
  console.log(theText);
  //split the text
  textSplit = theText.textContent.split("");
  console.log(textSplit);

  //remove the original text
  theText.textContent = "";

  //create a span element for each characers and put them inside the span
  textSplit.forEach((letter, index) => {
    const span = document.createElement("span");
    console.log(span);

    span.classList.add("text-animation");
    span.style.setProperty("--letter", index);

    if (letter === " ") {
      span.innerHTML = "&nbsp";
    } else {
      span.innerHTML = letter;
    }
    theText.append(span);
  });
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  //Toggle feature in model
  features[feature] = !features[feature];
  if (features[feature] === true) {
    //Select target and add chosen class
    target.classList.remove("chosen");

    //Remove the hide class
    document
      .querySelector(`[data-feature="${feature}"`)
      .classList.remove("hide");

    const newfeatureElement = createFeatureElement(feature);
    document.querySelector("#selected ul").appendChild(newfeatureElement);

    const start = target.getBoundingClientRect();
    const end = newfeatureElement.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    newfeatureElement.style.setProperty("--diffx", diffx);
    newfeatureElement.style.setProperty("--diffy", diffy);

    newfeatureElement.classList = "animate-feature-in";
  } else {
    target.classList.add("chosen");
    const theFeatureElement = document.querySelector(
      `#selected [data-feature="${feature}"]`
    );

    const end = theFeatureElement.getBoundingClientRect();
    const start = target.getBoundingClientRect();

    const diffx = start.x - end.x + "px";
    const diffy = start.y - end.y + "px";

    theFeatureElement.style.setProperty("--diffx", diffx);
    theFeatureElement.style.setProperty("--diffy", diffy);

    theFeatureElement.offsetHeight;

    //Animation feature out
    theFeatureElement.classList = "animate-feature-out";

    //when animation is complete, remove featureElement from the DOM
    theFeatureElement.addEventListener("animationend", function () {
      theFeatureElement.remove();
      //Chose the feature element and hide it
      document.querySelector(`[data-feature=${feature}`).classList.add("hide");
      console.log(`Feature ${feature} is turned off!`);
    });
  }
}

function createFeatureElement(feature) {
  //Create an li element and add feature img into it
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `./images/feature_${feature}.png`;
  //Add the li element
  li.append(img);

  return li;
}
