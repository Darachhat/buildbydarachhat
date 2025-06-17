import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { PageProps, PaginationProps, Product, Vendor } from "@/types";
import ProductItem from "@/Components/App/ProductItem";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function Profile({
                   vendor,
                   products,
                 }: PageProps<{
  vendor: Vendor;
  products: PaginationProps<Product>;
}>) {
  return (
    <AuthenticatedLayout>
      <Head title={vendor.store_name + " Profile Page"} />

      {/* Modern Glassmorphism Hero Section with Animated Gradient */}
      <section className="px-12 relative flex items-center justify-center min-h-[400px] overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 animate-gradient bg-[length:300%_300%] bg-gradient-to-r from-indigo-700 via-fuchsia-500 via-pink-400 to-blue-400" />
        {/* Blurred Overlay Image */}
        <div
          className="absolute inset-0 z-10 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            filter: "blur(6px) brightness(0.6)",
            opacity: 0.7,
          }}
        />
        {/* Glass Card */}
        <div className="relative z-20 w-full max-w-2xl mx-auto px-8 py-10 rounded-3xl bg-white/30 backdrop-blur-2xl shadow-xl border border-white/20 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-khmer tracking-tight text-white/90 drop-shadow-lg mb-2">
            {vendor.store_name}
          </h1>
          {vendor.telegram_link && (
            <a
              href={vendor.telegram_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              <span className="break-all text-xs md:text-sm font-medium">
                {vendor.telegram_link}
              </span>
            </a>
          )}
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="bg-gradient-to-br from-slate-100 via-indigo-50 to-white min-h-screen py-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">

            {/* Example filter bar for modern UX */}
            <div className="flex px-12 gap-2">
              <button className="px-4 py-2 bg-white/80 border rounded-lg text-sm text-gray-700 hover:bg-indigo-100 transition">
                All
              </button>
              <button className="px-4 py-2 bg-white/80 border rounded-lg text-sm text-gray-700 hover:bg-indigo-100 transition">
                Newest
              </button>
              <button className="px-4 py-2 bg-white/80 border rounded-lg text-sm text-gray-700 hover:bg-indigo-100 transition">
                Popular
              </button>
            </div>
          </div>
          <div className="px-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.data.map((product) => (
              <div
                key={product.id}
                className="transition-transform hover:-translate-y-2 hover:scale-105 duration-200"
              >
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style for animated gradient */}
      <style>
        {`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 8s ease-in-out infinite;
        }
      `}
      </style>
    </AuthenticatedLayout>
  );
}

export default Profile;
