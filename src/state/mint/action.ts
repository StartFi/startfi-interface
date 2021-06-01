import { createAction } from '@reduxjs/toolkit'
export const mintNFT = createAction<{ field: boolean; typedValue: string; noLiquidity: boolean }>('mint/typeInputMint')
