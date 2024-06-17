
import {
  Table,
  TableBody,
  TableCaption,
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
import ReboundHammerGroundFloorForm from './floors/ReboundHammerGroundFloorForm';
import ReboundHammerFirstFloorForm from './floors/ReboundHammerFirstFloor';
import ReboundHammerSecondFloorForm from './floors/ReboundHammerSecondFloor';

function ReboundHammerForm() {
  
  return (
    <div>
      <div className="flex items-start">
        <h3 className="text-2xl font-semibold text-blue-500 flex items-start">
          Rebound Hammer (IS 516 Part 5, Section - 4)
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="ml-2 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center p-2 text-xs">
              i
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                The estimation of strength of concrete by rebound hammer method
                cannot be held to be very accurate & probale accuracy of
                prediction of concrete strength in a structure can be upto plus
                minus 25%
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-8 grid gap-8">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Floor level</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Strcutural Element</TableHead>
              <TableHead>Grade of concrete</TableHead>
              <TableHead>RH Test Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <ReboundHammerGroundFloorForm />
            </TableRow>
            <TableRow>
              <ReboundHammerFirstFloorForm />
            </TableRow>
            <TableRow>
              <ReboundHammerSecondFloorForm />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ReboundHammerForm;
