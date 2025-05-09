import React from 'react';
import { useTranslation } from 'react-i18next';

function SalaryInput({ grossSalary, setGrossSalary }) {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">
        {t('gross_salary')}
        <input
          type="number"
          value={grossSalary}
          onChange={(e) => setGrossSalary(Number(e.target.value))}
          min="0"
          step="100"
          className="mt-1 w-full p-2 border rounded focus:ring-secondary focus:border-secondary"
        />
      </label>
      <p className="text-gray-600">{t('marital_status')}</p>
      <p className="text-gray-600">{t('dependents')}</p>
    </div>
  );
}

export default SalaryInput;
