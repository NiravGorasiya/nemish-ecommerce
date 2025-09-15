const crypto = require("crypto");

function generateSKU(prefix = "SKU") {
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase(); 
  const timestampPart = Date.now().toString().slice(-6);
  return `${prefix}-${timestampPart}-${randomPart}`;
}

module.exports ={generateSKU}