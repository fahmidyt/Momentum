import React, { useEffect, useRef } from 'react'

const Momentum = ({children}) => {
    var wrapper = useRef(null)

    let sx = 0,
        sy = 0;
    let dx = sx,
        dy = sy;

    useEffect( () => {
        document.body.style.height = wrapper.current?.getBoundingClientRect().height + 'px'

        wrapper.current.style.width = '100%';
        wrapper.current.style.position = 'fixed';
        wrapper.current.style.top = 0;
        wrapper.current.style.left = 0;


        function render() {
            dx = li(dx, sx, 0.07)
            dy = li(dy, sy, 0.07)

            dx = Math.floor(dx * 100) / 100;
            dy = Math.floor(dy * 100) / 100;

            wrapper.current.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`

            window.requestAnimationFrame(render)
        }

        window.addEventListener('scroll', easeScroll)
        window.requestAnimationFrame(render)
        return () => {
            window.removeEventListener('scroll', easeScroll)
        }
    }, [])


    function easeScroll() {
        sx = window.pageXOffset;
        sy = window.pageYOffset;
    }

    function li(a, b, n) {
        return (1 - n) * a + n * b;
    }      

    return (
        <div className="scroll-wrapper" ref={wrapper}>
            {children}
        </div>
    )
}

export default Momentum
