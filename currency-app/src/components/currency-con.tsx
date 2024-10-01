import { FC, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";

// CurrencyConverter component for converting between USD and IRR
const CurrencyConverter: FC = () => {
  // State variables
  const [amount, setAmount] = useState<number>(1); // Amount to convert
  const [fromCurrency, setFromCurrency] = useState<string>("USD"); // Currency to convert from
  const [toCurrency, setToCurrency] = useState<string>("IRR"); // Currency to convert to
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null); // Result of conversion
  const [converting, setConverting] = useState<boolean>(false); // Loading state during conversion

  // Exchange rates
  const usdToIrrRate = 50000; // 1 USD to IRR
  const irrToUsdRate = 1 / usdToIrrRate; // IRR to USD rate

  // Function to convert currency based on selected currencies and amount
  const convertCurrency = (): void => {
    if (!amount) return; // Exit if amount is not valid
    setConverting(true); // Set loading state

    let convertedValue: number;

    // Perform conversion based on selected currencies
    if (fromCurrency === "USD" && toCurrency === "IRR") {
      convertedValue = amount * usdToIrrRate; // Convert USD to IRR
    } else if (fromCurrency === "IRR" && toCurrency === "USD") {
      convertedValue = amount * irrToUsdRate; // Convert IRR to USD
    } else {
      convertedValue = 0; // Default case, should not happen
    }

    // Format the output to two decimal places and update state
    setConvertedAmount(convertedValue.toFixed(2) + " " + toCurrency);
    setConverting(false); // Reset loading state
  };

  // Function to swap the selected currencies
  const swapCurrencies = (): void => {
    setFromCurrency(toCurrency); // Swap the fromCurrency with toCurrency
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md backdrop-blur-xl">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        {/* From Currency Selector */}
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
            onChange={(e) => setFromCurrency(e.target.value)} // Update fromCurrency state
            className="mt-1 p-2 border border-gray-300 rounded-md w-40"
          >
            <option value="USD">USD</option>
            <option value="IRR">IRR</option>
          </select>
        </div>

        {/* Currency Swap Button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies} // Swap currencies on click
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        {/* To Currency Selector */}
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
            onChange={(e) => setToCurrency(e.target.value)} // Update toCurrency state
            className="mt-1 p-2 border border-gray-300 rounded-md w-40"
          >
            <option value="IRR">IRR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      {/* Amount Input Field */}
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount} // Bind input value to amount state
          onChange={(e) => setAmount(Number(e.target.value))} // Update amount state
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      {/* Convert Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency} // Trigger currency conversion
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting ? "animate-pulse" : ""
          }`}
        >
          Convert
        </button>
      </div>

      {/* Display Converted Amount */}
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
