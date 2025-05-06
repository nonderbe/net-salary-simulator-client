import React from 'react';

function SalaryInput({ grossSalary, setGrossSalary }) {
  return (
    <div>
      <label>
        Gross Monthly Salary (€):
        <input
          type="number"
          value={grossSalary}
          onChange={(e) => setGrossSalary(Number(e.target.value))}
          min="0"
          step="100"
        />
      </label>
      <p>Marital Status: Single (fixed for demo)</p>
      <p>Dependents: 0 (fixed for demo)</p>
    </div>
  );
}

export default SalaryInput;
