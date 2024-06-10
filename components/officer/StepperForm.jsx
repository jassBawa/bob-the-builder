"use client"
import React, { useState } from 'react';
import GeneralObservations from '../forms/officer/GeneralObservations';
import StructuralObservations from '../forms/officer/StructuralObservations';
import useMultiForm from '@/hooks/useMultiForm';

const MultiStepForm = () => {
  const {step} = useMultiForm();

  return (
    <div className="bg-white p-8 rounded-lg w-full mx-auto">
      <form>

        {step === 1 && <GeneralObservations />}
        {step === 2 && <StructuralObservations />}
      </form>
    </div>
  );
};

export default MultiStepForm;
