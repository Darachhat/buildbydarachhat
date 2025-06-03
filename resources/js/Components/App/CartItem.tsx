import React, { useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { CartItem as CartItemType } from "@/types";
import TextInput from "@/Components/Core/TextInput";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import { productRoute } from "@/helpers";

function CartItem({ item }: { item: CartItemType }) {
  const deleteForm = useForm({
    option_ids: item.option_ids
  });

  const [error, setError] = useState("");

  const onDeleteClick = () => {
    deleteForm.delete(route("cart.destroy", item.product_id), {
      preserveScroll: true
    });
  };

  const handleQuantityChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    router.put(
      route("cart.update", item.product_id),
      {
        quantity: ev.target.value,
        option_ids: item.option_ids
      },
      {
        preserveScroll: true,
        onError: (errors) => {
          setError(Object.values(errors)[0]);
        }
      }
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-3">
        <Link
          href={productRoute(item)}
          className="w-28 h-28 sm:w-32 sm:h-32 flex self-start justify-center items-center"
        >
          <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
        </Link>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="mb-2 text-sm font-semibold">
              <Link href={productRoute(item)}>{item.title}</Link>
            </h3>
            <div className="text-xs space-y-1">
              {item.options.map((option) => (
                <div key={option.id}>
                  <strong>{option.type.name}:</strong> {option.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-sm font-khmer">ចំនួន:</div>
              <div className={error ? "gap-3 tooltip tooltip-open tooltip-error" : ""} data-tip={error}>
                <TextInput
                  type="number"
                  defaultValue={item.quantity}
                  onBlur={handleQuantityChange}
                  className="input-sm w-20"
                />
              </div>
              <button
                onClick={onDeleteClick}
                className="btn btn-sm btn-error text-white font-khmer"
              >
                លុប
              </button>
              <button className="btn  btn-sm btn-dash font-khmer">
                រក្សាទុកសម្រាប់ពេលក្រោយ
              </button>
            </div>

            <div className="font-bold text-lg whitespace-nowrap">
              <CurrencyFormatter amount={item.price * item.quantity} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
    </>
  );
}

export default CartItem;
