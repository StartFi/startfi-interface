import { useMemo } from 'react'
import { Dictionary } from '../../constants'
import { useLocation } from 'react-router-dom'

export const useLocationSearch = (): Dictionary => {
  const location = useLocation()
  return useMemo(() => {
    const json: Dictionary = {}
    location.search
      .substring(1, location.search.length)
      .split('&')
      .forEach(pair => {
        const [key, value] = pair.split('=')
        json[key] = value
      })
    return { ...json }
  }, [location])
}
