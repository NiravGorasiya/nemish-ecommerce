// types.ts or inline
export type ImageWithPreview = {
  file: File;
  preview: string;
};

export type ColorImageGroup = {
  colorId: string;
  images: ImageWithPreview[];
};
