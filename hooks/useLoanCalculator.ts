import { useMemo } from 'react';
import { LoanCalculationResults, AmortizationRow } from '../types';

// Removed: const ANNUAL_INSURANCE_RATE = 0.0040; // 0.40%

export const useLoanCalculator = (
  loanAmount: number,
  annualInterestRate: number,
  durationMonths: number,
  // NEW: Add annualInsuranceRate as a parameter
  annualInsuranceRate: number = 0 // Default to 0 if not provided
): LoanCalculationResults | null => {
  return useMemo(() => {
    // Basic validation to ensure positive inputs for calculation
    if (loanAmount <= 0 || annualInterestRate < 0 || durationMonths <= 0) { // annualInterestRate can be 0 for interest-free loans
      return null;
    }

    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    // UPDATED: Use the passed annualInsuranceRate parameter
    const monthlyInsuranceRate = (annualInsuranceRate / 100) / 12; // Convert annual percentage to monthly decimal
    const monthlyInsurancePayment = loanAmount * monthlyInsuranceRate; // Assuming insurance is a % of initial loan amount

    let principalAndInterestPayment: number;

    if (monthlyInterestRate > 0) {
      principalAndInterestPayment = 
        loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, durationMonths)) / (Math.pow(1 + monthlyInterestRate, durationMonths) - 1);
    } else {
      // Handle 0% interest rate case
      principalAndInterestPayment = loanAmount / durationMonths;
    }
    
    // Check for invalid calculation results (e.g., extremely long durations, very small rates)
    if (isNaN(principalAndInterestPayment) || !isFinite(principalAndInterestPayment)) {
      return null;
    }
      
    const totalMonthlyPayment = principalAndInterestPayment + monthlyInsurancePayment;

    let remainingBalance = loanAmount;
    const amortizationSchedule: AmortizationRow[] = [];
    let totalInterest = 0;

    for (let i = 1; i <= durationMonths; i++) {
      const interestForMonth = remainingBalance * monthlyInterestRate;
      let principalForMonth = principalAndInterestPayment - interestForMonth;
      
      // Adjust last payment to ensure remainingBalance hits exactly 0
      if (i === durationMonths) {
        principalForMonth = remainingBalance; // Pay off the exact remaining balance
      }

      remainingBalance -= principalForMonth;
      totalInterest += interestForMonth;

      amortizationSchedule.push({
        month: i,
        principal: principalForMonth,
        interest: interestForMonth,
        insurance: monthlyInsurancePayment,
        totalPayment: principalForMonth + interestForMonth + monthlyInsurancePayment, // Recalculate totalPayment for accuracy in last month
        remainingBalance: Math.max(0, remainingBalance), // Ensure it doesn't go negative
      });
    }

    const totalInsurance = monthlyInsurancePayment * durationMonths;
    const totalCost = loanAmount + totalInterest + totalInsurance;

    return {
      monthlyPayment: totalMonthlyPayment,
      totalInterest,
      totalInsurance,
      totalCost,
      amortizationSchedule,
    };
  }, [loanAmount, annualInterestRate, durationMonths, annualInsuranceRate]); // NEW: Add annualInsuranceRate to dependencies
};