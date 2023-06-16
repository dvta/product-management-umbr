import React, {useState} from "react";
import {Routes, Route, Router, BrowserRouter} from "react-router-dom";
import AddCategory from "./components/categories/AddCategory.jsx";
import Categories from "./components/categories/Categories.jsx";
import EditCategory from "./components/categories/EditCategory.jsx";
import AddProduct from "./components/Products/AddProduct.jsx";
import Products from "./components/Products/Products.jsx";
import EditProduct from "./components/Products/EditProduct.jsx";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined
} from "@ant-design/icons";
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";

const Main = () => {


    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="categories/create" element={<AddCategory/>}/>
                    <Route path="categories/:id/edit" element={<EditCategory/>}/>
                    <Route path="categories" element={<Categories/>}/>
                    <Route path="products/create" element={<AddProduct/>}/>
                    <Route path="products/:id/edit" element={<EditProduct/>}/>
                    <Route path="products" element={<Products/>}/>
                </Route>
                <Route path={"/"} element={<UserLayout/>}>
                    <Route path="/" element={<Products/>}/>
                    <Route path="/products" element={<Products/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Main;
