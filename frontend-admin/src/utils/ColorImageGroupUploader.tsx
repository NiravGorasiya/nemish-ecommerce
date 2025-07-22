import React from "react";
import ColorImageGroupBlock, { ColorImageGroup, ImageWithPreview } from "./ColorImageGroupBlock";

interface Props {
  colorImages: ColorImageGroup[];
  setColorImages: (value: ColorImageGroup[]) => void;
  availableColors: { id: string; name: string }[];
}

const ColorImageGroupDropzone: React.FC<Props> = ({
  colorImages,
  setColorImages,
  availableColors,
}) => {
  const addColorGroup = () => {
    setColorImages([...colorImages, { colorId: "", images: [] }]);
  };

  const handleChangeColor = (index: number, colorId: string) => {
    const updated = [...colorImages];
    updated[index].colorId = colorId;
    setColorImages(updated);
  };

  const handleDropImages = (index: number, files: File[]) => {
    const updated = [...colorImages];
    const newImages: ImageWithPreview[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    updated[index].images.push(...newImages);
    setColorImages(updated);
  };

  const handleRemoveImage = (groupIndex: number, imageIndex: number) => {
    const updated = [...colorImages];
    const img = updated[groupIndex].images[imageIndex];
    if (img?.preview) URL.revokeObjectURL(img.preview);
    updated[groupIndex].images.splice(imageIndex, 1);
    setColorImages(updated);
  };

  const handleRemoveColorGroup = (index: number) => {
    const updated = [...colorImages];
    updated[index].images.forEach((img) => URL.revokeObjectURL(img.preview));
    updated.splice(index, 1);
    setColorImages(updated);
  };

  return (
    <div>
      <button className="btn btn-sm btn-primary mb-3" type="button" onClick={addColorGroup}>
        + Add Color Group
      </button>

      {colorImages.map((group, index) => (
        <ColorImageGroupBlock
          key={index}
          colorImage={group}
          index={index}
          availableColors={availableColors}
          onChangeColor={handleChangeColor}
          onDropImages={handleDropImages}
          onRemoveImage={handleRemoveImage}
          onRemoveColorGroup={handleRemoveColorGroup}
        />
      ))}
    </div>
  );
};

export default ColorImageGroupDropzone;
