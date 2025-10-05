"use client"

import type React from "react"
import { useState, useMemo, useRef } from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { useLoanCalculator } from "../hooks/useLoanCalculator" // Ensure this hook is updated
import { formatCurrency, formatNumber } from "../utils/formatters"
import { Printer, Download, AlertCircle } from "lucide-react"

// Re-using the InputField component, it's generic enough
const InputField = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  placeholder,
  isOptional,
}: {
  label: string
  value: number
  onChange: (val: number) => void
  min: number
  max: number
  step: number
  unit: string
  placeholder?: string
  isOptional?: boolean
}) => {
    
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {isOptional && <span className="ml-1 text-gray-500 text-xs">(Optionnel)</span>}
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number.parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #006233 ${((value - min) / (max - min)) * 100}%, #d1d5db ${((value - min) / (max - min)) * 100}%)`,
          }}
        />
        <div className="relative w-full sm:w-36">
          <input
            type="number"
            value={value === 0 && !placeholder ? "" : value} // Changed to handle 0 for optional fields
            onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
            min={min}
            max={max}
            placeholder={placeholder}
            className="w-full h-10 rounded-md border border-blackshadow-sm focus:border-maroc-green focus:ring-maroc-green text-base text-center pr-10"
          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  )
}

const CalculatorPage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(100000) // More generic default
  const [interestRate, setInterestRate] = useState(6) // Slightly higher, more typical for consumer loans
  const [duration, setDuration] = useState(60) // 5 years in months
  const [insuranceRate, setInsuranceRate] = useState(0) // New: Optional insurance rate

  // The useLoanCalculator hook must now accept an insuranceRate (or similar)
  const results = useLoanCalculator(loanAmount, interestRate, duration, insuranceRate)
  const printRef = useRef<HTMLDivElement>(null)

  const pieData = useMemo(() => {
    if (!results) return []
    const data = [
      { name: "Capital", value: loanAmount },
      { name: "Intérêt Total", value: results.totalInterest },
    ]
    if (results.totalInsurance > 0) {
      // Only add if insurance is present
      data.push({ name: "Assurance Totale", value: results.totalInsurance })
    }
    return data
  }, [results, loanAmount])

  // Keep the colors, they fit the theme
  const COLORS = ["#006233", "#c1272d", "#fbb040"]

  const handlePrint = () => {
    window.print()
  }

  const handleExport = async () => {
    if (!results) return

    const { utils, writeFile } = await import("xlsx")

    const worksheetData = results.amortizationSchedule.map((row) => ({
      Mois: row.month,
      "Capital Remboursé (MAD)": formatNumber(row.principal),
      "Intérêt (MAD)": formatNumber(row.interest),
      "Assurance (MAD)": formatNumber(row.insurance),
      "Mensualité Totale (MAD)": formatNumber(row.totalPayment),
      "Solde Restant (MAD)": formatNumber(row.remainingBalance),
    }))
    const worksheet = utils.json_to_sheet(worksheetData)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, "amortissement_loanflow_maroc")
    writeFile(workbook, "amortissement_loanflow_maroc.xlsx")
  }

  return (
    <div ref={printRef}>
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-8 mt-10 sm:mb-10 sm:mt-20">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">Calculateur de Prêt</h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 px-4">
              Entrez les détails de votre prêt pour obtenir une simulation détaillée.
            </p>
          </div>

          <div className="bg-gray-50 p-4 sm:p-8 space-y-6 sm:space-y-8 no-print">
            <InputField
              label="Montant du prêt"
              value={loanAmount}
              onChange={setLoanAmount}
              min={10000} // Lower min for general loans
              max={5000000}
              step={1000}
              unit="MAD"
              placeholder="100 000"
            />
            <InputField
              label="Taux d'intérêt annuel"
              value={interestRate}
              onChange={setInterestRate}
              min={0.1} // Allow very low rates
              max={20} // Allow higher rates for consumer loans
              step={0.01}
              unit="%"
              placeholder="6.0"
            />
            <InputField
              label="Durée du prêt (en mois)"
              value={duration}
              onChange={setDuration}
              min={6} // Shorter minimum duration
              max={300}
              step={1}
              unit="Mois"
              placeholder="60"
            />
            <InputField
              label="Taux d'assurance annuel" // New input for insurance
              value={insuranceRate}
              onChange={setInsuranceRate}
              min={0}
              max={5} // Max 5% for insurance, adjust as needed
              step={0.01}
              unit="%"
              placeholder="0.0"
              isOptional={true}
            />
          </div>
        </div>
      </div>

      {results && loanAmount > 0 && interestRate > 0 && duration > 0 ? (
        <div className="bg-gray-100 py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-sm font-semibold text-maroc-green uppercase tracking-wider">
                Votre mensualité estimée
              </h2>
              <p className="mt-2 text-3xl sm:text-5xl font-display font-extrabold text-gray-900">
                {formatCurrency(results.monthlyPayment)}
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-500">par mois pendant {duration} mois</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
              <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold font-display mb-4">Répartition du Coût Total</h3>
                <div style={{ width: "100%", height: 250 }} className="sm:h-[300px]">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        className="sm:outerRadius-[110]"
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center">
                        <span
                          className="h-3 w-3 mr-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="break-words">{entry.name}</span>
                      </div>
                      <span className="font-semibold ml-2 whitespace-nowrap">{formatCurrency(entry.value)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between font-bold pt-2 border-t mt-2 text-xs sm:text-sm">
                    <span>Coût total du crédit</span>
                    <span className="ml-2 whitespace-nowrap">{formatCurrency(results.totalCost)}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold font-display mb-4">Évolution du Remboursement</h3>
                <div style={{ width: "100%", height: 250 }} className="sm:h-[300px]">
                  <ResponsiveContainer>
                    <AreaChart data={results.amortizationSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        label={{ value: "Mois", position: "insideBottom", offset: -0 }}
                        className="text-xs"
                        hide={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}k`}
                        tick={{ fontSize: 12 }}
                        width={45}
                      />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        labelFormatter={(label) => `Mois ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="remainingBalance"
                        name="Solde restant"
                        stackId="1"
                        stroke={COLORS[0]}
                        fill={COLORS[0]}
                        fillOpacity={0.6}
                      />
                      {results.totalInterest > 0 && (
                        <Area
                          type="monotone"
                          dataKey="interest"
                          name="Intérêt payé (cumul)"
                          stackId="1"
                          stroke={COLORS[1]}
                          fill={COLORS[1]}
                          fillOpacity={0.6}
                        />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                {insuranceRate > 0 && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-4 flex items-start sm:items-center">
                    <AlertCircle className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span>
                      Le graphique d'évolution inclut l'amortissement du capital et les intérêts cumulés. L'assurance
                      est une composante additionnelle de votre mensualité.
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
                <h3 className="text-xl sm:text-2xl font-bold font-display">Tableau d'Amortissement</h3>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 no-print">
                  <button
                    onClick={handlePrint}
                    className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm sm:text-base"
                  >
                    <Printer size={18} />
                    <span>Imprimer</span>
                  </button>
                  <button
                    onClick={handleExport}
                    className="flex items-center justify-center space-x-2 bg-maroc-green text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm sm:text-base"
                  >
                    <Download size={18} />
                    <span>Exporter (Excel)</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto bg-white rounded-lg shadow-sm -mx-4 sm:mx-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mois
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Capital
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Intérêt
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Assurance
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Mensualité
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Solde
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.amortizationSchedule.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                          {row.month}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-right">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-right">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-right">
                          {formatCurrency(row.insurance)}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-semibold text-right">
                          {formatCurrency(row.totalPayment)}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-right">
                          {formatCurrency(row.remainingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 inline-flex items-start sm:items-center rounded-md">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-yellow-700 text-sm sm:text-base text-left sm:text-center">
              Veuillez entrer des valeurs valides pour le montant, le taux et la durée du prêt afin de lancer la
              simulation.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalculatorPage
