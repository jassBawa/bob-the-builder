import {create} from 'zustand';

const useMultiForm = create((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  // Add other form fields and their update functions here as needed
}));

export default useMultiForm;
