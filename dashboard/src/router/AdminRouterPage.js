import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "src/layouts/dahsboard";
import { HomeAdminPage } from "src/pages/home/admin";

export default function AdminRouterPage() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<HomeAdminPage />} />

          <Route path="*" element={<HomeAdminPage />} exact />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
