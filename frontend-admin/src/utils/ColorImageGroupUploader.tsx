import React from "react";
import ColorImageGroupBlock, {
  ColorImageGroup,
  ImageWithPreview,
} from "./ColorImageGroupBlock";

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
    setColorImages(
      colorImages.map((group, i) =>
        i === index ? { ...group, colorId } : group
      )
    );
  };

  const handleDropImages = (index: number, files: File[]) => {
    const newImages: ImageWithPreview[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setColorImages(
      colorImages.map((group, i) =>
        i === index
          ? { ...group, images: [...group.images, ...newImages] }
          : group
      )
    );
  };

  const handleRemoveImage = (groupIndex: number, imageIndex: number) => {
    const updatedGroup = {
      ...colorImages[groupIndex],
      images: colorImages[groupIndex].images.filter((_, i) => i !== imageIndex),
    };

    const removed = colorImages[groupIndex].images[imageIndex];
    if (removed?.preview) URL.revokeObjectURL(removed.preview);

    setColorImages(
      colorImages.map((group, i) => (i === groupIndex ? updatedGroup : group))
    );
  };

  const handleRemoveColorGroup = (index: number) => {
    colorImages[index].images.forEach((img) => {
      if (img?.preview) URL.revokeObjectURL(img.preview);
    });

    setColorImages(colorImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-primary mb-3 mt-3"
        type="button"
        onClick={addColorGroup}
      >
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
