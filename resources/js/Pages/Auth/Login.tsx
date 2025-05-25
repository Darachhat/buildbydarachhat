import Checkbox from '@/Components/Core/Checkbox';
import InputError from '@/Components/Core/InputError';
import InputLabel from '@/Components/Core/InputLabel';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import TextInput from '@/Components/Core/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Login({
                                status,
                                canResetPassword,
                              }: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false as boolean,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Log in" />
      <div className="p-6 font-khmer sm:p-10 md:p-20 lg:p-32 xl:p-40 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow rounded-xl p-6 sm:p-8">
          {status && (
            <div className="mb-4 text-sm font-medium text-green-600">
              {status}
            </div>
          )}

          <form onSubmit={submit}>
            <div>
              <InputLabel htmlFor="email" value="អុីមែល" />

              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData('email', e.target.value)}
              />

              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="password" value="ពាក្យសម្ងាត់" />

              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="current-password"
                onChange={(e) => setData('password', e.target.value)}
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

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
            <div className={"pt-3"}>
              <Link
                href={route('register')}
                className="link link-hover text-sm text-green-600 hover:underline dark:text-green-400"
              >
                តើអ្នកជាអ្នកប្រើប្រាស់ថ្មីមែនទេ?
              </Link>
            </div>


            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="text-sm font-khmer hover:underline"
                >
                  ភ្លេចពាក្យសម្ងាត់?
                </Link>
              )}


              <PrimaryButton className="font-khmer w-full sm:w-auto" disabled={processing}>
                ចូល
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

