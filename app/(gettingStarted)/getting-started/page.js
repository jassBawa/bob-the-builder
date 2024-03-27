import GettingStartedForm from "@/components/forms/GettingStartedForm";
import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import React from "react";

function GettingStartedPage() {
  return (
    <div className="mt-8 mx-8 p-8 rounded bg-white">
      <h2 className="text-2xl font-semibold">General Information</h2>
      <p className="text-sm">List of officer’s accessed the portal</p>
      <GettingStartedForm />
    </div>
  );
}

export default GettingStartedPage;
