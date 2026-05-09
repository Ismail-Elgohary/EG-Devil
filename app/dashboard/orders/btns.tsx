import { Search } from "lucide-react";
import useOrderStore from "../store/order";

export default function Btns() {
 const { search, setSearch, filter, setFilter } = useOrderStore();

 return (

  <div className="flex items-center gap-3 mb-6">

   <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

    <input
     type="text"
     placeholder="Search..."
     value={search}
     onChange={(e) => setSearch(e.target.value)}
     className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
   </div>

   {/* Filter */}
   <select
    value={filter}
    onChange={(e) => setFilter(e.target.value as any)}
    className="px-4 py-2 rounded-lg border border-gray-300 bg-white
			text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
   >
    <option value="All">All</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
    <option value="Processing">Processing</option>
    <option value="Cancelled">Cancelled</option>
   </select>

   {/* Sort
			<select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
				<option value="newest">Newest</option>
				<option value="oldest">Oldest</option>
				<option value="price">Price</option>
			</select>
        */}
  </div>

 );
}

