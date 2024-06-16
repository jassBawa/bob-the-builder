'use client';
import OfficerProfileForm from '@/components/forms/officer/officerProfileForm';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Edit2Icon } from 'lucide-react';
import { useState } from 'react';

function Page() {
  const [isEditMode, setIsEditMode] = useState(false);
  const profile = useCurrentUser('officer');

  const toggleEditMode = () => {
    setIsEditMode((val) => !val);
  };

  return (
    <div className="mt-8 mx-8 p-12 rounded bg-white min-h-full">
      <h3 className="relative group text-3xl font-semibold flex gap-2">
        Profile
        <Edit2Icon
          onClick={toggleEditMode}
          className="hover:opacity-100 opacity-10 cursor-pointer w-5 h-5"
        />
      </h3>

      {profile ? (
        <OfficerProfileForm
          profile={profile}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      ) : (
        <h3>loading</h3>
      )}
    </div>
  );
}

export default Page;
