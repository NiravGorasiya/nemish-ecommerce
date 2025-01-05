const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer storage configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Default to "default" folder if no `src` field is provided in the request body
      const src = req.body.src || "default";
      
      // Create the upload path dynamically
      const uploadPath = path.resolve(__dirname, `../uploads/${src}`);
      console.log("Resolved Path:", uploadPath); // Log resolved path for debugging

      // Ensure the directory exists or create it
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          console.error("Directory creation failed:", err); // Log error
          return cb(err); // Return error to Multer
        }
        cb(null, uploadPath); // Directory created successfully, pass it to Multer
      });
    },
    filename: (req, file, cb) => {
      // Generate a unique filename based on timestamp and random number
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName); // Provide the unique filename to Multer
    },
  }),
  fileFilter: (req, file, cb) => {
    // Check that the file is an image based on its MIME type
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Allow the file if it's an image
    } else {
      cb(new Error("Only image files are allowed!")); // Reject non-image files
    }
  },
  limits: {
    // Limit the file size to 5 MB
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
