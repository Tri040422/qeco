import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BASE = import.meta.env.VITE_BACKEND_URL;
const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n || 0
  );

export default function MyOrders() {
  const { user } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${BASE}/api/orders/my`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((r) => setList(r.data || []))
      .catch(() => {});
  }, [user]);

  return (
    <div className="container">
      <h1 className="text-xl font-semibold mb-3">Đơn hàng của tôi</h1>
      {list.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <ul className="divide-y">
          {list.map((o) => (
            <li
              key={o._id}
              className="py-2 flex items-center justify-between gap-3"
            >
              <span>
                #{o._id.slice(-6)} —{" "}
                {new Date(o.createdAt).toLocaleString("vi-VN")}
              </span>
              <span>
                {fmt(o.totalPrice)} — {o.isPaid ? "Đã TT" : "Chưa"}
              </span>
              <Link to={`/order/${o._id}`} className="text-blue-600">
                Chi tiết
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
