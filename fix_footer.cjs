
const fs = require("fs");
let content = fs.readFileSync("src/components/Footer.jsx", "utf8");
content = content.replace(/<a href="/g, "<Link to=\"");
content = content.replace(/<\/a>/g, "</Link>");
content = content.replace(/import React from "react";/, "import React from \"react\";\nimport { Link } from \"react-router-dom\";");
fs.writeFileSync("src/components/Footer.jsx", content, "utf8");

