import {PageProps, PaginationProps, Product} from '@/types';
import {Head, Link} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProductItem from "@/Components/App/ProductItem";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid";
import React from "react";
import {UserPlusIcon} from "@heroicons/react/24/outline";

export default function Home({
                               products,
    auth
                             }: PageProps<{ products: PaginationProps<Product> }>) {
  const {user} = auth;
  return (
    <AuthenticatedLayout>
      <Head title="Home"/>

      {/* Hero Section */}
      <div className="bg-green-50 dark:bg-gray-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              BuiltByDarachhat
            </h1>
            <h2 className="pt-3 text-2xl sm:text-3xl font-bold font-khmer text-green-600">
              ទំនុកចិត្ត · លក់បន្ត · ងាយស្រួល · លឿន · រហ័ស
            </h2>
            <p className="pt-6 font-khmer text-lg sm:text-xl text-gray-700 dark:text-gray-200">
              សូមស្វាគមន៍មកកាន់ទីផ្សារទិញលក់ផលិតផលមួយទឹក!
            </p>
            <p className="pt-2 font-khmer text-lg sm:text-xl text-gray-700 dark:text-gray-200">
              ទំនិញដែលមានគុណភាពល្អក្នុងតម្លៃសមរម្យ ព្រមទាំងចូលរួមកាត់បន្ថយកាកសំណល់ និងគាំទ្រពិភពលោកបៃតង
            </p>
          </div>

          {/* Banner Image */}
          <img
            src="/img/Banner_SS.png"
            alt="Banner"
            className="w-full max-w-md rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {user ? (
      <div>
      </div> ) : (
        <div className="flex justify-center my-6">
          <Link
            href={route("register")}
            className="btn flex items-center gap-2 bg-white hover:bg-green-100 border border-green-600 text-green-600 font-khmer text-lg font-semibold py-4 px-12 rounded-xl transition duration-300 ease-in-out shadow-md"
          >
            <UserPlusIcon className="w-5 h-5"/>
            <span>ចុះឈ្មោះគណនី</span>
          </Link>
        </div>
      )}

      {/* Products Grid */}
      <div className="bg-green-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.data.map((product) => (
            <ProductItem product={product} key={product.id}/>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
