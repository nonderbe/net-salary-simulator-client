import React from 'react';
import { useTranslation } from 'react-i18next';

function BenefitsSelector({ benefits, setBenefits }) {
  const { t } = useTranslation();

  const handleBenefitChange = (benefit, field, value) => {
    setBenefits((prev) => ({
      ...prev,
      [benefit]: { ...prev[benefit], [field]: value },
    }));
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center mb-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={benefits.companyCar.active}
            onChange={(e) => handleBenefitChange('companyCar', 'active', e.target.checked)}
            className="form-checkbox text-secondary"
          />
          <span className="text-gray-700 font-medium">{t('company_car')}</span>
        </label>
        {benefits.companyCar.active && (
          <div className="mt-4 space-y-3">
            <label className="block">
              {t('catalog_value')}
              <input
                type="number"
                value={benefits.companyCar.catalogValue}
                onChange={(e) => handleBenefitChange('companyCar', 'catalogValue', Number(e.target.value))}
                min="10000"
                className="mt-1 w-full p-2 border rounded focus:ring-secondary focus:border-secondary"
              />
            </label>
            <label className="block">
              {t('co2_emissions')}
              <input
                type="number"
                value={benefits.companyCar.co2}
                onChange={(e) => handleBenefitChange('companyCar', 'co2', Number(e.target.value))}
                min="0"
                className="mt-1 w-full p-2 border rounded focus:ring-secondary focus:border-secondary"
              />
            </label>
            <label className="block">
              {t('lease_cost')}
              <input
                type="number"
                value={benefits.companyCar.leaseCost}
                onChange={(e) => handleBenefitChange('companyCar', 'leaseCost', Number(e.target.value))}
                min="0"
                className="mt-1 w-full p-2 border rounded focus:ring-secondary focus:border-secondary"
              />
            </label>
            <label className="block">
              {t('fuel_type')}
              <select
                value={benefits.companyCar.fuelType}
                onChange={(e) => handleBenefitChange('companyCar', 'fuelType', e.target.value)}
                className="mt-1 w-full p-2 border rounded focus:ring-secondary focus:border-secondary"
              >
                <option value="diesel">{t('diesel')}</option>
                <option value="petrol">{t('petrol')}</option>
                <option value="electric">{t('electric')}</option>
              </select>
            </label>
          </div>
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={benefits.bicycle.active}
            onChange={(e) => handleBenefitChange('bicycle', 'active', e.target.checked)}
            className="form-checkbox text-secondary"
          />
          <span className="text-gray-700 font-medium">{t('bicycle')}</span>
        </label>
        {benefits.bicycle.active && (
          <label className="block mt-4">
            {t('lease_cost')}
            <input
              type="number"
              value={benefits.bicycle.leaseCost}
              onChange={(e) => handleBenefitChange('bicycle', 'leaseCost', Number(e.target.value))}
              min="0"
              className="mt-1 w-full p-2 border rounded focus:ring-secondary focus:border-secondary"
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default BenefitsSelector;
