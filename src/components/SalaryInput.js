import React from 'react';
import { useTranslation } from 'react-i18next';

function SalaryInput({ grossSalary, setGrossSalary }) {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <label>
        {t('salaryInput.grossSalary')}:
        <input
          type="number"
          value={grossSalary}
          onChange={(e) => setGrossSalary(Number(e.target.value))}
          min="0"
          step="100"
        />
      </label>
      <p>{t('salaryInput.maritalStatus')}</p>
      <p>{t('salaryInput.dependents')}</p>
    </div>
  );
}

export default SalaryInput;
