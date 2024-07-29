import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SelectProbingMethod = ({ onChange, value }) => {
  const handleChange = (newVal) => {
    onChange(newVal);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select Probing method" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={'direct transmition'}>Direct Transmition</SelectItem>
        <SelectItem value={'indirect transmition'}>
          Indirect Transmition
        </SelectItem>
        <SelectItem value={'semidirect transmition'}>
          Semidirect Transmition
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export const InputWithHelper = ({
  name,
  placeholder,
  value,
  grade,
  onChange,
}) => {
  const getHelperText = (grade, value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return '';

    if (grade && parseInt(grade.slice(1)) < 25) {
      if (numericValue < 3.5) return 'Doubtful';
      if (numericValue >= 3.5 && numericValue <= 4.5) return 'Good';
      return 'Excellent';
    } else {
      if (numericValue < 3.75) return 'Doubtful';
      if (numericValue >= 3.75 && numericValue <= 4.5) return 'Good';
      return 'Excellent';
    }
  };

  return (
    <div>
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p>{getHelperText(grade, value)}</p>
    </div>
  );
};
