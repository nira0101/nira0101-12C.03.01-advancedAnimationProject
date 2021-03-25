"use strict";
gsap.registerPlugin(ScrollTrigger);
gsap.from("#content-imageOne", {
  x: "-40vw",
  scrollTrigger: {
    trigger: ".top-text",
    scrub: true,
    start: "top ",
    end: "bottom",
    duration: 4,
    ease: "easeInOut",
  },
});
gsap.from("#content-textOne", {
  x: "-40vw",
  scrollTrigger: {
    trigger: ".top-text",
    scrub: true,
    start: "top ",
    end: "bottom",
    duration: 4,
    ease: "easeInOut",
  },
});

gsap.from("#content-imagetwo", {
  x: "40vw",
  scrollTrigger: {
    trigger: "#content-one",
    scrub: true,
    start: "top ",
    end: "bottom 40%",
    duration: 4,
    ease: "easeInOut",
  },
});
gsap.from("#content-textTwo", {
  x: "40vw",
  scrollTrigger: {
    trigger: "#content-one",
    scrub: true,
    start: "top ",
    end: "bottom 40%",
    duration: 4,
    ease: "easeInOut",
  },
});
