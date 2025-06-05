import {PageProps, Product, VariationTypeOption} from "@/types";
import {Head, Link, router, useForm, usePage} from "@inertiajs/react";
import React, {useMemo, useState, useEffect} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Carousel from "@/Components/Core/Carousel";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import {arraysAreEqual} from "@/helpers";

function Show({
                appName,
                product,
                variationOptions
              }: PageProps<{
  product: Product,
  variationOptions: number[]
}>) {

  const form = useForm<{
    option_ids: Record<string, number>;
    quantity: number;
    price: number | null;
  }>({
    option_ids: {},
    quantity: 1,
    price: null
  });

  const {url} = usePage();

  const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationTypeOption>>({});
  const [quantityError, setQuantityError] = useState<string | null>(null);

  const images = useMemo(() => {
    for (let typeId in selectedOptions){
      const option = selectedOptions[typeId];
      if (option?.images?.length > 0) return option.images;
    }
    return product.images;
  }, [product, selectedOptions]);

  // Helper: get price for a specific variation option (for image display)
  const getVariationPriceForOption = (typeId: number, optionId: number) => {
    for (let variation of product.variations) {
      if (
        variation.variation_type_option_ids.length === 1 &&
        variation.variation_type_option_ids[0] === optionId
      ) {
        return Number(variation.price);
      }
    }
    return Number(product.price);
  };

  // Helper: get quantity for a specific variation option (for image display)
  const getVariationQtyForOption = (typeId: number, optionId: number) => {
    for (let variation of product.variations) {
      if (
        variation.variation_type_option_ids.length === 1 &&
        variation.variation_type_option_ids[0] === optionId
      ) {
        return variation.quantity ?? product.quantity;
      }
    }
    return product.quantity;
  };

  // Compute price/quantity for selected variation
  const computedProduct = useMemo(() => {
    const selectedOptionIds = Object.values(selectedOptions)
      .map(op => op.id)
      .sort();
    let matchedVariation = null;
    for (let variation of product.variations) {
      const optionIds = variation.variation_type_option_ids.slice().sort();
      if (arraysAreEqual(selectedOptionIds, optionIds)) {
        matchedVariation = variation;
        return {
          price: Number(variation.price),
          quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
        };
      }
    }
    return {
      price: Number(product.price),
      quantity: product.quantity,
    };
  }, [product, selectedOptions]);

  useEffect(() => {
    for (let type of product.variationTypes) {
      const selectedOptionId: number = variationOptions[type.id];
      chooseOption(
        type.id,
        type.options.find(op => op.id == selectedOptionId) || type.options[0],
        false
      );
    }
    // eslint-disable-next-line
  }, []);

  const getOptionIdsMap =
    (newOptions: object) => {
      return Object.fromEntries(
        Object.entries(newOptions).map(([a, b]) => [a, (b as VariationTypeOption).id])
      );
    };

  const chooseOption = (
    typeId: number,
    option: VariationTypeOption,
    updateRouter: boolean = true
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = {
        ...prevSelectedOptions,
        [typeId]: option
      };

      if (updateRouter) {
        router.get(url, {
          options: getOptionIdsMap(newOptions)
        }, {
          preserveScroll: true,
          preserveState: true
        });
      }

      return newOptions;
    });
  };

  const onQuantityChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(ev.target.value);
    if (val > computedProduct.quantity) {
      setQuantityError('មិនអាចជ្រើសចំនួនលើសជាងស្ទុកបានទេ'); // Cannot select more than in stock
      form.setData('quantity', computedProduct.quantity);
    } else {
      setQuantityError(null);
      form.setData('quantity', val);
    }
  }

  const addToCart = () => {
    if (form.data.quantity > computedProduct.quantity) {
      setQuantityError('មិនអាចបញ្ចូលចំនួនលើសស្ទុកបានទេ'); // Cannot add more than available stock
      return;
    }
    setQuantityError(null);
    form.post(route('cart.store', product.id), {
      preserveScroll: true,
      preserveState: true,
      onError: (err) => {
        console.log(err)
      }
    });
  }

  useEffect(() => {
    const idsMap = Object.fromEntries(
      Object.entries(selectedOptions).map(([typeId, option]: [string, VariationTypeOption]) => [typeId, option.id])
    );
    form.setData('option_ids', idsMap);
  }, [selectedOptions]);

  // --- HERE is the change: price and quantity under each image ---
  const renderProductVariationTypes = () => {
    return product.variationTypes.map((type) => (
      <div key={type.id} className="font-khmer mb-6">
        <b className="block mb-2 text-gray-800 text-lg">{type.name}</b>
        {type.type === "Image" && (
          <div className="flex flex-wrap gap-4 mb-4 mt-2">
            {type.options.map((option) => {
              const selected = selectedOptions[type.id]?.id == option.id;
              return (
                <div
                  key={option.id}
                  className={
                    "flex flex-col items-center p-2 rounded-lg transition-all cursor-pointer border " +
                    (selected
                      ? "border-green-500 shadow-lg bg-white"
                      : "border-gray-200 hover:shadow-md bg-gray-50")
                  }
                  style={{ width: 90 }}
                  onClick={() => chooseOption(type.id, option)}
                >
                  {option.images && (
                    <img
                      src={option.images[0].thumb}
                      alt={option.name}
                      className={
                        "w-14 h-14 object-cover rounded-full border-2 " +
                        (selected
                          ? "border-green-500"
                          : "border-gray-300 hover:border-green-400")
                      }
                    />
                  )}
                  <span className="mt-2 font-semibold text-green-700">
                  <CurrencyFormatter
                    amount={getVariationPriceForOption(type.id, option.id)}
                    locale="en"
                  />
                </span>
                </div>
              );
            })}
          </div>
        )}
        {type.type === "Radio" && (
          <div className="flex mb-4 gap-2 join-horizontal mt-2">
            {type.options.map((option) => (
              <input
                onChange={() => chooseOption(type.id, option)}
                key={option.id}
                className={
                  "join-item btn " +
                  (selectedOptions[type.id]?.id == option.id
                    ? "bg-green-500 border-success text-white"
                    : "")
                }
                type="radio"
                value={option.id}
                checked={selectedOptions[type.id]?.id === option.id}
                name={"variation_type_" + type.id}
                aria-label={option.name}
              />
            ))}
          </div>
        )}
      </div>
    ));
  };

  const renderAddToCartButton = () => {
    return (
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex gap-4">
          <select
            value={form.data.quantity}
            onChange={onQuantityChange}
            className="select select-bordered w-full"
            disabled={computedProduct.quantity === 0}
          >
            {Array.from({
              length: Math.min(10, computedProduct.quantity)
            }).map((_, i) => (
              <option className="font-khmer" key={i + 1} value={i + 1}>
                ចំនួន: {i + 1}
              </option>
            ))}
          </select>
          <button
            onClick={addToCart}
            disabled={computedProduct.quantity === 0 || form.data.quantity > computedProduct.quantity}
            className="btn bg-green-600 border-1 border border-success text-white text-sm hover:text-gray-600 hover:bg-green-200 active:text-gray-600 active:bg-green-200"
          >
            បញ្ចូលទៅក្នុងកន្ទ្រក
          </button>
        </div>
        {quantityError && (
          <div className="text-red-600 font-khmer mt-2">{quantityError}</div>
        )}
      </div>
    );
  };

  return (
    <AuthenticatedLayout>
      <Head>
        <title>{product.title}</title>
        <meta name='title' content={product.meta_title || product.title} />
        <meta name='description' content={product.meta_description} />
        <link rel="canonical" href={route('product.show', product.slug)} />

        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.meta_description}/>
        <meta property="og:image" content={images[0]?.small} />
        <meta property="og:url" content={route('product.show', product.slug)} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content={appName} />
      </Head>
      <div className="container mx-auto p-8 bg-green-50" >
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
          <div className="col-span-7">
            <Carousel images={images} />
          </div>
          <div className="col-span-7 lg:col-span-5">
            <div className="bg-white rounded-2xl shadow p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
              <p className="mb-1 mt-2 text-sm font-khmer text-gray-600">
                ផលិតផលរបស់{' '}
                <Link
                  href={route('vendor.profile', product.user.store_name)}
                  className="text-green-600 hover:underline font-bold"
                >
                  {product.user.name}
                </Link>
                &nbsp;ក្នុងផ្នែក{' '}
                <Link
                  href={route('product.byDepartment', product.department.slug)}
                  className="text-green-600 hover:underline"
                >
                  {product.department.name}
                </Link>
              </p>
              {product.user.telegram_link && (
                <p className="font-khmer mb-5 text-xs text-gray-500">
                  ទំនាក់ទំនង{' '}
                  <Link
                    href={product.user.telegram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Telegram
                  </Link>
                </p>
              )}

              <div className="flex items-center gap-2 mb-4">
                <div className="text-4xl font-extrabold text-green-700">
                  <CurrencyFormatter amount={computedProduct.price} locale={"en"} />
                </div>
                {computedProduct.quantity > 0 && computedProduct.quantity < 10 && (
                  <span className="ml-3 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
          ចំនួននៅសល់ {computedProduct.quantity}
        </span>
                )}
                {computedProduct.quantity === 0 && (
                  <span className="ml-3 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
          ផលិតផលអស់ស្ទុក
        </span>
                )}
              </div>

              <div className="mb-5">{renderProductVariationTypes()}</div>

              {computedProduct.quantity > 0 && (
                <div className="mb-6">{renderAddToCartButton()}</div>
              )}

              <div className="mb-2 border-t pt-4">
                <b className="text-xl font-khmer block mb-2 text-gray-800">អំពីផលិតផលនេះ</b>
                <div
                  className="wysiwyg-output font-khmer prose prose-green max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Show;
