import React, { useEffect, useState } from 'react'
import SelectIcon from './../../assets/icons/select.svg'
import { useTranslation } from 'react-i18next'
import { BlurLayer, Container, Item, Items, Label, LabelRow } from './styles'
import { DropDownIcons } from '../../constants'

interface DropDownProps {
  name: string
  options: string[]
  value: string
  onChange: (value: any, name: string) => void
  width?: string
  left?:string
  label?: string
  selectIcon?: boolean
  itemsWidth?: string
  border?: string
  showLabel?: boolean
  marginRight?: string
  LabelWidth?:string
  boxShadow?:string
  iconPosition?:string
  hasIcon?:boolean
  color?:string
}

export const DropDown: React.FC<DropDownProps> = ({
  name,
  options,
  value,
  onChange,
  width,
  left,
  label,
  LabelWidth,
  selectIcon,
  itemsWidth,
  border,
  showLabel,
  marginRight,
  boxShadow,
  iconPosition,
  hasIcon,
  color


}: DropDownProps) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const [selected, setSelected] = useState(value || '')

  useEffect(() => {
    if (value) setSelected(value)
  }, [value, setSelected])

  return (
    <React.Fragment>
      {open && <BlurLayer onClick={() => setOpen(false)} />}
      <Container width={width || '10vh'} marginRight={marginRight}>
        <LabelRow border={border} LabelWidth={LabelWidth} boxShadow={boxShadow} iconPosition={iconPosition}  onBlur={() => setOpen(false)} onClick={() => setOpen(!open)}>
          {showLabel ? <Label>{t(selected) || t(label)}</Label> : null}
          {selectIcon ? <img src={SelectIcon} alt="Select" /> : null}
        </LabelRow>
        {open && (
          <Items width={width || '10vh'} itemsWidth={itemsWidth} left={left}>
            {options.map((o, i) => (
              
              <Item
                selected={selected === o}
                last={i === options.length - 1}
                first={i===0}
                key={o}
                hasIcon={hasIcon}
                color={color}
                onClick={() => {
                  setSelected(o)
                  setOpen(false)
                  onChange(o, name)
                }}
              >

                {hasIcon?<img src={DropDownIcons[o]}/>:null}
                {o==='Stake'?t('stakeTokens'):t(o)}
              </Item>
            ))}
          </Items>
        )}
      </Container>
    </React.Fragment>
  )
}

export const DropDownSort = (props: DropDownProps) => <DropDown {...props} width="10vw" />

export const DropDownDateType = (props: DropDownProps) => <DropDown {...props} width="8vw" />

export const DropDownCategory = (props: DropDownProps) => <DropDown {...props} width="30vw" />
