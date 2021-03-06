import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom"
export default () => {
  const ref = useRef(null);
  const history = useHistory(); //browser history copy
  
  // Load only once
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        
        const { pathname } = history.location //Container level
        if (pathname !== nextPathname) {
          // update container browser history object
          history.push(nextPathname)
        }
      }
    })

    history.listen(onParentNavigate)
  },[])

  return <div ref={ref} />;
};
