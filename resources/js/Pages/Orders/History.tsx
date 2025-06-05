import { Head, Link } from "@inertiajs/react";
import { Order, OrderItem } from "@/types";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

type Props = {
  orders: Order[];
};

export default function History({ orders }: Props) {
  return (
    <AuthenticatedLayout>
      <Head title="ប្រវិត្តការបញ្ជារទិញ" />
      <div className="max-w-4xl mx-auto py-10 px-4 font-khmer">
        <h2 className="text-3xl font-bold mb-8">ប្រវិត្តការបញ្ជារទិញ</h2>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            អ្នកមិនទាន់មានការបញ្ជាទិញទេ
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">
                      ការបញ្ជាទិញ #<span className="font-medium text-gray-700">{order.id}</span>
                    </div>
                    <div className="text-gray-500">
                      ពេលវេលា:{" "}
                      <span className="font-medium">
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="text-sm text-gray-600">
                      Status: <span className="font-semibold">{order.status}</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      <CurrencyFormatter amount={order.total_price} />
                    </div>
                  </div>
                </div>
                {order.orderItems && order.orderItems.length > 0 ? (
                  <div>
                    {order.orderItems.map((item: OrderItem) => (
                      <div key={item.id} className="flex items-center gap-4 py-2">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-12 h-12 object-cover rounded border dark:border-gray-700"
                        />
                        <div className="flex-1">
                          <Link
                            href={route('product.show', item.product.slug)}
                            className="font-medium text-gray-800 dark:text-white hover:underline"
                          >
                            {item.product.title}
                          </Link>
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1  font-khmer" dangerouslySetInnerHTML={{__html: item.product.description}}/>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ចំនួន: {item.quantity}
                          </div>
                        </div>
                        <div className="text-gray-800 font-semibold">
                          <CurrencyFormatter amount={item.price} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-6">
                    No items found in this order.
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <Link
                    href={route("orders.show", order.id)}
                    className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded"
                  >
                    ព័ត៏មានការបញ្ជាទិញលម្អិត
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            href={route("dashboard")}
            className="inline-block px-5 py-2 bg-white hover:bg-gray-300 rounded text-green-700 font-medium"
          >
            ត្រលប់ទៅកាន់ទំព័រដើម
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
