import React from 'react';

const Tooltip = ({ feature }) => {
  const { id } = feature.properties;
  const { properties } = feature;

  if (properties.hasOwnProperty('Original') && properties.hasOwnProperty('Local')) {
    return (
      <div id={`tooltip-${id}`}>
        <h4 className='tooltip__hed'><strong>{ properties.NAME } County</strong></h4>
        <p className='tooltip__text'><strong>{ properties.total_sources }</strong> Identified sources of local news and info.</p>    
        <p className='tooltip__text'><strong>On a weekday in 2021, researchers found in this county:</strong></p> 
        <p className='tooltip__text'>{ properties['Original'] } Original and { properties['Not Original'] } non-original stories.</p>
        {/*<p className='tooltip__text'><strong>Locality of news stories:</strong></p>*/}
        <p className='tooltip__text'>{ properties['Local'] } Local and { properties['Not Local'] } non-local stories.</p>
      </div>
    );
  }

  return (
    <div id={`tooltip-${id}`}>
      <h4 className='tooltip__hed'><strong>{ properties.NAME } County</strong></h4>
      <p><strong>Total news sources:</strong> { properties.total_sources }</p>
    </div>
  );
};

export default Tooltip;