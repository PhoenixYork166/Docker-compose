import React, { useState, useEffect } from 'react';
import classes from './CheckRecords.module.scss';
// Util
import useButtonTextRoll from '../../util/buttonTextRoll';

// Parent component
// src/components/CheckRecords/CheckRecordsPanel.jsx
export default function CheckRecordsLi( {
  user, 
  dimensions,
  onRouteChange,
  onHomeButton,
  onAgeRecordsButton,
  onColorRecordsButton,
  onCelebrityRecordsButton,
  resetState 
} ) {
  const tabs = document.querySelectorAll('.buttons__btn');
    
  return (
    <React.Fragment>
    <div className="buttons">
      <button 
          // onClick={onHomeButton}
          onMouseEnter={useButtonTextRoll(tabs)}
          data-value="Home Page" 
          className={`${classes.lk} buttons__btn`}
      >
        Home Page
      </button>
      <button 
        onClick={onCelebrityRecordsButton}
        onMouseEnter={useButtonTextRoll(tabs)}
        data-value="Celebrity records" 
        className={`${classes.lk} buttons__btn`}
      >
        Celebirty records
      </button>
      <button 
        onClick={onColorRecordsButton}
        onMouseEnter={useButtonTextRoll(tabs)} 
        data-value="Color records"
        className={`${classes.lk} buttons__btn`}
      >
        Color records
      </button>
      <button 
        //onClick={onAgeRecordsButton}
        onMouseEnter={useButtonTextRoll(tabs)} 
        data-value="Age records"
        className={`${classes.lk} buttons__btn`}
      >
        Age records
      </button>
    </div>
    </React.Fragment>
    )
};