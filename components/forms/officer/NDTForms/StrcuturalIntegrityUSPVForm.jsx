import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import IntegrityUSPVFirstFloorForm from './floors/IntegrityUSPVFirstFloorForm';
import IntegrityUSPVGroundFloorForm from './floors/IntegrityUSPVGroundFloorForm';
import IntegrityUSPVSecondFloorForm from './floors/IntegrityUSPVSecondFloorForm';

export const staticOptions = [
  'Beam',
  'Slab',
  'Column',
  'Chajja',
  'Plaster',
  'Wall',
];

export const gradeOptions = ['Good', 'Bad', 'Fair'];

function StrcuturalIntegrityUSPVForm() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-500">
        Ultrasonic Pulse Velocity (IS 516 Part 5, Section 1)
      </h2>
      <div className="">
        <div className="mt-8 grid gap-8">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Floor level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Strcutural Element</TableHead>
                <TableHead>Grade of concrete</TableHead>
                <TableHead>Probing method</TableHead>
                <TableHead>Ultrasonic Pulse Velocity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <IntegrityUSPVGroundFloorForm />
              </TableRow>
              <TableRow>
                <IntegrityUSPVFirstFloorForm />
              </TableRow>
              <TableRow>
                <IntegrityUSPVSecondFloorForm />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default StrcuturalIntegrityUSPVForm;
