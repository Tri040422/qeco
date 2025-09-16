import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const BASE = import.meta.env.VITE_BACKEND_URL;

export default function Coupons() {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    code: "",
    type: "percent",
    value: 10,
    minOrder: 0,
  });

  const load = async () => {
    const r = await axios.get(`${BASE}/api/coupons`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    setList(r.data || []);
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const create = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE}/api/coupons`, form, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    setForm({ code: "", type: "percent", value: 10, minOrder: 0 });
    load();
  };

  const toggle = async (id) => {
    await axios.patch(
      `${BASE}/api/coupons/${id}/toggle`,
      {},
      { headers: { Authorization: `Bearer ${user?.token}` } }
    );
    load();
  };

  const remove = async (id) => {
    await axios.delete(`${BASE}/api/coupons/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Mã giảm giá</h1>
      <form onSubmit={create} className="flex gap-2 mb-4">
        <input
          value={form.code}
          onChange={(e) =>
            setForm({ ...form, code: e.target.value.toUpperCase() })
          }
          placeholder="CODE"
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="percent">% </option>
          <option value="fixed">VND</option>
        </select>
        <input
          type="number"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
          placeholder="Giá trị"
          required
        />
        <input
          type="number"
          value={form.minOrder}
          onChange={(e) =>
            setForm({ ...form, minOrder: Number(e.target.value) })
          }
          placeholder="Đơn tối thiểu"
        />
        <button className="btn">Tạo</button>
      </form>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-3">Code</th>
            <th className="py-2 px-3">Loại</th>
            <th className="py-2 px-3">Giá trị</th>
            <th className="py-2 px-3">Min</th>
            <th className="py-2 px-3">Trạng thái</th>
            <th className="py-2 px-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c._id} className="border-b">
              <td className="py-2 px-3">{c.code}</td>
              <td className="py-2 px-3">{c.type}</td>
              <td className="py-2 px-3">
                {c.type === "percent"
                  ? `${c.value}%`
                  : `${(c.value || 0).toLocaleString()}đ`}
              </td>
              <td className="py-2 px-3">
                {(c.minOrder || 0).toLocaleString()}đ
              </td>
              <td className="py-2 px-3">{c.isActive ? "Bật" : "Tắt"}</td>
              <td className="py-2 px-3">
                <button onClick={() => toggle(c._id)} className="mr-2">
                  {c.isActive ? "Tắt" : "Bật"}
                </button>
                <button onClick={() => remove(c._id)} className="text-red-600">
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
