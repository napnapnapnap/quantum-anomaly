'use strict';

export default function () {
  return {
    'name':        'Wildfire',
    'iconID':      '500002',
    'race':        'minmatar',
    'starter':     'Arsten Takalo',
    'description': 'The Minmatar epic arc is probable the easiest from all 4. It does take a while to complete because you need to travel a lot in your combat ship. It is also very buggy so you will possibly have to petition some missions to get CCP to resolve issue for you. Mission in question are the ones neededing Relic Analyzers',
    'rewards':     ['+10% (unmodified) Minmatar Republic faction standing increase.'],
    'notes':       [
      'You can avoid going to lowsec all together.',
      'You need Data Analyzer in mission 11',
      'You need Relic Analyzer in missions 1, 13 and 14'
    ],
    'missions':    [{
      'name':          'A Demonstration Objectives',
      'agent':         'Arsten Takalo',
      'agentLocation': 'Frarn system - Brutor Tribe Community Area',
      'type':          'Travel (optional combat / needs Relic Analyzer)',
      'destination':   'Any system in Sveipar constellation',
      'description':   'Arsten Takalo will ask you to bring him 1 x Olfei Medallion (0.1 m3). It can be found for about cheap in Rens, or you scan down the plex and kill Olfei and then loot him. Plex is in same constallation as agent, but I never bothered searching it, simply buy it on market before you even before you start the arc and just give it to him and be done with it',
      'enemy':         'Angel Cartel (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic)',
      'pockets':       [[{
        'range':   'unknown range',
        'note':    'No need to probe out site, just look on scanner for anomaly called A Demonstration',
        'enemies': [{
          'number': '5',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '11',
          'name':   'Elite Cruisers',
          'effect': 'Target painting'
        }, {
          'number': '3',
          'name':   'Container',
          'effect': 'Each holds 1 x Olfei Medallion (0.1 m3)'
        }]
      }]],
      'tip':           'Buy the Medallion on market, they should be less then million and save yourself travel time at least',
      'completed':     'Fly to agent and give him 1 x Olfei Medallion (0.1 m3).'
    }, {
      'name':          'The Cost of Preservation',
      'agent':         'Arsten Takalo',
      'agentLocation': 'Frarn system - Brutor Tribe Community Area',
      'type':          'Combat and retrieve item',
      'destination':   'Any system in constellation',
      'description':   'Go into single pocket mission, kill everything and retrieve item. Ailon Boufin has two triggers when shot. He drops a key you need to place in a can on the grid to get the objective item. You place the key in it and next time you open the can it will hold you objective item. Ailon has some reps running so you might have troubles taking him out, I usually switch to shorter spawn and by the time I\'m done with them, Ailon is at 35-40 km and then I blap him. You just need to clear the remaining NPC\'s',
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '50 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Ailon Boufin',
          'effect': 'Trigger wave I when attacked / Triggers wave II when in armor / Active armor tank'
        }]
      }, {
        'range':   '90 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '6',
          'name':   'Cruisers'
        }, {
          'number': '5',
          'name':   'Battleships'
        }]
      }, {
        'range':   '45 kilometers',
        'enemies': [{
          'number': '6',
          'name':   'Cruisers'
        }, {
          'number': '6',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Don\'t forget to loot 1 x Hauteker Memoirs (0.1 m3) by placing a key dropped by Ailon into the Archives',
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'Written By The Victors',
      'agent':         'Arsten Takalo',
      'agentLocation': 'Frarn system - Brutor Tribe Community Area',
      'type':          'Combat and retrieve item',
      'destination':   'Any system in constellation',
      'description':   'Angel Cartel spawn first, at about 40km. Amarr spawn after at 30km from warp in. Retrieve 1 x Wildfire Khumaak (0.3 m3) from the Central Burial Tomb',
      'enemy':         'Angel Cartel (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic) / Amarr Empire (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '40 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Elite Frigate',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Elite Cruisers',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '7',
          'name':   'Elite Cruisers'
        }, {
          'number': '3',
          'name':   'Battlecruisers',
          'effect': 'Trigger wave I'
        }]
      }, {
        'range':   '30 kilometers',
        'note':    'No standings hit on destroying these ships',
        'enemies': [{
          'number': '2',
          'name':   'Elite Battlecruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }, {
          'number': '1',
          'name':   'Elite Battleship'
        }]
      }]],
      'tip':           'Don\'t forget to loot 1 x Wildfire Khumaak (0.3 m3)',
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'Glowing Embers',
      'agent':         'Arsten Takalo',
      'agentLocation': 'Frarn system - Brutor Tribe Community Area',
      'type':          'Courier',
      'destination':   'Todeko system , 6 jump out',
      'description':   'Deliver 1 x Wildfire Khumaak (0.3 m3) from last mission to a camp 6 jumps away. If you are using orca, leave it in Frarn and take only combat ships and Noctis if you are using it. You will need to do one combat mission in same system you are going to. It can be accepted remotely. After next mission you will then need to go back to your agent and then 3 jumps on the opposite side. You will get a message from lowsec agent, don\'t worry, you don\'t need to go to lowsec, you just need to put the Khummak in a can here in Todeko',
      'tip':           'Do not start next mission straight away if you are doing this arc with more then one character',
      'completed':     'Fly to destination and start conversation with agent.'
    }, {
      'name':          'From Way Above',
      'agent':         'Arsten Takalo',
      'agentLocation': 'Frarn system - Brutor Tribe Community Area',
      'type':          'Combat',
      'destination':   'Todeko system , 6 jump out (same as last mission destination)',
      'description':   'Same system as last one. Don\'t accept right away until you are ready to start it since triggers are time based. Consider using mobile tractor and salvage drones from your combat ship while you are waiting for spawns since you will prolly have to wait 30-60 seconds between spawns if you do lots of DPS. There are 5 spawns. Spawns are about 2 minutes apart, start doing mission as soon as you accept it since timer starts from moment of accepting from my experince. Mission can be accepted remotely',
      'enemy':         'Angel Cartel (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic)',
      'pockets':       [[{
        'range':   '60 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Elite Cruisers'
        }, {
          'number': '2',
          'name':   'Elite Battlecruisers'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Elite Cruisers'
        }, {
          'number': '1',
          'name':   'Elite Battleships'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Elite Cruisers',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Elite Battleships'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Destroyers',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Elite Battlecruisers'
        }]
      }, {
        'range':   '60 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Elite Cruisers',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Battleships'
        }, {
          'number': '2',
          'name':   'Elite Battleships',
          'effect': 'Target painting'
        }]
      }]],
      'tip':           '-',
      'completed':     'Kill 2 Elite Battleships in last wave and complete remotely.'
    }, {
      'name':          'Friends In High Places',
      'agent':         'Arsten Takalo',
      'agentLocation': 'Frarn system - Brutor Tribe Community Area',
      'type':          'Fly to location in space',
      'destination':   'Alakgur system , 3 jump out (8 jumps from last mission)',
      'description':   'Take all your ships with you since this is along the way for next agent, but for this mission use a shuttle. This isn\'t combat mission and you will need to burn 50-70 kilometers. You can use an frigate with AB/MWD as well, but I just prefer shuttles since they take little space and still go 600 m/s',
      'tip':           'You can also use your main ships for this if they can cross 50+ kilometers in reasonable time',
      'completed':     'Aproach structures in order agent tells and then complete remotely.'
    }, {
      'name':          'My Little Eye',
      'agent':         'Arsten Takalo',
      'agentLocation': 'Frarn system - Brutor Tribe Community Area',
      'type':          'Travel',
      'destination':   'Aldrat system, 8 jumps away (11 jumps from last mission)',
      'description':   'Report to Nilf Abruskur in Aldrat at RSS Liaison Headquarters',
      'tip':           'You can accept mission remotely',
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Dead End Intercept',
      'agent':         'Nilf Abruskur',
      'agentLocation': 'Aldrat system - RSS Liaison Headquarters',
      'type':          'Combat and retrieve item',
      'destination':   'Any system in constellation',
      'description':   'Kill one battleship and loot datapad from him ',
      'enemy':         'Minmatar Republic (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic)',
      'pockets':       [[{
        'range':   '50 kilometers',
        'note':    'Spawns in few seconds after you land',
        'enemies': [{
          'number': '1',
          'name':   'Lomar Vujik',
          'effect': 'Drops mission objective'
        }]
      }]],
      'tip':           'Don\'t forget to loot 1 x Singed Datapad (0.1 m3)',
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'Surfacing',
      'agent':         'Nilf Abruskur',
      'agentLocation': 'Aldrat system - RSS Liaison Headquarters',
      'type':          'Combat and retrieve item',
      'destination':   'Jark system, 11 jumps away',
      'description':   'Get the objective from structure. That will trigger a spawn few kilometers behind you, about half way from entry beacon and structure. This mission is 11 jumps out and you need to return to agent. Consider not moving orca there if you have one',
      'enemy':         'Mercenaries (Tank against: Kinetic/Thermal, Best damage: Kinetic/Thermal)',
      'pockets':       [[{
        'range':   '10 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '4',
          'name':   'Cruisers'
        }, {
          'number': '5',
          'name':   'Battleships',
          'effect': 'Trigger wave I'
        }]
      }, {
        'range':   '10 kilometers',
        'enemies': [{
          'number': '2',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '5',
          'name':   'Cruisers'
        }, {
          'number': '4',
          'name':   'Battleships',
          'effect': 'Trigger wave II'
        }]
      }, {
        'range':   '10 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Frigates'
        }, {
          'number': '2',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Spider Drones I',
          'effect': 'Stasis web'
        }, {
          'number': '4',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'If you are using alt to trigger spawns, move away from warp in beacon since they spawn on the beacon with scramblers. You have to kill everything to complete mission',
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'Who Art in Heaven',
      'agent':         'Nilf Abruskur',
      'agentLocation': 'Aldrat system - RSS Liaison Headquarters',
      'type':          'Combat',
      'destination':   'Erstur, 1 jump away',
      'description':   'Kill everything, no triggers, sort by range and start working on them. To finish the mission you need to approach the outpost at about 30 km. You don\'t need to clear the site if you want to blitz, just use something fast to get there and get objective complete. Sometimes you might warp in close enough to trigger mission objective which will cause half the NPC\'s to warp off',
      'enemy':         'Angel Cartel (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic)',
      'pockets':       [[{
        'range':   '40 kilometers',
        'enemies': [{
          'number': '7',
          'name':   'Frigates'
        }, {
          'number': '4',
          'name':   'Cruisers'
        }, {
          'number': '7',
          'name':   'Battleships'
        }]
      }, {
        'range':   '90 kilometers',
        'enemies': [{
          'number': '8',
          'name':   'Frigates'
        }, {
          'number': '3',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Battlecruisers'
        }]
      }]],
      'tip':           'Sort at range and kill everything or blitz the mission',
      'completed':     'Kill everything and fly back to agent.'
    }, {
      'name':          'Playing All Their Cards',
      'agent':         'Nilf Abruskur',
      'agentLocation': 'Aldrat system - RSS Liaison Headquarters',
      'type':          'Combat and retrieve item (needs Data Analyzer)',
      'destination':   'Any system in constellation',
      'description':   'Hack the container to get 1 x Drive Cluster EDF-285 (0.1 m3). Once you are 5 kilometers of containter you will trigger spawn. You can hack and get out before they engage you, otherwise grab your guns',
      'enemy':         'Angel Cartel (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic)',
      'pockets':       [[{
        'range':   '100 kilometers',
        'enemies': [{
          'number': '11',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '6',
          'name':   'Destroyers'
        }, {
          'number': '4',
          'name':   'Cruisers'
        }, {
          'number': '10',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Don\'t forget to grab 1 x Drive Cluster EDF-285 (0.1 m3)',
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'History in the Making',
      'agent':         'Arsten Takalo',
      'agentLocation': 'Frarn system - Brutor Tribe Community Area',
      'type':          'Travel',
      'destination':   'Tanoo system, 13 jumps away',
      'description':   'Report to Hiva Shesha in Tanoo at Krusal Mobile Library',
      'tip':           'You can accept mission remotely',
      'completed':     'Automatically once you initiate conversation with next agent.'
    }, {
      'name':          'Church of the Obsidian',
      'agent':         'Hiva Shesha',
      'agentLocation': 'Tanoo - Krusal Mobile Library',
      'type':          'Combat and retrieve item (needs Relic Analyzer)',
      'destination':   'Any system in constellation',
      'description':   'Hack the container to get 1 x Blood Obsidian Orb (0.1 m3). Do not engage 5 neutral Amarr cruisers, they will warp off. If you engage them you will suffer Amarr Empire faction standings penalty',
      'enemy':         'Amarr Empire (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '25 kilometers',
        'note':    'Triggered when approaching gate at 15km',
        'enemies': [{
          'number': '7',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }], [{
        'range':   '30 kilometers',
        'note':    '-0.06% to Amarr Empire for destroying Amarr Empire\'s Ammatar Navy Apocalypse. This appears to be buggy or incurs once per character on random ship in this pocket',
        'enemies': [{
          'number': '3',
          'name':   'Frigates'
        }, {
          'number': '5',
          'name':   'Cruisers'
        }, {
          'number': '10',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Don\'t forget to grab 1 x Blood Obsidian Orb (0.1 m3)',
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'Heresiology',
      'agent':         'Hiva Shesha',
      'agentLocation': 'Tanoo - Krusal Mobile Library',
      'type':          'Combat and retrieve item (needs Relic Analyzer)',
      'destination':   'Any system in constellation',
      'description':   'Hack the containers to get 1 x Engraved Blood Obsidian tablet (0.1 m3). Only Ammatar Navy Detectives cause standing loss to Ammatar. You will have to take out the detectives or tank them while you loot/hack. Each can will spawn more next to it until there is 4 of them. Last one hacked will drop objective',
      'enemy':         'Ammatar Mandate (Tank against: EM/Thermal, Best damage: EM/Thermal)',
      'pockets':       [[{
        'range':   '55 kilometers',
        'enemies': [{
          'number': '10',
          'name':   'Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '5',
          'name':   'Cruisers'
        }, {
          'number': '3',
          'name':   'Battleships'
        }]
      }]],
      'tip':           'Don\'t forget to grab 1 x Engraved Blood Obsidian tablet (0.1 m3). There is a chance of small faction stanginds penalty agaist Ammatar if you shoot cruisers as well. This one and last mission are very buggy and strange things happen each time with standings',
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'Wildfire',
      'agent':         'Hiva Shesha',
      'agentLocation': 'Tanoo - Krusal Mobile Library',
      'type':          'Deliver item and combat',
      'destination':   'Any system in constellation',
      'description':   'No spawn on warp in. Dropping the 1 x Datacore (0.1 m3) into the chapel container triggers the spawn about 30 km off. You don\'t need to kill the NPCs to complete the mission, so kill any scramming frigates and warp off. Cosidering loot/salvage from this mission, it\'s not that bad idea to blitz it. Keep in mind though that you will still need to wait a bit after dropping till Rend warps off. If you have MWD just keep burning away from NPC\'s after drop and warp out once you get mission complete message',
      'enemy':         'Angel Cartel (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic)',
      'pockets':       [[{
        'range':   '5 kilometers',
        'enemies': [{
          'number': '1',
          'name':   'Karkoti Rend',
          'effect': 'Warps off after one minute / Trigger wave I'
        }]
      }, {
        'range':   '40 kilometers',
        'enemies': [{
          'number': '5',
          'name':   'Frigates'
        }, {
          'number': '5',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }]
      }]],
      'tip':           'If you want to blitz this mission, drop item, align out, as soon as Rend warps off you can warp off',
      'completed':     'Drop the item, wait for Rend to warp off and complete remotely.'
    }, {
      'name':          'Stillwater',
      'agent':         'Hiva Shesha',
      'agentLocation': 'Tanoo - Krusal Mobile Library',
      'type':          'Combat and retrieve item',
      'destination':   'Zaid system, 3 jumps away',
      'description':   'Karkoti Rend will aggro up to 200 kilometers away. Killing him will cause any remaining rats to dissapear. You should have time to kill Angel Energy Neutralizer Sentry II and frigates by time Karkoti gets close to put damage, or if you want to blitz then just use MJD to jump out and wait for Karkoti to get in range',
      'enemy':         'Angel Cartel (Tank against: Explosive/Kinetic, Best damage: Explosive/Kinetic)',
      'pockets':       [[{
        'range':   '30 kilometers',
        'enemies': [{
          'number': '8',
          'name':   'Elite Frigates',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '3',
          'name':   'Elite Cruisers',
          'effect': 'Warp scramble / Stasis web'
        }, {
          'number': '5',
          'name':   'Battleships'
        }, {
          'number': '1',
          'name':   'Karkoti Rends',
          'effect': 'Energy neutralizer'
        }, {
          'number': '1',
          'name':   'Angel Energy Neutralizer Sentry II',
          'effect': 'Energy neutralizer'
        }]
      }]],
      'tip':           'Kill tower, keep range on Karkoti so he doesn\'t neut you out, then either kill rest and Karkoti last or just blap him. Don\'t forget to loot 1 x Book Of St. Arzad (0.1 m3)',
      'completed':     'Loot the mission objective and fly back to your agent.'
    }, {
      'name':          'With Great Power',
      'agent':         'Hiva Shesha',
      'agentLocation': 'Tanoo - Krusal Mobile Library',
      'type':          'Epic arc choice',
      'destination':   'Same system',
      'description':   'Choose your side. One side (Revelation) gives Minmatar standings and other side (Retraction) gives half the standings and 10 x RSS Core Scanner Probes',
      'tip':           'Pick one you want, either 10% base standings or 5% base standings + probes',
      'completed':     'Just confirm your choice.'
    }, {
      'name':          'Revelation',
      'agent':         'Hiva Shesha',
      'agentLocation': 'Tanoo - Krusal Mobile Library',
      'type':          'Courier',
      'destination':   'Avesber system, 5 jumps away',
      'description':   'Fly couple of jumps and drop 1 x Book Of St. Arzad (0.1 m3) into container',
      'tip':           'Retraction is same deal as this one except you have to return to your agent to pick up probes, so consider using shuttle/frigate. Otherwise you can complete remotely',
      'completed':     'Deliver item and complete remotely.'
    }]
  };
};
