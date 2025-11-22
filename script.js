const imagesArr = [
  "https://picsum.photos/id/10/150",
  "https://picsum.photos/id/20/150",
  "https://picsum.photos/id/30/150",
  "https://picsum.photos/id/40/150",
  "https://picsum.photos/id/50/150"
];

let container = document.getElementById("image-container");
let resetBtn = document.getElementById("reset");
let verifyBtn = document.getElementById("verify");
let para = document.getElementById("para");

let clicked = [];
let finalImages = [];

function generateImages() {
  container.innerHTML = "";
  clicked = [];
  para.innerText = "";

  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // pick one duplicate
  let dupIndex = Math.floor(Math.random() * imagesArr.length);
  let duplicateImage = imagesArr[dupIndex];

  finalImages = [...imagesArr, duplicateImage];

  // shuffle
  finalImages.sort(() => Math.random() - 0.5);

  // add images with classes img1,img2,img3...
  finalImages.forEach((src, i) => {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add(`img${i + 1}`); // ← REQUIRED for Cypress test

    img.addEventListener("click", () => imageClicked(img));
    container.appendChild(img);
  });
}

generateImages();

function imageClicked(img) {
  if (clicked.length === 2) return;

  img.classList.add("selected");
  clicked.push(img);

  resetBtn.style.display = "inline-block";

  if (clicked.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  clicked = [];
  para.innerText = "";

  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  container.querySelectorAll("img").forEach(img => {
    img.classList.remove("selected");
  });
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (clicked.length === 2 && clicked[0].src === clicked[1].src) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
