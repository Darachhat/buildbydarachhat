import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import { Order } from "@/types";
import { TruckIcon } from "@heroicons/react/24/outline";

type Props = {
  orders: Order[];
};


export default function History({ orders }: Props) {

  return (
    <AuthenticatedLayout>
      <Head title="Order History" />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6 font-khmer">ប្រវត្តិការបញ្ជាទិញ</h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 font-khmer">
              អ្នកមិនទាន់មានការបញ្ជាទិញណាមួយនៅឡើយទេ
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg font-khmer">
                      បញ្ជាទិញ #{order.id}
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Delivery Status */}
                  <div className="flex items-center mb-2">
                    <TruckIcon className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm font-khmer mr-2">ស្ថានភាព:</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      order.delivery.delivery_status === 'Pending' ? 'bg-gray-100 text-gray-800' :
                        order.delivery.delivery_status === 'Packing' ? 'bg-blue-100 text-blue-800' :
                          order.delivery.delivery_status === 'Shipping' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                    }`}>
                      {order.delivery.delivery_status}
                    </span>
                  </div>

                  {/* Delivery Phone (only show for Shipping/Received) */}
                  {(order.delivery.delivery_status === 'Shipping' || order.delivery.delivery_status === 'Received') &&
                    order.delivery.deliver_phone && (
                      <div className="text-sm mb-2">
                        <span className="font-khmer">លេខអ្នកដឹកជញ្ជូន:</span>{" "}
                        <a href={`tel:${order.delivery.deliver_phone}`} className="text-blue-600 hover:underline">
                          {order.delivery.deliver_phone}
                        </a>
                      </div>
                    )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between mb-4">
                    <span className="font-khmer">ចំនួនទំនិញ:</span>
                    <span className="font-medium">
                      {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4 font-bold">
                    <span className="font-khmer">សរុប:</span>
                    <span className="text-green-600">
                      <CurrencyFormatter amount={order.total_price} />
                    </span>
                  </div>
                  <Link
                    href={route("orders.show", order.id)}
                    className="btn btn-primary w-full font-khmer"
                  >
                    មើលព័ត៌មានលម្អិត
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
