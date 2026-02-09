import React, { useState } from "react";
import {Product} from "@/types";
import {Link, useForm} from "@inertiajs/react";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import {
  HeartIcon,
  StarIcon,
  ShoppingCartIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  TruckIcon,
  BuildingStorefrontIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

function ProductItem({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const form = useForm<{
    option_ids: Record<string, number>;
    quantity: number;
  }>({
    option_ids: {},
    quantity: 1,
  })

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    form.post(route('cart.store', product.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        // You could add a toast notification here
        console.log('Added to cart successfully');
      },
      onError: (err) => {
        console.log(err)
      }
    })
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // Add haptic feedback for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // You could implement a modal here
    window.location.href = route('product.show', product.slug);
  }

  const isInStock = product.quantity > 0;
  const isLowStock = product.quantity <= 5 && product.quantity > 0;
  const hasVariations = product.variations && product.variations.length > 0;

  return (
    <div className="group relative card bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 w-full max-w-md mx-auto transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden">

      {/* Product Image Container */}
      <div className="relative overflow-hidden">
        <Link href={route('product.show', product.slug)} className="block">
          <figure className="relative aspect-square overflow-hidden">
            {/* Image Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            )}

            <img
              src={product.image}
              alt={product.title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Overlay with Quick Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-2">
                <button
                  onClick={handleQuickView}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
                  aria-label="Quick view"
                >
                  <EyeIcon className="w-5 h-5 text-gray-700" />
                </button>

                {isInStock && (
                  <button
                    onClick={addToCart}
                    disabled={form.processing}
                    className="p-3 bg-green-500/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Add to cart"
                  >
                    {form.processing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ShoppingCartIcon className="w-5 h-5 text-white" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {hasVariations && (
                <span className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                  ជម្រើសច្រើន
                </span>
              )}

              {product.images && product.images.length > 1 && (
                <span className="bg-purple-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                  រូបភាពច្រើន
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="absolute top-3 right-3">
              {!isInStock ? (
                <span className="bg-gray-500 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg">
                  អស់ហើយ
                </span>
              ) : isLowStock ? (
                <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg">
                  នៅសល់តិច
                </span>
              ) : null}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={toggleWishlist}
              className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110 z-10"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              style={{ top: !isInStock || isLowStock ? '50px' : '12px' }}
            >
              {isWishlisted ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
              )}
            </button>
          </figure>
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Product Title */}
        <Link href={route('product.show', product.slug)} className="block">
          <h3 className="font-khmer text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors duration-200 line-clamp-2 leading-tight">
            {product.title}
          </h3>
        </Link>

        {/* Short Description */}
        {product.short_description && (
          <p className="font-khmer text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Vendor Info */}
        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
            <BuildingStorefrontIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={route('vendor.profile', product.user.store_name)}
              className="block font-khmer text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 transition-colors truncate"
            >
              {product.user.name}
            </Link>
            <Link
              href={route('product.byDepartment', product.department.slug)}
              className="block font-khmer text-xs text-gray-500 hover:text-green-600 transition-colors truncate"
            >
              {product.department.name}
            </Link>
          </div>

          {/* Contact Telegram */}
          {product.user.telegram_link && (
            <Link
              href={product.user.telegram_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors flex-shrink-0"
              aria-label="Contact on Telegram"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Variation Info */}
        {hasVariations && (
          <div className="flex flex-wrap gap-1">
            {product.variationTypes.slice(0, 2).map((variationType) => (
              <span
                key={variationType.id}
                className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs rounded-full"
              >
                {variationType.name}: {variationType.options.length} ជម្រើស
              </span>
            ))}
            {product.variationTypes.length > 2 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{product.variationTypes.length - 2} ច្រើនទៀត
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-600">
                <CurrencyFormatter amount={product.price} locale="en-US" />
              </span>
              {hasVariations && (
                <span className="text-xs text-gray-500 font-khmer">
                  តម្លៃចាប់ពី
                </span>
              )}
            </div>
          </div>

          {/* Stock Indicator */}
          {isInStock && (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isLowStock ? 'bg-orange-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${Math.min((product.quantity / 20) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 font-khmer">
                នៅសល់ {product.quantity}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link
            href={route('product.show', product.slug)}
            className="flex-1 font-khmer btn btn-outline border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900 transition-all duration-200"
          >
            មើលព័ត៌មាន
          </Link>

          {isInStock && (
            <button
              onClick={addToCart}
              disabled={form.processing}
              className="px-4 font-khmer btn bg-green-600 hover:bg-green-700 text-white border-none disabled:bg-gray-400 transition-all duration-200 transform active:scale-95"
            >
              {form.processing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCartIcon className="w-4 h-4" />
                  {hasVariations ? 'ជ្រើសរើស' : 'បន្ថែម'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
