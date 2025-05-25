import InputError from '@/Components/Core/InputError';
import InputLabel from '@/Components/Core/InputLabel';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import TextInput from '@/Components/Core/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 font-khmer">
                  ព័ត៌មានប្រវត្តិរូប
                </h2>

                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-khmer">
                  ធ្វើបច្ចុប្បន្នភាពព័ត៌មានប្រវត្តិរូប និងអាសយដ្ឋានអ៊ីមែលរបស់គណនីរបស់អ្នក
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="ឈ្មោះ" className={"font-khmer"} />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="អ៊ីមែល" className={"font-khmer"} />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200 font-khmer">
                          អាសយដ្ឋានអ៊ីមែលរបស់អ្នកមិនត្រូវបានផ្ទៀងផ្ទាត់
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-khmer rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                              ចុចទីនេះដើម្បីផ្ញើអ៊ីមែលផ្ទៀងផ្ទាត់ម្តងទៀត
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="font-khmer mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                              តំណផ្ទៀងផ្ទាត់ថ្មីត្រូវបានផ្ញើទៅកាន់អាសយដ្ឋានអ៊ីមែលរបស់អ្នក
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton className={"font-khmer"} disabled={processing}>រក្សារទុក</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="font-khmer text-sm text-gray-600 dark:text-gray-400">
                          រក្សារទុក
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
