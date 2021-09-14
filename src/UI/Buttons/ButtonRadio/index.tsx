import React from 'react'
import { ButtonProps } from 'rebass/styled-components'
import { CustomButtonPrimary } from '../CustomButtonPrimary'
import { ButtonWhite } from '../ButtonWhite'

export function ButtonRadio({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (!active) {
    return <ButtonWhite {...rest} />
  } else {
    return <CustomButtonPrimary {...rest} />
  }
}
