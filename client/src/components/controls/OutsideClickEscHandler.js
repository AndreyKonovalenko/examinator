import { useRef } from 'react';
import { useOutsideEvent } from '../../hooks/useOutsideEvent';

const OutsideClickEscHandler = (props) => {
  const wrapperRef = useRef(null);
  const { clickHandler, children } = props;
  useOutsideEvent(wrapperRef, clickHandler);
  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickEscHandler;
