"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast }  from "react-toastify";

export default function CreateProduct() {

const [name, setName] = useState("");
const [title, setTitle] = useState("");
const [image, setImage] = useState("");
const [price, setPrice ] = useState("");
const [category, setCategory] = useState("");
const router = useRouter();

const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name || !title || !image || !price || !category) {
    toast.error("Please Fill All Fields");
    return;
  }
  if (name.length > 30) {
    toast.error("Name is too long");
    return;
  }
  if (title.length > 150) {
    toast.error("Description is too long");
    return;
  }
  if (!image.startsWith("https://")) {
    toast.error("Image URL must start with https://");
    return;
  }
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
  const isValidImage = validExtensions.some((ext) => image.toLowerCase().endsWith(ext));
  if (!isValidImage) {
    toast.error("Image must be .jpg .png .webp .gif or .svg");
    return;
  }

  if (Number(price) <= 0) {
    toast.error("Price must be greater than 0");
    return;
  }

  if (Number(price) > 100000) {
    toast.error("Price is too high");
    return;
  }

  console.log({ name, title, image, price, category });
  router.replace("/");
};

return(
            <>
        <form onSubmit={handelSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="Name" className="text-sm font-semibold text-slate-700">
             Product Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="your Product Name"
			  value={name}
			  onChange={(e) => setName(e.target.value)}
			  className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
			  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
			  text-slate-700 placeholder:text-slate-300 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-semibold text-slate-700">
              description
            </label>
            <input
              type="text"
              id="title"
              placeholder="your Product Description"
			  value={title}
			  onChange={(e) => setTitle(e.target.value)}
			   maxLength={150}
			  className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
			  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
			  text-slate-700 placeholder:text-slate-300 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
              focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
              text-slate-700 transition-all duration-200">
              <option value="">Select a category</option>
              <option value="t-shirt">T-Shirt</option>
              <option value="jacket">Jacket</option>
              <option value="hody">Hoodie</option>
              <option value="wide-leg">Wide Leg</option>
              <option value="shoes">Shoes</option>
              <option value="bags">Bags</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="image" className="text-sm font-semibold text-slate-700">
              Image url
            </label>
            <input
              type="text"
              id="image"
              placeholder="https://example.com/image.jpg"
			  value={image}
			  onChange={(e) => setImage(e.target.value)}
			  className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
			  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
			  text-slate-700 placeholder:text-slate-300 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-sm font-semibold text-slate-700">
             Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter the price"
			  value={price}
			  onChange={(e) => setPrice(e.target.value)}
			  className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
			  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
			  text-slate-700 placeholder:text-slate-300 transition-all duration-200"/>
          </div>

          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95
              text-white font-bold py-3 rounded-xl
              shadow-lg shadow-indigo-300/50
              transition-all duration-200">
            Publish
          </button>
</form>
</>
);
}

