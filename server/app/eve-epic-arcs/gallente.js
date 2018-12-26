export default function () {
  return {
    'name':        'Syndication',
    'iconID':      '500004',
    'empire':      'Gallente Federation',
    'race':        'gallente',
    'starter':     'Roineron Aviviere',
    'description': ['The Gallente epic arc is notable for some heavy incoming dps on short ranges',
                    'Most enemy battleships have MWD\'s and come really fast into range to apply that damage',
                    'Be careful to maintain spawns and ranges in accordance to your ship capabilities',
                    'Also count on enemy doing sensor dampening on your ship',
                    'To start this epic arc you need standings of 5.0 towards Roineron Aviviere, Impetus or Gallente Federation'],
    'rewards':     [
      '+10% Gallente Federation faction standing increase (unmodified)',
      '1 x Black Eagle Drone Link Augmentor. (25 m3)'
    ],
    'notes':       [
      'You can avoid going to lowsec all together.',
      'Heavy DPS in some missions',
      'Heavy sensor dampening in some missions',
      'You need Salvager in mission 3'
    ],
    'missions':    [{
      'name':          'Impetus',
      'agent':         'Roineron Aviviere',
      'agentLocation': 'Dodixie - Roineron Aviviere Beacon',
      'type':          'Travel',
      'destination':   'Tolle system, 4 jumps away',
      'description':   ['Talk to Roineron Aviviere and take mission to report to Gian Parele in Tolle Solar system'],
      'tips':          ['You can start conversation with Roineron Aviviere from anywhere and accept first mission'],
      'completed':     'Fly to destination and start conversation with next agent.'
    }, {
      'name':          'The Tolle Scar',
      'agent':         'Gian Parele',
      'agentLocation': 'Tolle  - Impetus Tolle Studio',
      'type':          'Combat',
      'destination':   'Same system',
      'description':   ['Fight Rogue Drones'],
      'enemy':         'Rogue Drones (Tank against: Explosive/Thermal, Best damage: Explosive/Thermal)',
      'pockets':       [[{
        'range':   '10 kilometers',
        'note':    'spawns when you get 10 kilometers from the accelation gate',
        'enemies': [{
          'number': '6',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Cruisers'
        }, {
          'number': '2',
          'name':   'Battlecruisers'
        }, {
          'number': '2',
          'name':   'Battleships'
        }]
      }], [{
        'range':   '160 kilometers',
        'note':    'this wave warps off',
        'enemies': [{
          'number': '6',
          'name':   'The Pator Six Cruisers'
        }]
      }, {
        'range':   '50-120 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Cruisers'
        }, {
          'number': '3',
          'name':   'Battlecruisers'
        }, {
          'number': '7',
          'name':   'Battleships'
        }]
      }]],
      'tips':          ['Just kill everything'],
      'completed':     'Kill all the ships and complete remotely.'
    }, {
      'name':          'Priority One',
      'agent':         'Gian Parele',
      'agentLocation': 'Tolle  - Impetus Tolle Studio',
      'type':          'Combat',
      'destination':   'Carirgnottin system, 1 jump away',
      'description':   ['Fight Minmatar Republic and salvage shuttle',
                        'You have to use module, I was able to do it with skill on level 2, but would recommend level 3 at least',
                        'Keep in mind you don\'t need to bring anything to your agent, just successfully complete one cycle on the wreck'],
      'enemy':         'Minmatar Republic (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic)',
      'pockets':       [[{
        'range':   '60 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Acceleration Gate'
        }]
      }], [{
        'range':   '10 kilometers',
        'note':    'spawns when you get 10 kilometers from the accelation gate',
        'enemies': [{
          'number': '6',
          'name':   'Frigates',
          'effect': 'Target painting'
        }, {
          'number': '4',
          'name':   'Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }], [{
        'range':   '50 kilometers',
        'note':    'this wave warps off',
        'enemies': [{
          'number': '6',
          'name':   'The Pator Six Cruisers'
        }, {
          'number': '1',
          'name':   'Shuttle wreck',
          'effect': 'Needs to be salvaged'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Frigates'
        }, {
          'number': '5',
          'name':   'Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }]],
      'tips':          ['Gates are not locked so you can skip killing NPC\'s in pocket I',
                        'You also don\'t need to kill ships in last pocket, but makes salvaging easier',
                        'This mission does not incur any negative standings towards Minmatar Republic and gets you nice tags'],
      'completed':     'You need to salvage shuttle wreck and then complete remotely.'
    }, {
      'name':          'The Averon Exchange',
      'agent':         'Gian Parele',
      'agentLocation': 'Tolle  - Impetus Tolle Studio',
      'type':          'Combat',
      'destination':   'Averon system, 2 jumps away',
      'description':   ['Fight Mercenaries in couple of waves'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '50 kilometers',
        'note':    'This wave warps off in few seconds and triggers wave I',
        'enemies': [{
          'number': '6',
          'name':   'The Pator Six Cruisers'
        }]
      }, {
        'range':   '5 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Elite Frigates'
        }, {
          'number': '5',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web / Trigger wave II'
        }, {
          'number': '3',
          'name':   'Cruisers'
        }]
      }, {
        'range':   '25 kilometers',
        'enemies': [{
          'number': '9',
          'name':   'Cruisers',
          'effect': 'Trigger wave III'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Cruisers'
        }, {
          'number': '5',
          'name':   'Battleships'
        }]
      }]],
      'tips':          ['Kill everything and take care of triggers so you don\'t get in trouble',
                        'You might wanna move away from warp in beacon since warp scramblers with webs will spawn right on top of it'],
      'completed':     'Kill everything and then complete remotely.'
    }, {
      'name':          'A Different Kind of Director',
      'agent':         'Gian Parele',
      'agentLocation': 'Tolle  - Impetus Tolle Studio',
      'type':          'Travel',
      'destination':   'Stetille II - Impetus Publisher, 8 jumps away',
      'description':   ['Report to Eron Viette in Stetille system'],
      'tips':          ['You can start conversation with Gian Parele from anywhere and accept mission'],
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Assistance',
      'agent':         'Eron Viette',
      'agentLocation': 'Stetille II - Impetus Publisher',
      'type':          'Combat',
      'destination':   'Same system',
      'description':   ['Fight Mercenaries in couple of waves'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '35 kilometer',
        'enemies': [{
          'number': '1',
          'name':   'Audalle Roire',
          'effect': 'Neutral NPC, do not shoot him'
        }]
      }, {
        'range':   '10 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Frigates'
        }, {
          'number': '3',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '6',
          'name':   'The Pator Six Cruisers'
        }]
      }, {
        'range':   '10 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Battleships'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Battleships'
        }]
      }, {
        'range':   '30 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Battleships'
        }]
      }, {
        'range':   '10 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Battleships'
        }]
      }, {
        'range':   '10 kilometers',
        'note':    'triggers once everything else is dead',
        'enemies': [{
          'number': '1',
          'name':   'Battleships'
        }]
      }, {
        'range':   '10 kilometers',
        'note':    'triggers once everything else is dead',
        'enemies': [{
          'number': '2',
          'name':   'Battleships'
        }]
      }]],
      'tips':          ['When you aprroach Audalle Roire, waves will spawn really fast',
                        'You\'ll be webbed and scrammed under heavy DPS',
                        'Either bastion up or use alt in shuttle/noob ship to trigger waves while damage dealers hold range',
                        'Last 2 waves are optimal',
                        'Take care of positioning so you don\'t end up in wrong spot at wrong time',
                        '800 dps tank was enough for me, but keep in mind it will take some time for your drones to kill of frigates'],
      'completed':     'Kill the spawns, dock up and talk to agent.'
    }, {
      'name':          'The High or Low Road',
      'agent':         'Eron Viette',
      'agentLocation': 'Stetille II - Impetus Publisher',
      'type':          'Epic arc choice',
      'destination':   'Same station',
      'description':   ['Choose your side',
                        'One side leads to lowsec and other stays in highsec',
                        'Choose Into The Black as your next mission to stay in highsec'],
      'tips':          ['Into The Black should be the next mission choice'],
      'completed':     'Just confirm your choice.'
    }, {
      'name':          'Into The Black',
      'agent':         'Gian Parele',
      'agentLocation': 'Tolle  - Impetus Tolle Studio',
      'type':          'Travel',
      'destination':   'Noghere , 8 jumps away',
      'description':   ['Report to Mourmarie Mone in Noghere system'],
      'tips':          ['You can start conversation with Gian Parele from anywhere and accept mission'],
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Poor Man\'s Shakedown',
      'agent':         'Mourmarie Mone',
      'agentLocation': 'Noghere - Unmarked Operation Beacon',
      'type':          'Combat',
      'destination':   'Charmerout system, 2 jumps away',
      'description':   ['Fight Mercenaries',
                        'You need to kill Asteroid Micro-Colony Minors to unlock gate in initial pocket',
                        'Furthest one from gate drops the key',
                        'Key is consumed'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   'different ranges',
        'enemies': [{
          'number': '4',
          'name':   'Asteroid Micro-Colony Minor',
          'effect': 'Triggers reinforcement spawn'
        }]
      }, {
        'range':   '10 kilometers',
        'note':    'reinforcement spawn',
        'enemies': [{
          'number': '3',
          'name':   'Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }], [{
        'range':   'different ranges',
        'enemies': [{
          'number': '4',
          'name':   'Asteroid Micro-Colony Minor',
          'effect': 'Triggers reinforcement spawn'
        }]
      }, {
        'range':   '15 kilometers',
        'note':    'reinforcement spawn',
        'enemies': [{
          'number': '3',
          'name':   'Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }, {
        'range':   '15 kilometers',
        'note':    'objective spawn',
        'enemies': [{
          'number': '1',
          'name':   'The Elder',
          'effect': 'Spawns once the furthest Micro-Colony is destroyed'
        }]
      }]],
      'tips':          ['You can blitz the mission by shooting just the trigger Micro-Colonies'],
      'completed':     'Kill The Elder and fly back to your agent.'
    }, {
      'name':          'Underground Circus',
      'agent':         'Mourmarie Mone',
      'agentLocation': 'Noghere - Unmarked Operation Beacon',
      'type':          'Combat',
      'destination':   'Caslemon system, 1 jump away',
      'description':   ['Get the ringmaster'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '0 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Acceleration gate'
        }]
      }], [{
        'range':   '25 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Cruisers'
        }, {
          'number': '4',
          'name':   'Battlecruisers',
          'effect': 'Serpentis hulls - Sensor dampener'
        }, {
          'number': '3',
          'name':   'Battleships',
          'effect': 'Angel hulls - Target painting'
        }, {
          'number': '4',
          'name':   'Battleships'
        }]
      }, {
        'range':   '45 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Cruisers',
          'effect': 'Sensor dampener'
        }, {
          'number': '3',
          'name':   'Battlecruisers'
        }]
      }], [{
        'range':   '35 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Cruisers'
        }, {
          'number': '2',
          'name':   'Cruisers',
          'effect': 'Serpentis hulls - Sensor dampener'
        }, {
          'number': '2',
          'name':   'Battlecruisers'
        }, {
          'number': '3',
          'name':   'Battlecruisers',
          'effect': 'Serpentis hulls - Sensor dampener'
        }, {
          'number': '2',
          'name':   'Battleships',
          'effect': 'Angel hulls - Target painting'
        }, {
          'number': '2',
          'name':   'Battleships'
        }]
      }, {
        'range':   '70 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'The Ringmaster',
          'effect': 'Spawns after destroying Ringmaster\'s Pleasure Hub'
        }]
      }]],
      'tips':          ['Don\'t forget to loot 1 x The Ringmaster (1.0 m3)'],
      'completed':     'Kill everything, retrieve the item, fly back to station.'
    }, {
      'name':          'Intaki Chase',
      'agent':         'Mourmarie Mone',
      'agentLocation': 'Noghere - Unmarked Operation Beacon',
      'type':          'Combat',
      'destination':   'Pemene system, 3 jumps away',
      'description':   ['Intaki Settlement Control Tower is trigger for wave I',
                        'Battleships are using MWD and will close in fast and deal heavy DPS'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '60 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Intaki Settlement Control Tower',
          'effect': 'Trigger wave I'
        }]
      }, {
        'range':   '70 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Veteran Battleship',
          'effect': 'Trigger wave II'
        }, {
          'number': '2',
          'name':   'Battleships'
        }, {
          'number': '3',
          'name':   'Pator Battleships'
        }, {
          'number': '3',
          'name':   'Veteran Cruisers',
          'effect': 'Sensor dampener'
        }, {
          'number': '3',
          'name':   'Cruisers'
        }, {
          'number': '3',
          'name':   'Veteran Frigates'
        }]
      }, {
        'range':   '65 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Veteran Battleships',
          'effect': 'Trigger wave III'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Veteran Battleships'
        }]
      }]],
      'tips':          ['Watch out on incoming DPS and be aligned if you don\'t think you can tank about 1000-1200 DPS'],
      'completed':     'Kill everything, fly back to station.'
    }, {
      'name':          'Rat in a Corner ',
      'agent':         'Mourmarie Mone',
      'agentLocation': 'Noghere - Unmarked Operation Beacon',
      'type':          'Travel',
      'destination':   'Mesybier X - TransStellar Shipping Storage, 2 jumps away',
      'description':   ['Report to Ascain Adeset in Mesybier'],
      'tips':          ['You can start conversation with Mourmarie Mone from anywhere and accept mission'],
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Places to Hide',
      'agent':         'Ascain Adeset',
      'agentLocation': 'Mesybier X - TransStellar Shipping Storage',
      'type':          'Epic arc choice',
      'destination':   'Same station',
      'description':   ['Choose your next mission',
                        'Best option would be to take Little Fingers since it is always in high-sec location'],
      'tips':          ['Little Fingers should be the next mission choice'],
      'completed':     'Just confirm your choice.'
    }, {
      'name':          'Little Fingers',
      'agent':         'Ascain Adeset',
      'agentLocation': 'Mesybier X - TransStellar Shipping Storage',
      'type':          'Combat',
      'destination':   'Same system',
      'description':   ['Last ship is always trigger',
                        'Don\'t forget carry on token from fuel depot which can be used to blitz next mission'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '15 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Battleships'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Elite Battleships'
        }]
      }, {
        'range':   '20 kilometers',
        'enemies': [{
          'number': '6',
          'name':   'Battleships'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Elite Cruisers',
          'effect': 'Energy neutralizer / Sensor dampener'
        }]
      }]],
      'tips':          ['Kill the fuel depots to get 1 x Carry on Token which can be used to blitz next mission'],
      'completed':     'Kill everything, fly back to station.'
    }, {
      'name':          'Carry On',
      'agent':         'Ascain Adeset',
      'agentLocation': 'Mesybier X - TransStellar Shipping Storage',
      'type':          'Combat',
      'destination':   'Osmeden, 2 jumps away',
      'description':   ['There are 2 gates',
                        'The Hub gate is locked and leads to last pocket',
                        'It can be unlocked with Carry on Token from last mission',
                        'Otherwise you have to go through Alley to get to the Hub'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '50 kilometers',
        'enemies': [{
          'number': '8',
          'name':   'Battleships'
        }, {
          'number': '3',
          'name':   'Cruisers',
          'effect': 'Energy neutralizer / Sensor dampener'
        }, {
          'number': '6',
          'name':   '\'Syndicate\' Cruise Missile Battery'
        }]
      }], [{
        'range':   '50 kilometers',
        'enemies': [{
          'number': '8',
          'name':   'Cruisers',
          'effect': 'Energy neutralizer / Sensor dampener'
        }, {
          'number': '6',
          'name':   'Battleships'
        }, {
          'number': '2',
          'name':   '\'Syndicate\' Cruise Missile Battery'
        }, {
          'number': '2',
          'name':   '\'Syndicate\' Heavy Missile Battery'
        }]
      }], [{
        'range':   '50 kilometers',
        'enemies': [{
          'number': '4',
          'name':   'Veteran Frigates',
          'effect': ' Warp scramble / Stasis web'
        }, {
          'number': '2',
          'name':   'Cruisers',
          'effect': 'Energy neutralizer / Sensor dampener'
        }, {
          'number': '8',
          'name':   'Battlecruisers'
        }, {
          'number': '3',
          'name':   'Freighters'
        }, {
          'number': '2',
          'name':   'Industrials'
        }, {
          'number': '1',
          'name':   'Carry on Hub',
          'effect': 'Mission objective structure'
        }]
      }]],
      'tips':          ['If you want to blitz this mission, use carry on token from last site and just use The Hub acceleration gate on start',
                        'Approach the Carry on Hub at 10 kilometers are rest will warp off',
                        'You might wanna snipe frigates from range so they don\'t web you on your approach'],
      'completed':     'Approach 10 kilometers within Carry on Hub to get mission completed.'
    }, {
      'name':          'Studio One',
      'agent':         'Ascain Adeset',
      'agentLocation': 'Mesybier X - TransStellar Shipping Storage',
      'type':          'Combat',
      'destination':   'Osmeden, 2 jumps away',
      'description':   ['Battleships use MWDs and deal high DPS from close up',
                        'Be aligned or be ready to overheat tank for a bit while you clear some of grid',
                        'This is most DPS I\'ve encountered in L4 missions if you let them close'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '60 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Elite Frigates'
        }, {
          'number': '3',
          'name':   'Elite Cruisers',
          'effect': 'Energy neutralizer / Sensor dampener'
        }, {
          'number': '2',
          'name':   'Elite Battleships'
        }]
      }], [{
        'range':   '60 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Cruisers',
          'effect': 'Energy neutralizer / Sensor dampener'
        }, {
          'number': '2',
          'name':   'Elite Battleships'
        }, {
          'number': '10',
          'name':   'Battleships'
        }, {
          'number': '1',
          'name':   '\'Studio 1\'',
          'effect': 'Mission objective structure, trigger wave I'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '6',
          'name':   'Pator Six Elite Frigates'
        }, {
          'number': '6',
          'name':   'Elite Battleships'
        }]
      }]],
      'tips':          ['Keep an eye on that incoming DPS, be careful and be aligned',
                        'I use 1000 dps tank + OGB on top of that for this mission',
                        'Don\'t be afraid to overheat or to warp out if needed'],
      'completed':     'Kill Studio I and either finish off the enemy or warp out.'
    }, {
      'name':          'Showtime',
      'agent':         'Ascain Adeset',
      'agentLocation': 'Mesybier X - TransStellar Shipping Storage',
      'type':          'Combat and retrieve item',
      'destination':   'Adacyne system, 3 jumps away',
      'description':   ['Battleships deal high DPS',
                        'Be aligned or be ready to overheat tank for a bit while you clear some of grid'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '60 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Elite Frigates',
          'effect': 'Energy neutralizer / Sensor dampener'
        }, {
          'number': '3',
          'name':   'Pator Six Elite Cruisers',
          'effect': 'Energy neutralizer / Sensor dampener / Trigger wave I'
        }, {
          'number': '5',
          'name':   'Pator Six Elite Battleships',
          'effect': 'Trigger wave II'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Cruisers'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '6',
          'name':   'Battleships'
        }, {
          'number': '1',
          'name':   'Rosulf Fririk',
          'effect': 'Mission objective'
        }]
      }]],
      'tips':          ['Don\'t forget to loot 1 x Ralie Ardanne (1.0 m3)',
                        'Pator Six Elite Battleships deal lots of Alpha damage and lots of DPS',
                        'Don\'t be afraid to warp out if needed'],
      'completed':     'Kill the mission objective, loot him and fly back to your agent.'
    }, {
      'name':          'Where\'s the Line?',
      'agent':         'Ascain Adeset',
      'agentLocation': 'Mesybier X - TransStellar Shipping Storage',
      'type':          'Epic arc choice',
      'destination':   'Same station',
      'description':   ['Choose your side',
                        'One side gives Syndicate Cloaking Device and Syndicate faction standings',
                        'Other side gives Black Eagle Drone Link Augmentor and Gallente faction standing'],
      'tips':          ['Safe Return should be the next mission choice for Gallente standings'],
      'completed':     'Just confirm your choice.'
    }, {
      'name':          'Safe Return',
      'agent':         'Ascain Adeset',
      'agentLocation': 'Mesybier X - TransStellar Shipping Storage',
      'type':          'Deliver item and optional combat',
      'destination':   'Enedore system, 9 jumps away',
      'description':   ['Fly couple of jumps out and drop the kid into transport ship',
                        'Once you drop kid there will be a spawn of hostile NPC\'s',
                        'Suggested to use shuttle and just drop the kid and warp off once the wave spawns',
                        'Not worth the jumps to take battleship all the way there since you have to return to your agent to pick up reward'],
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'tips':          ['Just blitz it. From what I remember you don\'t make much by bounties or loot'],
      'completed':     'Drop the item and warp off.'
    }]
  };
};
