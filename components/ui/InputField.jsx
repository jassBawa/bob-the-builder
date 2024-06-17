import { Input } from "./Input";
import React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

function InputField({ name, label, className, placeholder }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input type="email" id={name} placeholder={placeholder} />
    </div>
  );
}

export default InputField;
