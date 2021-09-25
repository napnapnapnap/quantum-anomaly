export const data = {
  'info': {
    'name': 'Penumbra',
    'iconID': '500001',
    'empire': 'Caldari State',
    'race': 'caldari',
    'starter': 'Aursa Kunivuri',
    'desc': [
      'The Caldari epic arc has lots of traveling, so bring interceptor or covert ops since you\'ll be using your dps ships for only 5 missions',
      'Going into lowsec is unavoidable, going to null space is optional, this guide covers lowsec edition',
      'This guide covers the route to maximum standing reward and for the special Laboratory reward',
      'To start this epic arc you need standings of 5.0 towards Aursa Kunivuri, Expert Distribution or Caldari State'
    ],
    'rewards': [
      '+10% Caldari State faction standing increase (unmodified)',
      'Standup Hyasyoda Research Lab Blueprint (single run, copy, material level: 8, time efficiency: 8)'
    ],
    'notes': [
      'You need Data Analyzer in mission 11 and 15',
      'You need Probe Launcher in mission 16 if you decide to do it (can be avoided, refer to mission)',
      'You will need to go to lowsec or 0.0, so bring a ship you feel comfortable in using for those areas. You do not need combat ship for those missions',
      'Poinen system is perfect to park your main ship until you need it for first combat mission.',
      'Last mission has jammers which are cheating (refer to mission)'
    ]
  },
  'missions': [
    {
      'name': 'The Intermediary',
      'agent': 'Aursa Kunivuri',
      'source': 'Josameto - Nugoeihuvi Information Center',
      'type': 'Courier',
      'start': 'Josameto',
      'dest': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio, 1 jump away',
      'desc': [
        'Deliver Dossier - Author Unknown (0.1 m³) to Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio which is one jump out and has agent who provides next mission'
      ],
      'tips': [
        'Dock your combat ship at this destination, use non-combat small ship for next few missions',
        'You could also do next few missions in combat ship and park them after first combat mission to avoid having to pick them up'
      ],
      'objective': 'Fly to destination and start conversation with agent.'
    },
    {
      'name': 'Trust and Discretion',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Courier',
      'start': 'Poinen',
      'dest': 'Josameto VIII - Nugoeihuvi Corporation Publisher, 1 jump out',
      'desc': [
        'Deliver Questionable Cargo (3.0 m³) to Josameto which is one jump out'
      ],
      'tips': [
        'Don\'t forget to take to cargo with you when you undock',
        'Can complete remotely'
      ],
      'objective': 'Fly to destination with cargo and start conversation with agent.'
    },
    {
      'name': 'Their loss, our profit',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Combat and retrieve item',
      'start': 'Poinen',
      'dest': 'Any system in constellation',
      'desc': [
        'Destroy Hyasyoda Research Facility and loot S.I Formula Sheet (0.1 m³)'
      ],
      'enemy': 'Serpentis',
      'tips': [
        'You can blitz mission if you kill Hyasyoda Research Facility and loot, there is no need to kill NPC\'s',
        'Don\'t forget to loot the S.I Formula Sheet (0.1 m³)',
        'After this mission is done, dock up combat ships and go back to non-combat fast ship for couriers and lowsec missions ahead'
      ],
      'objective': 'Loot the mission objective and fly back to your agent.',
      'canAcptRmty': true,
      'pockets': [
        [
          {
            'range': '80 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Corelum Guardian Chief Infantry',
                  'Corelum Guardian Chief Sentinel'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Core Admiral',
                  'Core Rear Admiral',
                  'Core Vice Admiral'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Core Grand Admiral'
                ],
                'notice': 'Trigger wave I'
              },
              {
                'quantity': 1,
                'names': [
                  'Caldari Station 150k'
                ],
                'notice': 'Hyasyoda Research Facility, Trigger wave III at 50% shield damage'
              }
            ]
          },
          {
            'range': '50 kilometers',
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Coreli Guardian Protector',
                  'Coreli Guardian Defender',
                  'Coreli Guardian Patroller'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Core Admiral',
                  'Core Rear Admiral',
                  'Core Vice Admiral'
                ],
                'notice': 'Trigger wave II'
              }
            ]
          },
          {
            'range': '25 kilometers',
            'enemies': [
              {
                'quantity': 5,
                'names': [
                  'Coreli Guardian Protector',
                  'Coreli Guardian Initiate',
                  'Coreli Guardian Defender'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Corelum Guardian Chief Infantry',
                  'Corelum Guardian Chief Sentinel'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Core Admiral',
                  'Core Rear Admiral',
                  'Core Vice Admiral',
                  'Core Flotilla Admiral'
                ]
              }
            ]
          },
          {
            'range': '80 kilometers',
            'enemies': [
              {
                'quantity': 8,
                'names': [
                  'Coreli Guardian Guard',
                  'Coreli Guardian Safeguard'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'The Paths That Are Hidden',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Epic arc choice',
      'start': 'Poinen',
      'dest': 'Same station',
      'desc': [
        'Choose your side',
        'Best option for maximum reward is to take An Honorable Betrayal which unlocks 3 very fast missions with no combat but enables you to choose Hyasyoda Mobile Laboratory as reward at the end'
      ],
      'tips': [
        'An Honorable Betrayal should be the next mission'
      ],
      'objective': 'Just confirm your choice.'
    },
    {
      'name': 'An Honorable Betrayal',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Courier',
      'start': 'Poinen',
      'dest': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost , 5 jump out',
      'desc': [
        'Take S.I. Formula (0.1 m³) with you',
        'Trust me, even though mission doesn\'t tell you, next one is to give this formula to agent you are going to visit'
      ],
      'tips': [
        'Take the formula with you',
        'Do not forget the formula',
        'You will forget the formula sooner or later'
      ],
      'objective': 'Fly to destination and start conversation with agent.'
    },
    {
      'name': 'Proof of Intent',
      'agent': 'Arikio Kuretsu',
      'source': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type': 'Courier',
      'start': 'Wuos',
      'dest': 'Same station',
      'desc': [
        'Give the S.I. Formula (0.1 m³) to the agent, no need to even undock and one of the best missions in this arc',
        'If you didn\'t forget to bring the formula. If you forgot the formula, get used to it, you\'ll have plenty of chances to forget it again'
      ],
      'tips': [
        ''
      ],
      'objective': 'Just complete mission if you have the formula with you.'
    },
    {
      'name': 'Return to Isha',
      'agent': 'Arikio Kuretsu',
      'source': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type': 'Courier',
      'start': 'Wuos',
      'dest': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio, 5 jumps away',
      'desc': [
        'Report to Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio which is 5 jumps out. Take S.I. Formula (0.1 m³) with you'
      ],
      'tips': [
        'Do not forget the Formula!'
      ],
      'objective': 'Fly to destination and talk to next agent.'
    },
    {
      'name': 'Re-examining Options',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Epic arc choice',
      'start': 'Poinen',
      'dest': 'Same station',
      'desc': [
        'You are presented with same choice as last time, but this time there is no Hyasyoda option since you did it',
        'Your choice now is only if you want to do next mission in lowsec or 0.0',
        'Since it has no effect on final reward, I recommend lowsec route since it is a bit safer and there are no warp bubbles'
      ],
      'tips': [
        'Playing it Safer should be the next mission'
      ],
      'objective': 'Just confirm your choice.'
    },
    {
      'name': 'Playing it Safer',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Courier (Lowsec space - prepare ship accordingly)',
      'start': 'Poinen',
      'dest': 'Faurulle, 31 jumps away (28 lightyears)',
      'desc': [
        'Deliver S.I. Formula (0.1 m³) to Faurulle which is 31 jumps on safest route taking you through lowsec only'
      ],
      'tips': [
        'Do not forget to take formula with you',
        'Take care navigating lowsec if you never did it before'
      ],
      'objective': 'Complete remotely once you get to destination.'
    },
    {
      'name': 'Almost Unmasked',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Travel',
      'start': 'Poinen',
      'dest': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost, 5 jumps away from agent, 30+ from last mission objective drop',
      'desc': [
        'Report to Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost which is 5 jumps from where you left your battleship',
        'You will not need them yet, but at least you are closer to them'
      ],
      'tips': [
        'Your stuff should still be in Poinen, don\'t move it from there, you wont need it'
      ],
      'objective': 'Automatically once you initiate conversation with next agent.',
      'canAcptRmty': true
    },
    {
      'name': 'Some Light Theatrics',
      'agent': 'Arikio Kuretsu',
      'source': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type': 'Data Analyze and retrieve item',
      'start': 'Wuos',
      'dest': 'Same system',
      'desc': [
        'Use a Data Analyzer to deactivate the NOH surveillance then evacuate 5 x CPF Security Personnel (15.0 m³) from the CPF Habitation Module',
        'Use a frigate with data analyzer, you have 30 seconds to get the team out after hack or they will die when the structure explodes',
        'Do not warp off until you get mission update but get 10 kilometers range on structure since it might do AoE damage under 10 kilometers'
      ],
      'tips': [
        'There are no enemies, but make sure to get team out in time, otherwise they die and you fail this epic arc',
        'If you fail the hack you can try again'
      ],
      'objective': 'Deliver the team back to sation.'
    },
    {
      'name': 'Untouchable',
      'agent': 'Arikio Kuretsu',
      'source': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type': 'Travel',
      'start': 'Wuos',
      'dest': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio, 5 jumps away',
      'desc': [
        'Fly back to Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio and report to agent',
        'Remember those battleships you were so eager to bring along on this epic arc, now it is time to use them even though you most likely won\'t fire the guns for a while',
        'Leave the frigate and take the battleship'
      ],
      'tips': [
        ''
      ],
      'objective': 'Automatically once you initiate conversation with next agent.'
    },
    {
      'name': 'A General\'s Best Friend',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Combat',
      'start': 'Poinen',
      'dest': 'Any system in constellation',
      'desc': [
        'Get to the station in first pocket',
        'Skip killing the NPC\'s unless you don\'t mind taking an standings hit for Gallente Federation',
        'Ships decloak when your ship is 30 kilometers from Newly Constructed Acceleration Gate',
        'They do not scram, but battleship tank is recommended',
        'They do a bit of EM damage as well, so don\'t leave EM hole gapping on your resist profile'
      ],
      'enemy': 'Gallente Navy',
      'pockets': [
        [
          {
            'range': '5 kilometers',
            'enemies': [
              {
                'quantity': 5,
                'names': [
                  'Federation Navy Soldier'
                ]
              },
              {
                'quantity': 10,
                'names': [
                  'Federation Navy Thorax'
                ]
              },
              {
                'quantity': 6,
                'names': [
                  'Federation Navy Dominix'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '80 kilometers',
            'enemies': [
              {
                'quantity': 1,
                'names': [
                  'Caldari Station 150k'
                ],
                'notice': 'Caldari Navy Outpost, approach to trigger agent conversation and mission completion'
              }
            ]
          }
        ]
      ],
      'tips': [
        'Just tank the damage, take the gate and then burn for the station',
        'Having MWD on your ship helps a lot'
      ],
      'objective': 'Complete remotely once you aproach station in first pocket.'
    },
    {
      'name': 'Meet Sinas',
      'agent': 'Katsen Isha',
      'source': 'Poinen IV - Moon 13 - Nugoeihuvi Corporation Development Studio',
      'type': 'Travel',
      'start': 'Poinen',
      'dest': 'Astoh system, 11 jumps away',
      'desc': [
        'Fly to Astoh which is 11 jumps and report to next agent',
        'Take the battleship, but be sure to bring data analyzer and probes or alt with an frigate since you\'ll need both'
      ],
      'tips': [
        'Don\'t forget to pick up your battleship, you will need it to finish few missions'
      ],
      'objective': 'Automatically once you initiate conversation with next agent.'
    },
    {
      'name': 'Right Tool for the Job',
      'agent': 'Sinas Egassuo',
      'source': 'Astoh - Caldari Navy Relay Nexus',
      'type': 'Data Analyze and retrieve item',
      'start': 'Astoh',
      'dest': 'Any system in constellation',
      'desc': [
        'Engaging initial spawn at 45km will get you massive negative standings towards Gallente Federation, keeping range of 80 km or more should keep them passive',
        'Initial spawn at 45km will be smaller on warp in, but reinforcement timer of 2 minutes will start once you land on grid and more will keep coming',
        'You can avoid this by warping at 100 kilometers on site and flying around main group to get to the Federation Navy Shipyard which you need to hack',
        'You will have to kill ships around Federation Navy Shipyard since you can\'t hack without them present, they will cause very small standings loss',
        'You need to get FedNav F.O.F Identifier Tag AC-106V:FNSBR (1.0 m³)',
        'You can warp on the grid, but any alts warping on grid will be drawn to beacon'
      ],
      'enemy': 'Gallente Navy',
      'pockets': [
        [
          {
            'range': '45 kilometers',
            'enemies': [
              {
                'quantity': 8,
                'names': [
                  'Federation Praktor Belos',
                  'Federation Praktor Harpago'
                ]
              },
              {
                'quantity': 7,
                'names': [
                  'Elite Federation Machina',
                  'Elite Federation Pelekus',
                  'Elite Federation Phalarica',
                  'Elite Federation Arcus'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Federation Arcus',
                  'Federation Pelekus'
                ]
              },
              {
                'quantity': 10,
                'names': [
                  'Federation Praktor Centurion',
                  'Federation Praktor Legionarius'
                ]
              },
              {
                'quantity': 9,
                'names': [
                  'Elite Federation Arx',
                  'Elite Federation Auxilia',
                  'Elite Federation Liburna',
                  'Elite Federation Calo',
                  'Elite Federation Quadrieris'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Federation Praktor Bearcus',
                  'Federation Calo'
                ]
              },
              {
                'quantity': 13,
                'names': [
                  'Federation Covinus',
                  'Federation Praktor Phanix',
                  'Federation Praktor Praeses',
                  'Federation Praktor Polemo',
                  'Federation Praktor Hexeris',
                  'Federation Praktor Magister'
                ]
              }
            ]
          },
          {
            'range': '80 kilometers',
            'enemies': [
              {
                'quantity': 1,
                'names': [
                  'Elite Federation Manica'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Elite Federation Matara'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Elite Federation Arcus'
                ]
              }
            ]
          }
        ]
      ],
      'tips': [
        'Don\'t forget to take FedNav F.O.F Identifier Tag AC-106V:FNSBR (1.0 m³) from hacked container',
        'Do not engage NPCs that you don\'t need to engage to avoid taking standings penalties'
      ],
      'objective': 'Loot the mission objective and fly back to your agent.'
    },
    {
      'name': 'The Breakout',
      'agent': 'Sinas Egassuo',
      'source': 'Astoh - Caldari Navy Relay Nexus',
      'type': 'Data Analyze and retrieve item',
      'start': 'Astoh',
      'dest': 'Any system in constellation',
      'desc': [
        'Bring along FedNav F.O.F Identifier Tag AC-106V:FNSBR (1.0 m³) with probe launcher and data analyzer',
        'However, check the contracts for Caldari Prisoners Of War (0.5 m³), they are usually some on contracts and they are cheap and you can skip this whole mission and just turn them in',
        'Otherwise you have to probe Federation Detention Facility with probes and do the site',
        'The site respawns regulary so don\'t worry if somebody steals it away, just jump to next system in constellation and look for new one',
        'Initial spawn may or may not be present',
        'Initial spawn causes standings loss against Gallente Federation'
      ],
      'enemy': 'Gallente Navy',
      'pockets': [
        [
          {
            'range': 'unknown',
            'enemies': [
              {
                'quantity': 5,
                'names': [
                  'Federation Praktor Belos',
                  'Federation Praktor Machina',
                  'Federation Praktor Harpago'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Federation Praktor Phalarica'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Elite Federation Lixa',
                  'Elite Federation Libertus'
                ]
              },
              {
                'quantity': 6,
                'names': [
                  'Elite Federation Machina',
                  'Elite Federation Matara'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Elite Federation Arx'
                ]
              },
              {
                'quantity': 7,
                'names': [
                  'Federation Praktor Magister',
                  'Federation Praktor Navis Praetoria',
                  'Federation Praktor Polemo',
                  'Federation Praktor Hexeris'
                ]
              }
            ]
          },
          {
            'range': '25 kilometers',
            'note': 'they will not engage if you have FedNav F.O.F Identifier Tag AC-106V:FNSBR (1.0 m³) in your cargo hold',
            'enemies': [
              {
                'quantity': 8,
                'names': [
                  'Shadow Serpentis Warden'
                ]
              },
              {
                'quantity': 8,
                'names': [
                  'Federation Detention Facility FNSBR-106V.1'
                ],
                'notice': 'Each contains Caldari Prisoner Of War, they all blow up once you hack first one successfully so once you hack, grab it and run since you only need one.'
              }
            ]
          }
        ]
      ],
      'tips': [
        'Do yourself a favor and buy Caldari Prisoner Of War on contacts, then find the guy who made the contact and give him extra couple of millions of ISK just because he saved you time so you don\'t have to do this mission'
      ],
      'objective': 'Loot the mission objective and fly back to your agent or buy it from contracts and turn in.'
    },
    {
      'name': 'Whisper of a Conspiracy',
      'agent': 'Sinas Egassuo',
      'source': 'Astoh - Caldari Navy Relay Nexus',
      'type': 'Courier (Lowsec space - prepare ship accordingly)',
      'start': 'Astoh',
      'dest': 'Random lowsec system in Black Rise region',
      'desc': [
        'Go to a low sec system in Black Rise and approach the telescope on grid',
        'Once you are inside 10km of the telescope it will be hacked by your agent (why couldn\'t he hack other things for you as well?) and you need to pick up Encrypted Data Node (1.0 m³) and bring it back to the agent'
      ],
      'tips': [
        'Don\'t forget Encrypted Data Node (1.0 m³)'
      ],
      'objective': 'Loot the mission objective and fly back to your agent.'
    },
    {
      'name': 'Practical Solutions',
      'agent': 'Sinas Egassuo',
      'source': 'Astoh - Caldari Navy Relay Nexus',
      'type': 'Courier',
      'start': 'Astoh',
      'dest': 'Oipo II - Moon 19 - Ishukone Watch Logistic Support, 5 jumps away',
      'desc': [
        'Go grab Vira Mikano (3.0 m³) who can encrypt that data node from few jumps out and bring him back to your agent'
      ],
      'tips': [
        'Use a frigate obviously'
      ],
      'objective': 'Pick up the mission objective and fly back to your agent.'
    },
    {
      'name': 'Forewarning',
      'agent': 'Sinas Egassuo',
      'source': 'Astoh - Caldari Navy Relay Nexus',
      'type': 'Courier (Highly possible lowsec space - prepare ship accordingly)',
      'start': 'Astoh',
      'dest': 'Random system in Black Rise region',
      'desc': [
        'Take Encoded Message (0.1 m³) and drop it into Conference Center',
        'There is a high chance that this mission will send you to lowsec',
        'Container where to drop the objective is about 50km from warp in point'
      ],
      'tips': [
        'Use frigate, take care if you need to go in lowsec'
      ],
      'objective': 'Deliver the mission objective and fly back to your agent.'
    },
    {
      'name': 'The Knowledge to Act',
      'agent': 'Sinas Egassuo',
      'source': 'Astoh - Caldari Navy Relay Nexus',
      'type': 'Epic arc choice',
      'start': 'Astoh',
      'dest': 'Same beacon',
      'desc': [
        'Pick Home In Peace for 25 million ISK and Caldari State Standings or pick Slipping Away to get the Hyasyoda Mobile Laboratory and same Caldari State Standings',
        'If you chose Home In Peace you need to grab 5.000 m3 objective from lowsec station in courier mission and that will end the epic arc',
        'If you chose Slipping Away then you have an combat mission for finish and you get Laboratory which is probably worth more then 200 million and no need to take hauler into lowsec'
      ],
      'tips': [
        'Slipping Away should be the next mission'
      ],
      'objective': 'Just confirm your choice.'
    },
    {
      'name': 'Slipping Away',
      'agent': 'Sinas Egassuo',
      'source': 'Astoh - Caldari Navy Relay Nexus',
      'type': 'Travel',
      'start': 'Astoh',
      'dest': 'Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost, 16 jumps away',
      'desc': [
        'Report to Arikio Kuretsu at Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost'
      ],
      'tips': [
        'Bring your battleships with you - time to use those guns'
      ],
      'objective': 'Automatically once you initiate conversation with next agent.'
    },
    {
      'name': 'Across the Line',
      'agent': 'Arikio Kuretsu',
      'source': ' Wuos V - Moon 1 - Hyasyoda Corporation Mining Outpost',
      'type': 'Combat and retrieve item',
      'start': '',
      'dest': 'Ishisomo system, 4 jumps away',
      'desc': [
        'Do not warp to the Office facility',
        'You can warp inside this mission pocket',
        'First wave is triggered when you approach Office Facility within 120km, they spawn on top of the Office Facility',
        'Do not warp to the Office facility, seriously',
        'Start approaching caretaker to trigger spawns, then kill the support before dealing with caretaker',
        'After you kill the caretaker, loot the Deteis Family (0.1 m³) from structure next to him'
      ],
      'enemy': 'Caldari State',
      'pockets': [
        [
          {
            'range': '160 kilometers',
            'enemies': [
              {
                'quantity': 1,
                'names': [
                  'Nugoeihuvi Caretaker'
                ]
              }
            ]
          },
          {
            'range': '120 kilometers',
            'enemies': [
              {
                'quantity': 13,
                'names': [
                  'Taibu State Wakizashi', 'Taibu State Suriage', 'Taibu State Shirasaya', 'Taibu State Shinai'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Taibu State Daimyo', 'Taibu State Shugo'
                ]
              },
              {
                'quantity': 6,
                'names': [
                  'State Shukuro Shogun', 'State Shukuro Nagashin'
                ]
              }
            ]
          }
        ]
      ],
      'tips': [
        'Don\'t forget to take Deteis Family (0.1 m³) and don\'t let them to close, they do a lot of damage once in close range',
        'Do not warp to Office Facility before clearing most of the wave - I did it with 2 marauders on grid which together had to overheat to get to their guns to around 3.000 DPS to kill everything in time. One of my marauder had troubles keeping up his shield even with OGB and overheat',
        'Estimated DPS on close range with full spawn is over 2 500-3 000 incoming, so get range on them (50km is enough), pick them off and if needed warp out'
      ],
      'objective': 'Loot the mission objective and fly back to your agent.'
    }
  ]
};
