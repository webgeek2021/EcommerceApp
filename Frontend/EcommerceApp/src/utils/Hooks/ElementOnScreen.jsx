import React from "react"
 const useElementOnScreen = (options)=>{
    const [isVisible , setIsVissible]  = React.useState(false)
    const containerRef = React.useRef(null)

    const callbackFunction=(entries)=>{
        const [entry] = entries
        setIsVissible(entry.isIntersecting)
    }

    React.useEffect(()=>{
        const observer = new IntersectionObserver(callbackFunction,options)
        if(containerRef.current) observer.observe(containerRef.current)

        return ()=>{
            if(containerRef.current) observer.unobserve(containerRef.current)
        }

    } ,[containerRef , isVisible])

    return [containerRef , isVisible]
}

export default useElementOnScreen;