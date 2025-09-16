import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const BASE = import.meta.env.VITE_BACKEND_URL;
const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n || 0
  );

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const load = async (p = 1) => {
    const res = await axios.get(`${BASE}/api/orders`, {
      params: { page: p, limit: 10 },
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    setOrders(res.data.items || []);
    setPage(res.data.page || 1);
    setPages(res.data.pages || 1);
  };

  useEffect(() => {
    if (user?.token) load(1);
  }, [user]);

  const updateStatus = async (id, status) => {
    await axios.put(
      `${BASE}/api/orders/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${user?.token}` },
      }
    );
    load(page);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Quản lý đơn hàng</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-3">Mã</th>
            <th className="py-2 px-3">Khách</th>
            <th className="py-2 px-3">Tổng</th>
            <th className="py-2 px-3">Thanh toán</th>
            <th className="py-2 px-3">Trạng thái</th>
            <th className="py-2 px-3">Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b">
              <td className="py-2 px-3">{o._id.slice(-6)}</td>
              <td className="py-2 px-3">{o.user?.name || o.user?.email}</td>
              <td className="py-2 px-3">{fmt(o.totalPrice)}</td>
              <td className="py-2 px-3">{o.isPaid ? "Đã TT" : "Chưa"}</td>
              <td className="py-2 px-3">{o.status}</td>
              <td className="py-2 px-3">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                >
                  {[
                    "pending",
                    "paid",
                    "processing",
                    "shipped",
                    "delivered",
                    "cancelled",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      {pages > 1 && (
        <div className="pagination">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`page ${page === p ? "active" : ""}`}
              onClick={() => load(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
