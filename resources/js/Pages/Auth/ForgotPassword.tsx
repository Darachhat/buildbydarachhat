import InputError from '@/Components/Core/InputError';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import TextInput from '@/Components/Core/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm font-khmer text-gray-600 dark:text-gray-400">
              ភ្លេចពាក្យសម្ងាត់របស់អ្នក? គ្មានបញ្ហាទេ។ គ្រាន់តែអនុញ្ញាតឱ្យយើងដឹងពីអាសយដ្ឋានអ៊ីមែលរបស់អ្នក ហើយយើងនឹងផ្ញើអ៊ីមែលទៅអ្នកនូវតំណកំណត់ពាក្យសម្ងាត់ឡើងវិញ ដែលនឹងអនុញ្ញាតឱ្យអ្នកជ្រើសរើសអាសយដ្ឋានថ្មីមួយ។
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex font-khmer items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                      តំណកំណត់ពាក្យសម្ងាត់ឡើងវិញតាមអ៊ីមែល
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
