import React from 'react';
import { useTranslation } from 'react-i18next';

function SalaryOutput({ initialSalary, adjustedSalary }) {
  const { t } = useTranslation();

  if (!initialSalary || !adjustedSalary) {
    return <p className="text-gray-600">{t('no_data')}</p>;
  }

  const categories = [
    {
      label: t('employer_cost'),
      isCategory: true,
      subcategories: [
        {
          label: t('lease_price'),
          key: 'leasePrice',
          conditional: true,
          getValue: (salary) => (salary.leasePrice ? `€${salary.leasePrice.toFixed(2)}` : '-'),
        },
        {
          label: t('disallowed_expense_tax'),
          key: 'disallowedExpenseTax',
          conditional: true,
          adjustedOnly: true,
        },
        {
          label: t('employer_social_security'),
          key: 'employerSocialSecurity',
        },
      ],
    },
    {
      label: t('gross_salary_label'),
      isCategory: true,
      subcategories: [
        { label: t('benefit_in_kind'), key: 'benefitInKind', conditional: true },
        { label: t('withholding_tax'), key: 'withholdingTax' },
      ],
    },
    {
      label: t('net_salary'),
      isCategory: true,
      subcategories: [
        {
          label: t('extralegal_benefits'),
          key: 'extralegalBenefits',
          getValue: (salary) =>
            salary.extralegalBenefits.length > 0
              ? salary.extralegalBenefits.map((b) => t(b)).join(', ')
              : '-',
        },
        { label: t('net_salary'), key: 'netSalary' },
        { label: t('net_salary_change'), key: 'netSalaryChange', adjustedOnly: true },
      ],
    },
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
          {categories.map(({ label, isCategory, subcategories }, index) => (
            <React.Fragment key={label}>
              <tr
                className={`${
                  isCategory ? 'bg-blue-100 text-primary font-bold' : 'text-gray-600'
                } border-b hover:bg-gray-50 transition`}
              >
                <td className="p-3">{isCategory ? label : <span className="pl-4">{label}</span>}</td>
                <td className="p-3 text-right">
                  {isCategory
                    ? `€${initialSalary[subcategories.find((s) => s.key === (isCategory ? 'employerCost' : subcategories[0].key)).key].toFixed(2)}`
                    : '-'}
                </td>
                <td className="p-3 text-right font-medium">
                  {isCategory
                    ? `€${adjustedSalary[subcategories.find((s) => s.key === (isCategory ? 'employerCost' : subcategories[0].key)).key].toFixed(2)}`
                    : '-'}
                </td>
                <td className="p-3 text-right">
                  {isCategory && subcategories[0].key !== 'netSalary' ? '-' : ''}
                </td>
              </tr>
              {subcategories.map(({ label, key, conditional, adjustedOnly, getValue }) => {
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
                    <td className="p-3 pl-6 text-gray-600">{label}</td>
                    <td className="p-3 text-right">
                      {getValue
                        ? getValue(initialSalary)
                        : initialValue !== null
                        ? `€${initialValue.toFixed(2)}`
                        : '-'}
                    </td>
                    <td className="p-3 text-right font-medium">
                      {getValue
                        ? getValue(adjustedSalary)
                        : adjustedValue
                        ? `€${adjustedValue.toFixed(2)}`
                        : '-'}
                    </td>
                    <td className="p-3 text-right">
                      {difference !== 0 && !getValue ? (
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalaryOutput;
