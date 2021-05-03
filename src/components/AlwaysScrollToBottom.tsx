import React, { useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  forwardRef: React.MutableRefObject<HTMLDivElement>
}

const AlwaysScrollToBottom = ({ forwardRef }: Props): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const elementRef = useRef<HTMLDivElement>()

  const checkScrolledUp = useCallback(() => {
    const actualPosition = forwardRef.current.scrollTop
    if (actualPosition < scrollPosition) return true
    else {
      setScrollPosition(forwardRef.current.scrollTop)
      return false
    }
  }, [forwardRef, scrollPosition])

  useEffect(() => {
    if (!checkScrolledUp()) elementRef.current.scrollIntoView()
  })
  return <div id="always-scroll-bottom-div" ref={elementRef} />
}

export default AlwaysScrollToBottom
