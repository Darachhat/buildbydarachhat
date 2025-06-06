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
  })

  const {url} = usePage();

  const [selectedOptions, setSelectedOptions] =
    useState<Record<number, VariationTypeOption>>({});
  // Add state to show error if quantity is exceeded
  const [quantityError, setQuantityError] = useState<string | null>(null);

  const images = useMemo(() => {
    for (let typeId in selectedOptions){
      const option = selectedOptions[typeId];
      if (option?.images?.length > 0) return option.images;
    }
    return product.images;
  }, [product, selectedOptions]);

  const computedProduct= useMemo(() => {
    const selectedOptionIds = Object.values(selectedOptions)
      .map(op => op.id)
      .sort();
    for (let variation of product.variations) {
      const optionIds = variation.variation_type_option_ids.sort();
      if (arraysAreEqual(selectedOptionIds, optionIds)) {
        return {
          price: variation.price,
          quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
        }
      }
    }
    return {
      price: product.price,
      quantity: product.quantity,
    };
  }, [product, selectedOptions]);

  useEffect(() => {
    for (let type of product.variationTypes) {
      const selectedOptionId: number = variationOptions[type.id];
      chooseOption(
        type.id,
        type.options.find(op => op.id == selectedOptionId) || type.options[0],
        false,
      )
    }
  }, []);

  const getOptionIdsMap=
    (newOptions: object) =>{
      return Object.fromEntries(
        Object.entries(newOptions).map(([a, b]) => [a,b.id])
      )
    }

  const chooseOption = (
    typeId:number,
    option: VariationTypeOption,
    updateRouter: boolean = true
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newOptions = {
        ...prevSelectedOptions,
        [typeId]: option
      }

      if (updateRouter) {
        router.get(url, {
          options: getOptionIdsMap(newOptions)
        }, {
          preserveScroll:true,
          preserveState:true
        })
      }

      return newOptions;
    })
  }


  const onQuantityChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(ev.target.value);
    // Check if quantity exceeds stock
    if (val > computedProduct.quantity) {
      setQuantityError('មិនអាចជ្រើសចំនួនលើសជាងស្ទុកបានទេ'); // "Cannot select more than available stock."
      form.setData('quantity', computedProduct.quantity);
    } else {
      setQuantityError(null);
      form.setData('quantity', val);
    }
  }

  const addToCart = () => {
    // Block add to cart if quantity is more than in stock
    if (form.data.quantity > computedProduct.quantity) {
      setQuantityError('មិនអាចបញ្ចូលចំនួនលើសស្ទុកបានទេ'); // "Cannot add more than available stock."
      return;
    }
    setQuantityError(null);
    form.post(route('cart.store', product.id), {
      preserveScroll: true,
      preserveState:true,
      onError: (err) => {
        console.log(err)
      }
    })
  }

  const renderProductVariationTypes = () => {
    return (
      product.variationTypes.map((type, i) => (
        <div key={type.id} >
          <b>{type.name}</b>
          {type.type === 'Image' &&
            <div className="flex gap-2 mb-4 mt-2">
              {type.options.map(option => (
                <div onClick={() => chooseOption(type.id, option)} key={option.id}>
                  {option.images && <img src={option.images[0].thumb} alt="" className={'transition-all duration-400 w-[40px] ' + (
                    selectedOptions[type.id]?.id == option.id ? 'rounded-full outline outline-3 outline-gray-400': ''
                  )} />}
                </div>
              ))}
            </div>}
          {type.type === 'Radio' &&
            <div className="flex mb-4 gap-2 join-horizontal mt-2">
              {type.options.map(option => (
                <input
                  onChange={() => chooseOption(type.id, option)}
                  key={option.id}
                  className={"join-item btn " + (selectedOptions[type.id]?.id == option.id ? 'bg-gray-500 outline-none text-white' : '')}
                  type="radio"
                  value={option.id}
                  checked={selectedOptions[type.id]?.id === option.id}
                  name={'variation_type_' + type.id}
                  aria-label={option.name}/>
              ))}
            </div>}
        </div>
      ))
    )
  }

  const renderAddToCartButton = () => {
    return (
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex gap-4">
          <select
            value={form.data.quantity}
            onChange={onQuantityChange}
            className="select select-bordered w-full">
            {Array.from({
              length: Math.min(10, computedProduct.quantity)
            }).map((el, i) => (
              <option className={"font-khmer"} key={i + 1} value={i + 1}>ចំនួន: {i + 1}</option>
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
        {/* Show error if trying to add more than quantity */}
        {quantityError &&
          <div className="text-red-600 font-khmer mt-2">{quantityError}</div>
        }
      </div>
    )
  }

  useEffect(() => {
    const idsMap = Object.fromEntries(
      Object.entries(selectedOptions).map(([typeId, option]: [string, VariationTypeOption]) => [typeId, option.id])
    )
    form.setData('option_ids', idsMap)
  }, [selectedOptions]);

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
          <div className="col-span-5">
            <h1 className="text-2xl">{product.title}</h1>
            <p className={" mt-2 font-khmer"}>
              ផលិតផលរបស់ <Link
              href={route('vendor.profile', product.user.store_name )}
              className="text-green-600 hover:underline font-khmer">
              {product.user.name}
            </Link>&nbsp;
              ក្នុងផ្នែក <Link href={route('product.byDepartment', product.department.slug)} className="text-green-600 hover:underline">{product.department.name}</Link>
            </p>
            {product.user.telegram_link &&
              <p className={'font-khmer mb-6'}>
                ទំនាក់ទំនង <Link  href={product.user.telegram_link} target="_blank" rel="noopener noreferrer" className="text-info hover:underline">Telegram</Link>
              </p>}
            <div>
              <div className="text-3xl mb-4 font-bold">
                <CurrencyFormatter amount={computedProduct.price} locale={"en"}/>
              </div>
            </div>
            {renderProductVariationTypes()}
            {computedProduct.quantity > 0 &&
              computedProduct.quantity < 10  &&
              <div className="my-4 text-red-600">
                <span className={"font-khmer"}>ចំនួននៅសល់តែ {computedProduct.quantity} ប៉ុណ្ណោះ</span>
              </div>
            }
            {computedProduct.quantity != undefined &&
              computedProduct.quantity == 0 &&
              <div className="my-4 text-red-600">
                <span className={"font-khmer"}>ផលិតផលបានលក់អស់ក្នុងស្ទុក</span>
              </div>
            }

            {computedProduct.quantity > 0 &&
              renderAddToCartButton()
            }

            <b className="text-xl font-khmer">អំពីផលិតផលនេះ</b>
            <div className="wysiwyg-output font-khmer" dangerouslySetInnerHTML={{__html: product.description}}/>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Show;
