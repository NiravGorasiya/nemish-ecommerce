interface SubMenuItem {
    title: string;
    link: string;
    active?: boolean;
}

interface MenuItem {
    title: string;
    icon: string;
    link: string;
    active?: boolean;
    disabled?: boolean;
    submenu?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
    { title: "Dashboard", icon: "home", link: "/dashboard" },
    {
        title: "Category",
        icon: "shopping_bag",
        link: "/category"
    },
    {
        title: "SubCategory",
        icon: "shopping_bag",
        link: "/subcategory"
    },
    {
        title: "Color",
        icon: "shopping_bag",
        link: "/color"
    },
    {
        title: "Size",
        icon: "shopping_bag",
        link: "/size"
    },
    {
        title: "Product",
        icon: "add_box",
        link: "/product",
    },
    {
        title: "Customer",
        icon: "add_box",
        link: "/customer",
    },
    {
        title: "Attribute",
        icon: "add_box",
        link: "/attribute",
    },
    {
        title: "Orders",
        icon: "shopping_cart",
        link: "#",
        submenu: [
            { title: "Order List 1", link: "#" },
            { title: "Order List 2", link: "#" },
            { title: "Order Detail", link: "#" },
            { title: "Order Tracking", link: "#" },
            { title: "Invoice", link: "#" },
        ],
    }
];