// script.js
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Couldn't load image: ${image.url}`);
  });
}

btn.addEventListener("click", () => {
  loading.style.display = "block";
  errorDiv.style.display = "none";
  output.innerHTML = "";

  Promise.all(images.map((image) => downloadImage(image)))
    .then((loadedImages) => {
      loading.style.display = "none";
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((error) => {
      loading.style.display = "none";
      errorDiv.textContent = error;
      errorDiv.style.display = "block";
    });
});
