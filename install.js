const fs = require('fs');
const download = require('download');
const extract = require('extract-zip')
const path = require('path');
const cp = require('child_process');
//-------------------
fs.mkdirSync('PdfiumImageService/pdfium',{ recursive: true });
(async () => {
  switch (process.platform) {
    case "win32" :
        console.log("1. downloading...");
        await download('http://github.com/bblanchon/pdfium-binaries/releases/latest/download/pdfium-windows-x64.zip','PdfiumImageService/pdfium');
        console.log("2. extracting...");
        await extract('PdfiumImageService/pdfium/pdfium-windows-x64.zip', { dir: path.resolve('PdfiumImageService/pdfium') })
        console.log("3. compiling...");
        // some optimistic default
        var mvcroot = "D:/Microsoft Visual Studio/2019/Community";
        if (!fs.existsSync(mvcroot)) {
             mvcroot = process.env.VISUAL_STUDIO_ROOT;
             if (!mvcroot) {
                  console.error("\n\nCAN NOT FIND VISUAL_STUDIO_ROOT env variable");
                  console.log("EXAMPLE : set VISUAL_STUDIO_ROOT=D:/Microsoft Visual Studio/2019/Community\n\n")
                  return process.exit(-1);
             }
        }
        var mspath = mvcroot+"/MSBuild/Current/Bin/MSBuild.exe";
        cp.execSync('"'+mspath+'" /p:Configuration=Release');
        console.log("\n\nDONE!\n\n");
        break;
    default :
        throw "NOT IMPLEMENTED PLATFORM "+process.platform;

  }
})();
