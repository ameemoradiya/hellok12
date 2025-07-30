import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SchoolSelector = ({ selectedSchool, onSchoolChange, className = '' }) => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch schools
    const fetchSchools = async () => {
      setLoading(true);
      // Mock data for available schools
      const mockSchools = [
        {
          value: 'riverside-elementary',
          label: 'Riverside Elementary School',
          description: 'K-5 • 450 students'
        },
        {
          value: 'oakwood-middle',
          label: 'Oakwood Middle School',
          description: '6-8 • 680 students'
        },
        {
          value: 'summit-high',
          label: 'Summit High School',
          description: '9-12 • 1200 students'
        },
        {
          value: 'international-academy',
          label: 'International Language Academy',
          description: 'K-12 • 320 students'
        },
        {
          value: 'greenfield-prep',
          label: 'Greenfield Preparatory',
          description: 'K-12 • 280 students'
        }
      ];
      
      setTimeout(() => {
        setSchools(mockSchools);
        setLoading(false);
      }, 1000);
    };

    fetchSchools();
  }, []);

  return (
    <div className={className}>
      <Select
        label="Select Your School"
        description="Choose your school to access the platform"
        placeholder="Search for your school..."
        options={schools}
        value={selectedSchool}
        onChange={onSchoolChange}
        loading={loading}
        searchable
        required
        className="w-full"
      />
      
      {!loading && schools.length === 0 && (
        <div className="mt-2 p-3 bg-muted rounded-lg flex items-center space-x-2">
          <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
          <span className="text-sm text-muted-foreground">
            No schools found. Contact support for assistance.
          </span>
        </div>
      )}
    </div>
  );
};

export default SchoolSelector;