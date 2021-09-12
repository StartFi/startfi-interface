import { useMemo } from 'react'

export const useCheckIfImage = (fileName?: string) => {
  const fileExtension = fileName ? fileName?.split('.')[1] : null
  const imageMatch = fileExtension ? fileExtension.toLowerCase().match(/(jpg|jpeg|png|gif)$/) : null
  return useMemo(() => (imageMatch ? true : false), [fileName])
}
