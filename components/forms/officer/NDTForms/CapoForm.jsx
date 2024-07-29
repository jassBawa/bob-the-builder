import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CapoGroundFloor from './floors/CapoGroundFloor';
import CapoFirstFloor from './floors/CapoFirstFloor';
import CapoSecondFloor from './floors/CapoSecondFloor';

function CapoForm() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-blue-500">
          Cut And Pullout Test (ASTM C900) - 06
        </h2>
        <p className="text-red-400">
          {' '}
          * As per IS:456 - 2000 , minimum grade of concrete specify for
          structural memmbers are M20
        </p>
      </div>
      <div className="">
        <div className="mt-8 grid gap-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Floor level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Structural Element</TableHead>
                <TableHead>Assume Grade Of Concrete</TableHead>
                <TableHead>Cube Compressive Strength</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <CapoGroundFloor />
              </TableRow>
              <TableRow>
                <CapoFirstFloor />
              </TableRow>
              <TableRow>
                <CapoSecondFloor />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default CapoForm;
