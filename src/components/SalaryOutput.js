import React from 'react';

function SalaryOutput({ salary }) {
  if (!salary) return <p>Enter details to see results.</p>;

  return (
    <div className="output">
      <p><strong>Employer's Payroll Cost:</strong> €{salary.employerCost.toFixed(2)}</p>
      <p><strong>Gross Salary:</strong> €{salary.grossSalary.toFixed(2)}</p>
      {salary.benefitInKind > 0 && (
        <p><strong>Benefit in Kind:</strong> €{salary.benefitInKind.toFixed(2)}</p>
      )}
      <p><strong>Social Security Contribution:</strong> €{salary.socialSecurity.toFixed(2)}</p>
      <p><strong>Withholding Tax:</strong> €{salary.withholdingTax.toFixed(2)}</p>
      <p><strong>Net Salary:</strong> €{salary.netSalary.toFixed(2)}</p>
      {salary.netSalaryChange && (
        <p><strong>Net Salary Change:</strong> €{salary.netSalaryChange.toFixed(2)}</p>
      )}
    </div>
  );
}

export default SalaryOutput;
