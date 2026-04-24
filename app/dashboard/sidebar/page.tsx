import Link from "next/link";

type LinkItem = {
 name: string;
 href: string;
};

export default function SideBar() {
 const dashbLinks: LinkItem[] = [{ name: "Analytics", href: "/" }];

 const manageLinks: LinkItem[] = [
  { name: "Users", href: "/users" },
  { name: "Products", href: "/products" },
  { name: "Orders", href: "/orders" },
 ];

 return (
  <aside className="fixed top-16 left-0 w-48 h-[calc(100vh-4rem)] bg-gray-900 text-yellow-400 p-4 overflow-y-auto">
   <div className="mb-2 text-gray-400 font-bold text-2xl">Dashboard</div>
   <ul className="mb-4">
    {dashbLinks.map((link) => (
     <li key={link.name}>
      <Link
       href={link.href}
       className="block py-2 px-1 text-blue-400 font-bold hover:text-black hover:bg-yellow-400 rounded-xl"
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
       className="block py-2 px-1 text-blue-400 font-bold hover:text-black hover:bg-yellow-400 rounded-xl"
      >
       {link.name}
      </Link>
     </li>
    ))}
   </ul>
  </aside>
 );
}
