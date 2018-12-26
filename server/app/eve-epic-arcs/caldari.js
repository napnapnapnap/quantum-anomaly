export default function () {
  return {
    'name':        'Penumbra',
    'iconID':      '500001',
    'empire':      'Caldari State',
    'race':        'caldari',
    'starter':     'Aursa Kunivuri',
    'description': ['The Caldari epic arc does have lots of traveling, so bring interceptor or covert ops since you\'ll be using your dps ships for 3-5 missions tops',
                    'To start this epic arc you need standings of 5.0 towards Aursa Kunivuri, Expert Distribution or Caldari State'],
    'rewards':     [
      '+10% Caldari State faction standing increase (unmodified)',
      '1 x Hyasyoda Mobile Laboratory (3 000 m3)'
    ],
    'notes':       [
      'You need Data Analyzer in mission 11 and 15',
      'You need Probe Launcher in mission 15 if you decide to do it (can be avoided, refer to mission)',
      'You will need to go to lowsec or 0.0, so bring a ship you feel comfortable in using for those areas. You do not need combat ship for those missions',
      'Poinen system is perfect to park your main ship until you need it for first combat mission.',
      'Last mission has jammers which are cheating (refer to mission)'
    ],
    'missions':    [{
      'name':          'The Intermediary',
      'agent':         'Aursa Kunivuri',
      'agentLocation': 'Josameto - Nugoeihuvi Information Center',
      'type':          'Courier',
      'destination':   'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio, 1 jump away',
      'description':   ['Deliver 1 x Dossier - Author Unknown (0.1 m3) to Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio which is one jump out and has agent who provides next mission'],
      'tips':          ['Have your battleship docked up in this system, use non-combat small ship for next few missions'],
      'completed':     'Fly to destination and start conversation with agent.'
    }, {
      'name':          'Trust and Discretion',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Courier',
      'destination':   'Josameto VIII - Nugoeihuvi Corporation Publisher, 1 jump out',
      'description':   ['Deliver Questionable Cargo (3.0 m3) to Josameto which is one jump out'],
      'tips':          ['Don\'t forget to take to cargo with you when you undock'],
      'completed':     'Fly to destination and start conversation with agent.'
    }, {
      'name':          'Their loss, our profit',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Combat and retrieve item',
      'destination':   'Any system in constellation',
      'description':   ['Destroy Hyasyoda Research Facility and loot 1 x S.I Formula Sheet (0.1 m3)'],
      'enemy':         'Serpentis (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '80 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Battleships (closer formation)',
          'effect': 'Trigger wave I'
        }, {
          'number': '2-3',
          'name':   'Battleships'
        }, {
          'number': '1',
          'name':   'Hyasyoda Research Facility',
          'effect': 'Trigger wave III at 50% shield damage'
        }]
      }, {
        'range':   '50 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Elite Frigates',
          'effect': 'Sensor dampener'
        }, {
          'number': '5',
          'name':   'Battleships',
          'effect': 'Trigger wave II'
        }]
      }, {
        'range':   '25 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '5',
          'name':   'Elite Cruisers',
          'effect': 'Sensor dampener'
        }, {
          'number': '4',
          'name':   'Battleships'
        }]
      }, {
        'range':   '80 kilometers',
        'enemies': [{
          'number': '8',
          'name':   'Elite Frigates'
        }]
      }]],
      'tips':          ['You can blitz mission if you kill Hyasyoda Research Facility and loot, there is no need to kill NPC\'s',
                        'Don\'t forget to loot the 1 x S.I Formula Sheet (0.1 m3)',
                        'After this mission is done, dock up combat ships and go back to non-combat fast ship for couriers and lowsec missions ahead'],
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'The Paths That Are Hidden',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Epic arc choice',
      'destination':   'Same station',
      'description':   ['Choose your side',
                        'Best option for maximum reward is to take An Honorable Betrayal which unlocks 3 very fast missions with no combat but enables you to choose 1 x Hyasyoda Mobile Laboratory as reward at the end'],
      'tips':          ['An Honorable Betrayal should be the next mission'],
      'completed':     'Just confirm your choice.'
    }, {
      'name':          'An Honorable Betrayal',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Courier',
      'destination':   'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost , 5 jump out',
      'description':   ['Take 1 x S.I. Formula (0.1 m3) with you',
                        'Trust me, even though mission doesn\'t tell you, next one is to give this formula to agent you are going to visit'],
      'tips':          ['Take the formula with you',
                        'Do not forget the formula',
                        'You will forget the formula sooner or later'],
      'completed':     'Fly to destination and start conversation with agent.'
    }, {
      'name':          'Proof of Intent',
      'agent':         'Arikio Kuretsu',
      'agentLocation': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type':          'Courier',
      'destination':   'Same station',
      'description':   ['Give the 1 x S.I. Formula (0.1 m3) to the agent, no need to even undock and one of the best missions in this arc',
                        'If you didn\'t forget to bring the formula. If you forgot the formula, get used to it, you\'ll have plenty of chances to forget it again'],
      'tips':          ['-'],
      'completed':     'Just complete mission if you have the formula with you.'
    }, {
      'name':          'Return to Isha',
      'agent':         'Arikio Kuretsu',
      'agentLocation': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type':          'Courier',
      'destination':   'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio, 5 jumps away',
      'description':   ['Report to Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio which is 5 jumps out. Take 1 x S.I. Formula (0.1 m3) with you'],
      'tips':          ['Do not forget the Formula!'],
      'completed':     'Fly to destination and talk to next agent.'
    }, {
      'name':          'Re-examining Options',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Epic arc choice',
      'destination':   'Same station',
      'description':   ['You are presented with same choice as last time, but this time there is no Hyasyoda option since you did it',
                        'Your choice now is only if you want to do next mission in lowsec or 0.0',
                        'Since it has no effect on final reward, I recommend lowsec route since it is a bit safer and there are no warp bubbles'],
      'tips':          ['Playing it Safer should be the next mission'],
      'completed':     'Just confirm your choice.'
    }, {
      'name':          'Playing it Safer',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Courier (Lowsec space - prepare ship accordingly)',
      'destination':   'Faurulle, 31 jumps away (28 lightyears)',
      'description':   ['Deliver 1 x S.I. Formula (0.1 m3) to Faurulle which is 31 jumps on safest route taking you through lowsec only'],
      'tips':          ['Do not forget to take formula with you',
                        'Take care navigating lowsec if you never did it before'],
      'completed':     'Complete remotely once you get to destination.'
    }, {
      'name':          'Almost Unmasked',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Travel',
      'destination':   'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost, 5 jumps away from agent, 30+ from last mission objective drop',
      'description':   ['Report to Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost which is 5 jumps from where you left your battleship',
                        'You will not need them yet, but at least you are closer to them'],
      'tips':          ['Your stuff should still be in Poinen, don\'t move it from there, you wont need it'],
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Some Light Theatrics',
      'agent':         'Arikio Kuretsu',
      'agentLocation': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type':          'Hack and retrieve item',
      'destination':   'Same system',
      'description':   ['Use a Data Analyzer to deactivate the NOH surveillance then evacuate 5 x CPF Security Personnel (15.0 m3) from the CPF Habitation Module',
                        'Use a frigate with data analyzer, you have 30 seconds to get the team out after hack or they will die when the structure explodes',
                        'Do not warp off until you get mission update but get 10 kilometers range on structure since it might do AoE damage under 10 kilometers'],
      'tips':          ['There are no enemies, but make sure to get team out in time, otherwise they die and you fail this epic arc',
                        'If you fail the hack you can try again'],
      'completed':     'Deliver the team back to sation.'
    }, {
      'name':          'Untouchable',
      'agent':         'Arikio Kuretsu',
      'agentLocation': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type':          'Travel',
      'destination':   'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio, 5 jumps away',
      'description':   ['Fly back to Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio and report to agent',
                        'Remember those battleships you were so eager to bring along on this epic arc, now it is time to use them even though you most likely won\'t fire the guns for a while',
                        'Leave the frigate and take the battleship'],
      'tips':          ['-'],
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'A General\'s Best Friend',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Combat',
      'destination':   'Any system in constellation',
      'description':   ['Get to the station in first pocket',
                        'Skip killing the NPC\'s unless you don\'t mind taking an standings hit for Gallente Federation',
                        'They do not scram, but battleship tank is recommended',
                        'They do a bit of EM damage as well, so don\'t leave EM hole gapping on your resist profile'],
      'enemy':         'Gallente Navy (Tank against: Thermal/Kinetic/EM, Best damage: Thermal/Kinetic)',
      'pockets':       [[{
        'range':   '5 kilometers',
        'note':    'decloaks when your ship is 30 kilometers from Newly Constructed Acceleration Gate. Standings penalty towards Gallente Navy if you kill this wave',
        'enemies': [{
          'number': '5',
          'name':   'Frigates'
        }, {
          'number': '10',
          'name':   'Cruisers'
        }, {
          'number': '6',
          'name':   'Battleships'
        }]
      }], [{
        'range':   '80 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Caldari Navy Outpost',
          'effect': 'Approach to trigger agent conversation and mission completion'
        }]
      }]],
      'tips':          ['Just tank the damage, take the gate and then burn for the station',
                        'Having MWD on your ship helps a lot'],
      'completed':     'Complete remotely once you aproach station in first pocket.'
    }, {
      'name':          'Meet Sinas',
      'agent':         'Katsen Isha',
      'agentLocation': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type':          'Travel',
      'destination':   'Astoh system, 11 jumps away',
      'description':   ['Fly to Astoh which is 11 jumps and report to next agent',
                        'Take the battleship, but be sure to bring data analyzer and probes or alt with an frigate since you\'ll need both'],
      'tips':          ['Don\'t forget to pick up your battleship, you will need it to finish few missions'],
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Right Tool for the Job',
      'agent':         'Sinas Egassuo',
      'agentLocation': 'Astoh - Caldari Navy Relay Nexus',
      'type':          'Combat, hack and retrieve item',
      'destination':   'Any system in constellation',
      'description':   ['Engaging initial spawn will get you negative standings towards Gallente Federation',
                        'You can avoid this by warping at 100 kilometers on site and flying around main group to get to the Federation Navy Shypyard which you need to hack',
                        'You will have to kill ships around Federation Navy Shipyard since you can\'t hack wihtout them present, but ignore main group and don\'t engage them',
                        'Keeping range of 80 km or more should keep them non-aggressed',
                        'You need to get 1 x FedNav F.O.F Identifier Tag AC-106V:FNSBR (1.0 m3)',
                        'You can warp on the grid, but any alts warping on grid will be drawn to beacon'],
      'enemy':         'Gallente Navy (Tank against: Thermal/Kinetic/EM, Best damage: Thermal/Kinetic)',
      'pockets':       [[{
        'range':   '45 kilometers',
        'note':    'do not engage them at all. Standings penalty towards Gallente Navy if you kill this wave',
        'enemies': [{
          'number': '8',
          'name':   'Frigates'
        }, {
          'number': '7',
          'name':   'Elite Frigates'
        }, {
          'number': '5',
          'name':   'Destroyers'
        }, {
          'number': '10',
          'name':   'Cruisers'
        }, {
          'number': '9',
          'name':   'Elite Cruisers'
        }, {
          'number': '5',
          'name':   'Battlecruisers'
        }, {
          'number': '13',
          'name':   'Battleships'
        }]
      }, {
        'range':   '80 kilometers',
        'note':    'you have to kill them to be able to hack',
        'enemies': [{
          'number': '1',
          'name':   'Elite Frigate',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '2',
          'name':   'Elite Frigates',
          'effect': 'Sensor dampener'
        }, {
          'number': '5',
          'name':   'Elite Destroyers'
        }]
      }]],
      'tips':          ['Don\'t forget to take 1 x FedNav F.O.F Identifier Tag AC-106V:FNSBR (1.0 m3) from hacked container',
                        'Do not engage NPCs that you don\'t need to engage to avoid taking standings penalties'],
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'The Breakout',
      'agent':         'Sinas Egassuo',
      'agentLocation': 'Astoh - Caldari Navy Relay Nexus',
      'type':          'Probe, combat, hack and retrieve item',
      'destination':   'Any system in constellation',
      'description':   ['Bring along 1 x FedNav F.O.F Identifier Tag AC-106V:FNSBR (1.0 m3) with probe launcher and data analyzer',
                        'However, check the contracts for 1 x Caldari Prisoners Of War (0.5 m3), they are usually some on contracts and they are cheap and you can skip this whole mission and just turn them in',
                        'Otherwise you have to probe Federation Detention Facility with probes and do the site',
                        'The site respawns regulary so don\'t worry if somebody steals it away, just jump to next system in constellation and look for new one'],
      'enemy':         'Gallente Navy (Tank against: Thermal/Kinetic/EM, Best damage: Thermal/Kinetic)',
      'pockets':       [[{
        'range':   'unknown range',
        'note':    'only sometimes present, they will engage you',
        'enemies': [{
          'number': '6',
          'name':   'Frigates'
        }, {
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '6',
          'name':   'Elite Frigates'
        }, {
          'number': '2',
          'name':   'Destroyers'
        }, {
          'number': '3',
          'name':   'Elite Cruisers'
        }, {
          'number': '7',
          'name':   'Battleships'
        }]
      }, {
        'range':   '25 kilometers',
        'note':    'they will not engage if you have 1 x FedNav F.O.F Identifier Tag AC-106V:FNSBR (1.0 m3) in your cargo hold',
        'enemies': [{
          'number': '8',
          'name':   'Warden Frigates'
        }, {
          'number': '8',
          'name':   'Federation Dention Facilities',
          'effect': 'Contains 1 x Caldari Prisoner Of War, they all blow up once you hack first one successfully so once you hack, grab it and run since you only need one.'
        }]
      }]],
      'tips':          ['Do yourself a favor and buy 1 x Caldari Prisoner Of War on contacts, then find the guy who made the contact and give him extra couple of millions of ISK just because he saved you time so you don\'t have to do this mission'],
      'completed':     'Loot the mission objective and fly back to your agent or buy it from contracts and turn in.'
    }, {
      'name':          'Whisper of a Conspiracy',
      'agent':         'Sinas Egassuo',
      'agentLocation': 'Astoh - Caldari Navy Relay Nexus',
      'type':          'Courier (Lowsec space - prepare ship accordingly)',
      'destination':   'Random lowsec system in Black Rise region',
      'description':   ['Go to a low sec system in Black Rise and approach the telescope on grid',
                        'Once you are inside 10km of the telescope it will be hacked by your agent (why couldn\'t he hack other things for you as well?) and you need to pick up 1 x Encrypted Data Node (1.0 m3) and bring it back to the agent'],
      'tips':          ['Don\'t forget 1 x Encrypted Data Node (1.0 m3)'],
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'Practical Solutions',
      'agent':         'Sinas Egassuo',
      'agentLocation': 'Astoh - Caldari Navy Relay Nexus',
      'type':          'Courier',
      'destination':   'Oipo II - Moon 19 - Ishukone Watch Logistic Support, 5 jumps away',
      'description':   ['Go grab Vira Mikano (3.0 m3) who can encrypt that data node from few jumps out and bring him back to your agent'],
      'tips':          ['Use a frigate obviously'],
      'completed':     'Pick up the mission objective and fly back to your agent.'
    }, {
      'name':          'Forewarning',
      'agent':         'Sinas Egassuo',
      'agentLocation': 'Astoh - Caldari Navy Relay Nexus',
      'type':          'Courier (Highly possible lowsec space - prepare ship accordingly)',
      'destination':   'Random system in Black Rise region',
      'description':   ['Take 1 x Encoded Message (0.1 m3) and drop it into Conference Center',
                        'There is a high chance that this mission will send you to lowsec'],
      'tips':          ['Use frigate, take care if you need to go in lowsec'],
      'completed':     'Deliver the mission objective and fly back to your agent.'
    }, {
      'name':          'The Knowledge to Act',
      'agent':         'Sinas Egassuo',
      'agentLocation': 'Astoh - Caldari Navy Relay Nexus',
      'type':          'Epic arc choice',
      'destination':   'Same beacon',
      'description':   ['Pick Home In Peace for 25 million ISK and Caldari State Standings or pick Slipping Away to get the Hyasyoda Mobile Laboratory and same Caldari State Standings',
                        'If you chose Home In Peace you need to grab 5.000 m3 objective from lowsec station in courier mission and that will end the epic arc',
                        'If you chose Slipping Away then you have an combat mission for finish and you get Laboratory which is probably worth more then 200 million and no need to take hauler into lowsec'],
      'tips':          ['Slipping Away should be the next mission'],
      'completed':     'Just confirm your choice.'
    }, {
      'name':          'Slipping Away',
      'agent':         'Sinas Egassuo',
      'agentLocation': 'Astoh - Caldari Navy Relay Nexus',
      'type':          'Travel',
      'destination':   'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost, 16 jumps away',
      'description':   ['Report to Arikio Kuretsu at Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost'],
      'tips':          ['Bring your battleships with you - time to use those guns'],
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Across the Line',
      'agent':         'Arikio Kuretsu',
      'agentLocation': ' Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type':          'Combat and retrieve item',
      'destination':   'Ishisomo system, 4 jumps away',
      'description':   ['Do not warp to the Office facility',
                        'You can warp inside this mission pocket',
                        'Do not warp to the Office facility, seriously',
                        'Start approaching caretaker to trigger spawns, then kill the support before dealing with caretaker',
                        'After you kill the caretaker, loot the 1 x Deteis Family (0.1 m3) from stucture next to him'],
      'enemy':         'Caldari State (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '160 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Nugoeihuvi Caretaker',
          'effect': 'Warp scramble / Stasis web / Energy neutralizer'
        }]
      }, {
        'range':   '120 kilometers',
        'note':    'triggered when you approach Office Facility within 120km, they spawn on top of the Office Facility',
        'enemies': [{
          'number': '13',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Elite Cruiser',
          'effect': 'Sensor jamming / Defender missiles'
        }, {
          'number': '6',
          'name':   'Battleships'
        }]
      }]],
      'tips':          ['Don\'t forget to take 1 x Deteis Family (0.1 m3) and don\'t let them to close, they do a lot of damage once in close range',
                        'Do not warp to Office Facility before clearing most of the wave - I did it with 2 marauders on grid which together had to overheat to get to their guns to around 3.000 DPS to kill everything in time. One of my marauder had troubles keeping up his shield even with OGB and overheat',
                        'Estimated DPS on close range with full spawn is over 2 500-3 000 incoming, so get range on them (50km is enough), pick them off and if needed warp out'],
      'completed':     'Loot the mission objective and fly back to your agent.'
    }]
  };
};
