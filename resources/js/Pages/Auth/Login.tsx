import Checkbox from '@/Components/Core/Checkbox';
import InputError from '@/Components/Core/InputError';
import InputLabel from '@/Components/Core/InputLabel';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import TextInput from '@/Components/Core/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Login({
                                status,
                                canResetPassword,
                              }: {
  status?: string;
  canResetPassword: boolean;
}) {
  const [showQuickLogin, setShowQuickLogin] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
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
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  const quickLogin = (email: string, password: string) => {
    setData({
      email,
      password,
      remember: data.remember
    });
  };

  const formatTime = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours() + 7).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('remember', e.target.checked);
  };

  const demoAccounts = [
    {
      role: 'Admin',
      roleKh: 'អ្នកគ្រប់គ្រង',
      email: 'admin@example.com',
      password: 'password',
      icon: '🌳',
      description: 'គ្រប់គ្រងប្រព័ន្ធទាំងអស់',
      bgColor: 'bg-gradient-to-r from-emerald-50 to-green-100'
    },
    {
      role: 'Vendor',
      roleKh: 'អ្នកលក់',
      email: 'vendor@example.com',
      password: 'password',
      icon: '🍃',
      description: 'គ្រប់គ្រងផលិតផល',
      bgColor: 'bg-gradient-to-r from-green-50 to-lime-100'
    },
    {
      role: 'User',
      roleKh: 'អ្នកប្រើប្រាស់',
      email: 'user@example.com',
      password: 'password',
      icon: '🌱',
      description: 'ទិញលក់ផលិតផល',
      bgColor: 'bg-gradient-to-r from-lime-50 to-green-100'
    },
  ];

  return (
    <>
      <AuthenticatedLayout>
        <Head title="ចូលប្រើប្រាស់" />
        <div className="font-khmer min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100 p-4">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl text-white">🌿</span>
              </div>
              <h1 className="text-2xl font-bold text-green-800 mb-2 font-khmer">ចូលប្រើប្រាស់</h1>
              <div className="text-sm text-green-600 bg-white/80 rounded-lg px-4 py-2 inline-block shadow-sm border border-green-200">
                <div className="font-mono font-bold">{formatTime(currentTime)} UTC</div>
                <div className="font-khmer">សូមស្វាគមន៍ 🌱</div>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setShowQuickLogin(!showQuickLogin)}
                className="w-full bg-white rounded-lg p-4 border border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🌳</span>
                    <div className="text-left">
                      <div className="text-green-800 font-medium font-khmer">គណនីសាកល្បង</div>
                      <div className="text-xs text-green-600">ចុចដើម្បីបំពេញព័ត៏មានដោយស្វ័យប្រវិត្ត</div>
                    </div>
                  </div>
                  <span className={`transform transition-transform duration-200 text-green-600 ${showQuickLogin ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {showQuickLogin && (
                <div className="mt-3 space-y-2 animate-slideDown">
                  {demoAccounts.map((account, index) => (
                    <button
                      key={account.role}
                      type="button"
                      onClick={() => quickLogin(account.email, account.password)}
                      disabled={processing}
                      className={`w-full ${account.bgColor} hover:shadow-lg rounded-xl p-3 border-2 border-green-200 hover:border-green-400 text-left transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-lg shadow-md">
                          {account.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-green-800">{account.role} ({account.roleKh})</div>
                              <div className="text-xs text-green-500">{account.email}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
              {status && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 font-khmer">
                  ✅ {status}
                </div>
              )}

              <form onSubmit={submit} className="space-y-5">
                <div>
                  <InputLabel htmlFor="email" value="អុីមែល / Email" className="text-green-800 font-khmer font-medium" />
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-2 block w-full border-green-300 focus:border-green-500 focus:ring-green-500 rounded-lg py-3 px-4 transition-colors"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="admin@example.com"
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
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="password"
                    required
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) =>
                          setData('remember', e.target.checked || false)
                        }
                      />
                      <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    ចងចាំ
                                </span>
                    </label>

                  </div>

                  {canResetPassword && (
                    <Link
                      href={route('password.request')}
                      className="text-sm text-green-600 hover:text-green-800 hover:underline font-khmer transition-colors"
                    >
                      ភ្លេចពាក្យសម្ងាត់?
                    </Link>
                  )}
                </div>

                <PrimaryButton
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-900 py-3 rounded-lg transition-all duration-200 font-khmer font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  disabled={processing}
                >
                  {processing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>កំពុងចូល...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>🌿</span>
                      <span>ចូលប្រើប្រាស់</span>
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
                  href={route('register')}
                  className="text-sm text-green-600 hover:text-green-800 font-khmer transition-colors hover:underline"
                >
                  អ្នកប្រើប្រាស់ថ្មី? បង្កើតគណនី
                </Link>
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
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-slideDown {
            animation: slideDown 0.3s ease-out forwards;
          }

          .rotate-180 {
            transform: rotate(180deg);
          }

          .transition-transform {
            transition-property: transform;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          .duration-200 {
            transition-duration: 200ms;
          }

          .hover\\:scale-\\[1\\.02\\]:hover {
            transform: scale(1.02);
          }
        `
      }} />
    </>
  );
}
