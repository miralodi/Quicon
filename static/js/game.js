document.getElementById('restart').addEventListener('click', retry);
function retry() {
    window.location.reload();
}

function getRandomLink() {
    let images = document.getElementById("file-container").dataset.files;
    images = JSON.parse(images);
    let randomLink = images[Math.floor(Math.random() * images.length)];
    return randomLink
}
