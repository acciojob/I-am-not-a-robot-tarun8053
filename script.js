//your code
const imageList = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg",
];

let shuffled = [];
let selectedImages = [];

const imagesDiv = document.getElementById("images");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const messagePara = document.getElementById("para");
const msgH = document.getElementById("h");

function loadImages() {
  // pick a random image to duplicate
  const duplicateImg = imageList[Math.floor(Math.random() * imageList.length)];

  // create 6 images list (5 unique + 1 duplicate)
  shuffled = [...imageList, duplicateImg];

  // shuffle them
  shuffled.sort(() => Math.random() - 0.5);

  // display
  imagesDiv.innerHTML = "";
  shuffled.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("img");
    img.dataset.index = index;

    img.addEventListener("click", () => selectImage(img));

    imagesDiv.appendChild(img);
  });
}

function selectImage(img) {
  if (selectedImages.length === 2) return; // prevent more than 2 clicks

  img.classList.add("selected");
  selectedImages.push(img);

  // state 2 → show reset button
  resetBtn.style.display = "block";

  // state 3 → exactly 2 images clicked → show verify
  if (selectedImages.length === 2) {
    verifyBtn.style.display = "block";
  }
}

resetBtn.addEventListener("click", resetAll);
verifyBtn.addEventListener("click", verifySelection);

function resetAll() {
  selectedImages = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  messagePara.innerText = "";
  msgH.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";

  document.querySelectorAll("img").forEach((img) => {
    img.classList.remove("selected");
  });

  loadImages();
}

function verifySelection() {
  verifyBtn.style.display = "none";

  const [img1, img2] = selectedImages;

  if (img1.src === img2.src) {
    messagePara.innerText = "You are a human. Congratulations!";
  } else {
    messagePara.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
}

// initial load
loadImages();
