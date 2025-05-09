import React from 'react';

function SalaryOutput({ initialSalary, adjustedSalary }) {
  if (!initialSalary || !adjustedSalary) {
    return <p>Enter details to see results.</p>;
  }

  // Ensure all required keys exist to prevent undefined errors
  const requiredKeys = ['employerCost', 'grossSalary', 'netSalary', 'leasePrice', 'employerSocialSecurity', 'benefitInKind', 'withholdingTax', 'disallowedExpenseTax', 'netSalaryChange', 'extralegalBenefits'];
  const isValidSalary = (salary) => requiredKeys.every((key) => key in salary || key === 'disallowedExpenseTax' || key === 'netSalaryChange' || key === 'extralegalBenefits');

  if (!isValidSalary(initialSalary) || !isValidSalary(adjustedSalary)) {
    return <p>Error: Invalid salary data.</p>;
  }

  const categories = [
    {
      label: "Employer's Payroll Cost",
      key: 'employerCost',
      isCategory: true,
      subcategories: [
        {
          label: 'Lease Price',
          key: 'leasePrice',
          conditional: true,
          getValue: (salary) => (salary.leasePrice ? `€${salary.leasePrice.toFixed(2)}` : '-'),
        },
        {
          label: 'Disallowed Expense Tax',
          key: 'disallowedExpenseTax',
          conditional: true,
          adjustedOnly: true,
        },
        {
          label: "Employer's Social Security",
          key: 'employerSocialSecurity',
        },
      ],
    },
    {
      label: 'Gross Salary',
      key: 'grossSalary',
      isCategory: true,
      subcategories: [
        { label: 'Benefit in Kind', key: 'benefitInKind', conditional: true },
        { label: 'Withholding Tax', key: 'withholdingTax' },
      ],
    },
    {
      label: 'Net Salary',
      key: 'netSalary',
      isCategory: true,
      subcategories: [
        {
          label: 'Extralegal Benefits',
          key: 'extralegalBenefits',
          getValue: (salary) =>
            salary.extralegalBenefits && salary.extralegalBenefits.length > 0
              ? salary.extralegalBenefits
                  .map((b) => (b === 'companyCar' ? 'Company Car' : 'Company Bicycle'))
                  .join(', ')
              : '-',
        },
        { label: 'Net Salary', key: 'netSalary' },
        { label: 'Net Salary Change', key: 'netSalaryChange', adjustedOnly: true },
      ],
    },
  ];

  return (
    <div className="salary-output">
      <table className="salary-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Initial</th>
            <th>Adjusted</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ label, key, isCategory, subcategories }) => (
            <React.Fragment key={label}>
              <tr className={isCategory ? 'category' : ''}>
                <td>{label}</td>
                <td>{isCategory && initialSalary[key] !== undefined ? `€${initialSalary[key].toFixed(2)}` : '-'}</td>
                <td>{isCategory && adjustedSalary[key] !== undefined ? `€${adjustedSalary[key].toFixed(2)}` : '-'}</td>
                <td>-</td>
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
