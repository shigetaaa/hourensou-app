import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth }) {
  return (
    <AuthenticatedLayout user={auth, user}>
      <Head title="Reports" />
      <div>
        <h1>Hello! This is Reports/Index components</h1>
      </div>
    </AuthenticatedLayout>
  );
}
