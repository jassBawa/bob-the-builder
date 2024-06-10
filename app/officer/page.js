'use client';
import OrganisationLists from '@/components/officer/OrganisationLists';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import useCurrentUser from '@/hooks/useCurrentUser';
import useOrganisationStore from '@/hooks/useOrganisations';
import React, { useEffect } from 'react';

function OfficerPage() {
  const currentUser = useCurrentUser('officer');
  const { organisations, fetchOrganisations, setSearchTerm, isLoading, error } =
    useOrganisationStore();
  // console.log(organisations);

  useEffect(() => {
    fetchOrganisations();
  }, [fetchOrganisations]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    fetchOrganisations();
  };

  return (
    <>
      <div className="mt-16 mx-8 p-8 rounded bg-white">
        <h2 className="text-2xl font-semibold">
          Welcome back, {currentUser?.name}
        </h2>
        <p className="text-sm">Track and Manage your information</p>
      </div>
      <div className="mt-4 mx-8 p-8 rounded bg-white">
        <Label>Search for org</Label>
        <Input
          type="text"
          placeholder="Search organisations"
          onChange={handleSearch}
        />
        <div className='mt-8'>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        </div>
        <OrganisationLists organisations={organisations} />
      </div>
    </>
  );
}

export default OfficerPage;
