import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface CurrencyRates {
  [key: string]: number;
}

const CurrencyConverter: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRates>({});
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        setRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount(amount * rates[toCurrency]);
    }
  }, [amount, rates, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Currency Converter</h2>
      <div className="flex mb-4">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex mb-4">
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(rates).map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span className="mx-2 self-center">to</span>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.keys(rates).map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <h3 className="text-xl font-semibold text-center">
        {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
      </h3>
    </div>
  );
};

export default CurrencyConverter;