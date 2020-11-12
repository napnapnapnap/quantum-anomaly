import React, {useEffect, useState} from 'react';
import {fetchX4Equipment, fetchX4Ships} from '../../redux/x4Actions';
import {connect} from 'react-redux';
import {fillOntoShip} from './x4-fitting-tool';
import {float, int} from './helpers';
import './OldShipEfficiency.scss'

const OldShipEfficiency = (props) => {
  const [firstTest, setFirstTest] = useState([]);
  const [secondTest, setSecondTest] = useState([]);
  const [best, setBest] = useState([]);

  useEffect(() => {
    if (!props.x4.ships) props.fetchX4Ships().then(() => props.fetchX4Equipment());
    if (props.x4.ships && props.x4.equipment) {
      let shipCollection = [];
      Object.keys(props.x4.ships.ship_l).forEach(key => {
        let ship = props.x4.ships.ship_l[key];
        if (ship.type === 'freighter') {
          ship = {...fillOntoShip(ship, props.x4.equipment, 'large', ['engine_spl_l_travel_01_mk1'])};
          ship.first = ship.storage.capacity / (630 * 1000 / ship.speed.travel + 20 * 1000 / ship.speed.forward);
          ship.second = ship.storage.capacity / (630 * 1000 / ship.speed.travel + 20 * 1000 / ship.speed.forward);
          ship.average = (ship.first + ship.second) / 2;
          ship.name = '[L] ' + ship.name;
          shipCollection.push(ship);
        }
      });
      Object.keys(props.x4.ships.ship_m).forEach(key => {
        let ship = props.x4.ships.ship_m[key];
        if (ship.type === 'transporter') {
          ship = {...fillOntoShip(ship, props.x4.equipment, 'medium', ['engine_spl_m_travel_01_mk3'])};
          ship.first = ship.storage.capacity / ((175 * 1000 / ship.speed.travel) + ((480 * 1000) / 13500));
          ship.second = ship.storage.capacity / (630 * 1000 / ship.speed.travel);
          ship.average = (ship.first + ship.second) / 2;
          ship.name = '[M] ' + ship.name;
          shipCollection.push(ship);
        }
      });
      Object.keys(props.x4.ships.ship_s).forEach(key => {
        let ship = props.x4.ships.ship_s[key];
        if (ship.type === 'courier') {
          ship = {...fillOntoShip(ship, props.x4.equipment, 'small', ['engine_spl_s_travel_01_mk3'])};
          ship.first = ship.storage.capacity / (1755 * 1000 / ship.speed.travel + 480 * 1000 / 13500);
          ship.second = ship.storage.capacity / (630 * 1000 / ship.speed.travel);
          ship.average = (ship.first + ship.second) / 2;
          ship.name = '[S] ' + ship.name;
          shipCollection.push(ship);
        }
      });
      shipCollection.sort((a, b) => (a.first < b.first) ? 1 : ((b.first < a.first) ? -1 : 0));
      setFirstTest([...shipCollection]);
      shipCollection.sort((a, b) => (a.second < b.second) ? 1 : ((b.second < a.second) ? -1 : 0));
      setSecondTest([...shipCollection]);

      shipCollection = shipCollection.filter(item => !(item.shortvariation === 'VA'));
      shipCollection.sort((a, b) => (a.average < b.average) ? 1 : ((b.average < a.average) ? -1 : 0));
      setBest([...shipCollection]);
    }
  }, [props.x4.equipment]);

  return (
    <div className='x4__efficiency'>
      <h1>X4 Ship Efficiency</h1>
      <h3>Trading ships</h3>
      <br/>
      <p className='bold'>There is new updated version of this guide <a className='link' href='/x4/efficiency'>available here</a>.</p>
      <p className='bold'>Version described here was discussed
        <a className='link' href='https://www.reddit.com/r/X4Foundations/comments/jrxkfy/x4_trading_ship_efficiency/' target='_blank'> on reddit</a>.
      </p>
      <br/>
      <br/>
      <p className='long-text'>
        In order to understand what makes trading ships efficient we need to look at multiple facts. Is it the ship
        with most cargo? With most speed? With most m³ moved per second? One able to outrun enemies? Some of them are
        easy to figure out, other, well...
      </p>
      <p className='long-text'>
        So let's introduce a metric to measure the performance. The the trading score. We can calculate some things and
        list few other things where you can do your own weighting and come to a decision.
      </p>
      <p className='long-text'>
        Let's set up two different trading scenarios. Both start at Wharf in Profit Center Alpha. For first scenario
        we go to Hatikvah's Choice III to a station. In second scenario we go to Open Market Trading Station. Both
        scenarios include very likable trading route that you might encounter.
      </p>
      <p className='long-text'>
        What can we measure? Well, we know the distances, the cargo spaces of ships and the speeds. The easiest would
        be to just multiply the travel speed with cargo capacity and call it a day. But that doesn't work when we
        include highways. Since ships on highways react averages of 13.500m/s it means that small and medium ships
        get massive boost to their efficiency. So let's look at details.
      </p>


      <h5>Scenario I</h5>
      <p className='long-text'>
        Let's look at distances here. We have 30km to highway and then 240km to next gate. Large ships have to go
        directly to gate, meaning they have 260km to fly. Then in Silent Witness we have 240km highway or 225km direct
        line. In Hatikvah's Choice I we have 25km to the superhighway connection and then 120km on the other side to
        reach station.
      </p>
      <p className='bold'>Medium ships need 175km travel and 480km highways. </p>
      <p className='long-text'>
        Large ships are looking at 630km of travel distance. One
        thing to note is that large ships need to go at the back of the gate and use normal speed to reach the gate.
        They also do some slow moving on the other side when they exit. We will assume that distance is 5km on both
        sides.
      </p>
      <p className='bold'>
        Large ships need 630km travel and 20km normal speeds.
      </p>
      <p className='long-text'>
        So let's look at our ships. Since there is a lot, let's limit the result to the best engine. In case of large
        ships it is Argon Travel L. Time spent is time in travel mode and time in normal mode.
        In case of medium and small ships, as long as you are not in sector, they will spend all time either on highway
        or in travel mode. Time spent is first travel time then highway time and engines are Argon travel.
      </p><br/>
      <div className='efficiency__ships'>
        <div key={Math.random()} className='efficiency__ship'>
          <span className='efficiency__item'>Ship name</span>
          <span className='efficiency__item'>Capacity</span>
          <span className='efficiency__item'>Normal speed</span>
          <span className='efficiency__item'>Travel speed</span>
          <span className='efficiency__item'>Time spent</span>
          <span className='efficiency__item'>m³ moved per second</span>
        </div>
        {firstTest.map(ship => (
          <div key={Math.random()} className='efficiency__ship'>
            <span className='efficiency__item'>{ship.name}</span>
            <span className='efficiency__item'>{int(ship.storage.capacity)}m³</span>
            <span className='efficiency__item'>{int(ship.speed.forward)}m/s</span>
            <span className='efficiency__item'>{int(ship.speed.travel)}m/s</span>
            <span className='efficiency__item'>
              {ship.class === 'ship_l'
                ? <>{int(630 * 1000 / ship.speed.travel)}s / {int(20 * 1000 / ship.speed.forward)}s</>
                : <>{int(175 * 1000 / ship.speed.travel)}s / {int(480 * 1000 / 13500)}s</>
              }
            </span>
            <span className='efficiency__item'>
              {float(ship.first)} m³/s
            </span>
          </div>
        ))}
      </div>
      <br/>
      <p className='long-text'>
        Interesting thing to note here is that as long as there is highway involved, most large traders get blown out
        of the water. Also small traders are really not to be used as soon as you can afford it, maybe 1 or 2 per
        station complex for those small cargo runs so it doesn't block medium ships.
      </p>


      <h5>Scenario II</h5>
      <p className='long-text'>
        Let's look at distances here. We have 200km to next gate. Then in Two Grand we have 260 km to next gate.
        Lastly, we have 170km to reach station in Open Market. Same thing as last time. Large ships still need
        to do their gate finick, while small and medium ships spend all their time in travel mode.
      </p>
      <p className='bold'>Medium ships need 630km travel mode. </p>
      <p className='bold'>Large ships need 630km travel and 20km normal speeds.</p>
      <p className='long-text'>
        Again all ships in table are using Argon Engines since they provide best results.
      </p><br/>
      <div className='efficiency__ships'>
        <div key={Math.random()} className='efficiency__ship'>
          <span className='efficiency__item'>Ship name</span>
          <span className='efficiency__item'>Capacity</span>
          <span className='efficiency__item'>Normal speed</span>
          <span className='efficiency__item'>Travel speed</span>
          <span className='efficiency__item'>Time spent</span>
          <span className='efficiency__item'>m³ moved per second</span>
        </div>
        {secondTest.map(ship => (
          <div key={Math.random()} className='efficiency__ship'>
            <span className='efficiency__item'>{ship.name}</span>
            <span className='efficiency__item'>{int(ship.storage.capacity)}m³</span>
            <span className='efficiency__item'>{int(ship.speed.forward)}m/s</span>
            <span className='efficiency__item'>{int(ship.speed.travel)}m/s</span>
            <span className='efficiency__item'>
              {ship.class === 'ship_l'
                ? <>{int(630 * 1000 / ship.speed.travel)}s / {int(20 * 1000 / ship.speed.forward)}s</>
                : <>{int(630 * 1000 / ship.speed.travel)}s</>
              }
            </span>
            <span className='efficiency__item'>
              {float(ship.second)} m³/s
            </span>
          </div>
        ))}
      </div>
      <br/>
      <p className='long-text'>
        Here things get interesting. Large ships clearly lead when there are no highways... But...
      </p>


      <h3>Conclusions</h3>
      <p className='long-text'>
        We have two different results, based on the fact if we have or have not access to highway. Let's assume that
        our trade ships do kinda both and we want to be ready for all, let's see those ships when we average m³/s
        values. Since Sentinel and Vanguard are very close in results, we can remove Vanguards from the list for
        better overview.
      </p><br/>
      <div className='efficiency__ships'>
        <div key={Math.random()} className='efficiency__ship'>
          <span className='efficiency__item'>Ship name</span>
          <span className='efficiency__item'>Capacity</span>
          <span className='efficiency__item'>Normal speed</span>
          <span className='efficiency__item'>Travel speed</span>
          <span className='efficiency__item'>m³ moved per second</span>
        </div>
        {best.map(ship => (
          <div key={Math.random()} className='efficiency__ship'>
            <span className='efficiency__item'>{ship.name}</span>
            <span className='efficiency__item'>{int(ship.storage.capacity)}m³</span>
            <span className='efficiency__item'>{int(ship.speed.forward)}m/s</span>
            <span className='efficiency__item'>{int(ship.speed.travel)}m/s</span>
            <span className='efficiency__item'>{float(ship.average)} m³/s</span>
          </div>
        ))}
      </div>
      <br/>
      <p className='long-text'>
        Now the hard thing. Should you use the top one? Hell no... Depends
      </p>
      <p className='long-text'>
        Should you use the top one for trading? Probably not... Depends on what you actually need. Keep in mind that
        Large ships can't dock everywhere. If you find yourself in sector with one, it will take ages to dock or
        actually take the gate. It will hit every asteroid and stop. From personal experience, I started with about 100
        Mercuries as station traders. Lost about 10 of them in 20 hour playthrough. Then I switched to Boa. That ship is
        amazing, since it can outrun all but few selected ships. Cobra and Dragon are a threat at most, rest it can
        outrun, outboost or survive until it gets to station.
      </p>
      <p className='long-text'>
        One other thing to consider is that your ships should be doing something. If you have medium ships, you can
        quickly tell them to do something else, like move some claytronics from here to there and go back to their
        business. With medium ships they will get to that order faster on average, fullfill it and get back to their
        job. This plays a big role in some setups.
      </p>
      <p className='long-text'>
        Filling large cargohold won't be that easy on most wares, so your ship will look for ages to find full hold and
        then sell it. With Boas smaller hold it goes faster. If you do distribute ware with large ship, it will take
        ages and lot's of docking to get rid of all wares.
      </p>
      <p className='long-text'>
        It might sound I am saying there is no use for large ships. But there is... When I build new stations, I can
        send 20 of my Boas to deliver hull parts. They are mostly around Argon Prime doing station trading. So I tell
        them to go where ever and pick up stuff and go somewhere and drop off stuff. Distance doesn't matter. If I was
        doing that with large ships, I would not tell them to pick up stuff on other side of universe. However, if you
        do have complex that produces hull parts or claytronics, then might be a good idea to park few large ships next
        to it so that you can use 10 large ships instead of 20-30 trips with medium ships.
      </p>
      <p className='long-text'>
        Overall, early and mid game, use medium ships, Boa, Demeter or Mercury. I suggest Boa for it's survavibility.
        Late game, use same ships, but if you're bursting with money and wanna save some clicks when building that next
        complex, have 10ish Buffalos or Sonras parked next to your production stations to make things easy! Also, the
        more you spend time close to highways the more the efficiency of medium ships goes up, so keep that in mind as
        well.
      </p>
    </div>
  );
};

const mapStateToProps = state => ({x4: state.x4}),
  mapDispatchToProps = {fetchX4Ships, fetchX4Equipment};

export default connect(mapStateToProps, mapDispatchToProps)(OldShipEfficiency);
