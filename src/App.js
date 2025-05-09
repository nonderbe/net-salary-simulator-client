import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SalaryInput from './components/SalaryInput';
import BenefitsSelector from './components/BenefitsSelector';
import SalaryOutput from './components/SalaryOutput';

function App() {
  const { t, i18n } = useTranslation();
  const [grossSalary, setGrossSalary] = useState(3000);
  const [benefits, setBenefits] = useState({
    companyCar: { active: false, catalogValue: 40000, co2: 120, fuelType: 'diesel', leaseCost: 500 },
    bicycle: { active: false, leaseCost: 50 },
  });
  const [initialSalary, setInitialSalary] = useState(null);
  const [adjustedSalary, setAdjustedSalary] = useState(null);

  const calculateSalaries = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/salary/calculate`, {
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-primary text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="mt-2">{t('subtitle')}</p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-secondary' : 'bg-gray-700'} hover:bg-secondary transition`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('nl')}
              className={`px-3 py-1 rounded ${i18n.language === 'nl' ? 'bg-secondary' : 'bg-gray-700'} hover:bg-secondary transition`}
            >
              Nederlands
            </button>
            <button
              onClick={() => changeLanguage('fr')}
              className={`px-3 py-1 rounded ${i18n.language === 'fr' ? 'bg-secondary' : 'bg-gray-700'} hover:bg-secondary transition`}
            >
              Français
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <BenefitsSelector benefits={benefits} setBenefits={setBenefits} />
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary mb-4">{t('salary_comparison')}</h2>
          <SalaryInput grossSalary={grossSalary} setGrossSalary={setGrossSalary} />
          <SalaryOutput initialSalary={initialSalary} adjustedSalary={adjustedSalary} />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p dangerouslySetInnerHTML={{ __html: t('footer') }} />
        </div>
      </footer>
    </div>
  );
}

export default App;
