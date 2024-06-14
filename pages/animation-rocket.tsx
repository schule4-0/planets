import React, {useEffect} from 'react';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie';
import * as animationStartData from '../public/rocket.json';
import * as animationLandingData from '../public/roketlanding.json';
//import "./animation-rocket.css"

const Dialog = () => {
    const router = useRouter();

    const handleRouting = () => {
        router.push('/spaceship');
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const elements = document.querySelectorAll('*');
            const targetOpacity = '0.8';
            const targetFill = 'rgb(255, 255, 255)';

            let targetElementOpacity = null;
            let targetElementFill: Element[] = [];
            elements.forEach(element => {
                const style = getComputedStyle(element);
                if (style.opacity === targetOpacity) {
                    targetElementOpacity = element;
                }
                if (element.getAttribute('fill') === targetFill) {
                    console.log(element)
                    targetElementFill.push(element);
                }
            });

            if (targetElementOpacity) {
               targetElementOpacity.style.visibility = "hidden";
            }
            targetElementFill.forEach(element => {
                element.style.visibility = "hidden";
            });
        }, 10); // Delay of 1 second

        // Clean up the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationStartData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={"page-container bg-star flex justify-end relative"}>
            <Lottie style={{position: "absolute", height: "100%", width:"auto", margin: "auto"}}
                options={defaultOptions}
                height={1000}
                width={1000}
            />
        </div>
    );
};

export default Dialog;
