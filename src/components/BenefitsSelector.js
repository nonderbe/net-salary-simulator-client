import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function BenefitsSelector({ benefits, setBenefits }) {
  const { t } = useTranslation();
  const [leaseCostError, setLeaseCostError] = useState('');

  const handleBenefitChange = (benefit, field, value) => {
    if (benefit === 'companyCar' && field === 'leaseCost') {
      const numValue = Number(value);
      if (numValue < 0) {
        setLeaseCostError(t('benefitsSelector.leaseCostError'));
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
          {t('benefitsSelector.companyCar')}
        </label>
        {benefits.companyCar.active && (
          <div className="mt-4 space-y-3">
            <label className="block">
              {t('benefitsSelector.leaseCost')}:
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
              {t('benefitsSelector.catalogValue')}:
              <input
                type="number"
                value={benefits.companyCar.catalogValue}
                onChange={(e) => handleBenefitChange('companyCar', 'catalogValue', Number(e.target.value))}
                min="10000"
              />
            </label>
            <label className="block">
              {t('benefitsSelector.co2')}:
              <input
                type="number"
                value={benefits.companyCar.co2}
                onChange={(e) => handleBenefitChange('companyCar', 'co2', Number(e.target.value))}
                min="0"
              />
            </label>
            <label className="block">
              {t('benefitsSelector.fuelType')}:
              <select
                value={benefits.companyCar.fuelType}
                onChange={(e) => handleBenefitChange('companyCar', 'fuelType', e.target.value)}
              >
                <option value="diesel">{t('benefitsSelector.fuelTypes.diesel')}</option>
                <option value="petrol">{t('benefitsSelector.fuelTypes.petrol')}</option>
                <option value="electric">{t('benefitsSelector.fuelTypes.electric')}</option>
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
          {t('benefitsSelector.bicycle')}
        </label>
        {benefits.bicycle.active && (
          <label className="block mt-4">
            {t('benefitsSelector.leaseCost')}:
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
