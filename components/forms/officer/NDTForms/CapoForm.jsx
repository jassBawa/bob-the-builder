
import {
    Table,
    TableBody,
    TableCaption,
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
      <h2 className="text-2xl font-semibold text-blue-500">
        Cut And Pullout Test (ASTM C900)
      </h2>
      <div className="">
        <div className="mt-8 grid gap-8">
          <Table>
            <TableCaption>Captionhere.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Floor level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Strcutural Element</TableHead>
                <TableHead>Failure Load</TableHead>
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
