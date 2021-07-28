import React, { Component } from 'react'
import styled from 'styled-components'

const Loading = styled.div`
  @keyframes ldio-w15i5kk95mb {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  .ldio-w15i5kk95mb div {
    position: absolute;
    width: 120px;
    height: 120px;
    border: 20px solid #999999;
    border-top-color: transparent;
    border-radius: 50%;
  }
  .ldio-w15i5kk95mb div {
    animation: ldio-w15i5kk95mb 1s linear infinite;
    top: 100px;
    left: 100px;
  }
  .loadingio-spinner-rolling-elaai8ryw5h {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: #f1f2f3;
  }
  .ldio-w15i5kk95mb {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-w15i5kk95mb div {
    box-sizing: content-box;
  }
`

class LoaderStartfi extends Component {
  render() {
    return (
      <Loading>
        <div className="loadingio-spinner-rolling-elaai8ryw5h">
          <div className="ldio-w15i5kk95mb">
            <div></div>
          </div>
        </div>
      </Loading>
    )
  }
}

export default LoaderStartfi
