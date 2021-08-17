import { useCountDownTimer } from 'hooks/countDownTimer'
import React from 'react'
import { Counter } from './Timer.style'
import Text from '../Text'
interface TimerProp {
  timeStamp: number
  helperString:string
}

const Timer: React.FC<TimerProp> = ({ timeStamp ,helperString}) => {
  const timeLeft = useCountDownTimer(timeStamp)

  const timerComponents: any = []
  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return
    }
    let comma = ','
    if (interval === 'S') comma = ''
    timerComponents.push(
      <Counter key={interval}>
        <p>{timeLeft[interval]}</p>
        <p>
          {interval}
          {comma}{' '}
        </p>
      </Counter>
    )
  })

  return(

     <React.Fragment>
    {timerComponents.length > 0 ? <div> {timerComponents}</div> :
      <Text fontFamily='Roboto' fontSize='1rem' color='#444444' spanWeight='500' marginLeft='5.0rem'>{helperString} Ended</Text>}
    </React.Fragment>
    )
}

export default Timer
