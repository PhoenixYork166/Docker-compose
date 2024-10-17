import React, {useState, useEffect} from "react";
import "./Slideshow.scss";
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';

// Parent component
// 1. src/routes/Records/ColorRecords.jsx
const SlideshowCelebrityRecords = ( { 
    dimensions,
    userCelebrityRecords
    } ) => {
    
    // useState Slideshow officePhotos' index
    const [activeIndex, setActiveIndex] = useState(0);

    // Monitor resolutions
    //console.log(`dimensions.width * 0.8 * 0.5: ${dimensions.width * 0.8 * 0.5}`)
    // For window.inner.width >= 
    //const slideshowWidthGt = Math.floor(dimensions.width*0.435);

    // Declare Mobile breakpoint
    const desktopBreakpoint = 1280;
    const mobileBreakpoint = 860;

    const slideshowWidthGt = '514px';
    // For window.inner.width < 
    const slideshowWidthLt = Math.floor(dimensions.width*0.879);
    //console.log(`slideshowWidth: ${slideshowWidth}`);
    
    const slideshowHeightGt = Math.floor(dimensions.width * 0.25);
    const slideshowHeightLt = Math.floor(slideshowWidthLt * 2.2);

    const btnParentWidthGt = Math.floor(slideshowWidthGt * 0.12);
    const btnParentWidthLt = Math.floor(slideshowWidthLt * 0.12);

    // To update Slideshow Photos' index
    // const updateIndex = (newIndex) => {
    //     if (newIndex < 0) {
    //         // Not to show when officePhotos.length < 0
    //         newIndex = 0;
    //     } else if (newIndex >= BraPhotos.length) {
    //         // When Slideshow hits the last item
    //         // It will just go back to 1st item => LOOP
    //         newIndex = 0;
    //         //newIndex = officePhotos.length -1;
    //     }
    //     setActiveIndex(newIndex);
    // };

    // Allow Slideshow officePhotos to jump every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
          
          // Increment the active index
          // updateIndex(activeIndex + 1);
        }, 3000); // Advance every 3 seconds
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
      }, [activeIndex]); // Re-run the effect when activeIndex changes

    return (
        <div className="root"
            style={{
                height: dimensions.width < 550 ? "680px" : "",
            }}
        >
            <div 
                className="slideshow"
                style={{
                    width: dimensions.width >= mobileBreakpoint ? slideshowWidthGt : slideshowWidthLt,
                    scale: dimensions.width < mobileBreakpoint ? "0.85" : ""
                }}
            >
                <div 
                    className="slideshow__inner"
                    style={{
                        transform: `translate(-${activeIndex * 100}%)`,
                    }}
                >
                    <p>Slideshow DateTime testing</p>
                    {/* {BraPhotos.map((item, i) => {
                        return (
                            // <BraItem 
                            //     item={item} 
                            //     width={"100%"}
                            //     dimensions={dimensions}
                            //     slideshowWidthGt={slideshowWidthGt}
                            //     slideshowWidthLt={slideshowWidthLt}
                            //     slideshowHeightGt={slideshowHeightGt}
                            //     slideshowHeightLt={slideshowHeightLt}
                            //     mobileBreakpoint={mobileBreakpoint}
                            // />
                            <p>Test Slideshow details</p>
                        )
                    })} */}
                </div>

                <div className="slideshow__btn"
                    style={{
                        width: dimensions.width >= mobileBreakpoint ? slideshowWidthGt : slideshowWidthLt,
                    }}
                >
                    <button 
                        style={{
                            width: dimensions.width >= mobileBreakpoint ? btnParentWidthGt : btnParentWidthLt,
                        }}
                        className="slideshow__btn--arrow frosted__children"
                        onClick={() => {
                            // updateIndex(activeIndex - 1);
                        }}
                    >
                    <MaterialSymbol 
                    icon="arrow_back_ios" 
                    style={{width: dimensions.width >= mobileBreakpoint ? btnParentWidthGt : btnParentWidthLt}}
                    />
                    </button>

                    <div className="indicators"
                        style={{
                            //width: dimensions.width >= mobileBreakpoint ? indicatorWidthGt : indicatorWidthLt,
                        }}
                    >
                        <p>Slideshow Indicator testing</p>
                        {/* To relay same number of Radio Buttons Checked 
                        according to number of existing BraPhotos */}

                        {/* {BraPhotos.map((item, index) => {
                            return (
                                <button 
                                    className="indicators--btn"
                                    style={{
                                        width: dimensions.width >= mobileBreakpoint ? Math.floor(slideshowWidthGt * 0.06) : Math.floor(slideshowWidthLt * 0.06),
                                    }}
                                    onClick={() => {
                                        // updateIndex with current index
                                        updateIndex(index);
                                    }}
                                >
                                    <span 
                                        className={
                                            `material-symbols-outlined ${
                                            index === activeIndex ? 
                                            "indicator-symbol-active" : 
                                            "indicator-symbol" }`
                                            }
                                    >
                                        radio_button_checked
                                    </span>
                                </button>
                            );
                        })}  */}
                    </div>

                    <button 
                        style={{
                            width: dimensions.width >= mobileBreakpoint ? btnParentWidthGt : btnParentWidthLt,
                            //visibility: dimensions.width < 800 ? "hidden" : "visible"
                        }}
                        className="slideshow__btn--arrow frosted__children"
                        onClick={() => {
                            // updateIndex(activeIndex + 1);
                        }}
                    >
                    <MaterialSymbol 
                    icon="arrow_forward_ios" 
                    style={{width: dimensions.width >= mobileBreakpoint ? btnParentWidthGt : btnParentWidthLt}}
                    />
                    </button>
                </div>

                <div className="slideshow__inner"
                    style={{
                        transform: `translate(-${activeIndex * 100}%)`
                    }}
                >
                    <p>Slideshow Details testing</p>
                    {/* {BraPhotos.map((item, i) => {
                        // Adding 100% will render next image
                        return <SlideshowDetails 
                                item={item} 
                                width={"100%"}
                                dimensions={dimensions}
                                slideshowWidthGt={slideshowWidthGt}
                                slideshowWidthLt={slideshowWidthLt}
                                slideshowHeightGt={slideshowHeightGt}
                                slideshowHeightLt={slideshowHeightLt}
                                mobileBreakpoint={mobileBreakpoint}
                                />
                    })} */}
                </div>
            </div>
        </div>
    )
}

export default SlideshowCelebrityRecords;