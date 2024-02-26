import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { DeleteIcon, Edit2Icon, EditIcon, Trash2 } from "lucide-react";
import React from "react";

function Page() {
  const list = [1, 2, 3, 4];
  return (
    <div className="mt-8 mx-8 p-12 rounded bg-white h-full">
      <h3 className="text-3xl font-semibold">Profile</h3>

      <div className="mt-12 grid gap-4 grid-cols-3">
        <InputField
          label={"Company name"}
          name={"companyName"}
          placeholder={"Company name"}
          className={"col-span-2"}
        />
        <InputField
          label={"Office Number"}
          name={"officeNumber"}
          placeholder={"Enter Office Number"}
          className={""}
        />
        <InputField
          label={"Registred Office Address"}
          name={"officeAddress"}
          placeholder={"Enter office address"}
          className={"col-span-2"}
        />
        <InputField
          label={"Alternative office number"}
          name={"alternativeOfficeNumber"}
          placeholder={"91 XXXX XXXX"}
          className={""}
        />
        <InputField label={"City"} name="city" placeholder={"City"} />
        <InputField
          label={"Country"}
          name={"country"}
          className={""}
          placeholder={"Country"}
        />
      </div>
      <div className="mt-4">
        <p className="">Name of the buildings</p>

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
        <Button className="mt-4 px-12">Edit</Button>
      </div>
    </div>
  );
}

export default Page;
