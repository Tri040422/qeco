import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Users, Package, Settings } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-green-600">Ecoverse</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            <BarChart3 size={20} /> Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            <Users size={20} /> Users
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            <Package size={20} /> Products
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600"
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Log out
          </button>
        </header>

        {/* Stats cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold mt-2">1,245</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-medium text-gray-500">
              Total Products
            </h3>
            <p className="text-2xl font-bold mt-2">356</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-medium text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold mt-2">$12,430</p>
          </div>
        </section>

        {/* Table example */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Action</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">Added a product</td>
                <td className="py-2 px-4">2025-09-14</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">Updated profile</td>
                <td className="py-2 px-4">2025-09-13</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Admin</td>
                <td className="py-2 px-4">Generated report</td>
                <td className="py-2 px-4">2025-09-12</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
