import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { PageProps } from '@/types';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

interface DefaultLayoutProps extends PageProps {
  children: React.ReactNode;
  title?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, title, auth }) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head title={title || 'アプリケーション'} />

      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </Link>
              </div>

              {/* <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <Link
                  href={route('dashboard')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${route().current('dashboard')
                    ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'
                    }`}
                >
                  Dashboard
                </Link>
              </div> */}
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                {auth.user ? (
                  <div className="flex items-center space-x-4">
                    <Link href={route('welcome')} className="text-gray-700">{auth.user.name}</Link>
                    <Link
                      href={route('reports.create', { username: auth.user.username })}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      新規報告
                    </Link>
                    <Dropdown>
                      <Dropdown.Trigger>
                        <button
                          className="p-2 rounded-md text-gray-900 border border-gray-500 hover:bg-gray-50 focus:outline-none"
                        >
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </button>
                      </Dropdown.Trigger>

                      <Dropdown.Content>
                        <Dropdown.Link href={route('dashboard')}>報告の管理</Dropdown.Link>
                        <Dropdown.Link href={route('welcome')}>お気に入り</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                          ログアウト
                        </Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                ) : (
                  <Link
                    href={route('login')}
                    className="text-sm text-gray-700 underline"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>


            {/* <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                {auth.user ? (
                  <div className="flex items-center space-x-4">
                    <Link href={route('welcome')} className="text-gray-700">{auth.user.name}</Link>
                    <Link
                      href={route('reports.create', { username: auth.user.username })}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      新規報告
                    </Link>
                    <button
                      onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                      className="p-2 rounded-md text-gray-900 border border-gray-500 hover:bg-gray-50 focus:outline-none"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    {showingNavigationDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 top-full">
                        <Link
                          href={route('dashboard')}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          報告の管理
                        </Link>
                        <Link
                          href={route('home')}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          お気に入り
                        </Link>
                        <Link
                          href={route('logout')}
                          method="post"
                          as="button"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          ログアウト
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={route('login')}
                    className="text-sm text-gray-700 underline"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div> */}

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href={route('dashboard')}
              className={`block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium transition duration-150 ease-in-out ${route().current('dashboard')
                ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                }`}
            >
              Dashboard
            </Link>
          </div>

          {auth.user && (
            <div className="pt-4 pb-1 border-t border-gray-200">
              <div className="px-4">
                <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
              </div>

              <div className="mt-3 space-y-1">
                <Link
                  href={route('profile.edit')}
                  className="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition duration-150 ease-in-out"
                >
                  Profile
                </Link>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition duration-150 ease-in-out"
                >
                  Log Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );

};

export default DefaultLayout;
