import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// to have custom options, add this
export const defaultProgressChart = {
  base: {
    stroke: '#dedede',
    label: 'Indisponível',
    textColor: '#444',
  },
  firstCircle: {
    stroke: '#78D78D',
    textColor: '#444',
    value: 0,
    label: 'Disponível'
  },
  secondCircle: {
    show: true,
    stroke: '#FFB443',
    textColor: '#444',
    value: 0,
    label: 'Ocupado'
  },
  scale: 0.5
}


export const ProgressChart = ({ options = defaultProgressChart }) => {
    const { scale, base, firstCircle, secondCircle } = options
    
    const [tooltip, settooltip] = useState({ show: true, color: '', text: '', textColor: '' })

    const showTooltip = ({ target }) => {
      const color = target.getAttribute("datacolor")
      const value = target.getAttribute("datavalue")
      const text = `${target.getAttribute("datalabel")} ${value}%`
      const textColor = target.getAttribute("datatextcolor")
      
      settooltip({
        ...tooltip,
          show: true,
          color,
          text,
          value,
          textColor,
      })
    }

    const hideToolTip = () => {
      settooltip({
        ...tooltip,
        show: false,
      })
    }

    const [firstValue, setfirstValue] = useState(0)
    const [secondValue, setsecondValue] = useState(0)

    useEffect(() => {
      setfirstValue(firstCircle.value)
      setsecondValue(secondCircle.value)
    }, [options])


    return (
        <Circle scale={scale}>
            <svg>
              <circle cx="70" cy="70" r="70" onMouseOver={showTooltip} onMouseLeave={hideToolTip}
                datavalue={100 - firstCircle.value.toFixed(1)}
                datalabel={base.label}
                datacolor={base.stroke}
                datatextcolor={base.textColor}
                style={base}
              />
              <circle cx="70" cy="70" r="70" onMouseOver={showTooltip} onMouseLeave={hideToolTip}
                datavalue={firstValue.toFixed(1)}
                datalabel={firstCircle.label}
                datacolor={firstCircle.stroke}
                datatextcolor={firstCircle.textColor}
                style={{
                  stroke: firstCircle.stroke,
                  strokeDashoffset: `calc(440 - (440 * ${firstValue}) / 100)`
                }}
              />
              {secondCircle.show && (
                <circle cx="70" cy="70" r="70" onMouseOver={showTooltip} onMouseLeave={hideToolTip}
                  datavalue={secondValue.toFixed(1)}
                  datalabel={secondCircle.label}
                  datacolor={secondCircle.stroke}
                  datatextcolor={secondCircle.textColor}
                  style={{
                    stroke: secondCircle.stroke,
                    strokeDashoffset: `calc(440 - (440 * ${secondValue}) / 100)`
                  }}
                />
              )}
            </svg>
            {tooltip.show && (
              <div style={{ backgroundColor: tooltip.color, color: tooltip.textColor }} className="tooltip"> {tooltip.text} </div>
            )}
        </Circle>
    )
}

const Circle = styled.div`
  width: 0;
  height: 0;
  transform: ${({ scale }) => `scale(${scale})`};

  svg {
    position: relative;
    width: 159px;
    height: 159px;
    transform: rotate(90deg);
  }

  svg circle {
    width: 140px;
    height: 140px;
    fill: none;
    stroke-width: 13;
    transform: translate(7px,7px);
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    stroke-linecap: round;
    transition: 2500ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  svg circle:first-child {
    stroke-dashoffset: 0;
    position: relative;
  }

  .tooltip {
    transition: all 200ms ease-in-out;
    width: max-content;
    padding: 5px 10px;
    margin: 5px 25px;
    border-radius: 8px;
    font-size: 100%;
  }
  
  `
