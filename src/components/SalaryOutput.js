import React from 'react';
import { useTranslation } from 'react-i18next';

function SalaryOutput({ initialSalary, adjustedSalary, period }) {
  const { t } = useTranslation();

  if (!initialSalary || !adjustedSalary) {
    console.log('SalaryOutput: initialSalary or adjustedSalary is null', { initialSalary, adjustedSalary });
    return <p>{t('salaryOutput.enterDetails')}</p>;
  }

  const requiredKeys = [
    'employerCost',
    'grossSalary',
    'netSalary',
    'employerSocialSecurity',
    'vacationPay',
    'yearEndBonus',
    'employeeSocialSecurity',
    'withholdingTax',
  ];

  const optionalKeys = [
    'leasePrice',
    'benefitInKind',
    'disallowedExpenseTax',
    'disallowedExpenseTaxCar',
    'solidarityContribution',
    'extralegalBenefits',
  ];

  const isValidSalary = (salary) => {
    const missingKeys = requiredKeys.filter((key) => !(key in salary));
    if (missingKeys.length > 0) {
      console.log('SalaryOutput: Invalid salary, missing keys:', missingKeys, salary);
      return false;
    }
    return true;
  };

  if (!isValidSalary(initialSalary) || !isValidSalary(adjustedSalary)) {
    console.log('SalaryOutput: Validation failed', { initialSalary, adjustedSalary });
    return <p>{t('salaryOutput.invalidData')}</p>;
  }

  const categories = [
    {
      label: t('salaryOutput.employerCost'),
      key: 'employerCost',
      isCategory: true,
      subcategories: [
        {
          label: t('salaryOutput.leasePrice'),
          key: 'leasePrice',
          conditional: true,
          getValue: (salary) => (salary.leasePrice ? `€${salary.leasePrice.toFixed(2)}` : '-'),
        },
        {
          label: t('salaryOutput.disallowedExpenseTax'),
          key: 'disallowedExpenseTax',
          conditional: true,
          adjustedOnly: true,
        },
        {
          label: t('salaryOutput.disallowedExpenseTaxCar'),
          key: 'disallowedExpenseTaxCar',
          conditional: true,
          adjustedOnly: true,
        },
        {
          label: t('salaryOutput.solidarityContribution'),
          key: 'solidarityContribution',
          conditional: true,
          adjustedOnly: true,
        },
        {
          label: t('salaryOutput.employerSocialSecurity'),
          key: 'employerSocialSecurity',
        },
        {
          label: t('salaryOutput.vacationPay'),
          key: 'vacationPay',
        },
        {
          label: t('salaryOutput.yearEndBonus'),
          key: 'yearEndBonus',
        },
      ],
    },
    {
      label: t('salaryOutput.grossSalary'),
      key: 'grossSalary',
      isCategory: true,
      subcategories: [
        {
          label: t('salaryOutput.employeeSocialSecurity'),
          key: 'employeeSocialSecurity',
        },
        {
          label: t('salaryOutput.benefitInKind'),
          key: 'benefitInKind',
          conditional: true,
        },
        {
          label: t('salaryOutput.withholdingTax'),
          key: 'withholdingTax',
        },
      ],
    },
    {
      label: t('salaryOutput.netSalary'),
      key: 'netSalary',
      isCategory: true,
      subcategories: [
        {
          label: t('salaryOutput.extralegalBenefits'),
          key: 'extralegalBenefits',
          getValue: (salary) =>
            salary.extralegalBenefits && salary.extralegalBenefits.length > 0
              ? salary.extralegalBenefits
                  .map((b) => t(`salaryOutput.benefits.${b}`))
                  .join(', ')
              : '-',
        },
      ],
    },
  ];

  return (
    <div className="salary-output">
      <table className="salary-table">
        <thead>
          <tr>
            <th>{t('salaryOutput.component')}</th>
            <th>{t('salaryOutput.initial')}</th>
            <th>{t('salaryOutput.adjusted')}</th>
            <th>{t('salaryOutput.difference')}</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ label, key, isCategory, subcategories }) => (
            <React.Fragment key={key}>
              <tr className={isCategory ? 'category' : ''}>
                <td>{label}</td>
                <td>{isCategory && initialSalary[key] !== undefined ? `€${initialSalary[key].toFixed(2)}` : '-'}</td>
                <td>{isCategory && adjustedSalary[key] !== undefined ? `€${adjustedSalary[key].toFixed(2)}` : '-'}</td>
                <td>
                  {isCategory && initialSalary[key] !== undefined && adjustedSalary[key] !== undefined ? (
                    <span
                      className={
                        adjustedSalary[key] - initialSalary[key] > 0
                          ? 'difference-positive'
                          : adjustedSalary[key] - initialSalary[key] < 0
                          ? 'difference-negative'
                          : ''
                      }
                    >
                      {adjustedSalary[key] - initialSalary[key] > 0 ? '+' : ''}€
                      {(adjustedSalary[key] - initialSalary[key]).toFixed(2)}
                    </span>
                  ) : (
                    '-'
                  )}
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
                  <tr key={key} className="subcategory">
                    <td>{label}</td>
                    <td>
                      {getValue
                        ? getValue(initialSalary)
                        : initialValue !== null
                        ? `€${initialValue.toFixed(2)}`
                        : '-'}
                    </td>
                    <td>
                      {getValue
                        ? getValue(adjustedSalary)
                        : adjustedValue
                        ? `€${adjustedValue.toFixed(2)}`
                        : '-'}
                    </td>
                    <td>
                      {difference !== 0 && !getValue ? (
                        <span
                          className={difference > 0 ? 'difference-positive' : 'difference-negative'}
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
