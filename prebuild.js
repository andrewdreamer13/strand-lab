

import sharp from "sharp";
import fs from "fs";
import path from "path";
import ttf2woff2 from "ttf2woff2";
import { globSync } from "glob";

const paths = {
  img: {
    in: "src/assets/img/raw/**/*.{jpg,jpeg,png,webp}",
    out: "src/assets/img/webp",
  },
  fonts: {
    in: "src/assets/fonts/raw/**/*.{ttf,woff2}",
    out: "src/assets/fonts/woff2",
  },
};

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const smartCleanImgDir = (sourceFiles) => {
  if (!fs.existsSync(paths.img.out)) return;

  const sourceNames = new Set(sourceFiles.map((fp) => path.parse(fp).name));
  const outputFiles = fs.readdirSync(paths.img.out);

  outputFiles.forEach((file) => {
    if (file === ".gitkeep") return;

    const outputName = path.parse(file).name;

    if (!sourceNames.has(outputName)) {
      fs.unlinkSync(path.join(paths.img.out, file));
      console.log(`🗑️ Deleted obsolete image: ${file}`);
    }
  });
};

const cleanFontsDir = () => {
  if (fs.existsSync(paths.fonts.out)) {
    const files = fs.readdirSync(paths.fonts.out);
    for (const file of files) {
      if (file !== ".gitkeep") {
        fs.rmSync(path.join(paths.fonts.out, file), {
          recursive: true,
          force: true,
        });
      }
    }
  }
  ensureDir(paths.fonts.out);
};

async function convertImages() {
  ensureDir(paths.img.out);
  const files = globSync(paths.img.in);

  if (files.length === 0) {
    console.log("⚠️ No images found on the path:", paths.img.in);
    return;
  }

  smartCleanImgDir(files);

  await Promise.all(
    files.map(async (filePath) => {
      const fileName = path.parse(filePath).name;
      const destPath = path.join(paths.img.out, `${fileName}.webp`);

      if (fs.existsSync(destPath)) {
        const sourceStat = fs.statSync(filePath);
        const destStat = fs.statSync(destPath);

        if (sourceStat.mtime <= destStat.mtime) {
          return;
        }
      }

      await sharp(filePath).webp({ quality: 80 }).toFile(destPath);

      console.log(
        `✅ Image converted/updated: ${path.basename(filePath)} -> webp`,
      );
    }),
  );
}

function convertFonts() {
  cleanFontsDir();
  const files = globSync(paths.fonts.in);

  if (files.length === 0) {
    console.log("ℹ️ No fonts found");
    return;
  }

  files.forEach((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.parse(filePath).name;
    const destination = path.join(paths.fonts.out, `${fileName}.woff2`);

    try {
      if (ext === ".ttf") {
        const input = fs.readFileSync(filePath);
        fs.writeFileSync(destination, ttf2woff2(input));
        console.log(`✅ Font converted: ${path.basename(filePath)} -> woff2`);
      } else if (ext === ".woff2") {
        fs.copyFileSync(filePath, destination);
        console.log(`Copy font: ${path.basename(filePath)} (already woff2)`);
      }
    } catch (err) {
      console.error(`❌ Error processing font ${filePath}:`, err);
    }
  });
}

(async () => {
  try {
    await convertImages();
    convertFonts();
    console.log("🚀 Prebuild processing completed successfully!");
  } catch (err) {
    console.error("❌ Error during preparation:", err);
  }
})();
