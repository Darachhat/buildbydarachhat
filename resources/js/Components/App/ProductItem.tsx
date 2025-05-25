import React from 'react';
import {Product} from "@/types";
import {Link, useForm} from "@inertiajs/react";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";

function ProductItem({ product }: { product: Product }) {

  const form = useForm<{
    option_ids: Record<string, number>;
    quantity: number;
  }>({
    option_ids: {},
    quantity: 1,
  })

  const addToCart = () => {
    form.post(route('cart.store', product.id), {
      preserveScroll: true,
      preserveState:true,
      onError: (err) => {
        console.log(err)
      }
    })
  }

  return (
    <div className="card bg-base-100 dark:bg-gray-500 shadow-xl border border-base-800  w-full max-w-md mx-auto">
      <Link href={route('product.show', product.slug)}>
        <figure className="p-4">
          <img
            src={product.image}
            alt={product.title}
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title font-khmer">{product.title}</h2>
        <p className={"font-khmer"}>
          ផលិតផលរបស់ <Link href={route('vendor.profile', product.user.store_name)} className="text-green-600 hover:underline">{product.user.name}</Link>
          &nbsp;ក្នុងផ្នែក <Link href={route('product.byDepartment', product.department.slug)} className="text-green-600 hover:underline">{product.department.name}</Link>
        </p>
        <div className="card-actions items-center justify-between grid-cols-1 grid mt-3">
          <span className="text-2xl text-center">
        <CurrencyFormatter amount={product.price} locale="en-US" />
      </span>
          <Link href={route('product.show', product.slug)} className="font-khmer btn border border-success bg-white text-green-600 hover:bg-green-600 hover:text-white">មើលព័ត៌មានលម្អិត</Link>
        </div>
      </div>
    </div>

  );
}

export default ProductItem;
