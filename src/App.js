import React, { useState, useEffect } from 'react';
import SalaryInput from './components/SalaryInput';
import BenefitsSelector from './components/BenefitsSelector';
import SalaryOutput from './components/SalaryOutput';
import './App.css';

function App() {
  const [grossSalary, setGrossSalary] = useState(3000);
  const [benefits, setBenefits] = useState({
    companyCar: { active: false, catalogValue: 40000, co2: 120, fuelType: 'diesel' },
    bicycle: { active: false, leaseCost: 50 },
  });
  const [initialSalary, setInitialSalary] = useState(null);
  const [adjustedSalary, setAdjustedSalary] = useState(null);

  const calculateSalaries = async () => {
    try {
      const response = await fetch('/api/salary/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grossSalary, benefits }),
      });
      const data = await response.json();
      setInitialSalary(data.initial);
      setAdjustedSalary(data.adjusted);
    } catch (error) {
      console.error('Error calculating salaries:', error);
    }
  };

  useEffect(() => {
    calculateSalaries();
  }, [grossSalary, benefits]);

  return (
    <div className="app">
      <header>
        <h1>Net Salary Simulator</h1>
        <p>Calculate how social benefits affect your net salary.</p>
        <BenefitsSelector benefits={benefits} setBenefits={setBenefits} />
      </header>
      <div className="main">
        <div className="column">
          <h2>Initial Salary</h2>
          <SalaryInput grossSalary={grossSalary} setGrossSalary={setGrossSalary} />
          <SalaryOutput salary={initialSalary} />
        </div>
        <div className="column">
          <h2>Adjusted Salary with Benefits</h2>
          <SalaryOutput salary={adjustedSalary} />
        </div>
      </div>
      <footer>
        <p>
          Indicative calculation. Consult{' '}
          <a href="https://www.socialsecurity.be" target="_blank" rel="noopener noreferrer">
            socialsecurity.be
          </a>{' '}
          for details.
        </p>
      </footer>
    </div>
  );
}

export default App;
