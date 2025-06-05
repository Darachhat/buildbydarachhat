import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import { Order } from "@/types";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

type Props = {
  order: Order;
};

export default function Show({ order }: Props) {
  const orderPlaced = new Date(order.created_at).toLocaleString();

  const storeName =
    order.vendorUser?.store_name && order.vendorUser.store_name.trim() !== ""
      ? order.vendorUser.store_name
      : "N/A";

  // Use same logic as History page:
  // Only show "No items found in this order." if there are NONE orderItems (or falsy), not if the product is missing.
  const hasOrderItems =
    order.orderItems && order.orderItems.length > 0;

  return (
    <AuthenticatedLayout>
      <Head title={`Order #${order.id} History`} />
      <div className="max-w-2xl font-khmer mx-auto py-10 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">
          <h2 className="text-3xl font-bold mb-6">
            ព័ត៏មានលម្អិតនៃការបញ្ជាទិញ
          </h2>
          {/* Seller Info */}
          <div className="mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-800 dark:text-gray-100">
                អ្នកលក់:
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {storeName}
              </span>
              <span className="mx-2 text-gray-400">|</span>
              {order.vendorUser?.telegram_link ? (
                <a
                  href={order.vendorUser.telegram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 hover:underline"
                >
                  <EnvelopeIcon className="w-4 h-4 mr-1" />
                  តេលេក្រាម
                </a>
              ) : (
                <span className="flex items-center text-sm text-gray-400">
                  <EnvelopeIcon className="w-4 h-4 mr-1" />
                  Contact Seller
                </span>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold">ពេលវេលា:</span> {orderPlaced}
            </div>
          </div>

          {/* Items List */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-700 dark:text-white text-base">
              ទំនិញ
            </h4>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {hasOrderItems ? (
                order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-14 h-14 object-cover rounded border dark:border-gray-700"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">
                        {item.product.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ចំនួន: {item.quantity}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-200">
                        តម្លៃ: <CurrencyFormatter amount={item.price} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-gray-400">
                  No items found in this order.
                </div>
              )}
            </div>
          </div>

          {/* Total & Back Button */}
          <div className="flex items-center justify-between mt-8 border-t pt-5">
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              សរុប
            </span>
            <span className="text-xl font-bold text-green-600">
              <CurrencyFormatter amount={order.total_price} />
            </span>
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              href={route("dashboard")}
              className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
            >
              ត្រលប់ទៅកាន់ទំព័រដើម
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
