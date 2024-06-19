'use client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useNdtStore from '@/hooks/useNdtData';
import { uploadImages } from '@/lib/uploadToFirebase';

const staticOptions = ['beam', 'slab', 'column', 'footing'];

function CarbonationForm() {
  const { updateChemicalAttack } = useNdtStore();

  // Example usage

  const handleChange = (val, field) => {
    console.log(val);
    updateChemicalAttack(field, val);
  };

  const handlePhoto = async (event) => {
    const { files } = event.target;

    console.log(files);
    if (files.length > 0) {
      uploadImages(files[0]).then((url) => {
        console.log(url);

        return updateChemicalAttack('captionPhoto', url);
      });
    }
  };

  return (
    <div>
      <div className="flex items-start">
        <h3 className="text-2xl font-semibold text-blue-500 flex items-start">
          Carbonation (IS 516 Part 5, Section - 3)
        </h3>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-8">
        <div>
          <Label>Structural element</Label>
          <Select onValueChange={(e) => handleChange(e, 'element')}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {staticOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Grade of concrete</Label>
          <Select onValueChange={(e) => handleChange(e, 'grade')}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'M10'}>M10</SelectItem>
              <SelectItem value={'M15'}>M15</SelectItem>
              <SelectItem value={'M20'}>M20</SelectItem>
              <SelectItem value={'M25'}>M25</SelectItem>
              <SelectItem value={'M30'}>M30</SelectItem>
              <SelectItem value={'M35'}>M35</SelectItem>
              <SelectItem value={'M40'}>M40</SelectItem>
              <SelectItem value={'M45'}>M45</SelectItem>
              <SelectItem value={'M50'}>M50</SelectItem>
              <SelectItem value={'M55'}>M55</SelectItem>
              <SelectItem value={'M60'}>M60</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Floor</Label>
          <Select onValueChange={(e) => handleChange(e, 'floor')}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'ground'}>ground</SelectItem>
              <SelectItem value={'first'}>first</SelectItem>
              <SelectItem value={'second'}>second</SelectItem>
              <SelectItem value={'third'}>third</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Location</Label>

          <Input
            placeholder="Location"
            onChange={(e) => handleChange(e.target.value, 'location')}
          />
        </div>
        <div>
          <Label>Mean carbonation depth</Label>

          <Input
            placeholder="...."
            onChange={(e) => handleChange(e.target.value, 'meanDepth')}
          />
        </div>
        <div>
          <Label>Age of Strucutural member</Label>

          <Input
            placeholder="...."
            onChange={(e) => handleChange(e.target.value, 'ageOfStrcutural')}
          />
        </div>
        <div>
          <Label>Caption/Photographs</Label>

          <Input type="file" onChange={handlePhoto}></Input>
        </div>
        <div>
          <Label>Remarks</Label>

          <Input
            placeholder="...."
            onChange={(e) => handleChange(e.target.value, 'remarks')}
          />
        </div>
      </div>
    </div>
  );
}

export default CarbonationForm;
