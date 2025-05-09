import React from 'react';

function SalaryOutput({ initialSalary, adjustedSalary }) {
  if (!initialSalary || !adjustedSalary) {
    return <p>Enter details to see results.</p>;
  }

  const components = [
    { label: "Employer's Payroll Cost", key: 'employerCost' },
    { label: 'Gross Salary', key: 'grossSalary' },
    { label: 'Benefit in Kind', key: 'benefitInKind', conditional: true },
    { label: 'Social Security Contribution', key: 'socialSecurity' },
    { label: 'Withholding Tax', key: 'withholdingTax' },
    { label: 'Net Salary', key: 'netSalary' },
    { label: 'Disallowed Expense Tax', key: 'disallowedExpenseTax', adjustedOnly: true, conditional: true },
    { label: 'Net Salary Change', key: 'netSalaryChange', adjustedOnly: true },
  ];

  return (
    <div className="salary-output">
      <div className="salary-row header">
        <span>Component</span>
        <span>Initial</span>
        <span>Adjusted</span>
      </div>
      {components.map(({ label, key, conditional, adjustedOnly }) => {
        if (conditional && initialSalary[key] === 0 && adjustedSalary[key] === 0) {
          return null;
        }
        if (adjustedOnly && !adjustedSalary[key]) {
          return null;
        }
        return (
          <div className="salary-row" key={key}>
            <span>{label}</span>
            <span>{adjustedOnly || initialSalary[key] === undefined ? '-' : `€${initialSalary[key].toFixed(2)}`}</span>
            <span>{adjustedSalary[key] ? `€${adjustedSalary[key].toFixed(2)}` : '-'}</span>
          </div>
        );
      })}
    </div>
  );
}

export default SalaryOutput;
