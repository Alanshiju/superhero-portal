
const fs = require("fs");
let content = fs.readFileSync("src/components/Navbar.jsx", "utf8");

if (!content.includes("react-toastify")) {
  content = content.replace("import emailjs from \"@emailjs/browser\";", "import emailjs from \"@emailjs/browser\";\nimport { toast } from \"react-toastify\";");
  
  // Audio toggle
  content = content.replace(/initAudio\(\);\s*toggleSfx\(\);\s*playClick\(\);/, "initAudio();\n                  toggleSfx();\n                  playClick();\n                  if (sfxEnabled) {\n                    toast.info(\"ACOUSTIC INTERFACE: Silent protocol engaged.\");\n                  } else {\n                    toast.info(\"ACOUSTIC INTERFACE: Audio synthesizers active.\");\n                  }");

  // Theme toggle
  content = content.replace(/initAudio\(\);\s*toggleTheme\(\);\s*playClick\(\);/, "initAudio();\n                  toggleTheme();\n                  playClick();\n                  toast.info(\"INTERFACE SHIFT: Display spectrum updated.\");");

  // Beacon activation
  content = content.replace("setBeaconStatus(\"locating\");", "setBeaconStatus(\"locating\");\n    toast.warn(\"BEACON ENGAGED: Triangulating GPS coordinates...\");");

  // Coordinates acquired
  content = content.replace("playAlert();", "playAlert();\n          toast.success(\"COORDINATES LOCKED: Priority alert dispatched to Aegis Grid.\");");

  // Geolocation denied (both in the error callback and the initial check)
  content = content.replace(/alert\("Unable to retrieve location or permission denied."\);/g, "toast.error(\"SENSOR FAULT: Location access denied. Manual dispatch required.\");");
  content = content.replace(/alert\("Geolocation failed unexpectedly."\);/g, "toast.error(\"SENSOR FAULT: Geolocation failed unexpectedly.\");");
  content = content.replace(/alert\("Geolocation is not supported by your browser."\);/g, "toast.error(\"SENSOR FAULT: Geolocation is not supported by your browser.\");");

  fs.writeFileSync("src/components/Navbar.jsx", content, "utf8");
}

