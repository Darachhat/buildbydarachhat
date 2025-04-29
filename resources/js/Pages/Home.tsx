import {PageProps, PaginationProps, Product} from '@/types';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProductItem from "@/Components/App/ProductItem";

export default function Home({
  products,
}: PageProps<{products: PaginationProps<Product>}>) {

    return (
        <AuthenticatedLayout>
            <Head title="Home" />
          <div className="hero bg-base-100 dark:bg-gray-500   h-[500px]">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                className="max-w-sm rounded-lg shadow-2xl" />
              <div>
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                  quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-info text-white">Get Started</button>
              </div>
            </div>
          </div>

          <div className='bg-zinc-200 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 p-8'>
            {products.data.map(product => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </AuthenticatedLayout>
    );
}
