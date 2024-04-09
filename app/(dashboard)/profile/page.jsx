"use client";
import BuildingList from "@/components/dashboard/BuildingList";
import ProfileForm from "@/components/forms/ProfileForm";
import { DialogDemo } from "@/components/modals/DialogDemo";
import useBuildings from "@/hooks/useBuildings";
import { Edit2Icon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  const [isEditMode, setIsEditMode] = useState(false);

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

      <ProfileForm isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

      <div className="mt-4">
        <BuildingList />

        <DialogDemo />
      </div>
    </div>
  );
}

export default Page;
