import { useState, useEffect } from 'react';

export function useSwipe(ref, onSwipeLeft, onSwipeRight, threshold = 50) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > threshold;
      const isRightSwipe = distance < -threshold;

      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft();
      }
      
      if (isRightSwipe && onSwipeRight) {
        onSwipeRight();
      }
    };

    target.addEventListener('touchstart', handleTouchStart);
    target.addEventListener('touchmove', handleTouchMove);
    target.addEventListener('touchend', handleTouchEnd);

    return () => {
      target.removeEventListener('touchstart', handleTouchStart);
      target.removeEventListener('touchmove', handleTouchMove);
      target.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight, touchStart, touchEnd, threshold]);
}
