import { useSelector } from "react-redux"
import { AppState } from "state"


export const useGetAuction=()=>{}
export const useAuctionItemAdded =()=>{
    return useSelector((state:AppState)=>state.marketplace)
}