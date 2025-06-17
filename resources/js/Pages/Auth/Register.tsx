import InputError from '@/Components/Core/InputError';
import InputLabel from '@/Components/Core/InputLabel';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import TextInput from '@/Components/Core/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Register() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  // Format time exactly as specified: YYYY-MM-DD HH:MM:SS
  const formatTime = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <AuthenticatedLayout>
        <Head title="ចុះឈ្មោះ" />
        <div className="font-khmer min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 p-4">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl text-white">🌱</span>
              </div>
              <h1 className="text-2xl font-bold text-green-800 mb-2 font-khmer">ចុះឈ្មោះគណនី</h1>
              <div className="text-sm text-green-600 bg-white/80 rounded-lg px-4 py-3 inline-block shadow-sm border border-green-200">
                <div className="font-mono font-bold text-green-800 mb-1">
                  📅 {formatTime(currentTime)}
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
              <div className="mb-6 text-center">
                <h2 className="text-lg font-bold text-green-800 font-khmer mb-2">
                  🌿 បង្កើតគណនីថ្មី
                </h2>
                <p className="text-sm text-green-600 font-khmer">
                  សូមបំពេញព័ត៌មានខាងក្រោម
                </p>
              </div>

              <form onSubmit={submit} className="space-y-5">
                <div>
                  <InputLabel htmlFor="name" value="ឈ្មោះ / Name" className="text-green-800 font-khmer font-medium" />
                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-2 block w-full border-green-300 focus:border-green-500 focus:ring-green-500 rounded-lg py-3 px-4 transition-colors"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Darachhat"
                    required
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="email" value="អុីមែល / Email" className="text-green-800 font-khmer font-medium" />
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-2 block w-full border-green-300 focus:border-green-500 focus:ring-green-500 rounded-lg py-3 px-4 transition-colors"
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="darachhat@email.com"
                    required
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="password" value="ពាក្យសម្ងាត់ / Password" className="text-green-800 font-khmer font-medium" />
                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-2 block w-full border-green-300 focus:border-green-500 focus:ring-green-500 rounded-lg py-3 px-4 transition-colors"
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                  <InputLabel
                    htmlFor="password_confirmation"
                    value="បញ្ជាក់ពាក្យសម្ងាត់ / Confirm Password"
                    className="text-green-800 font-khmer font-medium"
                  />
                  <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-2 block w-full border-green-300 focus:border-green-500 focus:ring-green-500 rounded-lg py-3 px-4 transition-colors"
                    autoComplete="new-password"
                    onChange={(e) =>
                      setData('password_confirmation', e.target.value)
                    }
                    placeholder="••••••••"
                    required
                  />
                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                </div>

                {/* Password Requirements */}
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <h4 className="text-sm font-medium text-green-800 mb-2 font-khmer">
                    📋 លក្ខខណ្ឌពាក្យសម្ងាត់ :
                  </h4>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>យ៉ាងតិច ៨ តួអក្សរ / At least 8 characters</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>មានអក្សរធំ និងតូច / Upper and lowercase letters</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>មានលេខ / Contains numbers</span>
                    </li>
                  </ul>
                </div>

                <PrimaryButton
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-900 py-3 rounded-lg transition-all duration-200 font-khmer font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  disabled={processing}
                >
                  {processing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>កំពុងចុះឈ្មោះ... / Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>🌱</span>
                      <span>ចុះឈ្មោះ</span>
                    </div>
                  )}
                </PrimaryButton>
              </form>

              <div className="mt-6 text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-green-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-green-500 font-khmer">ឬ</span>
                  </div>
                </div>

                <Link
                  href={route('login')}
                  className="text-sm text-green-600 hover:text-green-800 font-khmer transition-colors hover:underline"
                >
                  មានគណនីរួចរាល់? ចូលប្រើប្រាស់
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-white/60 rounded-lg p-4 border border-green-200">
              <div className="text-center">
                <h3 className="text-sm font-bold text-green-800 font-khmer mb-2">
                  🌿 ការបង្កើតគណនី
                </h3>
                <p className="text-xs text-green-600 font-khmer leading-relaxed">
                  ដោយការចុះឈ្មោះ អ្នកយល់ព្រមនឹងលក្ខខណ្ឌការប្រើប្រាស់របស់យើង។
                  គណនីរបស់អ្នកនឹងត្រូវបានរក្សាទុកយ៉ាងមានសុវត្ថិភាព។
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-green-500 space-y-1">
              <div className="font-khmer">© ២០២៥ សុធន តារាឆាត</div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>

      {/* Inline CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .hover\\:scale-\\[1\\.02\\]:hover {
            transform: scale(1.02);
          }
        `
      }} />
    </>
  );
}
