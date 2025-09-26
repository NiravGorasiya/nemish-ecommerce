import React from "react";
import { useGetSizesQuery } from "../redux/slice/sizeSlice";
import Select from "react-select";

const MultiSelected = ({ field, form }: any) => {
  const { data } = useGetSizesQuery();
  const sizeData = data?.info?.rows;

  const size = sizeData?.map((item) => {
    return { value: item.Id, label: item.name };
  });

  return (
    <Select
      options={size}
      isMulti
      name="size_id"
      className="select"
      value={size?.filter((option) =>
        field.value?.some((v:any) => v.Id === option.value)
      )}
      onChange={(selectedOptions) => {
        form.setFieldValue(
          field.name,
          selectedOptions.map((option) => ({
            Id: option.value,
            name: option.label,
          }))
        );
      }}
    />
  );
};

export default MultiSelected;
