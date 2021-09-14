import React from 'react'
import { ButtonProps } from 'rebass/styled-components'
import { CustomButtonPrimary } from '../CustomButtonPrimary'
import { ButtonConfirmedStyle } from './ButtonConfirmedStyle'

export function ButtonConfirmed({
  confirmed,
  altDisabledStyle,
  ...rest
}: { confirmed?: boolean; altDisabledStyle?: boolean } & ButtonProps) {
  if (confirmed) {
    return <ButtonConfirmedStyle {...rest} />
  } else {
    return <CustomButtonPrimary {...rest} altDisabledStyle={altDisabledStyle} />
  }
}
