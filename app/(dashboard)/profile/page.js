'use client';
import BuildingList from '@/components/dashboard/BuildingList';
import ProfileForm from '@/components/forms/ProfileForm';
import { DialogDemo } from '@/components/modals/DialogDemo';
import { Button } from '@/components/ui/button';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Edit2Icon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function Page() {
  const [isEditMode, setIsEditMode] = useState(false);
  const profile = useCurrentUser();

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
        <ProfileForm
          profile={profile}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      ) : (
        <h3>loading</h3>
      )}

      <div className="mt-4">
        <BuildingList />

        <Link href={'/addBuilding'}>
          <Button className="mt-4">Add building</Button>
        </Link>
        <DialogDemo />
      </div>
    </div>
  );
}

export default Page;
