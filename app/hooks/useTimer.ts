import { useEffect, useRef, useState } from 'react'

export function useTimer () {

  const [counter, setCounter] = useState(0);
  const timer:any = useRef();

  useEffect(() => {
    return () => {
      timer.current && clearInterval(timer.current);
    }
  }, [])

  const startTimer = (onEnd = () => {}) => {
    timer.current && clearInterval(timer.current);
    setCounter(60);
    timer.current = setInterval(() => {
      setCounter(pre => {
        if (pre > 0) {
          return pre - 1;
        } else {
          clearInterval(timer.current);
          onEnd();
          return 0;
        }
      });
    }, 1000);
  }

  const stopTimer = () => {
    timer.current && clearInterval(timer.current);
  }

  return [counter, startTimer, stopTimer];
}
