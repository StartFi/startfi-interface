import { InventoryOptions } from "components/inventory/CardHeader";
import { NFT } from "./NFT";

export interface Inventory{
    type:InventoryOptions;
    NFTs:NFT[];
}