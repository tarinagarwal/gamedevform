import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ApplicationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  experienceFilter: string;
  onExperienceFilterChange: (value: string) => void;
}

export default function ApplicationFilters({
  searchTerm,
  onSearchChange,
  experienceFilter,
  onExperienceFilterChange,
}: ApplicationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search by name, email, or USN..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-gray-700 w-full"
        />
      </div>
      <Select
        value={experienceFilter}
        onValueChange={onExperienceFilterChange}
      >
        <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-gray-200">
          <SelectValue placeholder="Filter by experience" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all" className="text-gray-200">All Levels</SelectItem>
          <SelectItem value="Beginner" className="text-gray-200">Beginner</SelectItem>
          <SelectItem value="Intermediate" className="text-gray-200">Intermediate</SelectItem>
          <SelectItem value="Advanced" className="text-gray-200">Advanced</SelectItem>
          <SelectItem value="Can't Say" className="text-gray-200">Can't Say</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

