import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { intcomma } from 'journalize';
// import { PieChart, Pie, ResponsiveContainer, LabelList } from 'recharts';

import './Census.scss';

function Census(props) {
  const { feature } = props;
  const { properties } = feature;
  const showScores = (properties.hasOwnProperty('Original') && properties.hasOwnProperty('Local'));

  const scores = showScores && (
    <div>
      <p className="summary__intro"><strong>On a weekday in 2021, researchers found in this county:</strong></p>
      <p className='summary__intro'>{ properties['Original'] } Original and { properties['Not Original'] } non-original stories.</p> 
      <p className='summary__intro'> { properties['Local'] } Local and { properties['Not Local'] } non-local stories.</p>
    </div>
  );

  return(
    <div className='census__data'>
      <Row>
        <Col sm='3' md='4' lg='3'>
          <div className="census__number">
            <p className='census__number--num'>{ properties.total_sources }</p>
            <p className='census__number--description'>Identified local news and info sources</p>
          </div>
        </Col>
        <Col sm='3' md='4' lg='3'>
          <div className="census__number">
            <p className='census__number--num'>{ intcomma(feature.properties.total_pop) }</p>
            <p className='census__number--description'>People</p>
          </div> 
        </Col>
        <Col sm='3' md='4' lg='3'>
          <div className="census__number">
            <p className='census__number--num'>{ Math.round(feature.properties.pop_density) } people</p>
            <p className='census__number--description'>Per sq. mile</p>
          </div>
        </Col>
        <Col sm='3' md='4' lg='3'>
          <div className="census__number">
            <p className='census__number--num'>${ intcomma(feature.properties.median_income) }</p>
            <p className='census__number--description'>Median income</p>
          </div>
        </Col>
        
      </Row>
      { scores }
    </div>
  );
}

export default Census;