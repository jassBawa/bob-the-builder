import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import HalfCellGroundFloorForm from './floors/HalfCellGroundFloor';
import HalfCellFirstFloorForm from './floors/HalfCellFirstFloor';
import HalfCellSecondFloorForm from './floors/HalfCellSecondFloor';

function HalfCellPotentialForm() {
  return (
    <div>
      <div className="flex items-start">
        <h3 className="text-2xl font-semibold text-blue-500 flex items-start">
          Half Cell Potential (IS 516 Part 5, Section - 4)
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="ml-2 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center p-2 text-xs">
              i
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
               All measured potential values are negative.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-8 grid gap-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Floor level</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Structural Element</TableHead>
              <TableHead>Grade of concrete</TableHead>
              <TableHead>Spacing (in mm)</TableHead>
              <TableHead>Measure Potential (in mm)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <HalfCellGroundFloorForm />
            </TableRow>
            <TableRow>
              <HalfCellFirstFloorForm />
            </TableRow>
            <TableRow>
              <HalfCellSecondFloorForm />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default HalfCellPotentialForm;
