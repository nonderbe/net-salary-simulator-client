import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SalaryInput from './components/SalaryInput';
import BenefitsSelector from './components/BenefitsSelector';
import SalaryOutput from './components/SalaryOutput';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [grossSalary, setGrossSalary] = useState(3000);
  const [benefits, setBenefits] = useState({
    companyCar: { active: false, catalogValue: 40000, co2: 120, fuelType: 'diesel', leaseCost: 500 },
    bicycle: { active: false, leaseCost: 50 },
  });
  const [initialSalary, setInitialSalary] = useState(null);
  const [adjustedSalary, setAdjustedSalary] = useState(null);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('monthly');

  const calculateSalaries = async () => {
    console.log('calculateSalaries called with:', { grossSalary, benefits, period });
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/salary/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grossSalary, benefits, period }),
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log('API response:', data);
      setInitialSalary(data.initial);
      setAdjustedSalary(data.adjusted);
      setError(null);
    } catch (error) {
      console.error('Error calculating salaries:', error);
      setError(t('app.apiError'));
    }
  };

  useEffect(() => {
    if (grossSalary > 0) {
      calculateSalaries();
    }
  }, [grossSalary, benefits, period]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="app">
      <header>
        <div className="language-switcher">
          <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
            <option value="en">{t('app.language.en')}</option>
            <option value="nl">{t('app.language.nl')}</option>
          </select>
        </div>
        <h1>{t('app.title')}</h1>
        <p>{t('app.subtitle')}</p>
        <BenefitsSelector benefits={benefits} setBenefits={setBenefits} />
      </header>
      <div className="main">
        <h2>{t('app.comparison')}</h2>
        <div className="tabs">
          <button
            className={period === 'monthly' ? 'active' : ''}
            onClick={() => setPeriod('monthly')}
          >
            {t('app.tab.monthly')}
          </button>
          <button
            className={period === 'yearly' ? 'active' : ''}
            onClick={() => setPeriod('yearly')}
          >
            {t('app.tab.yearly')}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <SalaryInput grossSalary={grossSalary} setGrossSalary={setGrossSalary} />
        <SalaryOutput initialSalary={initialSalary} adjustedSalary={adjustedSalary} period={period} />
      </div>
      <footer>
        <p>
          {t('app.footer')}{' '}
          <a href="https://www.socialsecurity.be" target="_blank" rel="noopener noreferrer">
            socialsecurity.be
          </a>{' '}
          {t('app.footerLink')}
        </p>
      </footer>
    </div>
  );
}

export default App;
