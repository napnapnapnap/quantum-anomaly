export const data = {
  'info':     {
    'name':        'Syndication',
    'iconID':      '500004',
    'empire':      'Gallente Federation',
    'race':        'gallente',
    'starter':     'Roineron Aviviere',
    'description': [
      'The Gallente epic arc is notable for some heavy incoming dps on short ranges',
      'Most enemy battleships have MWD\'s and come really fast into range to apply that damage, be careful to maintain spawns and ranges in accordance to your ship capabilities',
      'Also count on enemy doing sensor dampening on your ship',
      'To start this epic arc you need standings of 5.0 towards Roineron Aviviere, Impetus or Gallente Federation'
    ],
    'rewards':     [
      '+10% Gallente Federation faction standing increase (unmodified)',
      'Black Eagle Drone Link Augmentor. (25 m3)'
    ],
    'notes':       [
      'You can avoid going to lowsec all together.',
      'Heavy DPS in some missions',
      'Heavy sensor dampening in some missions',
      'You need Salvager in mission 3'
    ]
  },
  'missions': [
    {
      'name':        'Impetus',
      'agent':       'Roineron Aviviere',
      'source':      'Dodixie - Roineron Aviviere Beacon',
      'type':        'Travel',
      'start':       'Dodixie',
      'destination': 'Tolle system, 4 jumps away',
      'description': [
        'Talk to Roineron Aviviere and take mission to report to Gian Parele in Tolle Solar system'
      ],
      'tips':        [
        'You can start conversation with Roineron Aviviere from anywhere and accept first mission'
      ],
      'objective':   'Fly to destination and start conversation with next agent.'
    },
    {
      'name':        'The Tolle Scar',
      'agent':       'Gian Parele',
      'source':      'Tolle - Impetus Tolle Studio',
      'type':        'Combat',
      'start':       'Tolle',
      'destination': 'Same system',
      'description': [
        'Fight Rogue Drones'
      ],
      'enemy':       'Rogue Drones II',
      'pockets':     [
        [
          {
            'range':   10,
            'note':    'spawns when you get 10 kilometers from the accelation gate',
            'enemies': [
              {
                'quantity': 6,
                'names':    [
                  'Barracuda Alvi',
                  'Devilfish Alvi',
                  'Strain Decimator Alvi'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Disintegrator Alvum'
                ]
              },
              {
                'quantity': 4,
                'names':    [
                  'Enforcer Alvatis',
                  'Striker Alvatis'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Matriarch Alvus',
                  'Patriarch Alvus'
                ]
              }
            ]
          }
        ],
        [
          {
            'range':   160,
            'enemies': [
              {
                'quantity': 6,
                'names':    [
                  'The Pator Six Cruisers'
                ],
                'notice':   'They warp off after you enter pocket'
              }
            ]
          },
          {
            'range':   '50-120',
            'enemies': [
              {
                'quantity': 5,
                'names':    [
                  'Barracuda Alvi',
                  'Devilfish Alvi',
                  'Strain Decimator Alvi'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Bomber Alvum'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Defeater Alvatis'
                ]
              },
              {
                'quantity': 7,
                'names':    [
                  'Alvus Queen',
                  'Matriarch Alvus',
                  'Patriarch Alvus'
                ]
              }
            ]
          }
        ]
      ],
      'tips':        [
        'Just kill everything'
      ],
      'objective':   'Kill all the ships and complete remotely.'
    },
    {
      'name':        'Priority One',
      'agent':       'Gian Parele',
      'source':      'Tolle - Impetus Tolle Studio',
      'type':        'Combat and Salvage',
      'start':       'Tolle',
      'destination': 'Carirgnottin system, 1 jump away',
      'description': [
        'Fight Minmatar Republic and salvage shuttle',
        'In pocket I, first group spawns when you get 10 kilometers from the acceleration gate',
        'You have to use module, I was able to do it with skill on level 2, but would recommend level 3 at least',
        'Keep in mind you don\'t need to bring anything to your agent, just successfully complete one cycle on the wreck'
      ],
      'enemy':       'Minmatar Republic',
      'pockets':     [
        [
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'Acceleration Gate'
                ]
              }
            ]
          }
        ],
        [
          {
            'range':   10,
            'enemies': [
              {
                'quantity': 6,
                'names':    [
                  'Republic Tribal Takan',
                  'Republic Tribal Baldur',
                  'Chief Republic Gleeda'
                ]
              },
              {
                'quantity': 4,
                'names':    [
                  'Republic Tribal Jarpur',
                  'Republic Tribal Manadis'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Republic Tribal Jotun',
                  'Republic Tribal Sigur'
                ]
              }
            ]
          }
        ],
        [
          {
            'range':   50,
            'note':    'this wave warps off',
            'enemies': [
              {
                'quantity': 6,
                'names':    [
                  'The Pator Six Cruisers'
                ]
              },
              {
                'quantity': 1,
                'names':    [
                  'Shuttle wreck'
                ],
                'notice':   'Needs to be salvaged'
              }
            ]
          },
          {
            'range':   20,
            'enemies': [
              {
                'quantity': 2,
                'names':    [
                  'Chief Republic Hrakt'
                ]
              },
              {
                'quantity': 5,
                'names':    [
                  'Chief Republic Manadis',
                  'Chief Republic Rodul'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Republic Tribal Jotun',
                  'Republic Tribal Kinal',
                  'Republic Tribal Sigur'
                ]
              }
            ]
          }
        ]
      ],
      'tips':        [
        'Gates are not locked so you can skip killing NPC\'s in pocket I',
        'You also don\'t need to kill ships in last pocket, but makes salvaging easier',
        'This mission does not incur any negative standings towards Minmatar Republic and gets you nice tags'
      ],
      'objective':   'You need to salvage shuttle wreck and then complete remotely.'
    },
    {
      'name':        'The Averon Exchange',
      'agent':       'Gian Parele',
      'source':      'Tolle - Impetus Tolle Studio',
      'type':        'Combat',
      'start':       'Tolle',
      'destination': 'Averon system, 2 jumps away',
      'description': [
        'Fight Mercenaries in couple of waves'
      ],
      'enemy':       'Mercenaries',
      'pockets':     [
        [
          {
            'range':   50,
            'note':    'This wave warps off in few seconds and triggers wave I',
            'enemies': [
              {
                'quantity': 6,
                'names':    [
                  'The Pator Six Cruisers'
                ]
              }
            ]
          },
          {
            'range':   5,
            'enemies': [
              {
                'quantity': 5,
                'names':    [
                  'Mercenary Elite Fighter'
                ]
              },
              {
                'quantity': 5,
                'names':    [
                  'Mercenary Wingman'
                ],
                'notice':   'Trigger wave II'
              },
              {
                'quantity': 3,
                'names':    [
                  'Mercenary Commander'
                ]
              }
            ]
          },
          {
            'range':   25,
            'enemies': [
              {
                'quantity': 9,
                'names':    [
                  'Mercenary Corporal',
                  'Mercenary Lieutenant'
                ],
                'notice':   'Trigger wave III'
              }
            ]
          },
          {
            'range':   20,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Mercenary Commander'
                ]
              },
              {
                'quantity': 5,
                'names':    [
                  'Mercenary Overlord'
                ]
              }
            ]
          }
        ]
      ],
      'tips':        [
        'Kill everything and take care of triggers so you don\'t get in trouble',
        'You might wanna move away from warp in beacon since warp scramblers with webs will spawn right on top of it'
      ],
      'objective':   'Kill everything and then complete remotely.'
    },
    {
      'name':        'A Different Kind of Director',
      'agent':       'Gian Parele',
      'source':      'Tolle - Impetus Tolle Studio',
      'type':        'Travel',
      'start':       'Tolle',
      'destination': 'Stetille II - Impetus Publisher, 8 jumps away',
      'description': [
        'Report to Eron Viette in Stetille system'
      ],
      'tips':        [
        'You can start conversation with Gian Parele from anywhere and accept mission'
      ],
      'objective':   'Automatically once you initiate conversation with next agent.'
    },
    {
      'name':        'Assistance',
      'agent':       'Eron Viette',
      'source':      'Stetille II - Impetus Publisher',
      'type':        'Combat',
      'start':       'Stetille',
      'destination': 'Same system',
      'description': [
        'Fight Mercenaries in couple of waves'
      ],
      'enemy':       'Mercenaries',
      'pockets':     [
        [
          {
            'range':   '35 kilometer',
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'Audalle Roire'
                ],
                'notice':   'Neutral NPC, do not shoot him'
              }
            ]
          },
          {
            'range':   10,
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Mercenary Elite Fighter'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Mercenary Wingman'
                ]
              },
              {
                'quantity': 6,
                'names':    [
                  'The Pator Six Cruisers'
                ]
              }
            ]
          },
          {
            'range':   10,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Mercenary Overlord'
                ]
              }
            ]
          },
          {
            'range':   20,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Mercenary Overlord'
                ]
              }
            ]
          },
          {
            'range':   30,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Mercenary Overlord'
                ]
              }
            ]
          },
          {
            'range':   10,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Mercenary Overlord'
                ]
              }
            ]
          },
          {
            'range':   10,
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'Mercenary Overlord'
                ]
              }
            ]
          },
          {
            'range':   10,
            'enemies': [
              {
                'quantity': 2,
                'names':    [
                  'Mercenary Overlord'
                ]
              }
            ]
          }
        ]
      ],
      'tips':        [
        'When you aprroach Audalle Roire, waves will spawn really fast',
        'You\'ll be webbed and scrammed under heavy DPS',
        'Either bastion up or use alt in shuttle/noob ship to trigger waves while damage dealers hold range',
        'Last 2 waves are optimal',
        'Take care of positioning so you don\'t end up in wrong spot at wrong time',
        '800 dps tank was enough for me, but keep in mind it will take some time for your drones to kill of frigates'
      ],
      'objective':   'Kill the spawns, dock up and talk to agent.'
    },
    {
      'name':        'The High or Low Road',
      'agent':       'Eron Viette',
      'source':      'Stetille II - Impetus Publisher',
      'type':        'Epic arc choice',
      'start':       'Stetille',
      'destination': 'Same station',
      'description': [
        'Choose your side',
        'One side leads to lowsec and other stays in highsec',
        'Choose Into The Black as your next mission to stay in highsec'
      ],
      'tips':        [
        'Into The Black should be the next mission choice'
      ],
      'objective':   'Just confirm your choice.'
    },
    {
      'name':        'Into The Black',
      'agent':       'Gian Parele',
      'source':      'Tolle - Impetus Tolle Studio',
      'type':        'Travel',
      'start':       'Tolle',
      'destination': 'Noghere , 8 jumps away',
      'description': [
        'Report to Mourmarie Mone in Noghere system'
      ],
      'tips':        [
        'You can start conversation with Gian Parele from anywhere and accept mission'
      ],
      'objective':   'Automatically once you initiate conversation with next agent.'
    },
    {
      'name':        'Poor Man\'s Shakedown',
      'agent':       'Mourmarie Mone',
      'source':      'Noghere - Unmarked Operation Beacon',
      'type':        'Combat',
      'start':       'Noghere',
      'destination': 'Charmerout system, 2 jumps away',
      'description': [
        'Fight Mercenaries',
        'You need to kill Asteroid Micro-Colony Minors to unlock gate in initial pocket',
        'Furthest one from gate drops the key',
        'Key is consumed'
      ],
      'enemy':       'Mercenaries',
      'pockets':     [
        [
          {
            'range':   'different ranges',
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Asteroid Micro-Colony Minor'
                ],
                'notice':   'Triggers reinforcement spawn'
              }
            ]
          },
          {
            'range':   10,
            'note':    'reinforcement spawn',
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Independent Green-crewed Bellicose',
                  'Independent Green-crewed Scythe',
                  'Independent Green-crewed Stabber',
                  'Independent Green-crewed Rupture'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Independent Green-crewed Typhoon',
                  'Independent Green-crewed Tempest',
                  'Independent Green-crewed Maelstrom'
                ]
              }
            ]
          }
        ],
        [
          {
            'range':   'different ranges',
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Asteroid Micro-Colony Minor'
                ],
                'notice':   'Each triggers reinforcement spawn I'
              }
            ]
          },
          {
            'range':   15,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Independent Rupture',
                  'Independent Stabber'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Independent Green-crewed Typhoon',
                  'Independent Green-crewed Tempest',
                  'Independent Green-crewed Maelstrom'
                ]
              }
            ]
          },
          {
            'range':   15,
            'note':    'objective spawn',
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'The Elder'
                ],
                'notice':   'Spawns once the furthest Micro-Colony is destroyed, mission objective'
              }
            ]
          }
        ]
      ],
      'tips':        [
        'You can blitz the mission by shooting just the trigger Micro-Colonies'
      ],
      'objective':   'Kill The Elder and fly back to your agent.'
    },
    {
      'name':        'Underground Circus',
      'agent':       'Mourmarie Mone',
      'source':      'Noghere - Unmarked Operation Beacon',
      'type':        'Combat',
      'start':       'Noghere',
      'destination': 'Caslemon system, 1 jump away',
      'description': [
        'Get the ringmaster'
      ],
      'enemy':       [
        'Serpentis',
        'Angel Cartel'
      ],
      'pockets':     [
        [
          {
            'range':   0,
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'Acceleration gate'
                ]
              }
            ]
          }
        ],
        [
          {
            'range':   25,
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Sinful Saints',
                  'Gistum Centurion'
                ]
              },
              {
                'quantity': 4,
                'names':    [
                  'Consumption Junkies',
                  'Corelatis Wing Leader'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Sinful Saints',
                  'Gist Seraphim'
                ]
              },
              {
                'quantity': 4,
                'names':    [
                  'Consumption Junkies',
                  'Core High Admiral'
                ]
              }
            ]
          },
          {
            'range':   45,
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Lustadores',
                  'Corelum Guardian Chief Safeguard'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Lustadores',
                  'Corelatis Captain Sentry'
                ]
              }
            ]
          }
        ],
        [
          {
            'range':   35,
            'enemies': [
              {
                'quantity': 2,
                'names':    [
                  'Lustadores',
                  'Gistum Liquidator'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Lustadores',
                  'Corelum Guardian Chief Safeguard'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Consumption Junkies',
                  'Corelatis High Captain'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Consumption Junkies',
                  'Corelatis Platoon Leader'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Sinful Saints',
                  'Gist Saint'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Lustadores',
                  'Core Vice Admiral'
                ]
              }
            ]
          },
          {
            'range':   70,
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'Serpentis Cruiser'
                ],
                'notice':   'The Ringmaster, spawns after destroying Ringmaster\'s Pleasure Hub'
              }
            ]
          }
        ]
      ],
      'tips':        [
        'Don\'t forget to loot The Ringmaster (1.0 m3)'
      ],
      'objective':   'Kill everything, retrieve the item, fly back to station.'
    },
    {
      'name':        'Intaki Chase',
      'agent':       'Mourmarie Mone',
      'source':      'Noghere - Unmarked Operation Beacon',
      'type':        'Combat',
      'start':       'Noghere',
      'destination': 'Pemene system, 3 jumps away',
      'description': [
        'Battleships are using MWD and will close in fast and deal heavy DPS'
      ],
      'enemy':       'Mercenaries',
      'pockets':     [
        [
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'Intaki Settlement Control Tower'
                ],
                'notice':   'Trigger wave I'
              }
            ]
          },
          {
            'range':   70,
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'Independent Veteran Dominix'
                ],
                'notice':   'Trigger wave II'
              },
              {
                'quantity': 2,
                'names':    [
                  'Independent Megathron',
                  'Independent Dominix'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Pator Six Delegate',
                  'Independent Green-Crewed Tempest',
                  'Independent Green-Crewed Typhoon',
                  'Independent Green-Crewed Maelstrom'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Independent Veteran Celestis',
                  'Independent Veteran Exequror'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Independent Thorax',
                  'Independent Exequror'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Independent Veteran Incursus',
                  'Independent Veteran Maulus'
                ]
              }
            ]
          },
          {
            'range':   65,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Independent Veteran Megathron',
                  'Independent Veteran Hyperion'
                ]
              }
            ]
          },
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Independent Veteran Dominix',
                  'Independent Veteran Megathron'
                ]
              }
            ]
          }
        ]
      ],
      'tips':        [
        'Watch out on incoming DPS and be aligned if you don\'t think you can tank about 1000-1200 DPS'
      ],
      'objective':   'Kill everything, fly back to station.'
    },
    {
      'name':        'Rat in a Corner',
      'agent':       'Mourmarie Mone',
      'source':      'Noghere - Unmarked Operation Beacon',
      'type':        'Travel',
      'start':       'Noghere',
      'destination': 'Mesybier X - TransStellar Shipping Storage, 2 jumps away',
      'description': [
        'Report to Ascain Adeset in Mesybier'
      ],
      'tips':        [
        'You can start conversation with Mourmarie Mone from anywhere and accept mission'
      ],
      'objective':   'Automatically once you initiate conversation with next agent.'
    },
    {
      'name':        'Places to Hide',
      'agent':       'Ascain Adeset',
      'source':      'Mesybier X - TransStellar Shipping Storage',
      'type':        'Epic arc choice',
      'start':       'Mesybier',
      'destination': 'Same station',
      'description': [
        'Choose your next mission',
        'Best option would be to take Little Fingers since it is always in high-sec location'
      ],
      'tips':        [
        'Little Fingers should be the next mission choice'
      ],
      'objective':   'Just confirm your choice.'
    },
    {
      'name':        'Little Fingers',
      'agent':       'Ascain Adeset',
      'source':      'Mesybier X - TransStellar Shipping Storage',
      'type':        'Combat',
      'start':       'Mesybier',
      'destination': 'Same system',
      'description': [
        'Last ship is always trigger',
        'Don\'t forget carry on token from fuel depot which can be used to blitz next mission'
      ],
      'enemy':       'Mercenaries',
      'pockets':     [
        [
          {
            'range':   15,
            'enemies': [
              {
                'quantity': 5,
                'names':    [
                  'Independent Hyperion',
                  'Independent Dominix'
                ]
              }
            ]
          },
          {
            'range':   20,
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Independent Veteran Imicus',
                  'Independent Veteran Incursus'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Independent Veteran Hyperion',
                  'Independent Veteran Megathron'
                ]
              }
            ]
          },
          {
            'range':   20,
            'enemies': [
              {
                'quantity': 6,
                'names':    [
                  'Independent Hyperion',
                  'Independent Dominix',
                  'Independent Megathron'
                ]
              }
            ]
          },
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Independent Veteran Thorax',
                  'Independent Veteran Vexor',
                  'Independent Veteran Exequor'
                ]
              }
            ]
          }
        ]
      ],
      'tips':        [
        'Kill the fuel depots to get Carry on Token which can be used to blitz next mission'
      ],
      'objective':   'Kill everything, fly back to station.'
    },
    {
      'name':        'Carry On',
      'agent':       'Ascain Adeset',
      'source':      'Mesybier X - TransStellar Shipping Storage',
      'type':        'Combat',
      'start':       'Mesybier',
      'destination': 'Osmeden, 2 jumps away',
      'description': [
        'There are 2 gates',
        'The Hub gate is locked and leads to last pocket',
        'It can be unlocked with Carry on Token from last mission',
        'Otherwise you have to go through Alley to get to the Hub'
      ],
      'enemy':       'Mercenaries',
      'pockets':     [
        [
          {
            'range':   15,
            'enemies': [
              {
                'quantity': 1,
                'names':    [
                  'Acceleration Gate - The Hub'
                ],
                'notice':   'Locked, required Carry on token'
              },
              {
                'quantity': 1,
                'names':    [
                  'Acceleration Gate - The Alley '
                ]
              }
            ]
          },
          {
            'range':   50,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Independent Veteran Thorax',
                  'Independent Veteran Vexor',
                  'Independent Veteran Celestis'
                ]
              },
              {
                'quantity': 8,
                'names':    [
                  'Independent Hyperion',
                  'Independent Dominix',
                  'Independent Megathron'
                ]
              },
              {
                'quantity': 6,
                'names':    [
                  'Gallente Cruise Missile Battery'
                ],
                'notice':   'Does thermal damage'
              }
            ]
          }
        ],
        [
          {
            'range':   50,
            'enemies': [
              {
                'quantity': 8,
                'names':    [
                  'Independent Thorax',
                  'Independent Vexor',
                  'Independent Celestis',
                  'Independent Exequror'
                ]
              },
              {
                'quantity': 6,
                'names':    [
                  'Independent Hyperion',
                  'Independent Dominix',
                  'Independent Megathron'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Gallente Cruise Missile Battery'
                ],
                'notice':   'Does thermal damage'
              },
              {
                'quantity': 2,
                'names':    [
                  'Gallente Heavy Missile Battery'
                ],
                'notice':   'Does kinetic damage'
              }
            ]
          }
        ],
        [
          {
            'range':   50,
            'enemies': [
              {
                'quantity': 4,
                'names':    [
                  'Independent Veteran Tristan',
                  'Independent Veteran Maulus',
                  'Independent Veteran Atron'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Independent Veteran Thorax',
                  'Independent Veteran Vexor',
                  'Independent Veteran Celestis'
                ]
              },
              {
                'quantity': 8,
                'names':    [
                  'Independent Hyperion',
                  'Independent Dominix',
                  'Independent Megathron'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Carry On Freighter',
                  'Freighter'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Carry On Courier',
                  'Carry On Industrial',
                  'Industrial'
                ]
              },
              {
                'quantity': 1,
                'names':    [
                  'Carry on Hub'
                ],
                'notice':   'Mission objective structure'
              }
            ]
          }
        ]
      ],
      'tips':        [
        'If you want to blitz this mission, use carry on token from last site and just use The Hub acceleration gate on start',
        'Approach the Carry on Hub at 10 kilometers are rest will warp off',
        'You might wanna snipe frigates from range so they don\'t web you on your approach'
      ],
      'objective':   'Approach 10 kilometers within Carry on Hub to get mission completed.'
    },
    {
      'name':        'Studio One',
      'agent':       'Ascain Adeset',
      'source':      'Mesybier X - TransStellar Shipping Storage',
      'type':        'Combat',
      'start':       'Mesybier',
      'destination': 'Osmeden, 2 jumps away',
      'description': [
        'Battleships use MWDs and deal high DPS from close up',
        'Be aligned or be ready to overheat tank for a bit while you clear some of grid',
        'This is most DPS I\'ve encountered in L4 missions if you let them close',
        'The Pator Six ships deal some explosive damage, but they are cruisers so not that much damage'
      ],
      'enemy':       'Mercenaries',
      'pockets':     [
        [
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 2,
                'names':    [
                  'Independent Veteran Tristan',
                  'Independent Veteran Atron',
                  'Independent Veteran Maulus',
                  'Independent Veteran Imicus'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Independent Veteran Thorax',
                  'Independent Veteran Vexor',
                  'Independent Veteran Celestis'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Independent Veteran Hyperion',
                  'Independent Veteran Dominix',
                  'Independent Veteran Megathron'
                ]
              }
            ]
          },
          {
            'range':   80,
            'enemies': [
              {
                'quantity': 2,
                'names':    [
                  'Independent Veteran Tristan',
                  'Independent Veteran Atron',
                  'Independent Veteran Maulus',
                  'Independent Veteran Imicus'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Independent Veteran Thorax',
                  'Independent Veteran Vexor',
                  'Independent Veteran Celestis'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Independent Veteran Hyperion',
                  'Independent Veteran Dominix',
                  'Independent Veteran Megathron'
                ]
              }
            ]
          }
        ],
        [
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 3,
                'names':    [
                  'Independent Veteran Thorax',
                  'Independent Veteran Vexor',
                  'Independent Veteran Celestis'
                ]
              },
              {
                'quantity': 2,
                'names':    [
                  'Independent Veteran Hyperion',
                  'Independent Veteran Dominix',
                  'Independent Veteran Megathron'
                ]
              },
              {
                'quantity': 10,
                'names':    [
                  'Independent Hyperion',
                  'Independent Dominix',
                  'Independent Megathron'
                ]
              },
              {
                'quantity': 1,
                'names':    [
                  'Studio 1'
                ],
                'notice':   'Mission objective structure, trigger wave I'
              }
            ]
          },
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 6,
                'names':    [
                  'Pator Six Elite Frigates',
                  'Independent Veteran Rifter',
                  'Independent Veteran Slasher',
                  'Independent Veteran Probe',
                  'Independent Veteran Vigil'
                ]
              },
              {
                'quantity': 6,
                'names':    [
                  'Independent Veteran Hyperion',
                  'Independent Veteran Dominix',
                  'Independent Veteran Megathron'
                ]
              }
            ]
          }
        ]
      ],
      'tips':        [
        'Keep an eye on that incoming DPS, be careful and be aligned',
        'I use 1000 dps tank + OGB on top of that for this mission',
        'Don\'t be afraid to overheat or to warp out if needed'
      ],
      'objective':   'Kill Studio I and either finish off the enemy or warp out.'
    },
    {
      'name':        'Showtime',
      'agent':       'Ascain Adeset',
      'source':      'Mesybier X - TransStellar Shipping Storage',
      'type':        'Combat and retrieve item',
      'start':       'Mesybier',
      'destination': 'Adacyne system, 3 jumps away',
      'description': [
        'Battleships deal high DPS',
        'Be aligned or be ready to overheat tank for a bit while you clear some of grid',
        'Like last mission, this is most DPS I\'ve encountered in L4 missions, even on range'
      ],
      'enemy':       [
        'Mercenaries',
        'Minmatar Republic'
      ],
      'pockets':     [
        [
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 5,
                'names':    [
                  'Independent Veteran Imicus',
                  'Independent Veteran Maulus',
                  'Independent Veteran Tristan',
                  'Independent Veteran Atron'
                ]
              },
              {
                'quantity': 3,
                'names':    [
                  'Pator Six Elite Cruisers',
                  'Independent Veteran Stabber',
                  'Independent Veteran Bellicose',
                  'Independent Veteran Scythe'
                ],
                'notice':   'Trigger wave I'
              },
              {
                'quantity': 5,
                'names':    [
                  'Pator Six Elite Battleships',
                  'Independent Veteran Tempest',
                  'Independent Veteran Maelstrom',
                  'Independent Veteran Typhoon'
                ],
                'notice':   'Trigger wave II'
              }
            ]
          },
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 5,
                'names':    [
                  'Independent Thorax',
                  'Independent Vexor',
                  'Independent Celestis',
                  'Independent Exequror'
                ]
              }
            ]
          },
          {
            'range':   60,
            'enemies': [
              {
                'quantity': 6,
                'names':    [
                  'Independent Hyperion',
                  'Independent Dominix',
                  'Independent Megathron'
                ]
              },
              {
                'quantity': 1,
                'names':    [
                  'Minmatar Battleship'
                ],
                'notice':   'Rosulf Fririk, mission objective'
              }
            ]
          }
        ]
      ],
      'tips':        [
        'Don\'t forget to loot Ralie Ardanne (1.0 m3)',
        'Pator Six Elite Battleships deal lots of Alpha damage and lots of DPS',
        'Don\'t be afraid to warp out if needed',
        'Usually I try to kill all frigates first, then I kill 2-4 battleships to lower DPS, when cruisers start coming under 40km, I switch to them and kill them and their spawn. Then I focus on finishing battleships and their spawn. Ideally you will have enough DPS manage to kill at least 3-4 battleships before cruisers come close since you really don\'t need energy neutralizer pressure in this mission'
      ],
      'objective':   'Kill the mission objective, loot him and fly back to your agent.'
    },
    {
      'name':        'Where\'s the Line',
      'agent':       'Ascain Adeset',
      'source':      'Mesybier X - TransStellar Shipping Storage',
      'type':        'Epic arc choice',
      'start':       'Mesybier',
      'destination': 'Same station',
      'description': [
        'Choose your side',
        'One side gives Syndicate Cloaking Device and Syndicate faction standings',
        'Other side gives Black Eagle Drone Link Augmentor and Gallente faction standing'
      ],
      'tips':        [
        'Safe Return should be the next mission choice for Gallente standings'
      ],
      'objective':   'Just confirm your choice.'
    },
    {
      'name':        'Safe Return',
      'agent':       'Ascain Adeset',
      'source':      'Mesybier X - TransStellar Shipping Storage',
      'type':        'Deliver item and optional combat',
      'start':       'Mesybier',
      'destination': 'Enedore system, 9 jumps away',
      'description': [
        'Fly couple of jumps out and drop the kid into transport ship',
        'Once you drop kid there will be a spawn of hostile NPC\'s',
        'Suggested to use shuttle and just drop the kid and warp off once the wave spawns',
        'Not worth the jumps to take battleship all the way there since you have to return to your agent to pick up reward'
      ],
      'enemy':       'Mercenaries',
      'tips':        [
        'Just blitz it. From what I remember you don\'t make much by bounties or loot'
      ],
      'objective':   'Drop the item and warp off.'
    }
  ]
};
