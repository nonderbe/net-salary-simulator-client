import React from 'react';

function SalaryInput({ grossSalary, setGrossSalary }) {
  return (
    <div className="mb-6">
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
      <p>Marital Status: Single</p>
      <p>Dependents: 0</p>
    </div>
  );
}

export default SalaryInput;
