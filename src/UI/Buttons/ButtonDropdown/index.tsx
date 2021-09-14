import React from 'react'
import { RowBetween } from '../../Row'
import { ChevronDown } from 'react-feather'
import { ButtonProps } from 'rebass/styled-components'
import { CustomButtonPrimary } from '../CustomButtonPrimary'

export function ButtonDropdown({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <CustomButtonPrimary {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </CustomButtonPrimary>
  )
}
