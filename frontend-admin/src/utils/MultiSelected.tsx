import React from 'react'
import { useGetSizesQuery } from '../redux/slice/sizeSlice';
import Select from "react-select"

const MultiSelected = ({ field,form }:any) => {
    const { data } = useGetSizesQuery();
    console.log(data?.info?.rows);
    const sizeData = data?.info?.rows;

    const size = sizeData?.map((item) => { return { value: item.Id, label: item.name } })
    console.log(size, 'size');

    return (
        <Select
            options={size}
            isMulti
            name="size_id"
            className='select'
            value={size?.filter(option => field.value?.includes(option.value))}
            onChange={(selectedOptions) => {
                form.setFieldValue(field.name, selectedOptions.map(option => option.value));
            }} />
    )
}

export default MultiSelected