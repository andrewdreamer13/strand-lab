import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import viteImagemin from "vite-plugin-imagemin";
import autoprefixer from "autoprefixer";
import postcssSortMediaQueries from "postcss-sort-media-queries";
import zipPack from "vite-plugin-zip-pack";
import injectHTML from "vite-plugin-html-inject";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { ViteMinifyPlugin } from "vite-plugin-minify";

const rootFolder = path.basename(path.resolve());

// Вспомогательная функция для рекурсивного поиска всех HTML-файлов в dist
function getHtmlFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath, baseDir));
    } else if (file.endsWith(".html")) {
      const relativePath = path.relative(baseDir, filePath);
      results.push(relativePath);
    }
  });

  return results;
}

export default defineConfig(({ mode }) => {
  const isGH = mode === "github";

  return {
    base: isGH ? `/${rootFolder}/` : "./",

    plugins: [
      injectHTML(),
      {
        name: "generate-sitemap",
        closeBundle() {
        const hostname = `https://andrewdreamer13.github.io/${rootFolder}/`;
          const distDir = path.resolve(process.cwd(), "dist");

          if (!fs.existsSync(distDir)) return;

          const htmlFiles = getHtmlFiles(distDir);

          let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
          xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

          htmlFiles.forEach((file) => {
           
            if (file.includes("404")) return;

            let route = file.replace(/\\/g, "/");

            if (route === "index.html") {
              route = "";
            } else if (route.endsWith("/index.html")) {
              route = route.replace("/index.html", "/");
            } else {
              route = route.replace(".html", "");
            }

            const loc = `${hostname}${route}`;
            const priority = route === "" ? "1.0" : "0.8";

            xml += `  <url>\n`;
            xml += `    <loc>${loc}</loc>\n`;
            xml += `    <changefreq>daily</changefreq>\n`;
            xml += `    <priority>${priority}</priority>\n`;
            xml += `  </url>\n`;
          });

          xml += `</urlset>\n`;

          const outputPath = path.join(distDir, "sitemap.xml");
          fs.writeFileSync(outputPath, xml, "utf-8");

          console.log("Universal Sitemap successfully generated!");
        },
      },
      viteImagemin({
        gifsicle: { optimizationLevel: 7, interlaced: false },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 80 },
        pngquant: { quality: [0.8, 0.9], speed: 4 },
        svgo: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIDs: false,
                },
              },
            },
            { name: "removeDimensions" },
            { name: "sortAttrs" },
          ],
        },
        webp: { quality: 90 },
        avif: { quality: 70 },
      }),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icons-[dir]-[name]",
        svgoOptions: {
          plugins: [
            {
              name: "removeAttrs",
              params: {
                attrs: "(fill|stroke|style)",
              },
            },
            { name: "removeXMLNS", active: true },
          ],
        },
      }),

      ViteMinifyPlugin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      }),

      zipPack({
        inDir: "dist",
        outDir: "./",
        outFileName: `${rootFolder}.zip`,
      }),
    ],

    css: {
      postcss: {
        plugins: [autoprefixer(), postcssSortMediaQueries()],
      },
      devSourcemap: true,
    },

    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          ru: path.resolve(__dirname, "ru/index.html"),
          404: path.resolve(__dirname, "404.html"),
          ru404: path.resolve(__dirname, "ru/404.html"),
        },
        output: {
          sanitizeFileName(name) {
            const match = /^[a-z0-9]/i.exec(name);
            if (!match) {
              return name.replace(/^[^a-z0-9]+/, "");
            }
            return name;
          },
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split(".").at(-1);

            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(extType)) {
              extType = "img";
            } else if (/woff2?|eot|ttf|otf/i.test(extType)) {
              extType = "fonts";
            } else if (/css/i.test(extType)) {
              extType = "css";
            }

            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
    },
  };
});
