import React from 'react'

const BottomUpAnimation = ({ children }) => {
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const element = elementRef.current;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust the threshold as needed
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'bottomUpAnimation 0.5s ease-in-out';
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div ref={elementRef}>{children}</div>
  )
}

export default BottomUpAnimation