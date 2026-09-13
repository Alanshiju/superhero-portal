
const fs = require("fs");
let content = fs.readFileSync("src/index.css", "utf8");

if (!content.includes(".Toastify__toast")) {
  const css = `
/* Custom Toastify Overrides */
.Toastify__toast {
  padding: 0 !important;
  min-height: auto !important;
}
.Toastify__toast-body {
  padding: 12px 16px !important;
  margin: 0 !important;
}
`;
  content += css;
  fs.writeFileSync("src/index.css", content, "utf8");
}

