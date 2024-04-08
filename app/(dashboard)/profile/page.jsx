"use client";
import ProfileForm from "@/components/forms/ProfileForm";
import { DialogDemo } from "@/components/modals/DialogDemo";
import useBuildings from "@/hooks/useBuildings";
import useProfile from "@/hooks/useProfile";
import { getOrganisationInfo } from "@/services/apiService";
import { Edit2Icon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { buildings, isLoading } = useBuildings();
  console.log(buildings);

  const list = [1, 1, 2];

  const toggleEditMode = () => {
    setIsEditMode((val) => !val);
  };

  return (
    <div className="mt-8 mx-8 p-12 rounded bg-white h-full">
      <h3 className="relative group text-3xl font-semibold flex gap-2">
        Profile
        <Edit2Icon
          onClick={toggleEditMode}
          className="hover:opacity-100 opacity-10 cursor-pointer w-5 h-5"
        />
      </h3>

      <ProfileForm isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

      <div className="mt-4">
        <p className="">Name of the buildings</p>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <ul className="building__container mt-4 rounded-lg max-w-lg w-full border">
            {list.map((item, index) => (
              <li key={index} className="flex items-center border-b py-2 px-4">
                <span>lorem Epsum</span>
                <div className="ml-auto flex gap-4">
                  <Edit2Icon className="opacity-40 w-5 h-5" />
                  <Trash2 className="opacity-40 w-5 h-5" />
                </div>
              </li>
            ))}
          </ul>
        )}

        <DialogDemo />
      </div>
    </div>
  );
}

export default Page;
