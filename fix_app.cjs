
const fs = require("fs");
let content = fs.readFileSync("src/App.jsx", "utf8");
content = content.replace("import CrisisCalibrator from \"./components/CrisisCalibrator\";", "import CrisisCalibrator from \"./components/CrisisCalibrator\";\nimport NotFound from \"./pages/NotFound\";");
content = content.replace("<Route path=\"/lab\" element={<Lab />} />", "<Route path=\"/lab\" element={<Lab />} />\n          <Route path=\"*\" element={<NotFound />} />");
fs.writeFileSync("src/App.jsx", content, "utf8");

