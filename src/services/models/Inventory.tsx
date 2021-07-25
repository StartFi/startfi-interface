import { InventoryOptions } from "components/invHome/CardHeader";
import { NFT } from "./NFT";

export interface Inventory{
    type:InventoryOptions;
    NFTs:NFT[];
}