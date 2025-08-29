import { useEffect, useState } from "react";
import { getBikeData } from "../api/BikeData";
import GoBackButton from "../componete/BackButton";


const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function TransactionPage() {
  const [orders, setOrders] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    getBikeData()
      .then((res) => {
        const ordersData = res.data || [];
        setOrders(ordersData);

        // Group data by PRODUCTLINE first, then by month
        const group = {};

        ordersData.forEach(order => {
          const productLine = order.PRODUCTLINE;
          const month = monthNames[(order.MONTH_ID || 1) - 1] || "Unknown";
          const price = order.PRICEEACH || 0;
          const quantity = order.QUANTITYORDERED || 0;
          const sales = order.SALES || 0;

          if (!group[productLine]) {
            group[productLine] = {};
          }

          if (!group[productLine][month]) {
            group[productLine][month] = {
              price,
              totalSales: 0,
              totalMoney: 0,
            };
          }

          group[productLine][month].totalSales += quantity;
          group[productLine][month].totalMoney += sales;
          // Optionally update price here if you want average or latest
        });

        setGroupedData(group);
      })
      .catch(console.error);
  }, []);

  const totalTransactions = new Set(orders.map(o => o.ORDERNUMBER)).size;

  return (
    <>
      <GoBackButton />
      <div className="min-h-screen p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Total Transactions: {totalTransactions}</h2>

        {Object.entries(groupedData).map(([productLine, months]) => (
          <div key={productLine} className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">{productLine}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(months).map(([month, data]) => (
                <div
                  key={month}
                  className="bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
                >
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">{month}</h4>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Price Each:</span> ${data.price.toFixed(2)}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Total Quantity Sold:</span> {data.totalSales}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Total Money Earned:</span> ${data.totalMoney.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
