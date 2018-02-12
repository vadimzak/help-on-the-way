const { ipcRenderer } = require('electron');

let topStoryText = document.getElementsByClassName("top-story-text")[0];

topStoryText.addEventListener("mouseleave", () => {
    ipcRenderer.send('asynchronous-message', topStoryText.textContent);
});