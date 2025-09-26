const crypto = require("crypto");

function generateSKU() {
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase(); 
  const timestampPart = Date.now().toString().slice(-6);
  return `${timestampPart}-${randomPart}`;
}

module.exports ={generateSKU}