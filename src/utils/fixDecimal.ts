function isDecimal(num: number): boolean {
  if (num % 1 !== 0) {
    return true
  }
  return false
}

export default function fixDecimal(num: number): number {
  if (isDecimal(num)) {
    return Number(num.toFixed(4))
  }
  return num
}
