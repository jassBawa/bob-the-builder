import Link from 'next/link';
import React from 'react';

function OrganisationLists({ organisations }) {
  if (organisations.length === 0) {
    return <h3>No list of organisations found</h3>;
  }
  return (
    <div className="mt-12">
      <h3 className="text-3xl font-semibold mb-4">List of organisations</h3>
      <div className='flex flex-col gap-4'>
      {organisations?.map((org) => {
        return (
          <Link
            href={`/officer/${org.id}`}
            target="_blank"
            className="bg-slate-200 block w-full py-2 px-8 rounded text-xl"
            key={org.id}
          >
            Name: {org.name}
          </Link>
        );
      })}</div>
    </div>
  );
}

export default OrganisationLists;
