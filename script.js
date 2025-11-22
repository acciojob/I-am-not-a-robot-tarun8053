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

let clicked = [];   // store clicked image elements
let finalImages = []; // random 6 images with 1 duplicate

// STEP 1: Generate random 6 images + 1 duplicate
function generateImages() {
  container.innerHTML = "";
  clicked = [];
  para.innerText = "";
  
  let randomIndex = Math.floor(Math.random() * imagesArr.length);
  let duplicateImage = imagesArr[randomIndex];

  // 5 unique + 1 duplicate
  finalImages = [...imagesArr, duplicateImage];

  // shuffle
  finalImages.sort(() => Math.random() - 0.5);

  // create image elements
  finalImages.forEach(src => {
    let img = document.createElement("img");
    img.src = src;
    img.addEventListener("click", () => imageClicked(img));
    container.appendChild(img);
  });

  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
}

generateImages();

// Image clicked handler
function imageClicked(img) {
  if (clicked.length === 2) return;  // Do not allow more than 2 clicks

  img.classList.add("selected");

  clicked.push(img);
  resetBtn.style.display = "inline-block";

  if (clicked.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset button
resetBtn.addEventListener("click", () => {
  clicked = [];
  para.innerText = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  let imgs = container.querySelectorAll("img");
  imgs.forEach(i => i.classList.remove("selected"));
});

// Verify button
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (clicked.length === 2 && clicked[0].src === clicked[1].src) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
