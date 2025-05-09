import React from 'react';
import { useTranslation } from 'react-i18next';

function SalaryOutput({ initialSalary, adjustedSalary }) {
  const { t } = useTranslation();

  if (!initialSalary || !adjustedSalary) {
    return <p className="text-gray-600">{t('no_data')}</p>;
  }

  const components = [
    { label: t('employer_cost'), key: 'employerCost' },
    { label: t('gross_salary_label'), key: 'grossSalary' },
    { label: t('benefit_in_kind'), key: 'benefitInKind', conditional: true },
    { label: t('social_security'), key: 'socialSecurity' },
    { label: t('withholding_tax'), key: 'withholdingTax' },
    { label: t('net_salary'), key: 'netSalary' },
    { label: t('disallowed_expense_tax'), key: 'disallowedExpenseTax', adjustedOnly: true, conditional: true },
    { label: t('net_salary_change'), key: 'netSalaryChange', adjustedOnly: true },
  ];

  return (
    <div className="overflow-x-auto fade-in">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-3 text-left">{t('component')}</th>
            <th className="p-3 text-right">{t('initial')}</th>
            <th className="p-3 text-right">{t('adjusted')}</th>
            <th className="p-3 text-right">{t('difference')}</th>
          </tr>
        </thead>
        <tbody>
          {components.map(({ label, key, conditional, adjustedOnly }) => {
            if (conditional && initialSalary[key] === 0 && adjustedSalary[key] === 0) {
              return null;
            }
            if (adjustedOnly && !adjustedSalary[key]) {
              return null;
            }
            const initialValue = adjustedOnly || initialSalary[key] === undefined ? null : initialSalary[key];
            const adjustedValue = adjustedSalary[key] || 0;
            const difference = adjustedOnly ? adjustedValue : adjustedValue - (initialValue || 0);

            return (
              <tr key={key} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 text-gray-700">{label}</td>
                <td className="p-3 text-right">
                  {initialValue !== null ? `€${initialValue.toFixed(2)}` : '-'}
                </td>
                <td className="p-3 text-right font-medium">
                  {adjustedValue ? `€${adjustedValue.toFixed(2)}` : '-'}
                </td>
                <td className="p-3 text-right">
                  {difference !== 0 ? (
                    <span
                      className={`font-semibold ${
                        difference > 0 ? 'text-accent' : 'text-danger'
                      }`}
                    >
                      {difference > 0 ? '+' : ''}€{difference.toFixed(2)}
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SalaryOutput;
