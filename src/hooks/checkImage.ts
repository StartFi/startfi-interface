import { useMemo } from 'react'

export const useCheckIfImage = (fileName?: string) => {
  const fileExtension = fileName?.split('.')[1].toLowerCase()
  const imageMatch = fileExtension?.match(/(jpg|jpeg|png|gif)$/)
  return useMemo(() => (imageMatch ? true : false), [fileName])
}
