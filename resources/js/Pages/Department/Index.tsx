import {Department, PageProps, PaginationProps, Product} from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import ProductItem from "@/Components/App/ProductItem";

function Index({
  appName,
  department,
  products
               }: PageProps<{
  department: Department,
  products: PaginationProps<Product>,
}>) {
  return (
    <AuthenticatedLayout>
      <Head>
        <title>{department.name}</title>
        <meta name="title" content={department.meta_title} />
        <meta name="description" content={department.meta_description} />
        <link rel="canonical" href={route('product.byDepartment', department.slug)} />

        <meta property="og:title" content={department.name} />
        <meta property="og:description" content={department.meta_description} />
        <meta property="og:url" content={route('product.byDepartment', department.slug)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={appName} />
      </Head>

      <div className={"container mx-auto"}>
        <div className="hero bg-base-200 min-h-[120px]">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">
                {department.name}
              </h1>
            </div>
          </div>
        </div>

        {products.data.length === 0 && (
          <div className={'py-8 px-8 text-black text-3xl text-center font-khmer'}>
            មិនទាន់មានផលិតផលប្រភេទនេះទេ
          </div>
        )}
        <div className="bg-green-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.data.map((product) => (
              <ProductItem product={product} key={product.id}/>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Index;
