
export interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  insurance: number;
  totalPayment: number;
  remainingBalance: number;
}

export interface LoanCalculationResults {
  monthlyPayment: number;
  totalInterest: number;
  totalInsurance: number;
  totalCost: number;
  amortizationSchedule: AmortizationRow[];
}
