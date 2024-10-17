import React, { useState, useEffect } from "react";
import "./Slideshow.scss";

const SlideshowDetails = ( {
    item, 
    width, 
    dimensions, 
    mobileBreakpoint
    } ) => {
    
    const textWidth = Math.floor(dimensions.width * 0.022);
    const textWidthMobile = Math.floor(textWidth * 2.0);
    const textWidthProjectile = Math.floor(textWidth * 0.7);
    //console.log(`imgWidth: ${imgWidth}`);
    //console.log(`mobileBreakpoint: ${mobileBreakpoint}`);

    return (
        <div className="slideshowText frosted" style={{ width: width }}>
            {/* <img 
                className="slideshowItem--img frosted__container" 
                src={item.url} 
                style={{
                    //width: dimensions.width >= 650 ? "" : imgWidth
                    width: dimensions.width >= 650 ? "" : dimensions.width > 450 ? imgWidth : "27rem"
                }}
            /> */}
            <p className="slideshowText--p"
                style={{
                    fontSize: dimensions.width < mobileBreakpoint ? textWidthMobile : dimensions.width < 2500 ? textWidth : textWidthProjectile
                }}
            >
                <strong>{item.description}</strong>
            </p>
            {/* <div className="slideshowItem--text">{item.description}</div> */}
        </div>
    )
}

export default SlideshowDetails;