// Utility to generate a random hex color
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Generate a random palette of 5 colors
function generatePalette() {
    const palette = [];
    for (let i = 0; i < 5; i++) {
        palette.push(getRandomColor());
    }
    return palette;
}

// Display the palette in the DOM
function displayPalette(colors) {
    const colorPalette = document.getElementById('color-palette');
    colorPalette.innerHTML = ''; // Clear any existing colors

    colors.forEach((color) => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color');
        colorBox.style.backgroundColor = color;
        colorBox.innerHTML = `<p>${color}</p>`;
        colorBox.addEventListener('click', () => copyToClipboard(color));

        colorPalette.appendChild(colorBox);
    });
}

// Copy color to clipboard
function copyToClipboard(color) {
    navigator.clipboard.writeText(color).then(() => {
        alert(`Copied: ${color}`);
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

// Save palette to local storage
function savePalette(colors) {
    localStorage.setItem('savedPalette', JSON.stringify(colors));
    alert('Palette saved!');
}

// Load saved palette from local storage
function loadPalette() {
    const savedPalette = JSON.parse(localStorage.getItem('savedPalette'));
    if (savedPalette) {
        displayPalette(savedPalette);
    } else {
        alert('No saved palette found.');
    }
}

// Convert palette to an image and download as PNG
function downloadPaletteAsImage() {
    const colorPalette = document.getElementById('color-palette');
    html2canvas(colorPalette).then(canvas => {
        const link = document.createElement('a');
        link.download = 'palette.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// Initialize the app
document.getElementById('generate-palette').addEventListener('click', () => {
    const palette = generatePalette();
    displayPalette(palette);
});

document.getElementById('save-palette').addEventListener('click', () => {
    const colors = Array.from(document.querySelectorAll('#color-palette .color p')).map(p => p.innerText);
    savePalette(colors);
});

document.getElementById('load-palette').addEventListener('click', loadPalette);

document.getElementById('download-palette').addEventListener('click', downloadPaletteAsImage);
