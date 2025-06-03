import PrimaryButton from "@/Components/Core/PrimaryButton";
import {Link, useForm, usePage} from "@inertiajs/react";
import React, {FormEventHandler, useState } from "react";
import SecondaryButton from "@/Components/Core/SecondaryButton";
import Modal from "@/Components/Core/Modal";
import InputLabel from "@/Components/Core/InputLabel";
import TextInput from "@/Components/Core/TextInput";
import InputError from "@/Components/Core/InputError";
import {CheckBadgeIcon} from "@heroicons/react/24/outline";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid";

export default function VendorDetails(
  {className = '',}: {className?: string; }
) {
  const [showBecomeVendorConfirmation, setShowBecomeVendorConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const user = usePage().props.auth.user;
  const token = usePage().props.csrf_token;

  const {
    data,
    setData,
    errors,
    post,
    processing,
    recentlySuccessful,
  } = useForm({
    store_name: user.vendor?.store_name || user.name.toLowerCase().replace(/\s+/g, "-"),
    store_address: user.vendor?.store_address,
    telegram_link: user.vendor?.telegram_link,
  });

  const onStoreNameChange = (ev: React
    .ChangeEvent<HTMLInputElement>) => {
    setData('store_name', ev.target.value.toLowerCase().replace(/\s+/g, '-'))
  }
  const closeModal = () => {
    setShowBecomeVendorConfirmation(false);
  }
  const becomeVendor: FormEventHandler = (ev) => {
    ev.preventDefault()

    post(route('vendor.store'), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal()
        setSuccessMessage('ដាក់លក់ផលិតផលបាន')

      },
      onError: (errors) => {

      },
    })
  }

  const updateVendor: FormEventHandler = (ev) => {
    ev.preventDefault()

    post(route('vendor.store'), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal()
        setSuccessMessage('បានធ្វើបច្ចុប្បន្នភាព')
      },
      onError: (errors) => {

      },
    })


  }


  return (
    <section className={className}>
      {recentlySuccessful && <div className="toast toast-top toast-end">
        <div className="alert alert-success">
          <span>{successMessage}</span>
        </div>
      </div>}

      <header>
        <h2 className="grid grid-cols-1 justify-center mb-8 text-lg font-medium text-gray-900 dark:text-gray-100">
          ព័ត៌មានលម្អិតអំពីអ្នកលក់
        {/*  {user.vendor?.status === 'pending' &&*/}
        {/*  <span className={'badge badge-warning p-4 mt-2 font-khmer'}>{user.vendor.store_label}សូមរង់ចាំ</span>}*/}
        {/*  {user.vendor?.status === 'rejected' &&*/}
        {/*  <span className={'badge badge-error p-4 mt-2 font-khmer'}>{user.vendor.store_label}បានបដិសេដ</span>}*/}
        {/*  {user.vendor?.status === 'approved' &&*/}
        {/*    <span className={'badge border border-success p-4 mt-2 text-success badge-white font-khmer'}>{user.vendor.store_label}បានអនុម័ត <CheckBadgeIcon className="w-4 h-4" /> </span>}*/}
        </h2>
      </header>

      <div className={"font-khmer"}>
        {!user.vendor && <PrimaryButton onClick={ev =>
        setShowBecomeVendorConfirmation(true)} disabled={processing}>
          ក្លាយជាអ្នកលក់
        </PrimaryButton>}

        {user.vendor && (
          <>
            <form onSubmit={updateVendor}>
              <div  className="flex justify-start mb-6">
                <Link href="/admin" className="btn bg-black/50 hover:bg-gray-500 hover:text-white-700 text-gray-200"><ArrowRightOnRectangleIcon className={'w-4 h-4'}/> Admin</Link>
              </div>
              <div className="mb-4">
                <InputLabel htmlFor="name" value="ឈ្មោះហាង"/>

                <TextInput
                  id="name"
                  className="mt-1 block w-full"
                  value={data.store_name}
                  onChange={onStoreNameChange}
                  required
                  isFocused
                  autoComplete="name"
                />

                <InputError className="mt-2" message={errors.store_name}/>
              </div>
              <InputLabel htmlFor="telegram_link" value="Telegram Link" />
              <TextInput
                id="telegram_link"
                className="mt-1 block w-full"
                value={data.telegram_link}
                onChange={(e) => setData('telegram_link', e.target.value)}
                placeholder="https://t.me"
              />
              <InputError className="mt-2" message={errors.telegram_link} />

              <div className="mb-4">
                <InputLabel htmlFor="name" value="អាសយដ្ឋានហាង"/>

                <textarea className="textarea textarea-bordered w-full mt-1"
                value={data.store_address}
                onChange={(e) => setData
                ('store_address', e.target.value)} placeholder="បញ្ចូលអាសយដ្ឋានហាងរបស់អ្នក">
                </textarea>

                <InputError className="mt-2" message={errors.store_address}/>
              </div>
              <div className={"flex items-center gap-4"}>
                <PrimaryButton disabled={processing}>ធ្វើបច្ចុប្បន្នភាព</PrimaryButton>
              </div>
            </form>
            {/*<form action={route('stripe.connect')} method={'post'} className={'my-8'}>*/}
            {/*  <input type="hidden" name="_token" value={token}/>*/}
            {/*  {user.stripe_account_active && (*/}
            {/*    <div className={"text-center text-gray-600 my-4 text-sm"}>*/}
            {/*      អ្នកត្រូវបានភ្ជាប់ទៅកាន់គណនី Stripe របស់អ្នកដោយជោគជ័យ*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*  <button className="btn btn-success text-white text-sm w-full" disabled={user.stripe_account_active}>*/}
            {/*    ភ្ជាប់ទៅកាន់គណនី Stripe*/}
            {/*  </button>*/}
            {/*</form>*/}
          </>
        )}
      </div>
      <Modal show={showBecomeVendorConfirmation} onClose={closeModal}>
        <form onSubmit={becomeVendor} className='p-8'>
          <h2 className='text-lg font-medium font-khmer text-gray-900 dark:text-gray-100'>
            តើអ្នកប្រាកដថាចង់ក្លាយជាអ្នកលក់ទេ?
          </h2>
          <div className="mt-6 flex justify-end font-khmer">
            <SecondaryButton onClick={closeModal}>
              បោះបង់
            </SecondaryButton>

            <PrimaryButton className="ms-3" disabled={processing}>
              យល់ស្រប
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </section>
  );
}
