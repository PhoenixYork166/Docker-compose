import React, {useState, useEffect} from "react";
import "./Slideshow.scss";
import BraPhotos from "./BraPhotos";
import BraItem from "./BraItem";
import SlideshowDetails from "./SlideshowDetails";

const Slideshow = ( { 
    dimensions, 
    slideshowWidthGt, 
    slideshowWidthLt,
    slideshowHeightGt,
    slideshowHeightLt, 
    btnParentWidthGt, 
    btnParentWidthLt, 
    textSize, 
    indicatorWidthGt, 
    indicatorWidthLt,
    indicatorSpanWidth,
    breakpoint, 
    mobileBreakpoint 
    } ) => {
    
    // useState Slideshow officePhotos' index
    const [activeIndex, setActiveIndex] = useState(0);

    // To update Slideshow officePhotos' index
    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            // Not to show when officePhotos.length < 0
            newIndex = 0;
        } else if (newIndex >= BraPhotos.length) {
            // When Slideshow hits the last item
            // It will just go back to 1st item => LOOP
            newIndex = 0;
            //newIndex = officePhotos.length -1;
        }
        setActiveIndex(newIndex);
    };

    // Allow Slideshow officePhotos to jump every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
          // Increment the active index
          updateIndex(activeIndex + 1);
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
                    {BraPhotos.map((item, i) => {
                        // Adding 100% will render next image
                        return <BraItem 
                                item={item} 
                                width={"100%"}
                                dimensions={dimensions}
                                slideshowWidthGt={slideshowWidthGt}
                                slideshowWidthLt={slideshowWidthLt}
                                slideshowHeightGt={slideshowHeightGt}
                                slideshowHeightLt={slideshowHeightLt}
                                breakpoint={breakpoint}
                                mobileBreakpoint={mobileBreakpoint}
                                />
                    })}
                </div>

                <div className="slideshow__btn"
                    style={{
                        width: dimensions.width >= mobileBreakpoint ? slideshowWidthGt : slideshowWidthLt,
                    }}
                >
                    {/* 
                        Check out ./public/index.html 
                        Line 12 to 37
                        for usage of Radio button checked usage
                    */}
                    {/* This is for < Arrow Left iOS from Google Fonts */}
                    <button 
                        style={{
                            width: dimensions.width >= mobileBreakpoint ? btnParentWidthGt : btnParentWidthLt,
                        }}
                        className="slideshow__btn--arrow frosted__children"
                        onClick={() => {
                            updateIndex(activeIndex - 1);
                        }}
                    >
                        <span class="material-symbols-outlined">arrow_back_ios</span>{" "}
                    </button>

                    <div className="indicators"
                        style={{
                            //width: dimensions.width >= mobileBreakpoint ? indicatorWidthGt : indicatorWidthLt,
                        }}
                    >
                        {/* To relay same number of Radio Buttons Checked 
                        according to number of existing BraPhotos */}
                        {BraPhotos.map((item, index) => {
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
                        })} 
                    </div>

                    <button 
                        style={{
                            width: dimensions.width >= mobileBreakpoint ? btnParentWidthGt : btnParentWidthLt,
                            //visibility: dimensions.width < 800 ? "hidden" : "visible"
                        }}
                        className="slideshow__btn--arrow frosted__children"
                        onClick={() => {
                            updateIndex(activeIndex + 1);
                        }}
                    >
                        <span class="material-symbols-outlined">arrow_forward_ios</span> 
                    </button>
                </div>

                <div className="slideshow__inner"
                    style={{
                        transform: `translate(-${activeIndex * 100}%)`
                    }}
                >
                    {BraPhotos.map((item, i) => {
                        // Adding 100% will render next image
                        return <SlideshowDetails 
                                item={item} 
                                width={"100%"}
                                dimensions={dimensions}
                                slideshowWidthGt={slideshowWidthGt}
                                slideshowWidthLt={slideshowWidthLt}
                                slideshowHeightGt={slideshowHeightGt}
                                slideshowHeightLt={slideshowHeightLt}
                                breakpoint={breakpoint}
                                mobileBreakpoint={mobileBreakpoint}
                                />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Slideshow;