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

const getButtonParent = ({ target }) => {
    return target.parentNode.parentNode;
};

const getClippingText = (clippingListItem) => {
    return clippingListItem.querySelector('.clipping-text').innerText;
};

const removeClipping = (clippingItem) => {
    clippingItem.remove();
};

const writeToClipboard = (clippingText) => {
    clipboard.writeText(clippingText);
};

copyFromClipboardButton.addEventListener('click', () => {
    addClippingToList();
});

clippingList.addEventListener('click', (event) => {
    const hasClass = className => event.target.classList.contains(className);

    const clippingItem = getButtonParent({ target: event.target});

    if(hasClass('copy-clipping')) {
        writeToClipboard(getClippingText(clippingItem));
    }
    if(hasClass('publish-clipping')) {
        console.log(getClippingText(clippingItem));
    }
    if(hasClass('remove-clipping')) {
        removeClipping(clippingItem);
    }
});
