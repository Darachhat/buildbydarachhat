import {PageProps, GroupedCartItems} from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import CartItem from "@/Components/App/CartItem";
import {CreditCardIcon} from "@heroicons/react/24/outline";

function Index(
  {
    csrf_token,
    cartItems,
    totalQuantity,
    totalPrice
  }: PageProps<{cartItems: Record<number, GroupedCartItems>}>) {
  return (
    <AuthenticatedLayout>
      <Head title="Your Cart"/>

      <div className={"container mx-auto flex flex-col lg:flex-row gap-4"}>

        <div className={"card flex-1 bg-white dark:bg-gray-800 order-2 lg:order-1"}>
          <div className={"card-body"}>
            <h2 className={"text-lg font-bold font-khmer"}>
              កន្ទ្រកទំនិញ{/*Shopping Cart*/}
            </h2>

            <div className={"my-4"}>
              {Object.keys(cartItems).length === 0 && (
                <div className={'py-2 text-gray-500 text-center'}>
                  អ្នកមិនទាន់មានទំនិញក្នុងកន្ទ្រកនោះទេ{/*You don't have any items yet.*/}
                </div>
              )}
              {Object.values(cartItems).map(cartItems => (
                <div key={cartItems.user.id}>
                  <div className={"flex items-center justify-between pb-4 border-b border-gray-300 mb-4"}>
                      <Link href="/public" className={"underline"}>
                        {cartItems.user.name}
                      </Link>

                      <div>
                        <form action={route('cart.checkout')} method="post">
                          <input type="hidden" name="_token" value={csrf_token}/>
                          <input type="hidden" name="vendor_id" value={cartItems.user.id}/>
                          <button className="btn btn-sm btn-ghost font-khmer">
                            <CreditCardIcon className="size-6" />
                            បង់ប្រាក់សម្រាប់តែអ្នកលក់ម្នាក់នេះប៉ុណ្ណោះ
                          </button>
                        </form>
                      </div>
                  </div>
                  {cartItems.items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={"card bg-white dark:bg-gray-800 lg:min-w-[260px] order-1 lg:order-2"}>
          <div className={'card-body'}>
            Subtotal ({totalQuantity} items): &nbsp;
            <CurrencyFormatter amount={totalPrice} locale={"en-US"} />
            <form action={route('cart.checkout')} method="post">
              <input type="hidden" name="_token" value={csrf_token}/>
              <PrimaryButton className="rounded-full font-khmer">
                <CreditCardIcon className="size-6" />
                បន្តទៅការទូទាត់
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}

export default Index;
