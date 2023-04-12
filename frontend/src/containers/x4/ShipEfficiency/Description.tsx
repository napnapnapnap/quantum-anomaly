import React from 'react';

const Description = () => (
  <div className="text--long">
    <br />
    <br />
    <h3>Large Transport Ships</h3>
    <p>
      For large ships there are three things to consider. First obvious thing is if it can dock at the station you want
      to trade with. This is something you have to discover on your own for the materials you want to trade. Second
      thing is that large ships can't use highways, so their efficiency is mostly limited by their travel speed and
      cargo size. Third thing is that large ships jump systems differently. After some testing in game, results were
      inconclusive, so far I am using an average number of 20 jumps which roughly equates to ships having to travel on
      average 10 km with their normal drive before engaging travel time. Do keep in mind that my results varied between
      7 km and 12 km. I suspect that the angle of the next destination waypoint now plays a role as well, which is very
      hard to average.
    </p>
    <p>
      One other thing to consider is engines, on large ships they can take a lot of time to speed up. For example with
      argon engines, it takes 85 seconds for a large ship to reach full speed. In that time they can cover up to around
      75km range which is not at full speed. That is why one can notice that in most cases, when trading, one should use
      terran engines.
    </p>
    <p>
      So settings mostly related to large ships are total distance covered, 1000km sounds like a good estimation for the
      range of 4 systems and number of gates they will have to use. That is actual jump gates, acceleration gates are
      fine.
    </p>
    <h3>Small and Medium Transport Ships</h3>
    <p>
      For medium ships there is one main thing to consider, they can use highways. Now speeds on highways are the same
      for all ships, but not same for all highways. At the time of writing, in game they range from 11.000 to 15.000 and
      it was decided for 13.500 average. You can change that setting if you want to do something else. The problem is
      that usage of highways affects their efficiency in a very enormous way. So there is a setting of what % of
      highways you expect your trading ships to use. If they will be trading in core sectors, try to figure out for
      yourself how much time they will spend on highways. Argon Prime traders probably do it about 80% of time. Tharka's
      Ravine traders do it 0% of the time.
    </p>
    <h3>What else should I consider?</h3>
    <p>
      Few other things to keep in mind. Large traders usually can withstand attacks from smaller fighters. Some medium
      traders like Boa can outrun most of the things that can threaten it. Small traders usually can outrun everything,
      but they carry very little cargo. However they are useful to have 1-2 per every 8-10 medium traders on station so
      that they can take care of smaller wares like medicine or energy cells without blocking larger traders.
    </p>
    <h3>Which settings should I use?</h3>
    <p>
      So settings related to small and medium ships are total distance covered, 1000km sounds like a good estimation for
      4 systems and percentage of that distance they can spend on highways.
    </p>
    <p>
      Please feel free to discuss this tool and methods further on reddit
      <a
        className="link"
        href="https://www.reddit.com/r/X4Foundations/comments/jrxkfy/x4_trading_ship_efficiency/"
        target="_blank"
      >
        {' '}
        via this link
      </a>
      .
    </p>
  </div>
);

export default Description;
