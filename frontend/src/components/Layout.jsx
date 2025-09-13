import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet /> {/* Tất cả page con hiển thị ở đây */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
