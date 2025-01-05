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
    { title: "Dashboard", icon: "home", link: "/" },
    {
        title: "Category",
        icon: "shopping_bag",
        link: "/category"
    },
    {
        title: "Products",
        icon: "shopping_bag",
        link: "#",
        submenu: [
            { title: "Product List", link: "#" },
            { title: "Product Grid", link: "#" },
            { title: "Product Grid 2", link: "#" },
            { title: "Categories", link: "#" },
        ],
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
    },
    {
        title: "Sellers",
        icon: "store",
        link: "#",
        submenu: [
            { title: "Sellers Cards", link: "#" },
            { title: "Sellers List", link: "#" },
            { title: "Seller Profile", link: "#" },
        ],
    },
    {
        title: "Add Product",
        icon: "add_box",
        link: "/addproduct",
        submenu: [
            { title: "Add Product 1", link: "/product" }
        ],
    },
    {
        title: "Transactions",
        icon: "monetization_on",
        link: "#",
        submenu: [
            { title: "Transaction 1", link: "/transaction" }
        ],
    },
    {
        title: "Account",
        icon: "person",
        link: "#",
        submenu: [
            { title: "User Login", link: "/login" },
            { title: "User Registration", link: "/registration" },
            { title: "Error 404", link: "#" },
        ],
    },
    { title: "Reviews", icon: "comment", link: "/review" },
    { title: "Brands", icon: "stars", link: "/brands" },
    { title: "Statistics", icon: "pie_chart", link: "/statistics", disabled: true },
    {
        title: "Settings",
        icon: "settings",
        link: "#",
        submenu: [
            { title: "Setting Sample 1", link: "/settings" },
            { title: "Setting Sample 2", link: "/setting" },
        ],
    },
    { title: "Starter Page", icon: "local_offer", link: "#" },
];