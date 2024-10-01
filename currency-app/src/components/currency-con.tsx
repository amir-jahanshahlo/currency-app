import { FC, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";

// CurrencyConverter component for converting between USD and IRR
const CurrencyConverter: FC = () => {
  // State variables
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("IRR");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [converting, setConverting] = useState<boolean>(false);

  // Exchange rates
  const usdToIrrRate = 50000;
  const irrToUsdRate = 1 / usdToIrrRate;

  const convertCurrency = (): void => {
    if (!amount) return;
    setConverting(true);

    let convertedValue: number;

    if (fromCurrency === "USD" && toCurrency === "IRR") {
      convertedValue = amount * usdToIrrRate;
    } else if (fromCurrency === "IRR" && toCurrency === "USD") {
      convertedValue = amount * irrToUsdRate;
    } else {
      convertedValue = 0;
    }

    setConvertedAmount(convertedValue.toFixed(2) + " " + toCurrency);
    setConverting(false);
  };

  const swapCurrencies = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Handle key down event for Enter key
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      convertCurrency();
    }
    // Prevent negative value on PgDn key
    if (event.key === "PageDown") {
      event.preventDefault();
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700 text-center">
        Currency Converter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label
            htmlFor="fromCurrency"
            className="block text-sm font-medium text-gray-700"
          >
            From:
          </label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full sm:w-40"
          >
            <option value="USD">USD</option>
            <option value="IRR">IRR</option>
          </select>
        </div>

        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        <div>
          <label
            htmlFor="toCurrency"
            className="block text-sm font-medium text-gray-700"
          >
            To:
          </label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full sm:w-40"
          >
            <option value="IRR">IRR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => {
            const value = Number(e.target.value);
            // Ensure the value is non-negative
            if (value >= 0) {
              setAmount(value);
            }
          }}
          onKeyDown={handleKeyDown}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting ? "animate-pulse" : ""
          }`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
