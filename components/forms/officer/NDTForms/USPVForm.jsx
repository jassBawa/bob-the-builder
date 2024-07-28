import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import USPVGroundFloorForm from './floors/USPVGroundFloorForm';
import USPVFirstFloorForm from './floors/USPVFirstFloorForm';
import USPVSecondFloorForm from './floors/USPVSecondFloorForm';

export const staticOptions = [
  'Beam',
  'Slab',
  'Column',
  'Chajja',
  'Plaster',
  'Wall',
];

export const gradeOptions = ['Good', 'Bad', 'Fair'];

function USPVForm() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-500">
        Ultrasonic Pulse Velocity (IS 516 Part 5, Section 1)
      </h2>
      <div className="">
        <div className="mt-8 grid gap-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Floor level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Structural Element</TableHead>
                <TableHead>Grade of concrete</TableHead>
                <TableHead>Probing method</TableHead>
                <TableHead>Ultrasonic Pulse Velocity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <USPVGroundFloorForm />
              </TableRow>
              <TableRow>
                <USPVFirstFloorForm />
              </TableRow>
              <TableRow>
                <USPVSecondFloorForm />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default USPVForm;
