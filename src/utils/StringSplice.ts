const StringModifier = (data: string) => {
  return `${data.substring(0, 3)}........${data.substring(data.length - 3)}`
}

export default StringModifier
