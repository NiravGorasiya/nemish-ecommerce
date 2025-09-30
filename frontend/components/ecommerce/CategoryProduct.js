import { useRouter } from "next/router";
import { updateProductCategory } from "../../redux/action/productFiltersAction";
import { useGetSubCategoriesQuery } from "../../redux/reducer/subCategorySlice";

const CategoryProduct = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data, isLoading, error } = useGetSubCategoriesQuery(
    name ? { name } : {}
  );

  const subCategorys = data?.info?.rows;

  const removeSearchTerm = () => {
    router.push({
      pathname: "/products",
    });
  };

  const selectCategory = (e, category) => {
    e.preventDefault();
    removeSearchTerm();
    updateProductCategory(category);
  };

  return (
    <ul className="categories">
      {subCategorys?.map((item) => (
        <li
          key={item.id}
          onClick={(e) => selectCategory(e, item?.name || "")}
        >
          <a>{item?.name || "Unnamed Category"}</a>
        </li>
      ))}
    </ul>
  );
};

export default CategoryProduct;
