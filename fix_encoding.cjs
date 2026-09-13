
const fs = require("fs");

function fix(file) {
  try {
    let buf = fs.readFileSync(file);
    let str;
    if (buf[0] === 0xff && buf[1] === 0xfe) {
      str = buf.toString("utf16le");
    } else {
      str = buf.toString("utf8");
    }
    // Remove BOM if present
    if (str.charCodeAt(0) === 0xFEFF) {
      str = str.slice(1);
    }
    fs.writeFileSync(file, str, "utf8");
    console.log("Fixed " + file);
  } catch(e) {
    console.error(e);
  }
}

fix("src/context/ChatContext.jsx");
fix("src/main.jsx");
fix("src/components/Chatbot.jsx");

