import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

export interface ImageWithPreview {
  id?: string;        // DB id if it exists
  file?: File;        // File only for newly uploaded images
  preview: string;    // either URL from DB or object URL
  isNew?: boolean;    // true if it's a freshly dropped file
}

export interface ColorImageGroup {
  colorId: string;
  images: ImageWithPreview[];
}

interface Props {
  colorImage: ColorImageGroup;
  index: number;
  availableColors: { id: string; name: string }[];
  onChangeColor: (index: number, colorId: string) => void;
  onDropImages: (index: number, files: File[]) => void;
  onRemoveImage: (groupIndex: number, imageIndex: number) => void;
  onRemoveColorGroup: (index: number) => void;
}

const ColorImageGroupBlock: React.FC<Props> = ({
  colorImage,
  index,
  availableColors,
  onChangeColor,
  onDropImages,
  onRemoveImage,
  onRemoveColorGroup,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onDropImages(index, acceptedFiles);
    },
  });

  // Cleanup only for object URLs created from File
  useEffect(() => {
    return () => {
      colorImage.images.forEach((img) => {
        if (img.isNew && img.preview.startsWith("blob:")) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [colorImage.images]);

  return (
    <div className="border p-3 mb-4 rounded">
      <div className="row align-items-center mb-2">
        <div className="col-md-4">
          <select
            className="form-select"
            value={colorImage.colorId}
            onChange={(e) => onChangeColor(index, e.target.value)}
          >
            <option value="">Select Color</option>
            {availableColors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <div
            {...getRootProps()}
            className="form-control text-center"
            style={{ cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            {colorImage.images.length
              ? "Add More Images"
              : "Click or Drop Images"}
          </div>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => onRemoveColorGroup(index)}
          >
            Remove Color
          </button>
        </div>
      </div>

      {colorImage.images.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mt-3">
          {colorImage.images.map((img, imgIndex) => (
            <div key={img.id || imgIndex} style={{ position: "relative" }}>
              <img
                src={img.preview}
                alt="Preview"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <button
                className="btn btn-sm btn-outline-danger"
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => onRemoveImage(index, imgIndex)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorImageGroupBlock;
