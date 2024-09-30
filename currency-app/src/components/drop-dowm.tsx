import { FC } from "react";

interface CurrencyDropdownProps {
  currencies: string[];
  currency: string;
  setCurrency: (currency: string) => void;
  favorites: string[];
  handleFavorite: (currency: string) => void;
  title?: string;
}

const CurrencyDropdown: FC<CurrencyDropdownProps> = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorites.map((currency: string) => {
            return (
              <option className="bg-gray-200" value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
          <hr />
          {currencies
            .filter((c: string) => !favorites.includes(c))
            .map((currency: string) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>

        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        ></button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
