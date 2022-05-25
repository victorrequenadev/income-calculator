/**
 *
 * @param {(20 | 10 | 5 | "20" | "10" | "5")} pct
 * @param {number} gross
 * @returns {number}
 */
export function getUpworkFee(pct, gross) {
  if (isNaN(pct)) return 0;

  switch (Number(pct)) {
    case 20: {
      if (gross <= 500) return gross * 0.2; // 20% of earnings

      let fee = 0;
      if (gross > 10000) {
        fee += 500 * 0.2; // 20% of $500
        fee += 9500 * 0.1; // 10% of $9.5K
        fee += (gross - 10000) * 0.05; // 5% of remaining income
      } else if (gross > 500) {
        fee += 500 * 0.2; // 20% of $500
        fee += (gross - 500) * 0.1; // 10% of remaining income
      }
      return fee;
    }

    case 10: {
      if (gross <= 9500) return gross * 0.1; // 10% of earnings

      let fee = 0;
      fee += 9500 * 0.1; // 10% of $10K
      fee += (gross - 9500) * 0.05; // 5% of remaining earnings
      return fee;
    }

    case 5: {
      return gross * 0.05; // 5% of earnings
    }

    default:
      return 0;
  }
}
