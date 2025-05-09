import React, { useState } from 'react';

function BenefitsSelector({ benefits, setBenefits }) {
  const [leaseCostError, setLeaseCostError] = useState('');

  const handleBenefitChange = (benefit, field, value) => {
    if (benefit === 'companyCar' && field === 'leaseCost') {
      const numValue = Number(value);
      if (numValue < 0) {
        setLeaseCostError('Lease cost must be non-negative.');
        return;
      } else {
        setLeaseCostError('');
      }
    }
    setBenefits((prev) => ({
      ...prev,
      [benefit]: { ...prev[benefit], [field]: value },
    }));
  };

  return (
    <div className="benefits-selector">
      <div className="benefit-item">
        <label>
          <input
            type="checkbox"
            checked={benefits.companyCar.active}
            onChange={(e) => handleBenefitChange('companyCar', 'active', e.target.checked)}
          />
          Company Car
        </label>
        {benefits.companyCar.active && (
          <div className="mt-4 space-y-3">
            <label className="block">
              Monthly Lease Cost (€):
              <input
                type="number"
                value={benefits.companyCar.leaseCost}
                onChange={(e) => handleBenefitChange('companyCar', 'leaseCost', Number(e.target.value))}
                min="0"
                className={leaseCostError ? 'error' : ''}
              />
              {leaseCostError && <p className="error-message">{leaseCostError}</p>}
            </label>
            <label className="block">
              Catalog Value (€):
              <input
                type="number"
                value={benefits.companyCar.catalogValue}
                onChange={(e) => handleBenefitChange('companyCar', 'catalogValue', Number(e.target.value))}
                min="10000"
              />
            </label>
            <label className="block">
              CO2 Emissions (g/km):
              <input
                type="number"
                value={benefits.companyCar.co2}
                onChange={(e) => handleBenefitChange('companyCar', 'co2', Number(e.target.value))}
                min="0"
              />
            </label>
            <label className="block">
              Fuel Type:
              <select
                value={benefits.companyCar.fuelType}
                onChange={(e) => handleBenefitChange('companyCar', 'fuelType', e.target.value)}
              >
                <option value="diesel">Diesel</option>
                <option value="petrol">Petrol</option>
                <option value="electric">Electric</option>
              </select>
            </label>
          </div>
        )}
      </div>
      <div className="benefit-item">
        <label>
          <input
            type="checkbox"
            checked={benefits.bicycle.active}
            onChange={(e) => handleBenefitChange('bicycle', 'active', e.target.checked)}
          />
          Company Bicycle
        </label>
        {benefits.bicycle.active && (
          <label className="block mt-4">
            Monthly Lease Cost (€):
            <input
              type="number"
              value={benefits.bicycle.leaseCost}
              onChange={(e) => handleBenefitChange('bicycle', 'leaseCost', Number(e.target.value))}
              min="0"
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default BenefitsSelector;
