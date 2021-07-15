import React, { useEffect, useState } from 'react'
import SelectIcon from './../../assets/icons/select.svg'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Row } from 'theme/components'

interface DropDownProps {
  name: string
  options: string[]
  value: string
  onChange: (e: any) => void
  width?: string
  label?: string
  boxshadow?: boolean
}

interface WidthProps {
  readonly width: string
}

const Container = styled.div<WidthProps>`
  width: ${props => props.width};
  position: relative;
  z-index: 9999;
`

const LabelRow = styled(Row)`
  min-height: 6vh;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 2vh 2vw;
  cursor: pointer;
`

const Label = styled.div`
  text-transform: capitalize;
`

const Items = styled.div<WidthProps>`
  margin-top: 2vh;
  border: 1px solid #dddddd;
  border-radius: 8px;
  position: absolute;
  width: ${props => props.width};
`

interface ItemProps {
  readonly selected: boolean
  readonly last: boolean
}

const Item = styled.div<ItemProps>`
  border-bottom: ${props => (props.last ? 'none' : '1px solid #DDDDDD')};
  padding: 3vh 1vw;
  cursor: pointer;
  text-transform: capitalize;
  border-radius: ${props => (props.selected ? 'none' : props.last ? '0px 0px 8px 8px' : '8px 8px 0px 0px')};
  color: ${props => (props.selected ? 'white' : 'black')};
  background-color: ${props => (props.selected ? 'black' : 'white')};
  &:hover {
    color: white;
    background-color: black;
    border-radius: 0;
  }
`

const BlurLayer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`

export const DropDown: React.FunctionComponent<DropDownProps> = ({
  name,
  options,
  value,
  onChange,
  width,
  label,
  boxshadow
}: DropDownProps) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (value) setSelected(value)
  }, [value, setSelected])

  return (
    <React.Fragment>
      {open && <BlurLayer onClick={() => setOpen(false)} />}
      <Container width={width || '10vh'}>
        <LabelRow onBlur={() => setOpen(false)} onClick={() => setOpen(!open)}>
          <Label>{t(selected) || t(label)}</Label>
          <img src={SelectIcon} alt="Select" />
        </LabelRow>
        {open && (
          <Items width={width || '10vh'}>
            {options.map((o, i) => (
              <Item
                selected={selected === o}
                last={i === options.length - 1}
                key={o}
                onClick={() => {
                  setSelected(o)
                  setOpen(false)
                  onChange({ target: { name, value: o } })
                }}
              >
                {t(o)}
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
