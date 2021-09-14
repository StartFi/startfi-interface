export default function abbrevToNumber(amount: number | string): number {
  if (typeof amount === 'string') {
    let amountStr = amount.toString()
    const abbrevConverter = { m: '000000', k: '000' }
    const abbrev = amountStr.slice(-1)
    amountStr = amountStr.replace(abbrev, abbrevConverter[abbrev])
    return Number(amountStr)
  }
  return amount
}
