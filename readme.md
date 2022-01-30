# DnD 5e SRD monster scraper

Creates a json file of all dnd 5e SRD monsters from [roll20.net](https://roll20.net/compendium/dnd5e/Monsters%20List#content)

---

## Technologies

- [Node js](https://nodejs.org/en/)
- [Puppeteer](https://github.com/puppeteer/puppeteer#readme)

---

## To Use

requires Node 10.18.1 +

```bash
git clone https://github.com/misqke/dnd_monster_scraper.git

npm install

node scraper.js
```

The scraper will take a few minutes to run and return a monsters.json file of all the SRD monsters listed on [roll20.net](https://roll20.net/compendium/dnd5e/Monsters%20List#content)

Each monster is formatted as follows:

```bash
 {
    "name": "Adult Copper Dragon",
    "alignment": "chaotic good",
    "size": "Huge",
    "type": "dragon",
    "armor_class": "18 (Natural Armor)",
    "hit_points": "184 (16d12+80)",
    "speed": "40 ft., climb 40 ft., fly 80 ft.",
    "attributes": {
      "strength": "23 (+6)",
      "dexterity": "12 (+1)",
      "constitution": "21 (+5)",
      "intelligence": "18 (+4)",
      "wisdom": "15 (+2)",
      "charisma": "17 (+3)"
    },
    "saving_throws": "Dex +6, Con +10, Wis +7, Cha +8",
    "skills": "Deception +8, Perception +12, Stealth +6",
    "damage_immunities": "Acid",
    "senses": "Blindsight 60 Ft., Darkvision 120 Ft., passive Perception 22",
    "languages": "Common, Draconic",
    "challenge": "14 (11,500 XP)",
    "traits": [
      {
        "name": "Legendary Resistance (3/Day)",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: (2d10 + 6) piercing damage."
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: (2d6 + 6) slashing damage."
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: (2d8 + 6) bludgeoning damage."
      },
      {
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
      },
      {
        "name": "Breath Weapons (Recharge 5-6)",
        "desc": "The dragon uses one of the following breath weapons.\nAcid Breath. The dragon exhales acid in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.\nSlowing Breath. The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save."
      }
    ],
    "legendaryActions": {
      "desc": "Adult Copper Dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature’s turn. Adult Copper Dragon regains spent legendary actions at the start of their turn.\n",
      "actions": [
        {
          "name": "Detect",
          "desc": "The dragon makes a Wisdom (Perception) check."
        },
        { "name": "Tail Attack", "desc": "The dragon makes a tail attack." },
        {
          "name": "Wing Attack (Costs 2 Actions)",
          "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed."
        }
      ]
    }
  }
```
