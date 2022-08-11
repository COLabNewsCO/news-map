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
      <p className='summary__intro'><strong>Originality of news sources:</strong> { properties['Original'] } original and { properties['Not Original'] } non-original stories.</p> 
      <p className='summary__intro'><strong>Locality of news sources:</strong> { properties['Local'] } local and { properties['Not Local'] } non-local stories.</p>
    </div>
  );

  return(
    <div className='census__data'>
      <Row>
        <Col sm='3' md='4' lg='3'>
          <div className="census__number">
            <p className='census__number--num'>{ properties.total_sources }</p>
            <p className='census__number--description'>news sources</p>
          </div>
        </Col>
        <Col sm='3' md='4' lg='3'>
          <div className="census__number">
            <p className='census__number--num'>{ intcomma(feature.properties.total_pop) }</p>
            <p className='census__number--description'>people</p>
          </div> 
        </Col>
        <Col sm='3' md='4' lg='3'>
          <div className="census__number">
            <p className='census__number--num'>{ Math.round(feature.properties.pop_density) } people</p>
            <p className='census__number--description'>per sq. mile</p>
          </div>
        </Col>
        <Col sm='3' md='4' lg='3'>
          <div className="census__number">
            <p className='census__number--num'>${ intcomma(feature.properties.median_income) }</p>
            <p className='census__number--description'>median income</p>
          </div>
        </Col>
        
      </Row>
      { scores }
    </div>
  );
}

export default Census;