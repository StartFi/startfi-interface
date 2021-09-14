import React from 'react'
import { RowBetween } from '../../Row'
import { ChevronDown } from 'react-feather'
import { ButtonProps } from 'rebass/styled-components'
import { ButtonGray } from '../ButtonGray'

export function ButtonDropdownGrey({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonGray {...rest} disabled={disabled} style={{ borderRadius: '20px' }}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonGray>
  )
}
