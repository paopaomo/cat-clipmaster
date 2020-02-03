const { clipboard } = require('electron');

const clippingList = document.getElementById('clipping-list');
const copyFromClipboardButton = document.getElementById('copy-from-clipboard');

const createClippingElement = (clippingText) => {
    const clippingElement = document.createElement('article');
    clippingElement.classList.add('clipping-list-item');
    clippingElement.innerHTML = `
        <div class='clipping-text' disabled></div>
        <div class='clipping-controls'>
            <button class='copy-clipping'>Copy to Clipboard</button>
            <button class='publish-clipping'>Publish</button>
            <button class='remove-clipping'>Remove</button>
        </div>
    `;
    clippingElement.querySelector('.clipping-text').innerText = clippingText;
    return clippingElement;
};

const addClippingToList = () => {
    const clippingText = clipboard.readText();
    const clippingElement = createClippingElement(clippingText);
    clippingList.prepend(clippingElement);
};

copyFromClipboardButton.addEventListener('click', () => {
    addClippingToList();
});
