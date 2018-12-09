export default function () {
  return {
    'name':        'Right To Rule',
    'iconID':      '500003',
    'race':        'amarr',
    'starter':     'Karde Romu',
    'description': 'The Amarr epic arc is notable for heavy capacitor neutralizers and heavy tracking disruption. In some missions you might have trouble so it would be nice idea to have a missile ship, an alt, a friend or a Marauders EWAR immunity. This guide covers the route to maximum standing reward. To start this epic arc you need standings of 5.0 towards Karde Romu or Ministry of Internal Order or Amarr Empire',
    'rewards':     [
      '+10% (unmodified) Amarr Empire faction standing increase.',
      '1 x Imperial Navy Modified \'Noble\' Implant.'
    ],
    'notes':       [
      'Mission 16 can send you into lowsec sometimes, but it can be done in non-combat ship.',
      'Heavy neutralizing ability in some missions',
      'Heavy tracking disruptions in some missions',
      'You need Data Analyzer in mission 8',
      'You might need to do one mission in lowsec, you don`t need a combat ship for this'
    ],
    'missions':    [{
      'name':          'Aiding an Investigator',
      'agent':         'Karde Romu',
      'agentLocation': 'Kor Azor Prime - MIO Agent Beacon',
      'type':          'Travel',
      'destination':   'Nahyeen system, 3 jumps away',
      'description':   'Report to Kandus Sandar in Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'tip':           'You can start conversation with Karde Romu from anywhere and accept first mission',
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Late Reports',
      'agent':         'Kandus Sandar',
      'agentLocation': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type':          'Combat and retrieve item',
      'destination':   'Any system in constellation',
      'description':   'Fight Sansha and get item',
      'enemy':         'Sansha Nation (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':       '30 kilometers',
        'lastTrigger': true,
        'enemies':     [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Battleships'
        }]
      }, {
        'range':       '30 kilometers',
        'lastTrigger': true,
        'enemies':     [{
          'number': '4',
          'name':   'Elite Cruisers',
          'effect': 'Tracking disruptor'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Tracking disruptor'
        }]
      }, {
        'range':   '40 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Don\'t forget to loot 1 x Reports (0.1 m3)',
      'completed':     'Kill everything, retrieve the item, fly back to station.'
    }, {
      'name':          'The Outclassed Outpost',
      'agent':         'Kandus Sandar',
      'agentLocation': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type':          'Combat',
      'destination':   'Any system in constellation',
      'description':   'Fight Sansha. Move closer to station to be around 60km from all spawn points',
      'enemy':         'Sansha Nation (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':       '20-30 kilometers',
        'lastTrigger': true,
        'enemies':     [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Tracking disruptor'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Tracking disruptor'
        }]
      }, {
        'range':       '80 kilometers',
        'lastTrigger': true,
        'enemies':     [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }, {
        'range':   '70 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Move closer to station to be in better range for reinforcement spawns',
      'completed':     'Complete remotely after last ship is dead.'
    }, {
      'name':          'Raging Sansha',
      'agent':         'Kandus Sandar',
      'agentLocation': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type':          'Combat',
      'destination':   'Any system in constellation',
      'description':   'Fight Sansha, any of the Centum Juggernauts (cruiser size) is trigger for second wave. Any of the frigates and any of the cruisers in second wave is trigger for additional waves',
      'enemy':         'Sansha Nation (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '20-30 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Elite Frigates',
          'effect': 'Tracking disruptor'
        }, {
          'number': '2',
          'name':   'Cruisers',
          'effect': 'Tracking disruptor / Trigger wave II'
        }, {
          'number': '2',
          'name':   'Elite Cruisers'
        }, {
          'number': '3-4',
          'name':   'Battlecruisers'
        }, {
          'number': '5-6',
          'name':   'Battleships'
        }, {
          'number': '1',
          'name':   'Sansha Commander Battleship',
          'effect': 'Warps off / Trigger wave I'
        }]
      }, {
        'range':   '45 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Battlecruisers'
        }]
      }, {
        'range':   '85 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web / Trigger wave III'
        }, {
          'number': '2',
          'name':   'Elite Cruisers',
          'effect': 'Tracking disruptor'
        }]
      }, {
        'range':   '30 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Cruiser',
          'effect': 'Trigger wave IV'
        }]
      }, {
        'range':   '30 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Elite Frigate'
        }, {
          'number': '2',
          'name':   'Elite Cruisers',
          'effect': 'Tracking disruptor'
        }, {
          'number': '1',
          'name':   'Battleship',
          'effect': 'Tracking disruptor'
        }]
      }]],
      'tip':           'Bring marauder, a friend or missile ship due to heavy tracking disruption',
      'completed':     'Complete remotely after last ship is dead.'
    }, {
      'name':          'Cowardly Commander',
      'agent':         'Kandus Sandar',
      'agentLocation': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type':          'Combat',
      'destination':   'Any system in constellation',
      'description':   'Kill everything, watch out on neutralizer towers. Gates are not locked so you can burn 150 km out and then warp to gate at 0 to activate. However be warned this might not be best idea for your capacitor levels',
      'enemy':         'Sansha Nation / Amarr Empire (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':       '20 kilometers',
        'lastTrigger': true,
        'enemies':     [{
          'number': '3-4',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3-4',
          'name':   'Battleships',
          'effect': 'Tracking disruptor'
        }, {
          'number': '2',
          'name':   'Tower Sansha Sentry III'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3-4',
          'name':   'Battleships'
        }]
      }], [{
        'range':       '60 kilometers',
        'lastTrigger': true,
        'enemies':     [{
          'number': '4',
          'name':   'Elite Frigates',
          'effect': 'Tracking disruptor'
        }, {
          'number': '4',
          'name':   'Battleships'
        }, {
          'number': '2',
          'name':   'Tower Sansha Sentry III'
        }, {
          'number': '2',
          'name':   'Tower Sansha Energy Neutralizer I',
          'effect': 'Energy neutralizer, 250 km range'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Battlecruisers'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Tracking disruptor'
        }]
      }], [{
        'range':   '15 kilometers',
        'enemies': [{
          'number': '3-4',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3-4',
          'name':   'Elite Cruisers',
          'effect': 'Trigger wave I'
        }, {
          'number': '3-4',
          'name':   'Battlecruisers',
          'effect': 'Trigger wave II'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Tracking disruptor'
        }, {
          'number': '2',
          'name':   'Tower Sansha Sentry III'
        }, {
          'number': '1',
          'name':   'Tower Sansha Energy Neutralizer I',
          'effect': 'Energy neutralizer, 250 km range'
        }]
      }, {
        'range':   '40 kilometers',
        'enemies': [{
          'number': '3-4',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3-4',
          'name':   'Battleships'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '3-4',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3-4',
          'name':   'Battleships'
        }]
      }], [{
        'range':   '40 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships',
          'effect': 'Energy neutralizer / Trigger wave I'
        }]
      }, {
        'range':   '35 - 100 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Battlecruisers'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Trigger wave II'
        }, {
          'number': '3',
          'name':   'Elite Frigates'
        }, {
          'number': '3',
          'name':   'Elite Cruisers',
          'effect': 'Energy neutralizer / Tracking disruptor'
        }, {
          'number': '3',
          'name':   'Battleships',
          'effect': 'Energy neutralizer'
        }]
      }, {
        'range':   '30 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Destroyers'
        }, {
          'number': '2',
          'name':   'Battlecruisers'
        }, {
          'number': '2',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Shoot down energy neutralizer towers as soon as possible or you might find yourself in serious capacitor issues',
      'completed':     'Complete remotely after last ship is dead.'
    }, {
      'name':          'Report to Aralin Jick',
      'agent':         'Kandus Sandar',
      'agentLocation': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type':          'Travel',
      'destination':   'Nishah system, 4 jumps away',
      'description':   'Report to Aralin Jick at Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'tip':           'You can start conversation with Kandus Sandar from anywhere and accept mission',
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Background Check',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Combat',
      'destination':   'Same system',
      'description':   'Fight Sansha forces. Watch out on triggers, they are random. Lock everything on grid and kill it, then repeat. Don\'t move to new waves until you finish current active wave',
      'enemy':         'Sansha Nation (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '10 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Cruisers'
        }, {
          'number': '2',
          'name':   'Battleships'
        }]
      }, {
        'range':   '10 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Battlecruisers'
        }]
      }, {
        'range':   '25 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }, {
        'range':   '30 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Battlecruisers'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }]
      }, {
        'range':   '30 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }, {
        'range':   '30 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Battlecruisers'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }]
      }]],
      'tip':           'Triggers are random. Finish each group before moving to next one',
      'completed':     'Complete remotely after last ship is dead.'
    }, {
      'name':          'Longing Leman',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Hack and retrieve item (needs Data Analyzer)',
      'destination':   'Any system in constellation',
      'description':   'Burn 16 km to the Encrypted Communications Array and hack it. Do not fight in this mission otherwise you will get Amarr Empire standings hit. If you decide to fight, be aware of energy neutralizers on battleship hulls',
      'tip':           'Don\'t forget to loot 1 x Communications Logs (0.1 m3)',
      'completed':     'Hack structure, loot item, fly back to station.'
    }, {
      'name':          'Languishing Lord',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Spy on meeting',
      'destination':   'Same system',
      'description':   'Burn 30 km to Broken Metallic Crystal Asteroid and wait for screen popup that says mission is completed. If you engage any ships, you will fail this mission',
      'tip':           ' Do not engage any ships. Complete remotely',
      'completed':     'Complete remotely after the ships you\'re spying on warp off.'
    }, {
      'name':          'Razing the Outpost',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Combat',
      'destination':   'Same system',
      'description':   'Fight Mercenaries and kill the outpost',
      'enemy':         'Mordus Legion (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '10 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Cruisers'
        }, {
          'number': '4',
          'name':   'Battleships'
        }, {
          'number': '3',
          'name':   'Caldari Cruise Missile Battery'
        }]
      }], [{
        'range':   '20 kilometers',
        'enemies': [{
          'number': '6',
          'name':   'Cruisers'
        }, {
          'number': '4',
          'name':   'Battleships'
        }, {
          'number': '3',
          'name':   'Caldari Cruise Missile Battery'
        }]
      }], [{
        'range':   '10-80 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Cruisers'
        }, {
          'number': '2',
          'name':   'Battleships',
          'effect': 'Trigger wave I'
        }, {
          'number': '3',
          'name':   'Caldari Cruise Missile Battery'
        }, {
          'number': '3',
          'name':   'Caldari Heavy Missile Battery'
        }, {
          'number': '1',
          'name':   'Outpost ',
          'effect': 'Objective, 50.000 EHP'
        }]
      }, {
        'range':   '70 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Cruisers'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Trigger wave II'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Cruisers'
        }, {
          'number': '8',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Just keep shooting as they come, blow up the station at the end. You can blow up station first to stop new spawns, but that will take some time based on your DPS',
      'completed':     'Complete remotely after last ship is dead.'
    }, {
      'name':          'Ascending Nobles',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Combat and retrieve item',
      'destination':   'Reteka system, 7 jumps away',
      'description':   'Heavy DPS if you let them come in close, make sure to kill and loot as soon as possible. Few minutes after last enemy dies, reinforcement will arrive and they hit hard, more then 1200 dps at least if they come in close. Reinforcement wave doesn\'t offer any bounty and it\'s fairly bad loot/salvage. It is recommended to just skip looting',
      'enemy':         'Amarr Empire (independent ships) (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '75 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Elite Battleships',
          'effect': 'Trigger wave I'
        }, {
          'number': '2',
          'name':   'Amarr Light Missile Battery'
        }, {
          'number': '2',
          'name':   'Amarr Cruise Missile Battery'
        }]
      }, {
        'range':       '70 kilometers',
        'lastTrigger': true,
        'enemies':     [{
          'number': '8',
          'name':   'Cruisers',
          'effect': 'Energy neutralizer'
        }]
      }, {
        'range':       '70 kilometers',
        'lastTrigger': true,
        'enemies':     [{
          'number': '7',
          'name':   'Battleships'
        }]
      }, {
        'range':   '70 kilometers',
        'enemies': [{
          'number': '6',
          'name':   'Battleships'
        }]
      }, {
        'range':   '70 kilometers',
        'note':    'reinforcement timed wave',
        'enemies': [{
          'number': '6',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '6',
          'name':   'Elite Cruisers',
          'effect': 'Energy neutralizer / Tracking disruptor'
        }, {
          'number': '6',
          'name':   'Elite Battleships',
          'effect': 'Energy neutralizer'
        }]
      }]],
      'tip':           'Don\'t forget to loot 1 x Mina Darabi (1.0 m3) at chappel and get out before reinforcement wave. You have about 15-20 minutes before they show up after Mina has been ejected in a can from chapel',
      'completed':     'Kill everything, loot item, fly back to station.'
    }, {
      'name':          'Hunting the Hunter',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Combat and retrieve item',
      'destination':   'Any system in constellation',
      'description':   'Fight Sansha an capture enemy commander',
      'enemy':         'Sansha Nation (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '10 kilometers',
        'enemies': [{
          'number': '6',
          'name':   'Elite Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }, {
          'number': '6',
          'name':   'Sansha Heavy Missile Battery'
        }]
      }], [{
        'range':   '50 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Cruisers',
          'effect': 'Tracking disruptor'
        }, {
          'number': '4',
          'name':   'Battlecruisers',
          'effect': 'Trigger wave II'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Trigger wave III'
        }, {
          'number': '2',
          'name':   'Tower Sansha Sentry III'
        }, {
          'number': '1',
          'name':   'Sansha Energy Neutralizer I',
          'effect': 'Energy neutralizer, 100 kilometers range'
        }, {
          'number': '1',
          'name':   'Sansha Battletower',
          'effect': 'Destroy to unlock gate, clear the room first'
        }]
      }, {
        'range':   '140 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships',
          'effect': 'Tracking disruptor'
        }]
      }, {
        'range':   '40 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Cruisers',
          'effect': 'Tracking disruptor'
        }]
      }, {
        'range':   '50 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Frigates'
        }, {
          'number': '2',
          'name':   'Battleships',
          'effect': 'Tracking disruptor'
        }]
      }], [{
        'range':   '30 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Rahsa Battleship',
          'effect': 'Drops mission objective'
        }]
      }]],
      'tip':           'Don\'t forget to loot 1 x Rahsa (1.0 m3)',
      'completed':     'Kill everything, loot item, fly back to station.'
    }, {
      'name':          'Fate of a Madman',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Epic arc choice',
      'destination':   'Same station',
      'description':   'Choose your side. One side leads to lowsec and continues this arc for sansha side and other goes forward to Amarr Empire standings. Choose Interrogation: Catching the Scent as your next mission to stay on Amarr Empire path',
      'tip':           'Interrogation: Catching the Scent should be the next mission choice',
      'completed':     'Just confirm your choice.'
    }, {
      'name':          'Interrogation: Catching the Scent',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Combat and retrieve item',
      'destination':   'Any system in constellation',
      'description':   'Fight Sansha an loot Sansha Command Signal Receiver',
      'enemy':         'Sansha Nation (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '60 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Tracking disruptor'
        }, {
          'number': '5',
          'name':   'Cruisers',
          'effect': 'Trigger wave I cruisers'
        }, {
          'number': '6',
          'name':   'Battleships',
          'effect': 'Trigger wave I battleships'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Cruisers',
          'effect': 'Trigger wave II cruisers'
        }, {
          'number': '5',
          'name':   'Battleships',
          'effect': 'Trigger wave II battleships'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Cruisers',
          'effect': 'Trigger wave III cruisers'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Trigger wave III battleships'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Kill frigates in initial spawn, then all but one cruiser and battleship. After that just clear all the battleships, then all the cruisers. Don\'t forget to loot 1 x The Sansha Command Signal Receiver (0.1 m3)',
      'completed':     'Kill everything, loot item, fly back to station.'
    }, {
      'name':          'Falling into Place',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Take item to mission site and then combat',
      'destination':   'Shaha system, 13 jumps away',
      'description':   'Do not forget to take 1 x Homemade Sansha Beacon (1.0 m3) with you! Place the beacon in Linked Broadcast Array Hub and kill all the ships that come to rescue. Park your ships in Palas on your way back, read tip for more information',
      'enemy':         'Amarr Empire (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '60 kilometers',
        'note':    'spawns after you place the beacon in structure',
        'enemies': [{
          'number': '3',
          'name':   'Cruisers',
          'effect': 'Tracking disruptor'
        }, {
          'number': '1',
          'name':   'Elite Cruiser',
          'effect': 'Energy Neutralizer'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'When returning to your agent stop in system called Palas and dock up your ships/orca. Use only frigate or shuttle to burn back to your agent. Next mission is not combat and mission after that will send you into Palas so you save yourself 10 jumps',
      'completed':     'Complete remotely after last ship is dead.'
    }, {
      'name':          'Making an Arrest',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Fly to location in space',
      'destination':   'Random location in several possible constellations, cca 15 jumps away',
      'description':   'Burn to Harkan\'s Manor. This will trigger station to explode and complete mission. This mission has no NPC\'s and can be done in Covert Ops frigate or an shuttle. This mission has a chance to send you into lowsec so inform yourself how to navigate lowsec safely',
      'tip':           'Do not take your battleship/orca into lowsec. Use small fast ship',
      'completed':     'Once you get message from your agent, fly back to his station.'
    }, {
      'name':          'Report to Aralin Jick',
      'agent':         'Aralin Jick',
      'agentLocation': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type':          'Travel',
      'destination':   'Palas system, 6 jumps away',
      'description':   'Report to Riff Hebian in Palas at Miyan Security Forces Beacon',
      'tip':           'Your battleship should be there already if you left it there 2 missions ago',
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Panic Response',
      'agent':         'Riff Hebian',
      'agentLocation': 'Palas system at Miyan Security Forces Beacon',
      'type':          'Combat',
      'destination':   'Any system in constellation',
      'description':   'Kill all ships in area. Keep in mind that bounty, salvage and loot from this mission are very low. It is recommended to just keep killing frigates until energy neutralizer tower spawns, then kill the tower and everything will warp off. After that simply finish remaining towers to complete the mission. Be aligned if you don\'t think your tank will hold',
      'enemy':         'Amarr Empire (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '40 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Frigates',
          'effect': 'Trigger same number of frigates five times'
        }, {
          'number': '4',
          'name':   'Cruisers',
          'effect': 'Trigger same number of cruisers five times'
        }, {
          'number': '1',
          'name':   'Battleship'
        }]
      }, {
        'range':   '40 kilometers',
        'note':    'timed spawn',
        'enemies': [{
          'number': '4',
          'name':   'Amarr Cruise Missile Batteries'
        }, {
          'number': '1',
          'name':   'Amarr Stasis Tower'
        }, {
          'number': '1',
          'name':   'Anarr Energy neutralizer Sentry III',
          'effect': 'Energy neutralizer, 250 kilometers range'
        }]
      }]],
      'tip':           'Blitz the mission by killing neutralizer tower as soon as it spawns',
      'completed':     'Fly back to station once you kill neutralizer tower and missile batteries.'
    }, {
      'name':          'The Right to Rule',
      'agent':         'Riff Hebian',
      'agentLocation': 'Palas system at Miyan Security Forces Beacon',
      'type':          'Combat',
      'destination':   'Choga system, 4 systems away',
      'description':   'Fight Sansha and kill Harkan',
      'enemy':         'Sansha Nation (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '10 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Cruisers'
        }, {
          'number': '2',
          'name':   'Battlecruisers'
        }]
      }], [{
        'range':   '10 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '2',
          'name':   'Cruisers',
          'effect': 'Tracking disruptor'
        }, {
          'number': '4',
          'name':   'Elite Cruisers'
        }, {
          'number': '2',
          'name':   'Battlecruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }], [{
        'range':   '18 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Cruisers'
        }, {
          'number': '3',
          'name':   'Battlecruisers'
        }, {
          'number': '2',
          'name':   'Battleships'
        }]
      }, {
        'range':   '10 kilometers',
        'note':    'timed spawn cca. one minute',
        'enemies': [{
          'number': '3',
          'name':   'Elite Frigates'
        }, {
          'number': '3',
          'name':   'Elite Cruisers',
          'effect': 'Tracking disruptor'
        }]
      }], [{
        'range':   '40 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Destroyers'
        }, {
          'number': '1',
          'name':   'Battleship',
          'effect': 'Trigger wave I at 10% shield, at 10% armor, getting structure damage and destruction'
        }]
      }, {
        'range':   '5-40 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Random one is trigger wave II'
        }, {
          'number': '3',
          'name':   'Battleships',
          'effect': 'Random one is trigger wave II'
        }]
      }, {
        'range':   '5-40 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Cruisers'
        }, {
          'number': '2',
          'name':   'Battleships'
        }]
      }], [{
        'range':   '20 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Cruisers',
          'effect': 'Trigger repeating waves'
        }, {
          'number': '2',
          'name':   'Battleships',
          'effect': 'Trigger repeating waves'
        }, {
          'number': '1',
          'name':   'Harkan\'s Behemoth',
          'effect': 'Energy neutralizer / Trigger wave I'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Destroyers'
        }, {
          'number': '2',
          'name':   'Cruisers',
          'effect': 'Tracking disruptor'
        }]
      }, {
        'range':   '1-40 kilometers',
        'note':    'repeating wave',
        'enemies': [{
          'number': '3',
          'name':   'Battlecruisers',
          'effect': 'Trigger next repeating wave'
        }]
      }, {
        'range':   '1-40 kilometers',
        'note':    'repeating wave',
        'enemies': [{
          'number': '2',
          'name':   'Elite Frigates',
          'effect': 'Trigger next repeating wave'
        }]
      }, {
        'range':   '1-40 kilometers',
        'note':    'repeating wave',
        'enemies': [{
          'number': '2',
          'name':   'Elite Frigates',
          'effect': 'Tracking disruptor'
        }, {
          'number': '2',
          'name':   'Elite Cruisers',
          'effect': 'Tracking disruptor'
        }, {
          'number': '2',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Watch out on triggers. If you are not sure if you can handle all the waves in last pocket go for blitz option. Good way to keep track of spawns is to always eliminate all the ships from current wave before moving on next spawned wave. Exception of this rule is initial battleship in pocket III and Harkan\'s Behemoth in pocket IV since they have multiple triggers. Blitz in last wave is done by burning away from the group which will pull Harkan away from rest of this ship and away from spawn points. Once you burned 50-100 kilometers, just kill him him and warp off',
      'completed':     'Once Harkan is dead, fly back to agent to get standings and implant.'
    }]
  };
};
