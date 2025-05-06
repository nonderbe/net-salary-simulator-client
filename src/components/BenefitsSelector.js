import React from 'react';

function BenefitsSelector({ benefits, setBenefits }) {
  const handleBenefitChange = (benefit, field, value) => {
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
            onChange={(e) =>
              handleBenefitChange('companyCar', 'active', e.target.checked)
            }
          />
          Company Car
        </label>
        {benefits.companyCar.active && (
          <div>
            <label>
              Catalog Value (€):
              <input
                type="number"
                value={benefits.companyCar.catalogValue}
                onChange={(e) =>
                  handleBenefitChange('companyCar', 'catalogValue', Number(e.target.value))
                }
                min="10000"
              />
            </label>
            <label>
              CO2 Emissions (g/km):
              <input
                type="number"
                value={benefits.companyCar.co2}
                onChange={(e) =>
                  handleBenefitChange('companyCar', 'co2', Number(e.target.value))
                }
                min="0"
              />
            </label>
            <label>
              Fuel Type:
              <select
                value={benefits.companyCar.fuelType}
                onChange={(e) =>
                  handleBenefitChange('companyCar', 'fuelType', e.target.value)
                }
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
            onChange={(e) =>
              handleBenefitChange('bicycle', 'active', e.target.checked)
            }
          />
          Company Bicycle
        </label>
        {benefits.bicycle.active && (
          <label>
            Monthly Lease Cost (€):
            <input
              type="number"
              value={benefits.bicycle.leaseCost}
              onChange={(e) =>
                handleBenefitChange('bicycle', 'leaseCost', Number(e.target.value))
              }
              min="0"
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default BenefitsSelector;
