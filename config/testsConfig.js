import CapoForm from '@/components/forms/officer/NDTForms/CapoForm';
import CarbonationForm from '@/components/forms/officer/NDTForms/CarbonationForm';
import HalfCellPotentialForm from '@/components/forms/officer/NDTForms/HalfCellPotentialForm';
import ReboundHammer from '@/components/forms/officer/NDTForms/ReboundHammerForm';
import StrcuturalIntegrityUSPVForm from '@/components/forms/officer/NDTForms/StrcuturalIntegrityUSPVForm';
import USPVForm from '@/components/forms/officer/NDTForms/USPVForm';

// data.js
export const options = {
  'in situ concrete strength': [
    { name: 'Rebound Hammer', component: ReboundHammer },
    { name: 'UPV', component: USPVForm },
    { name: 'Capo', component: CapoForm },
  ],
  'chemical': [{ name: 'carbonation', component: CarbonationForm }],
  'corrosion': [
    { name: 'Half Cell Potential', component: HalfCellPotentialForm },
  ],
  'strucutralIntegrity': [{ name: 'UPV', component: StrcuturalIntegrityUSPVForm }],
};
