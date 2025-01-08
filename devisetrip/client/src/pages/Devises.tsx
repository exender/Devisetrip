import React, { useState, useEffect } from "react";

interface CountryList {
  [key: string]: string;
}

const countryList: CountryList = {
        AED: "AE",
        AFN: "AF",
        XCD: "AG",
        ALL: "AL",
        AMD: "AM",
        ANG: "AN",
        AOA: "AO",
        AQD: "AQ",
        ARS: "AR",
        AUD: "AU",
        AZN: "AZ",
        BAM: "BA",
        BBD: "BB",
        BDT: "BD",
        XOF: "BE",
        BGN: "BG",
        BHD: "BH",
        BIF: "BI",
        BMD: "BM",
        BND: "BN",
        BOB: "BO",
        BRL: "BR",
        BSD: "BS",
        NOK: "BV",
        BWP: "BW",
        BYR: "BY",
        BZD: "BZ",
        CAD: "CA",
        CDF: "CD",
        XAF: "CF",
        CHF: "CH",
        CLP: "CL",
        CNY: "CN",
        COP: "CO",
        CRC: "CR",
        CUP: "CU",
        CVE: "CV",
        CYP: "CY",
        CZK: "CZ",
        DJF: "DJ",
        DKK: "DK",
        DOP: "DO",
        DZD: "DZ",
        ECS: "EC",
        EEK: "EE",
        EGP: "EG",
        ETB: "ET",
        EUR: "FR",
        FJD: "FJ",
        FKP: "FK",
        GBP: "GB",
        GEL: "GE",
        GGP: "GG",
        GHS: "GH",
        GIP: "GI",
        GMD: "GM",
        GNF: "GN",
        GTQ: "GT",
        GYD: "GY",
        HKD: "HK",
        HNL: "HN",
        HRK: "HR",
        HTG: "HT",
        HUF: "HU",
        IDR: "ID",
        ILS: "IL",
        INR: "IN",
        IQD: "IQ",
        IRR: "IR",
        ISK: "IS",
        JMD: "JM",
        JOD: "JO",
        JPY: "JP",
        KES: "KE",
        KGS: "KG",
        KHR: "KH",
        KMF: "KM",
        KPW: "KP",
        KRW: "KR",
        KWD: "KW",
        KYD: "KY",
        KZT: "KZ",
        LAK: "LA",
        LBP: "LB",
        LKR: "LK",
        LRD: "LR",
        LSL: "LS",
        LTL: "LT",
        LVL: "LV",
        LYD: "LY",
        MAD: "MA",
        MDL: "MD",
        MGA: "MG",
        MKD: "MK",
        MMK: "MM",
        MNT: "MN",
        MOP: "MO",
        MRO: "MR",
        MTL: "MT",
        MUR: "MU",
        MVR: "MV",
        MWK: "MW",
        MXN: "MX",
        MYR: "MY",
        MZN: "MZ",
        NAD: "NA",
        XPF: "NC",
        NGN: "NG",
        NIO: "NI",
        NPR: "NP",
        NZD: "NZ",
        OMR: "OM",
        PAB: "PA",
        PEN: "PE",
        PGK: "PG",
        PHP: "PH",
        PKR: "PK",
        PLN: "PL",
        PYG: "PY",
        QAR: "QA",
        RON: "RO",
        RSD: "RS",
        RUB: "RU",
        RWF: "RW",
        SAR: "SA",
        SBD: "SB",
        SCR: "SC",
        SDG: "SD",
        SEK: "SE",
        SGD: "SG",
        SKK: "SK",
        SLL: "SL",
        SOS: "SO",
        SRD: "SR",
        STD: "ST",
        SVC: "SV",
        SYP: "SY",
        SZL: "SZ",
        THB: "TH",
        TJS: "TJ",
        TMT: "TM",
        TND: "TN",
        TOP: "TO",
        TRY: "TR",
        TTD: "TT",
        TWD: "TW",
        TZS: "TZ",
        UAH: "UA",
        UGX: "UG",
        USD: "US",
        UYU: "UY",
        UZS: "UZ",
        VEF: "VE",
        VND: "VN",
        VUV: "VU",
        YER: "YE",
        ZAR: "ZA",
        ZMK: "ZM",
        ZWD: "ZW",
};

const Devises: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const fetchExchangeRate = async () => {
    try {
      setErrorMessage(null);
      const url = `https://v6.exchangerate-api.com/v6/2c33856549cc7fb2f58879af/latest/${fromCurrency}`;
      const response = await fetch(url);
      const data = await response.json();
      const rate = data.conversion_rates[toCurrency];
      setExchangeRate(rate);
    } catch (error) {
      setErrorMessage("Something went wrong while fetching the exchange rate.");
    }
  };

  const handleSwitchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 1 : value);
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
  <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
    <header className="text-2xl font-bold text-center text-gray-700 mb-6">
      Currency Converter
    </header>
    <form className="space-y-6">
      {/* Amount Input */}
      <div className="text-center">
  <label className="block text-gray-600 text-sm mb-2">Enter Amount</label>
  <input
    type="number"
    value={amount}
    onChange={handleAmountChange}
    min="1"
    className="w-full h-12 px-4 bg-gray-800 text-white text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
  />
</div>


      {/* Currency Dropdowns */}
      <div className="flex items-center justify-between space-x-4">
        {/* From Currency */}
        <div className="flex-1">
          <label className="block text-gray-600 text-sm mb-2">From</label>
          <div className="relative">
            <img
              src={`https://flagcdn.com/48x36/${countryList[fromCurrency].toLowerCase()}.png`}
              alt={fromCurrency}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5"
            />
            <select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              className="w-full h-12 pl-10 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            >
              {Object.keys(countryList).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Switch Icon */}
        <div
          className="text-purple-500 hover:text-purple-700 cursor-pointer transition transform hover:scale-110"
          onClick={handleSwitchCurrencies}
        >
          <i className="fas fa-exchange-alt text-2xl"></i>
        </div>

        {/* To Currency */}
        <div className="flex-1">
          <label className="block text-gray-600 text-sm mb-2">To</label>
          <div className="relative">
            <img
              src={`https://flagcdn.com/48x36/${countryList[toCurrency].toLowerCase()}.png`}
              alt={toCurrency}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5"
            />
            <select
              value={toCurrency}
              onChange={handleToCurrencyChange}
              className="w-full h-12 pl-10 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            >
              {Object.keys(countryList).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exchange Rate Display */}
      <div className="text-center text-gray-600">
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : exchangeRate !== null ? (
          <p className="text-lg font-medium">
            {amount} {fromCurrency} ={" "}
            <span className="text-purple-500 font-bold">
              {(amount * exchangeRate).toFixed(2)} {toCurrency}
            </span>
          </p>
        ) : (
          <p className="text-gray-500">Fetching exchange rate...</p>
        )}
      </div>

      {/* Convert Button */}
      <button
        type="button"
        className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-800 focus:ring-2 focus:ring-purple-500 focus:outline-none transition transform hover:scale-105"
      >
        Convert
      </button>
    </form>
  </div>
</div>

  
  );
};

export default Devises;
