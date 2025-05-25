import InputError from '@/Components/Core/InputError';
import InputLabel from '@/Components/Core/InputLabel';
import PrimaryButton from '@/Components/Core/PrimaryButton';
import TextInput from '@/Components/Core/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600 font-khmer dark:text-gray-400">
              នេះគឺជាតំបន់សុវត្ថិភាពនៃកម្មវិធី។ សូមបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក មុនពេលបន្ត។
            </div>

            <form onSubmit={submit}>
                <div className="mt-4 font-khmer">
                    <InputLabel htmlFor="password" value="ពាក្យសម្ងាត់" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center font-khmer justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        យល់ព្រម
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
