import Link from "next/link";

type LinkItem = {
 name: string;
 href: string;
};

export default function SideBar() {
 const dashbLinks: LinkItem[] = [
  { name: "Analytics", href: "/dashboard" }
 ];
 const manageLinks: LinkItem[] = [
  { name: "Users", href: "/dashboard/users" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Orders", href: "/dashboard/orders" },
 ];

 return (
  <aside className="w-56 min-h-screen bg-gray-900 text-yellow-400 p-4 flex-shrink-0">
   <div className="mb-2 text-gray-400 font-bold text-2xl">Dashboard</div>
   <ul className="mb-6">
    {dashbLinks.map((link) => (
     <li key={link.name}>
      <Link
       href={link.href}
       className="block py-2 px-3 text-blue-400 font-bold hover:text-black hover:bg-yellow-400 rounded-xl transition-colors"
      >
       {link.name}
      </Link>
     </li>
    ))}
   </ul>
   <div className="mb-2 text-gray-400 font-bold text-2xl">Management</div>
   <ul>
    {manageLinks.map((link) => (
     <li key={link.name}>
      <Link
       href={link.href}
       className="block py-2 px-3 text-blue-400 font-bold hover:text-black hover:bg-yellow-400 rounded-xl transition-colors"
      >
       {link.name}
      </Link>
     </li>
    ))}
   </ul>
  </aside>
 );
}
