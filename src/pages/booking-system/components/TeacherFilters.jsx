import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const TeacherFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'mandarin', label: 'Mandarin' },
    { value: 'japanese', label: 'Japanese' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Teachers' },
    { value: 'available', label: 'Available Now' },
    { value: 'today', label: 'Available Today' },
    { value: 'this-week', label: 'Available This Week' }
  ];

  const experienceOptions = [
    { value: 'all', label: 'Any Experience' },
    { value: '1-2', label: '1-2 Years' },
    { value: '3-5', label: '3-5 Years' },
    { value: '5+', label: '5+ Years' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'Any Rating' },
    { value: '4+', label: '4+ Stars' },
    { value: '4.5+', label: '4.5+ Stars' },
    { value: '4.8+', label: '4.8+ Stars' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== 'all' && value !== '' && value !== false
  );

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filter Teachers</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Subject Filter */}
        <Select
          label="Subject"
          options={subjectOptions}
          value={filters.subject}
          onChange={(value) => handleFilterChange('subject', value)}
        />

        {/* Availability Filter */}
        <Select
          label="Availability"
          options={availabilityOptions}
          value={filters.availability}
          onChange={(value) => handleFilterChange('availability', value)}
        />

        {/* Experience Filter */}
        <Select
          label="Experience"
          options={experienceOptions}
          value={filters.experience}
          onChange={(value) => handleFilterChange('experience', value)}
        />

        {/* Rating Filter */}
        <Select
          label="Minimum Rating"
          options={ratingOptions}
          value={filters.rating}
          onChange={(value) => handleFilterChange('rating', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Price Range ($/hour)</label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              className="flex-1"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Search */}
        <Input
          label="Search Teachers"
          type="search"
          placeholder="Search by name or specialization..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      {/* Additional Filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Additional Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Checkbox
            label="Native Speaker"
            checked={filters.nativeSpeaker}
            onChange={(e) => handleFilterChange('nativeSpeaker', e.target.checked)}
          />
          <Checkbox
            label="Certified Teacher"
            checked={filters.certified}
            onChange={(e) => handleFilterChange('certified', e.target.checked)}
          />
          <Checkbox
            label="Group Sessions Available"
            checked={filters.groupSessions}
            onChange={(e) => handleFilterChange('groupSessions', e.target.checked)}
          />
          <Checkbox
            label="Package Discounts"
            checked={filters.packageDiscounts}
            onChange={(e) => handleFilterChange('packageDiscounts', e.target.checked)}
          />
          <Checkbox
            label="Trial Session Available"
            checked={filters.trialSession}
            onChange={(e) => handleFilterChange('trialSession', e.target.checked)}
          />
          <Checkbox
            label="Weekend Availability"
            checked={filters.weekendAvailable}
            onChange={(e) => handleFilterChange('weekendAvailable', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherFilters;