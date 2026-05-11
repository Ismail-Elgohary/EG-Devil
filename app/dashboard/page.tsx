export default function AnalysisPage() {
 const stats = [
  {
   title: "Total Sales",
   value: "$24,500",
   change: "+12% this month",
  },
  {
   title: "Orders",
   value: "1,248",
   change: "+8% this week",
  },
  {
   title: "Customers",
   value: "892",
   change: "+15% this month",
  },
  {
   title: "Products",
   value: "128",
   change: "+4 new products",
  },
 ];

 const recentOrders = [
  {
   id: "#1024",
   customer: "Ismail elgohary",
   total: "$120",
   status: "Completed",
  },
  {
   id: "#1025",
   customer: "Osama",
   total: "$80",
   status: "Pending",
  },
  {
   id: "#1026",
   customer: "Ahmed",
   total: "$250",
   status: "Shipped",
  },
 ];

 return (
  <div className="min-h-screen bg-[#0F172A] text-white p-6">
   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
    <div>
     <h1 className="text-3xl font-bold">Dashboard Analysis</h1>
     <p className="text-slate-400 mt-1">
      Monitor your ecommerce performance.
     </p>
    </div>

    <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20">
     Download Report
    </button>
   </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
    {stats.map((stat) => (
     <div
      key={stat.title}
      className="bg-[#1E293B] rounded-3xl p-6 border border-slate-800 shadow-xl"
     >
      <p className="text-slate-400 text-sm">{stat.title}</p>

      <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>

      <p className="text-green-400 text-sm mt-3">{stat.change}</p>
     </div>
    ))}
   </div>

   <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
    <div className="xl:col-span-2 bg-[#1E293B] rounded-3xl p-6 border border-slate-800 shadow-xl">
     <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">Revenue Overview</h2>

      <select className="bg-[#0F172A] border border-slate-700 rounded-xl px-3 py-2 text-sm outline-none">
       <option>This Month</option>
       <option>Last Month</option>
       <option>This Year</option>
      </select>
     </div>

     <div className="h-[300px] flex items-end gap-4">
      {[40, 70, 55, 90, 60, 110, 95].map((height, i) => (
       <div
        key={i}
        className="flex-1 bg-indigo-500 rounded-t-2xl hover:opacity-80 transition"
        style={{ height: `${height}%` }}
       />
      ))}
     </div>

     <div className="flex justify-between text-xs text-slate-400 mt-4">
      <span>Sat</span>
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
     </div>
    </div>

    <div className="bg-[#1E293B] rounded-3xl p-6 border border-slate-800 shadow-xl">
     <h2 className="text-xl font-semibold mb-6">
      Top Categories
     </h2>

     <div className="space-y-5">
      {[
       {
        name: "T-Shirts",
        percent: "78%",
       },
       {
        name: "Shoes",
        percent: "62%",
       },
       {
        name: "Hoodies",
        percent: "51%",
       },
       {
        name: "Accessories",
        percent: "39%",
       },
      ].map((item) => (
       <div key={item.name}>
        <div className="flex items-center justify-between mb-2">
         <p>{item.name}</p>
         <span className="text-sm text-slate-400">
          {item.percent}
         </span>
        </div>

        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
         <div
          className="h-full bg-indigo-500 rounded-full"
          style={{ width: item.percent }}
         />
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>

   <div className="bg-[#1E293B] rounded-3xl p-6 border border-slate-800 shadow-xl overflow-x-auto">
    <div className="flex items-center justify-between mb-6">
     <h2 className="text-xl font-semibold">Recent Orders</h2>

     <button className="text-indigo-400 hover:text-indigo-300 transition">
      View All
     </button>
    </div>

    <table className="w-full min-w-[600px]">
     <thead>
      <tr className="text-left text-slate-400 border-b border-slate-700">
       <th className="pb-4">Order ID</th>
       <th className="pb-4">Customer</th>
       <th className="pb-4">Total</th>
       <th className="pb-4">Status</th>
      </tr>
     </thead>

     <tbody>
      {recentOrders.map((order) => (
       <tr
        key={order.id}
        className="border-b border-slate-800 hover:bg-slate-800/30 transition"
       >
        <td className="py-4">{order.id}</td>
        <td className="py-4">{order.customer}</td>
        <td className="py-4">{order.total}</td>
        <td className="py-4">
         <span className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-300">
          {order.status}
         </span>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}
