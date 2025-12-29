const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// macOS app icons typically have rounded corners with ~22% corner radius
const CORNER_RADIUS_PERCENT = 0.22;

async function roundImageCorners(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const size = Math.min(metadata.width, metadata.height);
    const radius = Math.round(size * CORNER_RADIUS_PERCENT);
    
    // Create rounded rectangle mask
    const mask = Buffer.from(
      `<svg width="${metadata.width}" height="${metadata.height}">
        <rect width="${metadata.width}" height="${metadata.height}" 
              rx="${radius}" ry="${radius}" fill="white"/>
      </svg>`
    );
    
    // Use temporary file if input and output are the same
    const tempPath = outputPath + '.tmp';
    
    // Apply rounded corners
    await sharp(inputPath)
      .resize(metadata.width, metadata.height, { fit: 'fill' })
      .composite([{
        input: mask,
        blend: 'dest-in'
      }])
      .png()
      .toFile(tempPath);
    
    // Replace original with rounded version
    fs.renameSync(tempPath, outputPath);
    
    console.log(`✓ Rounded corners: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processIcons() {
  const iconsDir = path.join(__dirname, '..', 'public', 'icons');
  const iconsetDir = path.join(iconsDir, 'icon.iconset');
  
  // Process main icon.png
  const mainIcon = path.join(iconsDir, 'icon.png');
  if (fs.existsSync(mainIcon)) {
    await roundImageCorners(mainIcon, mainIcon);
  }
  
  // Process all icons in iconset
  if (fs.existsSync(iconsetDir)) {
    const files = fs.readdirSync(iconsetDir);
    const pngFiles = files.filter(f => f.endsWith('.png'));
    
    for (const file of pngFiles) {
      const filePath = path.join(iconsetDir, file);
      await roundImageCorners(filePath, filePath);
    }
  }
  
  console.log('\n✅ All icons processed with rounded corners!');
  console.log('💡 Note: You may need to regenerate the .icns file after this.');
  console.log('   Run: iconutil -c icns public/icons/icon.iconset -o public/icons/icon.icns');
}

processIcons().catch(console.error);

