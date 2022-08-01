import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const [counter, setCounter] = useState(0)
  const inc = () => {
    setCounter(prevCounter => prevCounter + 1)
  }
  return(
    <div>
      Value: {counter} <button onClick={inc}>incre</button>
    </div>
  )
}
