export const data = {
  'info': {
    'name': 'Right To Rule',
    'iconID': '500003',
    'empire': 'Amarr Empire',
    'race': 'amarr',
    'startingAgent': 'Karde Romu in Kor-Azor Prime',
    'desc': [
      'The Amarr epic arc is notable for heavy capacitor neutralizers and heavy tracking disruption',
      'In some missions you might have trouble due to tracking disruption so it would be nice idea to have a missile ship, an alt, good drones damage, a friend or a Marauders EWAR immunity',
      'This guide covers the route to maximum standing reward',
      'To start this epic arc you need standings of 5.0 towards Karde Romu, Ministry of Internal Order or Amarr Empire'
    ],
    'rewards': [
      '+10% Amarr Empire faction standing increase (unmodified)',
      'Imperial Navy Modified \'Noble\' Implant (1 m³)'
    ],
    'notes': [
      'Mission 16 can send you into lowsec sometimes, but it can be done in non-combat ship.',
      'Heavy neutralizing ability in some missions',
      'Heavy tracking disruptions in some missions',
      'You need Data Analyzer in mission 8',
      'You might need to do one mission in lowsec, you don`t need a combat ship for this'
    ]
  },
  'missions': [
    {
      'name': 'Aiding an Investigator',
      'agent': 'Karde Romu',
      'source': 'Kor Azor Prime - MIO Agent Beacon',
      'type': 'Travel',
      'start': 'Kor Azor Prime',
      'dest': 'Nahyeen system, 3 jumps away',
      'desc': [
        'Report to Kandus Sandar in Nahyeen VI - Ministry of Internal Order Assembly Plant'
      ],
      'tips': [
        'You can start conversation with Karde Romu from anywhere and accept first mission'
      ],
      'objective': 'Automatically finished once you initiate conversation with next agent',
      'canAcptRmty': true
    },
    {
      'name': 'Late Reports',
      'agent': 'Kandus Sandar',
      'source': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type': 'Combat and retrieve item',
      'start': 'Nahyeen',
      'dest': 'Any system in constellation',
      'desc': [
        'Fight Sansha\'s Nation and get item'
      ],
      'enemy': 'Sansha\'s Nation',
      'tips': [
        'Don\'t forget to loot Reports (0.1 m³) - They should appear in your cargo hold after you kill last enemy'
      ],
      'objective': 'Kill everything, retrieve the item, fly back to station',
      'pockets': [
        [
          {
            'range': 30,
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Ravener',
                  'Centii Loyal Scavenger'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Mutant Lord',
                  'Centus Savage Lord'
                ]
              }
            ]
          },
          {
            'range': 30,
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centum Loyal Beast',
                  'Centum Loyal Juggernaut',
                  'Centum Loyal Slaughterer',
                  'Centum Loyal Execrator'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Beast Lord',
                  'Centus Plague Lord'
                ]
              }
            ]
          },
          {
            'range': 40,
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centii Loyal Manslayer',
                  'Centii Loyal Plague',
                  'Centii Loyal Enslaver',
                  'Centii Loyal Butcher'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Dark Lord',
                  'Centus Overlord'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'The Outclassed Outpost',
      'agent': 'Kandus Sandar',
      'source': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type': 'Combat',
      'start': 'Nahyeen',
      'dest': 'Any system in constellation',
      'desc': [
        'Fight Sansha\'s Nation',
        'Approach the station to be around 60km from all spawn points'
      ],
      'enemy': 'Sansha\'s Nation',
      'tips': [
        'Move closer to the station to be in better range for reinforcement spawns',
        'You can complete the mission remotely'
      ],
      'objective': 'Completed after last ship is dead',
      'pockets': [
        [
          {
            'range': 30,
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centii Loyal Savage',
                  'Centii Loyal Slavehunter'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Plague Lord'
                ]
              }
            ]
          },
          {
            'range': 80,
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Servant'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Beast Lord',
                  'Centus Plague Lord'
                ]
              }
            ]
          },
          {
            'range': 70,
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Butcher',
                  'Centii Loyal Plague',
                  'Centii Loyal Enslaver'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Dark Lord',
                  'Centus Overlord'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'Raging Sansha',
      'agent': 'Kandus Sandar',
      'source': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type': 'Combat',
      'start': 'Nahyeen',
      'dest': 'Any system in constellation',
      'desc': [
        'Fight Sansha\'s Nation',
        'Any of the Centum Juggernauts (cruiser size) is trigger for second wave',
        'Any of the frigates and any of the cruisers in second wave is trigger for additional waves'
      ],
      'enemy': 'Sansha\'s Nation',
      'tips': [
        'Bring marauder, good drone damage, a friend or missile ship due to heavy tracking disruption',
        'You can complete the mission remotely'
      ],
      'objective': 'Complete remotely after last ship is dead',
      'pockets': [
        [
          {
            'range': '30',
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centii Loyal Savage',
                  'Centii Loyal Manslayer',
                  'Centii Loyal Slavehunter'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centum Beast',
                  'Centum Juggernaut'
                ],
                'notice': 'Any could trigger wave 2'
              },
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Mutilator',
                  'Centum Loyal Fiend'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centatis Daemon',
                  'Centatis Wraith',
                  'Centatis Phantasm'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Centus Dread Lord',
                  'Centus Dark Lord',
                  'Centus Overlord'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Centus Tyrant'
                ],
                'notice': 'Sansha Commander, on damage warps off and triggers wave 1'
              }
            ]
          },
          {
            'range': 45,
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centatis Specter'
                ]
              }
            ]
          },
          {
            'range': 85,
            'enemies': [
              {
                'quantity': 5,
                'names': [
                  'Centii Loyal Servant',
                  'Centii Loyal Butcher',
                  'Centii Loyal Enslaver'
                ],
                'notice': 'Any could trigger wave 3'
              },
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Execrator',
                  'Centum Loyal Slaughterer'
                ]
              }
            ]
          },
          {
            'range': 30,
            'enemies': [
              {
                'quantity': 1,
                'names': [
                  'Centum Torturer'
                ],
                'notice': 'Trigger wave 4'
              }
            ]
          },
          {
            'range': 30,
            'enemies': [
              {
                'quantity': 1,
                'names': [
                  'Centii Loyal Manslayer',
                  'Centii Loyal Enslaver'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centum Loyal Torturer',
                  'Centum Loyal Slaughterer',
                  'Centum Loyal Hellhound'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Centus Plague Lord'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'Cowardly Commander',
      'agent': 'Kandus Sandar',
      'source': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type': 'Combat',
      'start': 'Nahyeen',
      'dest': 'Any system in constellation',
      'desc': [
        'Kill everything, watch out on neutralizer towers',
        'Gates are not locked so you can burn 150 km out and then warp to gate at 0 to activate',
        'However be warned this might not be best idea for your capacitor levels'
      ],
      'enemy': [
        'Sansha\'s Nation',
        'Amarr Empire'
      ],
      'tips': [
        'Shoot down energy neutralizer towers as soon as possible or you might find yourself in serious capacitor issues',
        'If you are having issues killing towers due to tracking disruption, you can either MJD or MWD to 250km range to move out of neut range, wait for enemies to come closer, then use warp drive to land on tower and finish it',
        'Acceleration gates are not locked, if you are confident you could blitz it. Take care of scrams in that case'
      ],
      'objective': 'Complete remotely after last ship is dead',
      'pockets': [
        [
          {
            'range': 20,
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Minion',
                  'Centii Loyal Scavenger'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Plague Lord',
                  'Centus Beast Lord'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Tower Sentry Sansha III'
                ]
              }
            ]
          },
          {
            'range': 20,
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centii Loyal Butcher',
                  'Centii Loyal Manslayer',
                  'Centii Loyal Enslaver'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Dark Lord',
                  'Centus Overlord'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': 60,
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centii Loyal Slavehunter',
                  'Centii Loyal Savage'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Dark Lord',
                  'Centus Overlord'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Sansha Energy Neutralizer Sentry I'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Tower Sentry Sansha III'
                ]
              }
            ]
          },
          {
            'range': 60,
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centatis Daemon',
                  'Centatis Devil'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Beast Lord',
                  'Centus Plague Lord'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '20-30',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Ravener'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centum Loyal Torturer',
                  'Centum Loyal Hellhound',
                  'Centum Loyal Mutilator'
                ],
                'notice': 'Last killed will trigger wave 1'
              },
              {
                'quantity': 4,
                'names': [
                  'Centatis Daemon',
                  'Centatis Behemoth'
                ],
                'notice': 'Last killed will trigger wave 2'
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Plague Lord',
                  'Centus Beast Lord'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Sansha Energy Neutralizer Sentry I'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Tower Sentry Sansha III'
                ]
              }
            ]
          },
          {
            'range': 40,
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Scavenger',
                  'Centii Loyal Ravener'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Dread Lord',
                  'Centus Tyrant'
                ]
              }
            ]
          },
          {
            'range': 20,
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centii Loyal Butcher',
                  'Centii Loyal Plague',
                  'Centii Loyal Manslayer'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Dark Lord'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': 40,
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Divine Imperial Imran'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Imperial Templar Tamir',
                  'Imperial Templar Donus'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Imperial Martyr',
                  'Imperial Dominator'
                ]
              }
            ]
          },
          {
            'range': '35-100',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Imperial Champion',
                  'Imperial Templar Justicar'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Imperial Templar Ultara',
                  'Imperial Templar Dominator'
                ],
                'notice': 'Closer group at 35km, last killed will trigger wave 2'
              },
              {
                'quantity': 3,
                'names': [
                  'Divine Imperial Valok',
                  'Divine Imperial Paladin'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Divine Imperial Tamir'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Imperial Martyr',
                  'Imperial Ultara',
                  'Imperial Templar Torah'
                ]
              }
            ]
          },
          {
            'range': 30,
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Imperial Templar Caius'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Imperial Templar Phalanx'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Imperial Templar Martyr'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'Report to Aralin Jick',
      'agent': 'Kandus Sandar',
      'source': 'Nahyeen VI - Ministry of Internal Order Assembly Plant',
      'type': 'Travel',
      'start': 'Nahyeen',
      'dest': 'Nishah system, 4 jumps away',
      'desc': [
        'Report to Aralin Jick at Nishah VII - Moon 5 - Kor-Azor Family Treasury'
      ],
      'tips': [
        'You can start conversation with Kandus Sandar from anywhere and accept mission'
      ],
      'objective': 'Automatically finished once you initiate conversation with next agent'
    },
    {
      'name': 'Background Check',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Combat',
      'start': 'Nishah',
      'dest': 'Same system',
      'desc': [
        'Fight Sansha\'s forces',
        'Watch out on triggers, they are random',
        'Lock everything on grid and kill it, then repeat',
        'Don\'t move to new waves until you finish current active wave'
      ],
      'enemy': 'Sansha\'s Nation',
      'tips': [
        'Triggers are random',
        'Finish each group before moving to next one'
      ],
      'objective': 'Complete remotely after last ship is dead',
      'pockets': [
        [
          {
            'range': '10 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Mutilator',
                  'Centum Loyal Hellhound'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Dread Lord',
                  'Centus Tyrant'
                ]
              }
            ]
          },
          {
            'range': '10 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centatis Devil',
                  'Centatis Wraith'
                ]
              }
            ]
          },
          {
            'range': '25 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Fiend',
                  'Centum Loyal Hellhound',
                  'Centum Loyal Torturer'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Centus Tyrant',
                  'Centus Dread Lord'
                ]
              }
            ]
          },
          {
            'range': '25 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Minion',
                  'Centii Loyal Servant'
                ]
              }
            ]
          },
          {
            'range': '30 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centatis Devil',
                  'Centatis Wraith'
                ]
              }
            ]
          },
          {
            'range': '30 kilometers',
            'enemies': [
              {
                'quantity': 1,
                'names': [
                  'Centii Loyal Servant',
                  'Centii Loyal Minion'
                ]
              }
            ]
          },
          {
            'range': '30 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Torturer',
                  'Centum Loyal Mutilator',
                  'Centum Loyal Fiend'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Centus Dread Lord',
                  'Centus Tyrant'
                ]
              }
            ]
          },
          {
            'range': '20 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centatis Wraith',
                  'Centatis Devil'
                ]
              }
            ]
          },
          {
            'range': '20 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centii Loyal Minion',
                  'Centii Loyal Servant'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'Longing Leman',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Data Analyze and retrieve item',
      'start': 'Nishah',
      'dest': 'Any system in constellation',
      'desc': [
        'Burn 16 km to the Encrypted Communications Array and hack it',
        'Do NOT fight in this mission otherwise you will get Amarr Empire standings hit',
        'If you decide to fight, be aware of energy neutralizers on battleship hulls'
      ],
      'tips': [
        'Don\'t forget to loot Communications Logs (0.1 m³)'
      ],
      'objective': 'Hack structure, loot item, fly back to station.'
    },
    {
      'name': 'Languishing Lord',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Travel',
      'start': 'Nishah',
      'dest': 'Same system',
      'desc': [
        'If you engage ANY ships, you will FAIL this mission',
        'Approach Broken Metallic Crystal Asteroid (30km distance from warp in point) and wait for screen popup that says mission is completed'
      ],
      'tips': [
        'Do not engage any ships'
      ],
      'objective': 'Complete remotely after the ships you\'re spying on warp off.'
    },
    {
      'name': 'Razing the Outpost',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Combat',
      'start': 'Nishah',
      'dest': 'Same system',
      'desc': [
        'Fight Mercenaries and kill the outpost'
      ],
      'enemy': 'Mordu\'s Legion',
      'tips': [
        'Just keep shooting as they come, blow up the station at the end',
        'You can blow up station first to stop new spawns, but that will take some time based on your DPS'
      ],
      'objective': 'Complete remotely after last ship is dead.',
      'pockets': [
        [
          {
            'range': '10 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Mordus Bounty Hunter'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Mordus Lion'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Mordus Gigamar',
                  'Mordus Phanti'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Caldari Cruise Missile Battery'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '20 kilometers',
            'enemies': [
              {
                'quantity': 6,
                'names': [
                  'Mordus Puma',
                  'Mordus Leopard'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Mordus Gigamar',
                  'Mordus Phanti',
                  'Mordus Mammoth'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Caldari Cruise Missile Battery'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '10-80 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Mordus Bounty Hunter'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Mordus Bobcat'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Mordus Gigamar'
                ],
                'notice': 'Last killed will trigger wave 1'
              },
              {
                'quantity': 3,
                'names': [
                  'Caldari Heavy Missile Battery'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Caldari Cruise Missile Battery'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Caldari Station 150k'
                ],
                'notice': 'Mission objective Outpost'
              }
            ]
          },
          {
            'range': '70 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Mordus Bounty Hunter'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Mordus Leopard'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Mordus Gigamar',
                  'Mordus Mammoth'
                ],
                'notice': 'Last killed will trigger wave 2'
              }
            ]
          },
          {
            'range': '60 kilometers',
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Mordus Bounty Hunter'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Mordus Lion'
                ]
              },
              {
                'quantity': 6,
                'names': [
                  'Mordus Gigamar',
                  'Mordus Phanti',
                  'Mordus Mammoth'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'Ascending Nobles',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Combat and retrieve item',
      'start': 'Nishah',
      'dest': 'Reteka system, 7 jumps away',
      'desc': [
        'Heavy DPS if you let them come in close, make sure to kill and loot as soon as possible',
        'Few minutes after last enemy dies, wave 4 will arrive and they hit hard, more then 1200 dps if they come in close',
        'Wave 4 doesn\'t offer any bounty and it\'s fairly bad loot/salvage',
        'It is recommended to just skip looting all together in this mission'
      ],
      'enemy': 'Amarr Empire',
      'tips': [
        'Don\'t forget to loot Mina Darabi (1.0 m³) at chapel and get out before wave 4',
        'You have about 15-20 minutes before they show up after Mina has been ejected in a can from chapel'
      ],
      'objective': 'Kill everything, loot item, fly back to station.',
      'pockets': [
        [
          {
            'range': '75 kilometers',
            'enemies': [
              {
                'quantity': 5,
                'names': [
                  'Independent Veteran Abaddon',
                  'Independent Veteran Armageddon',
                  'Independent Veteran Apocalypse'
                ],
                'notice': 'Last killed will trigger wave 1'
              },
              {
                'quantity': 2,
                'names': [
                  'Amarr Light Missile Battery'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Amarr Cruise Missile Battery'
                ]
              }
            ]
          },
          {
            'range': '70 kilometers',
            'lastTrigger': true,
            'enemies': [
              {
                'quantity': 8,
                'names': [
                  'Independent Veteran Omen',
                  'Independent Veteran Augoror',
                  'Independent Veteran Maller',
                  'Independent Veteran Arbitrator'
                ],
                'notice': 'There is 8 of them with strong neuts, stay out of range'
              }
            ]
          },
          {
            'range': '70 kilometers',
            'lastTrigger': true,
            'enemies': [
              {
                'quantity': 7,
                'names': [
                  'Independent Green-Crewed Abaddon',
                  'Independent Green-Crewed Armageddon',
                  'Independent Green-Crewed Apocalypse'
                ]
              }
            ]
          },
          {
            'range': '70 kilometers',
            'enemies': [
              {
                'quantity': 6,
                'names': [
                  'Independent Abaddon',
                  'Independent Armageddon',
                  'Independent Apocalypse'
                ]
              }
            ]
          },
          {
            'range': '70 kilometers',
            'note': 'reinforcement timed wave',
            'enemies': [
              {
                'quantity': 6,
                'names': [
                  'Independent Veteran Crucifier',
                  'Independent Veteran Inquisitor'
                ]
              },
              {
                'quantity': 6,
                'names': [
                  'Independent Veteran Omen',
                  'Independent Veteran Maller',
                  'Independent Veteran Augoror'
                ]
              },
              {
                'quantity': 6,
                'names': [
                  'Independent Veteran Armageddon',
                  'Independent Veteran Apocalypse',
                  'Independent Veteran Abaddon'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'Hunting the Hunter',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Combat and retrieve item',
      'start': 'Nishah',
      'dest': 'Any system in constellation',
      'desc': [
        'Fight Sansha an capture enemy commander'
      ],
      'enemy': 'Sansha\'s Nation',
      'tips': [
        'Don\'t forget to loot Rahsa (1.0 m³)'
      ],
      'pockets': [
        [
          {
            'range': '10 kilometers',
            'enemies': [
              {
                'quantity': 6,
                'names': [
                  'Centum Loyal Fiend',
                  'Centum Loyal Hellhound'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Dark Lord',
                  'Centus Dread Lord'
                ]
              },
              {
                'quantity': 6,
                'names': [
                  'Sansha Heavy Missile Battery'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '50 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centii Loyal Savage',
                  'Centii Loyal Slavehunter'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centatis Devil',
                  'Centatis Daemon'
                ],
                'notice': 'Last killed will trigger wave 2'
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Tyrant',
                  'Centus Dread Lord'
                ],
                'notice': 'Last killed will trigger wave 3'
              },
              {
                'quantity': 2,
                'names': [
                  'Tower Sentry Sansha III'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Sansha Energy Neutralizer Sentry I'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Sansha\'s Battletower'
                ],
                'notice': 'Destroy to unlock gate, clear the room first'
              }
            ]
          },
          {
            'range': '140 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centum Loyal Mutilator',
                  'Centum Loyal Torturer'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Beast Lord',
                  'Centus Savage Lord',
                  'Centus Overlord'
                ]
              }
            ]
          },
          {
            'range': '40 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centum Loyal Execrator',
                  'Centum Loyal Slaughterer'
                ]
              }
            ]
          },
          {
            'range': '50 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Plague',
                  'Centii Loyal Butcher'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Centus Beast Lord',
                  'Centus Plague Lord'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '30 kilometers',
            'enemies': [
              {
                'quantity': 1,
                'names': [
                  'Centus Tyrant'
                ],
                'notice': 'Rahsa Battleship, drops mission objective'
              }
            ]
          }
        ]
      ],
      'objective': 'Kill everything, loot item, fly back to station.'
    },
    {
      'name': 'Fate of a Madman',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Epic arc choice',
      'start': 'Nishah',
      'dest': 'Same station',
      'desc': [
        'Choose your side',
        'One side leads to lowsec and continues this arc for sansha side and other goes forward to Amarr Empire standings',
        'Choose Interrogation: Catching the Scent as your next mission to stay on Amarr Empire path'
      ],
      'tips': [
        'Interrogation: Catching the Scent should be the next mission choice'
      ],
      'objective': 'Just confirm your choice.'
    },
    {
      'name': 'Interrogation: Catching the Scent',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Combat and retrieve item',
      'start': 'Nishah',
      'dest': 'Any system in constellation',
      'desc': [
        'Fight Sansha an loot Sansha Command Signal Receiver'
      ],
      'enemy': 'Sansha\'s Nation',
      'tips': [
        'Kill frigates in initial spawn, then all but one cruiser and battleship',
        'After that just clear all the battleships, then all the cruisers',
        'Don\'t forget to loot The Sansha Command Signal Receiver (0.1 m³)'
      ],
      'objective': 'Kill everything, loot item, fly back to station.',
      'pockets': [
        [
          {
            'range': '60 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Savage',
                  'Centii Loyal Slavehunter'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Centum Mutilator',
                  'Centum Torturer'
                ],
                'notice': 'Trigger wave 1, just Cruisers'
              },
              {
                'quantity': 6,
                'names': [
                  'Centus Dark Lord',
                  'Centus Overlord'
                ],
                'notice': 'Trigger wave 1, just Battleships'
              }
            ]
          },
          {
            'range': '60 kilometers',
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centum Hellhound',
                  'Centum Fiend'
                ],
                'notice': 'Trigger wave 2, just Cruisers'
              },
              {
                'quantity': 5,
                'names': [
                  'Centus Dread Lord',
                  'Centus Dark Lord'
                ],
                'notice': 'Trigger wave 2, just Battleships'
              }
            ]
          },
          {
            'range': '60 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centum Loyal Torturer',
                  'Centum Loyal Mutilator'
                ],
                'notice': 'Trigger wave 3, just Cruisers'
              },
              {
                'quantity': 4,
                'names': [
                  'Centus Dread Lord',
                  'Centus Tyrant'
                ],
                'effect': 'Trigger wave III battleships',
                'notice': 'Trigger wave 3, just Battleships'
              }
            ]
          },
          {
            'range': '60 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Fiend'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Tyrant'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'Falling into Place',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Take item to mission site and then combat',
      'start': 'Nishah',
      'dest': 'Shaha system, 13 jumps away',
      'desc': [
        'Do not forget to take Homemade Sansha Beacon (1.0 m³) with you',
        'Place the beacon in Linked Broadcast Array Hub and kill all the ships that come to rescue',
        'Park your ships in Palas on your way back, read tips for more information'
      ],
      'enemy': 'Amarr Empire',
      'tips': [
        'When returning to your agent stop in system called Palas and dock up your ships/orca',
        'Use only frigate or shuttle to burn back to your agent',
        'Next mission is not combat and mission after that will send you into Palas so you save yourself 10 jumps'
      ],
      'objective': 'Complete remotely after last ship is dead.',
      'pockets': [
        [
          {
            'range': '60 kilometers',
            'enemies': [
              {
                'quantity': 5,
                'names': [
                  'Independent Maller',
                  'Independent Omen',
                  'Independent Green-Crewed Maller',
                  'Independent Green-Crewed Augoror',
                  'Independent Green-Crewed Arbitrator'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Independent Veteran Augoror',
                  'Independent Veteran Arbitrator',
                  'Independent Veteran Omen'
                ]
              },
              {
                'quantity': 5,
                'names': [
                  'Independent Green-Crewed Abaddon',
                  'Independent Green-Crewed Armageddon',
                  'Independent Green-Crewed Apocalypse',
                  'Independent Abaddon',
                  'Independent Armageddon',
                  'Independent Apocalypse'
                ]
              }
            ]
          }
        ]
      ]
    },
    {
      'name': 'Making an Arrest',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Fly to location in space',
      'start': 'Nishah',
      'dest': 'Random location in several possible constellations, cca 15 jumps away',
      'desc': [
        'Burn to Harkan\'s Manor',
        'This will trigger station to explode and complete mission',
        'This mission has no NPC\'s and can be done in Covert Ops frigate or an shuttle',
        'This mission has a chance to send you into lowsec so inform yourself how to navigate lowsec safely'
      ],
      'tips': [
        'Do not take your battleship/orca into lowsec',
        'Use small fast ship'
      ],
      'objective': 'Once you get message from your agent, fly back to his station.'
    },
    {
      'name': 'An Unfortunate End',
      'agent': 'Aralin Jick',
      'source': 'Nishah VII - Moon 5 - Kor-Azor Family Treasury',
      'type': 'Travel',
      'start': 'Nishah',
      'dest': 'Palas system, 6 jumps away',
      'desc': [
        'Report to Riff Hebian in Palas at Miyan Security Forces Beacon'
      ],
      'tips': [
        'Your battleship should be there already if you left it there 2 missions ago'
      ],
      'objective': 'Automatically once you initiate conversation with next agent.'
    },
    {
      'name': 'Panic Response',
      'agent': 'Riff Hebian',
      'source': 'Palas system at Miyan Security Forces Beacon',
      'type': 'Combat',
      'start': 'Palas',
      'dest': 'Any system in constellation',
      'desc': [
        'Kill all ships in area',
        'Keep in mind that bounty, salvage and loot from this mission are very low',
        'It is recommended to just keep killing frigates until energy neutralizer tower spawns, then kill the tower and everything will warp off',
        'After that simply finish remaining towers to complete the mission',
        'Be aligned if you don\'t think your tank will hold'
      ],
      'enemy': 'Sansha\'s Nation',
      'pockets': [
        [
          {
            'range': '40 kilometers',
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Centii Servant',
                  'Centii Minion'
                ],
                'notice': 'Trigger same number of frigates five times'
              },
              {
                'quantity': 4,
                'names': [
                  'Centum Ravisher',
                  'Centum Ravager'
                ],
                'notice': 'Trigger same number of cruisers five times'
              },
              {
                'quantity': 1,
                'names': [
                  'Centus Tyrant'
                ]
              }
            ]
          },
          {
            'range': '40 kilometers',
            'note': 'timed spawn',
            'enemies': [
              {
                'quantity': 4,
                'names': [
                  'Amarr Cruise Missile Battery'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Amarr Stasis Tower'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Amarr Energy Neutralizer Sentry III'
                ]
              }
            ]
          }
        ]
      ],
      'tips': [
        'Blitz the mission by killing neutralizer tower as soon as it spawns'
      ],
      'objective': 'Fly back to station once you kill neutralizer tower and missile batteries.'
    },
    {
      'name': 'The Right to Rule',
      'agent': 'Riff Hebian',
      'source': 'Palas system at Miyan Security Forces Beacon',
      'type': 'Combat',
      'start': 'Palas',
      'dest': 'Choga system, 4 systems away',
      'desc': [
        'Fight Sansha and kill Harkan'
      ],
      'enemy': 'Sansha\'s Nation',
      'tips': [
        'Watch out on triggers',
        'If you are not sure if you can handle all the waves in last pocket go for blitz option',
        'Good way to keep track of spawns is to always eliminate all the ships from current wave before moving on next spawned wave',
        'Exception of this rule is initial battleship in pocket III and Harkan\'s Behemoth in pocket IV since they have multipsle triggers',
        'Blitz in last wave is done by burning away from the group which will pull Harkan away from rest of this ship and away from spawn points. Once you burned 50-100 kilometers, just kill him him and warp off'
      ],
      'objective': 'Once Harkan is dead, fly back to agent to get standings and implant.',
      'pockets': [
        [
          {
            'range': '10 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centum Loyal Hellhound',
                  'Centum Loyal Fiend'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centatis Devil',
                  'Centatis Wraith'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '10 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centii Loyal Servant',
                  'Centii Loyal Minion'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Centum Slaughterer',
                  'Centum Execrator'
                ]
              },
              {
                'quantity': 4,
                'names': [
                  'Centum Loyal Hellhound',
                  'Centum Loyal Fiend'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centatis Wraith',
                  'Centatis Behemoth'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Plague Lord',
                  'Centus Beast Lord'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '18 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centum Loyal Torturer',
                  'Centum Loyal Mutilator'
                ]
              },
              {
                'quantity': 6,
                'names': [
                  'Centatis Devil',
                  'Centatis Daemon'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Mutant Lord',
                  'Centus Savage Lord'
                ]
              }
            ]
          },
          {
            'range': '10 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Enslaver',
                  'Centii Loyal Manslayer',
                  'Centii Loyal Plague'
                ]
              },
              {
                'quantity': 3,
                'names': [
                  'Centum Loyal Slaughterer',
                  'Centum Loyal Execrator'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '40 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centior Monster'
                ]
              },
              {
                'quantity': 1,
                'names': [
                  'Centus Tyrant'
                ],
                'notice': 'Trigger next a group like wave 1 at 10% shield, at 10% armor, getting structure damage and destruction'
              }
            ]
          },
          {
            'range': '5-40 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centii Loyal Enslaver',
                  'Centii Loyal Butcher'
                ],
                'notice': 'Random one is trigger wave 2'
              },
              {
                'quantity': 3,
                'names': [
                  'Centus Overlord',
                  'Centus Dark Lord'
                ],
                'notice': 'Random one is trigger wave 2'
              }
            ]
          },
          {
            'range': '5-40 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Hellhound',
                  'Centum Loyal Torturer'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Centatis Daemon',
                  'Centatis Behemoth'
                ]
              }
            ]
          }
        ],
        [
          {
            'range': '20 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Hellhound',
                  'Centum Loyal Fiend'
                ],
                'notice': 'Any could trigger wave 4'
              },
              {
                'quantity': 2,
                'names': [
                  'Centus Tyrant',
                  'Centus Dread Lord'
                ],
                'notice': 'Any could trigger wave 4'
              },
              {
                'quantity': 1,
                'names': [
                  'Harkan\'s Behemoth'
                ],
                'notice': 'Trigger wave 1 on damage, trigger wave 2 on armor damage, trigger wave 3 on destruction'
              }
            ]
          },
          {
            'range': '20 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centior Cannibal'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Centum Execrator'
                ]
              }
            ]
          },
          {
            'range': '20 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centior Misshape'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Centum Execrator'
                ]
              }
            ]
          },
          {
            'range': '20 kilometers',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centior Abomination'
                ]
              },
              {
                'quantity': 2,
                'names': [
                  'Centum Slaughterer'
                ]
              }
            ]
          },
          {
            'range': '1-40 kilometers',
            'enemies': [
              {
                'quantity': 3,
                'names': [
                  'Centatis Daemon',
                  'Centatis Behemoth'
                ],
                'notice': 'First one killed will trigger wave 5'
              }
            ]
          },
          {
            'range': '1-40 kilometers',
            'note': 'repeating wave',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centii Loyal Scavenger',
                  'Centii Loyal Ravener'
                ],
                'notice': 'Last killed will trigger wave 6'
              }
            ]
          },
          {
            'range': '1-40 kilometers',
            'note': 'repeating wave',
            'enemies': [
              {
                'quantity': 2,
                'names': [
                  'Centii Loyal Slavehunter'
                ],
                'notice': 'Attacking any will trigger wave 4, this repeats 4-5 times in total'
              },
              {
                'quantity': 2,
                'names': [
                  'Centum Loyal Mutilator',
                  'Centum Loyal Torturer',
                  'Centum Loyal Slaughterer'
                ],
                'effect': 'Tracking disruptor',
                'notice': 'Attacking any will trigger wave 4, this repeats 4-5 times in total'
              },
              {
                'quantity': 2,
                'names': [
                  'Centus Tyrant',
                  'Centus Dread Lord'
                ],
                'notice': 'Attacking any will trigger wave 4, this repeats 4-5 times in total'
              }
            ]
          }
        ]
      ]
    }
  ]
};
