import React, {FormEventHandler, useState} from 'react';
import {Link, useForm, usePage} from "@inertiajs/react";
import MiniCArtDropdown from "@/Components/App/MiniCArtDropdown";
import {PageProps} from "@/types";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon, UserPlusIcon
} from "@heroicons/react/24/outline";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid";

function Navbar() {
  const {auth, departments, keyword} = usePage<PageProps>().props;
  const {user} = auth;
  const [menuOpen, setMenuOpen] = useState(false);

  const searchForm = useForm<{ keyword: string }>({
    keyword: keyword || '',
  });

  const {url} = usePage();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    searchForm.get(url, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar bg-base-100 lg:px-24">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl text-gray-800 dark:text-gray-200">
            BuiltByDarachhat
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost">
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-4">
          <form onSubmit={onSubmit} className="join flex-1 px-4">
            <input
              value={searchForm.data.keyword}
              onChange={(e) => searchForm.setData('keyword', e.target.value)}
              className="input input-bordered join-item w-full"
              placeholder="ស្វែងរកផលិតផល"
            />
            <button className="btn join-item">
              <MagnifyingGlassIcon className="w-4 h-4" />
              ស្វែងរក
            </button>
          </form>

          <MiniCArtDropdown />

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-online">
                <div className="w-10 rounded-full">
                  <img alt="Profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKNwJz-vhaZVskyf7rLnoAVlsZSQz7oYkA4XrR_-PD53HLb1-UT2IC4q6V-s_rmPrelMo&usqp=CAU" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                <li><Link href={route('profile.edit')} className="font-khmer flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"><UserCircleIcon className="w-5 h-5 text-gray-700" />
                  <span>ប្រវត្តិរូប</span></Link></li>
                <li><Link href={route('logout')} method="post" as="button" className="font-khmer flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"><ArrowLeftOnRectangleIcon className="w-5 h-5" />
                  <span>ចេញ</span></Link></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href={route("login")} className="btn mx-2 text-green-600 font-khmer"><ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>ចូល</span></Link>
              <Link href={route("register")} className="btn bg-green-600 hover:bg-green-400 flex items-center gap-2 text-white font-khmer">
                <UserPlusIcon className="w-5 h-5" />
                <span>ចុះឈ្មោះ</span></Link>
            </>
          )}
        </div>
      </div>

      {/* Departments Menu */}
      <div className="navbar bg-base-100 border-t min-h-4 lg:px-24">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 py-0">
            {departments.map((department) => (
              <li key={department.id}>
                <Link href={route('product.byDepartment', department.slug)}>{department.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 bg-base-100 shadow z-50">
          <form onSubmit={onSubmit} className="join w-full my-2">
            <input
              value={searchForm.data.keyword}
              onChange={(e) => searchForm.setData('keyword', e.target.value)}
              className="input input-bordered join-item w-full"
              placeholder="ស្វែងរកផលិតផល"
            />
            <button className="btn join-item">
              <MagnifyingGlassIcon className="w-4 h-4" />
              ស្វែងរក
            </button>
          </form>

          {/* Mini Cart for Mobile */}
          <div className="mt-4">
            <MiniCArtDropdown />
          </div>

          <ul className="menu menu-vertical">
            {departments.map((department) => (
              <li key={department.id}>
                <Link className={"hover:bg-green-600 text-green-600 font-khmer  active:bg-green-600 action:text-white "} href={route('product.byDepartment', department.slug)}>{department.name}</Link>
              </li>
            ))}
          </ul>


          {/* Auth Options */}
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <>
                <Link href={route('profile.edit')} className="btn btn-outline font-khmer">
                  <UserCircleIcon className="w-5 h-5 text-gray-700" />
                  <span>ប្រវត្តិរូប</span>
                </Link>
                <Link href={route('logout')} method="post" as="button" className="btn btn-error font-khmer">
                  ចាកចេញ
                </Link>
              </>
            ) : (
              <>
                <Link href={route("login")} className="btn text-green-600 font-khmer">ចូល</Link>
                <Link href={route("register")} className="btn bg-green-600 hover:bg-gray-100 hover:text-white text-white font-khmer">ចុះឈ្មោះ</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
