import React, {useEffect, useState} from 'react';
import {fetchX4Equipment, fetchX4Ships} from '../../redux/x4Actions';
import {connect} from 'react-redux';
import {fillOntoShip} from './x4-fitting-tool';
import {float, int, separateWord, translateRace} from './helpers';
import './ShipEfficiency.scss';

const LARGE_SHIP_EXTRA_TRAVEL = 4.5 + 7.5;

const ShipEfficiency = (props) => {
  const [race, setRace] = useState('arg');
  const [distance, setDistance] = useState(1000);
  const [jumpGates, setJumpGates] = useState(4);
  const [percentHighway, setPercentHighway] = useState(80);
  const [highwaySpeed, setHighwaySpeed] = useState(13500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!props.x4.ships) props.fetchX4Ships().then(() => props.fetchX4Equipment());

    if (props.x4.ships && props.x4.equipment) {
      let shipCollection = [];
      const extraNormalTravelDistance = jumpGates * LARGE_SHIP_EXTRA_TRAVEL;
      const highwayDistance = distance * percentHighway / 100;

      Object.keys(props.x4.ships.ship_l).forEach(key => {
        let ship = props.x4.ships.ship_l[key];
        if (ship.type === 'freighter') {
          ship = {...fillOntoShip(ship, props.x4.equipment, 'large', [`engine_${race}_l_travel_01_mk1`])};
          ship.travelTime = distance * 1000 / ship.speed.travel + extraNormalTravelDistance * 1000 / ship.speed.forward;
          ship.tradeScore = ship.storage.capacity / ship.travelTime;
          shipCollection.push(ship);
        }
      });
      Object.keys(props.x4.ships.ship_m).forEach(key => {
        let ship = props.x4.ships.ship_m[key];
        if (ship.type === 'transporter') {
          ship = {...fillOntoShip(ship, props.x4.equipment, 'medium', [`engine_${race}_m_travel_01_mk3`])};
          ship.travelTime = (distance - highwayDistance) * 1000 / ship.speed.travel + highwayDistance * 1000 / highwaySpeed;
          ship.tradeScore = ship.storage.capacity / ship.travelTime;
          shipCollection.push(ship);
        }
      });
      Object.keys(props.x4.ships.ship_s).forEach(key => {
        let ship = props.x4.ships.ship_s[key];
        if (ship.type === 'courier') {
          ship = {...fillOntoShip(ship, props.x4.equipment, 'small', [`engine_${race}_s_travel_01_mk3`])};
          ship.travelTime = (distance - highwayDistance) * 1000 / ship.speed.travel + highwayDistance * 1000 / highwaySpeed;
          ship.tradeScore = ship.storage.capacity / ship.travelTime;
          shipCollection.push(ship);
        }
      });
      shipCollection.sort((a, b) => (a.tradeScore < b.tradeScore) ? 1 : ((b.tradeScore < a.tradeScore) ? -1 : 0));
      setResults(shipCollection);
    }
  }, [props.x4.equipment, race, distance, jumpGates, percentHighway, highwaySpeed]);

  return (
    <div className='x4__efficiency'>
      <h1>X4 Ship Efficiency</h1>
      <h5>Notice</h5>
      <p className='long-text'>
        This information is out of date for v4.0. Large ships now take different time
        to pass the gate. I will update this guide in next few days and remove this notice.
      </p>
      <h3>Large Transport Ships</h3>
      <p className='long-text'>
        For large ships there are three things to consider. First obvious thing is if it can dock at station you want to
        trade with. This is something you have to discover on your own for the materials you want to trade. Second thing
        is that large ships can't use highways, so their efficiency is mostly limited by their travel speed and cargo
        size. Third thing is that large ships jump systems by going at the back of the gate. After some testing in game,
        results show that time needed to jump out of sectors is same as ship needing to travel about 4.5km and time
        needed to go into travel mode on other side is about same as ship needing to travel 7.5km. On the bottom of the
        page you can find more details.
      </p>
      <p className='long-text'>
        So settings mostly related to large ships are total distance covered, 1000km sounds like good estimation for
        range of 4 systems and number of gates they will have to use. That is actual jump gates, acceleration gates are
        fine.
      </p>
      <h3>Small and Medium Transport Ships</h3>
      <p className='long-text'>
        For medium ships there is one main thing to consider, they can use highways. Now speeds on highways are same for
        all ships, but not same for all highways. At the time of writting, in game they range from 11.000 to 15.000 and
        it was decided for 13.500 average.
        You can change that setting if you want to something else. The problem is that usage of highways effects their
        efficiency in very enourmous way. So there is a setting of what % of highways you expect your trading ships to
        use. If they will be trading in core sectors, try to figure out for yourself how much time they will spend on
        highways. Argon Prime traders probably do it about 80% of time. Tharka's Ravine traders do it 0% of the
        time.
      </p>
      <p className='long-text'>
        So settings related to small and medium ships are total distance covered, 1000km sounds like good estimation for
        4 systems and percentage of that distance they can spend on highways.
      </p>
      <h3>Trading Score Tool</h3>
      <p className='long-text'>
        Now that you are aware of these things, feel free to use this tool to try to figure out which traders might work
        best for your use case scenario
      </p>

      <div className='x4__controls'>
        <div className='x4__radio-group x4__radio-group--numbers'>
          <p className='x4__radio-title'>Variables you want to use</p>
          <label>
            <input type='number' defaultValue='1000' min='10' max='10000'
                   onChange={e => setDistance(parseInt(e.target.value, 10))}/> km of total whole trip
          </label><br/>
          <label>
            <input type='number' defaultValue='4' min='0' max='15'
                   onChange={e => setJumpGates(parseInt(e.target.value, 10))}/> jump gates
          </label><br/>
          <label>
            <input type='number' defaultValue='80' min='0' max='100'
                   onChange={e => setPercentHighway(parseInt(e.target.value, 10))}/> percent of travel on highway
          </label><br/>
          <label>
            <input type='number' defaultValue='13500' min='10000' max='15000'
                   onChange={e => setHighwaySpeed(parseInt(e.target.value, 10))}/> m/s highway speed
          </label>
        </div>
        <div className='x4__radio-group x4__radio-group'>
          <p className='x4__radio-title'>Travel engines you want to use (highest Mk available for class)</p>
          <label className='x4__radio-label'>
            <input type='radio' name='engines' value='arg' onChange={e => setRace('arg')} defaultChecked/> Argon
          </label>
          <label className='x4__radio-label'>
            <input type='radio' name='engines' value='par' onChange={e => setRace('par')}/> Paranid
          </label>
          <label className='x4__radio-label'>
            <input type='radio' name='engines' value='spl' onChange={e => setRace('spl')}/> Split
          </label>
          <label className='x4__radio-label'>
            <input type='radio' name='engines' value='tel' onChange={e => setRace('tel')}/> Teladi
          </label>
          <label className='x4__radio-label'>
            <input type='radio' name='engines' value='ter' onChange={e => setRace('tel')}/> Terran
          </label>
        </div>
      </div>


      <div className='x4-ships-efficiency'>
        {results.map((ship, index) => (
          <div key={Math.random()} className='x4-ships-efficiency__ship'>
            <span className='x4-ships-efficiency__place'>
              <span className='bold'>{index + 1}</span>
            </span>
            <img src={`/images/x4/${ship.id}.jpg`}/>
            <span className='x4-ships-efficiency__info'>
              <span className='bold'>{ship.name}</span><br/>
              {translateRace(ship.race)} {separateWord(ship.type)}
            </span>
            <span className='x4-ships-efficiency__capacity'>
              <span className='bold'>Storage capacity</span><br/>
              {int(ship.storage.capacity)}m³
            </span>
            <span className='x4-ships-efficiency__speed'>
              <span className='bold'>Normal Speed</span><br/>
              {int(ship.speed.forward)} m/s
            </span>
            <span className='x4-ships-efficiency__speed'>
              <span className='bold'>Travel Speed</span><br/>
              {int(ship.speed.travel)} m/s
            </span>
            <span className='x4-ships-efficiency__ttc'>
              <span className='bold'>Done after</span><br/>
              {int(ship.travelTime)} seconds
            </span>
            <span className='x4-ships-efficiency__ttc'>
              <span className='bold'>Trade score</span><br/>
              {float(ship.tradeScore)} m³/s
            </span>
          </div>
        ))}
      </div>
      <br/>
      <p className='long-text'>
        Few other things to keep in mind. Large traders usually can withstand attacks from smaller fighters. Some medium
        traders like Boa can outrun most of the things that can threaten it. Small traders usually can outrun
        everything, but they carry very little cargo. However they are usefull to have 1-2 per every 8-10 medium traders
        on station so that they can take care of smaller wares like medicine or energy cells without blocking larger
        traders.
      </p>
      <p className='long-text'>
        For the calculation of large ships time needed to cross a gate, Boa, Sonra Vanguard and Incarcatura Vanguard
        were used. It was tested on 5 gate jumps for each. Boa on average took 30 seconds on one side, 45 seconds on
        other side. Sonra did 45 seconds and 70 seconds. Incarcatura 90 seconds and 150 seconds on average. They land
        behind the gate about 4.5 km and then use normal drive to cross that distance. On the other side they do this
        weird thing of flying a bit forward, then turning around and flying a bit back and finally turning again and
        engaging drive. The times waried a bit, so it is safe to assume that it is not the same every time, hence the
        decision to average it out on 7.5km.
      </p>
      <p className='long-text'>
        Please feel free to discuss this tool and methods further on reddit
        <a className='link'
           href='https://www.reddit.com/r/X4Foundations/comments/jrxkfy/x4_trading_ship_efficiency/'
           target='_blank'> via this link</a>.
      </p>
    </div>
  );
};

const mapStateToProps = state => ({x4: state.x4}),
  mapDispatchToProps = {fetchX4Ships, fetchX4Equipment};

export default connect(mapStateToProps, mapDispatchToProps)(ShipEfficiency);
