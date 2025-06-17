// DeliveryInformation.tsx
import { useState } from 'react';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import { CreditCardIcon } from '@heroicons/react/24/outline';

type DeliveryInfoProps = {
  onSubmit: (deliveryInfo: DeliveryFormData) => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export type DeliveryFormData = {
  recipient_name: string;
  street: string;
  city: string;
  county: string;
  phone: string;
}

export default function DeliveryInformation({ onSubmit, subtotal, deliveryFee, total }: DeliveryInfoProps) {
  const [formData, setFormData] = useState<DeliveryFormData>({
    recipient_name: '',
    street: '',
    city: '',
    county: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 font-khmer">ព័ត៌មានការដឹកជញ្ជូន</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="recipient_name" className="block text-sm font-medium mb-1 font-khmer">ឈ្មោះអ្នកទទួល</label>
          <input
            type="text"
            id="recipient_name"
            name="recipient_name"
            value={formData.recipient_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="street" className="block text-sm font-medium mb-1 font-khmer">ផ្លូវលេខ</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium mb-1 font-khmer">ស្រុក/ខណ្ឌ</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="county" className="block text-sm font-medium mb-1 font-khmer">ខេត្ត/ក្រុង</label>
          <input
            type="text"
            id="county"
            name="county"
            value={formData.county}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium mb-1 font-khmer">លេខទូរស័ព្ទ</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-khmer">តម្លៃទំនិញ:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-khmer">តម្លៃដឹកជញ្ជូន:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span className="font-khmer">សរុប:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <PrimaryButton type="submit" className="rounded-full font-khmer w-full">
          <CreditCardIcon className="size-6 mr-2" />
          បន្តការបង់ប្រាក់
        </PrimaryButton>
      </form>
    </div>
  );
}
