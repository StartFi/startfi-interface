import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usePopup } from 'state/application/hooks'
import { AppDispatch } from '../index'
import { updateMatchesDarkMode } from './actions'
import { useAddedToWishlist } from './hooks'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()

  const addedToWishlist = useAddedToWishlist()

  const popup = usePopup()

  // keep dark mode in sync with the system
  useEffect(() => {

    if (addedToWishlist) popup(true, addedToWishlist)

    const darkHandler = (match: MediaQueryListEvent) => {
      dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }))
    }

    const match = window?.matchMedia('(prefers-color-scheme: dark)')
    dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }))

    if (match?.addListener) {
      match?.addListener(darkHandler)
    } else if (match?.addEventListener) {
      match?.addEventListener('change', darkHandler)
    }

    return () => {
      if (match?.removeListener) {
        match?.removeListener(darkHandler)
      } else if (match?.removeEventListener) {
        match?.removeEventListener('change', darkHandler)
      }
    }
  }, [addedToWishlist, popup, dispatch])

  return null
}
