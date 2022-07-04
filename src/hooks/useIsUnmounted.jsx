import { useEffect, useRef } from 'react';

export const useIsUnmounted = () => {
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    isUnmountedRef.current = false;

    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  return isUnmountedRef;
};
