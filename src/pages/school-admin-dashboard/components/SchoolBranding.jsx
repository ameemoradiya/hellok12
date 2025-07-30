import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SchoolBranding = () => {
  const [brandingData, setBrandingData] = useState({
    schoolName: 'Riverside Elementary School',
    tagline: 'Excellence in Education',
    primaryColor: '#2563EB',
    secondaryColor: '#059669',
    accentColor: '#F59E0B',
    logoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800',
    address: '123 Education Street, Learning City, LC 12345',
    phone: '(555) 123-4567',
    email: 'info@riverside-elementary.edu',
    website: 'www.riverside-elementary.edu'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setBrandingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving branding data:', brandingData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const colorPresets = [
    { name: 'Blue Ocean', primary: '#2563EB', secondary: '#059669', accent: '#F59E0B' },
    { name: 'Forest Green', primary: '#059669', secondary: '#2563EB', accent: '#EF4444' },
    { name: 'Sunset Orange', primary: '#F59E0B', secondary: '#EF4444', accent: '#2563EB' },
    { name: 'Royal Purple', primary: '#7C3AED', secondary: '#059669', accent: '#F59E0B' }
  ];

  const applyColorPreset = (preset) => {
    setBrandingData(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">School Branding</h2>
            <p className="text-sm text-muted-foreground">Customize your school's appearance and identity</p>
          </div>
          
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="default" size="sm" iconName="Edit" iconPosition="left" iconSize={16} onClick={() => setIsEditing(true)}>
                Edit Branding
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">School Information</h3>
              <div className="space-y-4">
                <Input
                  label="School Name"
                  type="text"
                  value={brandingData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  disabled={!isEditing}
                />
                
                <Input
                  label="Tagline"
                  type="text"
                  value={brandingData.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                  disabled={!isEditing}
                  description="A short phrase that represents your school's mission"
                />
                
                <Input
                  label="Address"
                  type="text"
                  value={brandingData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    type="tel"
                    value={brandingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    value={brandingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <Input
                  label="Website"
                  type="url"
                  value={brandingData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Logo and Banner Upload */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Visual Assets</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">School Logo</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                      {brandingData.logoUrl ? (
                        <img 
                          src={brandingData.logoUrl} 
                          alt="School Logo"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      ) : (
                        <Icon name="Image" size={24} color="var(--color-muted-foreground)" />
                      )}
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm" iconName="Upload" iconPosition="left" iconSize={16}>
                        Upload Logo
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Banner Image</label>
                  <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                    {brandingData.bannerUrl ? (
                      <img 
                        src={brandingData.bannerUrl} 
                        alt="School Banner"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="Image" size={32} color="var(--color-muted-foreground)" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm" iconName="Upload" iconPosition="left" iconSize={16} className="mt-2">
                      Upload Banner
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Color Scheme */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Color Scheme</h3>
              
              {/* Color Presets */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Quick Presets</label>
                <div className="grid grid-cols-2 gap-3">
                  {colorPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => isEditing && applyColorPreset(preset)}
                      disabled={!isEditing}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted transition-micro disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex space-x-1">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <span className="text-sm text-foreground">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={brandingData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      disabled={!isEditing}
                      className="w-12 h-10 border border-border rounded-lg disabled:opacity-50"
                    />
                    <Input
                      type="text"
                      value={brandingData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Secondary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={brandingData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      disabled={!isEditing}
                      className="w-12 h-10 border border-border rounded-lg disabled:opacity-50"
                    />
                    <Input
                      type="text"
                      value={brandingData.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Accent Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={brandingData.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      disabled={!isEditing}
                      className="w-12 h-10 border border-border rounded-lg disabled:opacity-50"
                    />
                    <Input
                      type="text"
                      value={brandingData.accentColor}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Preview</h3>
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: brandingData.primaryColor }}
                  >
                    <Icon name="GraduationCap" size={16} color="white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{brandingData.schoolName}</h4>
                    <p className="text-sm text-muted-foreground">{brandingData.tagline}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <div 
                    className="px-3 py-1 rounded-lg text-white text-sm"
                    style={{ backgroundColor: brandingData.primaryColor }}
                  >
                    Primary
                  </div>
                  <div 
                    className="px-3 py-1 rounded-lg text-white text-sm"
                    style={{ backgroundColor: brandingData.secondaryColor }}
                  >
                    Secondary
                  </div>
                  <div 
                    className="px-3 py-1 rounded-lg text-white text-sm"
                    style={{ backgroundColor: brandingData.accentColor }}
                  >
                    Accent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolBranding;