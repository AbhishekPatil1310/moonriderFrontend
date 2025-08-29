// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getBikeData } from "../api/BikeData";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import Sidebar from "../componete/sidebar"; // Confirm the correct path
import { FaDollarSign, FaExchangeAlt, FaHeart, FaUsers } from "react-icons/fa";
import AddUserCard from "../componete/AdCard";

const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"];

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getBikeData()
      .then((res) => {
        const orders = res.data || [];
        setData(orders);

        if (!orders.length) {
          setStats([]);
          setWeeklyData([]);
          setProductData([]);
          return;
        }

        const totalRevenue = orders.reduce((sum, order) => sum + (order.SALES || 0), 0);
        const uniqueOrders = new Set(orders.map(order => order.ORDERNUMBER));
        const totalTransactions = uniqueOrders.size;
        const totalLikes = 9721;
        const totalUsers = 9721;

        setStats([
          { icon: <FaDollarSign className="text-green-500 text-2xl" />, label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, badge: "+2.5%", badgeColor: "bg-green-100 text-green-700" },
          { icon: <FaExchangeAlt className="text-orange-500 text-2xl" />, label: "Total Transactions", value: totalTransactions.toString(), badge: "+1.7%", badgeColor: "bg-green-100 text-green-700" },
          { icon: <FaHeart className="text-pink-500 text-2xl" />, label: "Total Likes", value: totalLikes.toString(), badge: "+1.4%", badgeColor: "bg-green-100 text-green-700" },
          { icon: <FaUsers className="text-indigo-500 text-2xl" />, label: "Total Users", value: totalUsers.toString(), badge: "+4.2%", badgeColor: "bg-green-100 text-green-700" }
        ]);

        const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlySalesMap = {};
        orders.forEach(order => {
          const monthIndex = order.MONTH_ID - 1;
          const monthName = MONTH_NAMES[monthIndex] || 'Unknown';
          if (!monthlySalesMap[monthName]) monthlySalesMap[monthName] = 0;
          monthlySalesMap[monthName] += order.SALES || 0;
        });
        setWeeklyData(Object.keys(monthlySalesMap).map(key => ({ week: key, sales: monthlySalesMap[key] })));

        const productLineMap = {};
        orders.forEach(order => {
          if (!productLineMap[order.PRODUCTLINE]) productLineMap[order.PRODUCTLINE] = 0;
          productLineMap[order.PRODUCTLINE] += order.QUANTITYORDERED || 0;
        });
        setProductData(Object.keys(productLineMap).map(key => ({ name: key, value: productLineMap[key] })));

      })
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  if (!stats.length) return <div className="p-6">Loading or no data available...</div>;

  return (
<div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
  {/* Sidebar */}
  <div className="w-full lg:w-60 flex-shrink-0">
    <Sidebar />
  </div>

  {/* Main Content */}
  <main className="flex-1 p-4 md:p-6 min-w-0">
    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white shadow rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="bg-gray-100 rounded-full p-3">{stat.icon}</div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-sm text-gray-500 mb-1 font-medium">{stat.label}</div>
            <div className="font-bold text-lg">{stat.value}</div>
          </div>
          <div className={`py-1 px-2 rounded-lg text-xs font-semibold ${stat.badgeColor}`}>{stat.badge}</div>
        </div>
      ))}
    </div>

    {/* Activities Chart */}
    <div className="bg-white shadow rounded-xl p-4 md:p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="font-semibold">Activities (Monthly Sales)</h3>
        <span className="text-xs text-gray-500">Based on MONTH_ID</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyData}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#4CAF50" name="Sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Bottom Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Top Products */}
      <div className="bg-white shadow rounded-xl p-4 md:p-6 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
          <h3 className="font-semibold">Top Products (Quantity Ordered)</h3>
          <span className="text-xs text-gray-500">Grouped by PRODUCTLINE</span>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={productData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {productData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ marginTop: 10 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-1 text-xs">
          {productData.map((prod, idx) => (
            <div className="flex items-center" key={idx}>
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: COLORS[idx % COLORS.length] }}></span>
              {prod.name} <span className="ml-auto font-bold">{prod.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Profile Card */}
      <AddUserCard />
    </div>
  </main>
</div>

  );
}
