import { useSelector } from "react-redux"
import { AppState } from "state"

export const useBidAdded=()=>{
    return useSelector((state:AppState)=>state.marketplace)
}