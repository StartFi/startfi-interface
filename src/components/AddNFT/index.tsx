import React from 'react'
import { useStep } from 'state/marketplace/hooks'
import { STEP } from 'state/marketplace/types'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const AddNFT: React.FC = () => {
  const step = useStep()

  const Step = () => {
    switch (step) {
      case STEP.STEP1:
        return <Step1 />
      case STEP.STEP2:
        return <Step2 />
      case STEP.STEP3:
        return <Step3 />
      default:
        return null
    }
  }

  return <React.Fragment>{Step()}</React.Fragment>
}

export default AddNFT
