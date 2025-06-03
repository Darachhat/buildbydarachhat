import PrimaryButton from '@/Components/Core/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm font-khmer text-gray-600 dark:text-gray-400">
              អរគុណសម្រាប់ការចុះឈ្មោះ! មុនពេលចាប់ផ្តើម តើអ្នកអាចផ្ទៀងផ្ទាត់អាសយដ្ឋានអ៊ីមែលរបស់អ្នកដោយចុចលើតំណដែលយើងទើបតែផ្ញើទៅអ្នកបានទេ? ប្រសិនបើអ្នកមិនបានទទួលអ៊ីមែលទេ យើងនឹងរីករាយផ្ញើទៅអ្នកម្តងទៀត។
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-khmer font-medium text-green-600 dark:text-green-400">
                  តំណផ្ទៀងផ្ទាត់ថ្មីមួយត្រូវបានផ្ញើទៅកាន់អាសយដ្ឋានអ៊ីមែលដែលអ្នកបានផ្តល់អំឡុងពេលចុះឈ្មោះ។
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex font-khmer items-center font-khmer justify-between">
                    <PrimaryButton disabled={processing}>
                      ផ្ញើអ៊ីមែលផ្ទៀងផ្ទាត់ឡើងវិញ
                    </PrimaryButton>

                    <Link
                        href={route('dashboard')}
                        as="button"
                        className="rounded-md font-khmer text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        ចាកចេញ
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
