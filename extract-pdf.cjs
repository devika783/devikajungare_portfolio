const fs = require('fs');
const pdf2img = require('pdf-img-convert');

const path = 'C:\\Users\\junga\\Downloads\\Accessibility and Inclusivity.pdf';
const outDir = 'public/images/metro-accessibility';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function extract() {
  console.log('Converting PDF...');
  const outputImages = await pdf2img.convert(path, { width: 1920 });
  for (let i = 0; i < outputImages.length; i++) {
    fs.writeFileSync(`${outDir}/page_${i + 1}.png`, outputImages[i]);
    console.log(`Saved page ${i + 1}`);
  }
}

extract().catch(console.error);
