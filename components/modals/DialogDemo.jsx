import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import BuildingView from '../shared/BuildingView';

export function DialogDemo({ isOpen = false, setIsOpen, buildingData }) {
  console.log(buildingData);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent className="sm:max-w-[1025px] md:max-w-full w-full h-full">
        <DialogHeader>
          <DialogTitle>View building details</DialogTitle>
          <DialogDescription>
            you can view the submitted building details here
          </DialogDescription>
        </DialogHeader>

        <BuildingView building={buildingData} />
        <DialogTrigger>
          <Button onClick={handleClose}>Close</Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}
