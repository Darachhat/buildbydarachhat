import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeliveryInformation, { DeliveryFormData } from "@/Components/App/DeliveryInformation";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";

interface DeliveryInfoProps extends PageProps {
  vendorId?: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export default function DeliveryInfo({
                                       vendorId,
                                       subtotal,
                                       deliveryFee,
                                       total,
                                       csrf_token
                                     }: DeliveryInfoProps) {

  const handleSubmit = (deliveryInfo: DeliveryFormData) => {
    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = route('cart.checkout');

    // Add CSRF token
    const csrfField = document.createElement('input');
    csrfField.type = 'hidden';
    csrfField.name = '_token';
    csrfField.value = csrf_token;
    form.appendChild(csrfField);

    // Add vendor ID if present
    if (vendorId) {
      const vendorField = document.createElement('input');
      vendorField.type = 'hidden';
      vendorField.name = 'vendor_id';
      vendorField.value = vendorId.toString();
      form.appendChild(vendorField);
    }

    // Add delivery fee
    const feeField = document.createElement('input');
    feeField.type = 'hidden';
    feeField.name = 'delivery_fee';
    feeField.value = deliveryFee.toString();
    form.appendChild(feeField);

    // Add all delivery info fields
    Object.entries(deliveryInfo).forEach(([key, value]) => {
      const field = document.createElement('input');
      field.type = 'hidden';
      field.name = key;
      field.value = value;
      form.appendChild(field);
    });

    // Append to body, submit, and remove
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Delivery Information" />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 font-khmer">ព័ត៌មានអំពីការដឹកជញ្ជូន</h1>

          <DeliveryInformation
            onSubmit={handleSubmit}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
