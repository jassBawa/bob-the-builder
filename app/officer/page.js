'use client';
import OrganisationLists from '@/components/officer/OrganisationLists';
import useCurrentUser from '@/hooks/useCurrentUser';
import useOrganisationStore from '@/hooks/useOrganisations';
import React, { useEffect } from 'react';

function OfficerPage() {
  const currentUser = useCurrentUser('officer');
  const { isLoading, organisations, fetchOrganisations } =
    useOrganisationStore();
  // console.log(organisations);

  useEffect(() => {
    fetchOrganisations();
  }, [fetchOrganisations]);
  return (
    <>
      <div className="mt-16 mx-8 p-8 rounded bg-white">
        <h2 className="text-2xl font-semibold">
          Welcome back, {currentUser?.name}
        </h2>
        <p className="text-sm">Track and Manage your information</p>
      </div>
      <div className="mt-4 mx-8 p-8 rounded bg-white">
        YOUR EMAIL <h1 className="text-4xl font-bold">{currentUser?.email}</h1>
        <OrganisationLists organisations={organisations} />
      </div>
    </>
  );
}

export default OfficerPage;
