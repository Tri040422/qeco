// src/pages/admin/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Không tải được danh sách đơn hàng", err);
      }
    })();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Khách hàng</th>
              <th className="p-2 border">Tổng tiền</th>
              <th className="p-2 border">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td className="p-2 border">{o._id.slice(-6)}</td>
                <td className="p-2 border">{o.user?.name || "Ẩn danh"}</td>
                <td className="p-2 border">{o.totalPrice} đ</td>
                <td className="p-2 border">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
