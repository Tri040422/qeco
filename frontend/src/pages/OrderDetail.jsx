import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setOrder(res.data);
      } catch {
        // nếu cần log: console.error(err);
        alert("Không tải được đơn hàng");
      }
    })();
  }, [id, user]);

  const fmt = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(n);

  if (!order) return <p>Đang tải...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Đơn hàng #{order._id.slice(-6)}
      </h1>
      <div className="mb-2">
        Trạng thái: <strong>{order.status}</strong>
      </div>

      <div className="border rounded p-3 mb-4">
        <div className="font-semibold mb-2">Địa chỉ giao hàng</div>
        <div>
          {order.shippingAddress.fullName} — {order.shippingAddress.phone}
        </div>
        <div>
          {order.shippingAddress.address}, {order.shippingAddress.ward},{" "}
          {order.shippingAddress.district}, {order.shippingAddress.province}
        </div>
      </div>

      <div className="border rounded p-3 mb-4">
        <div className="font-semibold mb-2">Sản phẩm</div>
        <ul className="divide-y">
          {order.orderItems.map((it, idx) => (
            <li key={idx} className="py-2 flex justify-between">
              <span>
                {it.name} × {it.qty}
              </span>
              <span>{fmt(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border rounded p-3">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{fmt(order.itemsPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{fmt(order.shippingPrice)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Tổng</span>
          <span>{fmt(order.totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
