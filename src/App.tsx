import React, { useCallback, useRef } from 'react'
import { toPng, toSvg } from 'html-to-image';

import "./gradient.css"

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  function filter(node: any) {
    return (node.tagName !== 'i');
  }

  const handleClick = useCallback(() => {
    if (ref.current === null) return;

    toSvg(ref.current, { filter })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'gradient.svg'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  const handleClickPng = useCallback(() => {
    if (ref.current === null) return;

    toPng(ref.current, { filter })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'gradient.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  return (
    <>
      <button onClick={handleClick}>Click me as svg</button>
      <button onClick={handleClickPng}>Click me as png</button>
      <div id='target' ref={ref}>
        <div className='border forNow' />
      </div>
      <div id='dest'></div>
    </>
  )
}

export default App
