import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddBuildingForm from "../forms/AddBuildingForm";
import { useState } from "react";

export function DialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTrigger asChild>
        <Button className="mt-4" onClick={handleOpen}>
          Add building
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1025px]">
        <DialogHeader>
          <DialogTitle>Add building</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <AddBuildingForm onClose={handleClose} />
        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
