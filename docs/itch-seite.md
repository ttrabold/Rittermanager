# Texte für die itch.io-Seite

Die Seite selbst ist nicht im Repo, die Texte werden von Hand auf itch.io übernommen (**Edit game**).

## Titel

**Sir Grindalot – From Squire to Legend**

(Gleich wie `meta.title` in `js/lang/en.js` und die Manifeste halten. Deutsch: „Sir Grindalot – Vom Knappen zur Legende“.)

## Genre

Role Playing

## Tags (itch.io erlaubt höchstens 10)

Medieval, Knights, Fantasy, Turn-based Combat, Loot, Crafting, Boss battle, Management, Singleplayer, Dice

Reserve zum Austauschen: Casual, Incremental, Character Customization, Story Rich

## Weitere Felder

- Kind of project: HTML (Upload: das ZIP aus dem Release, „This file will be played in the browser“)
- Platforms: als Browser-Spiel, mobile-freundlich anhaken
- Languages: English, German
- Inputs: Mouse, Touchscreen, Keyboard
- Accessibility: Text-to-speech (optionale Sprachausgabe)

## Kurzbeschreibung (Short description)

Rise from squire to legend – a medieval browser role-playing game.

## Description

```
🚧 PROTOTYPE – bugs and balance changes are possible, and saves may break between versions. Back up your knight in-game under 💾 Save slots → "Save as file". The version number is shown there too.

⚔️ SIR GRINDALOT – FROM SQUIRE TO LEGEND

You start with a wooden sword, rags and big dreams. Every day brings a handful of energy – how you spend it is up to you. Work for coin, ride out on adventures, enter tournaments, and claw your way up from humble squire to Immortal Legend… and maybe even Demigod.

WHAT AWAITS YOU
• 12 bosses, each with its own story – from a bandit captain to the World Eater himself
• Turn-based combat with 24 skills, potions, burns, poison, stuns and bosses that fly into a rage
• Randomly rolled loot in four rarities – Uncommon, Rare, Epic, Legendary – to equip, compare, upgrade or salvage
• Three crafts: forge legendary +10 gear, brew potions, inscribe runes
• Build up your castle from a humble homestead to a royal castle that pays out every night
• Dice poker in the tavern, a jealous rival who never gives up, loyal companions, a werewolf hunt at full moon
• An Endless Tower for when you think you've seen it all – and rebirth to start over even stronger

GOOD TO KNOW
• Plays right in your browser – desktop or phone, no download
• Play as a knight or a dame
• English and German
• Optional voice narration, dynamic music and sound
• Progress is saved automatically in your browser

Grab your sword. The kingdom isn't going to save itself.
```

## Prototyp-Hinweis auf Deutsch (falls gebraucht)

> 🚧 **Prototyp** – Fehler und Balance-Änderungen möglich, Spielstände können brechen. Sichere deinen Ritter regelmäßig im Spiel unter 💾 Spielstände → „Als Datei speichern“. Die aktuelle Versionsnummer steht dort ebenfalls.

## Bilder

Alle in `docs/itch/`, aufgenommen im englischen Spiel mit doppelter Auflösung:

- **Cover image:** `cover.png` (1260×1000, also 630×500 in doppelter Auflösung, wie von itch empfohlen). Quelle: `cover.html` im Browser öffnen (Fenster 630×500, Pixeldichte 2) und abfotografieren.
- **Screenshots** in dieser Reihenfolge hochladen:
  1. `01-boss.png` – Bosskampf gegen die Hexenkönigin
  2. `02-castle.png` – ausgebaute Königsburg mit Tagesaufträgen
  3. `03-loot.png` – Zufallsbeute in vier Seltenheiten mit Vergleich
  4. `04-tavern.png` – Würfelpoker in der Taverne
  5. `05-tower.png` – Endloser Turm, Lavahallen, Turm-Boss in Rage
  6. `06-castle-building.png` – Burgausbau
  7. `07-bestiary.png` – Bestiarium mit den Bossen

## Seitengestaltung (Edit theme)

Quelle für alle drei: `docs/itch/art.html` mit `#banner`, `#bg` oder `#embed` öffnen (Fenstergröße wie angegeben, dunkles Farbschema) und abfotografieren.

- **Banner:** `banner.png` (960×280 in doppelter Auflösung). Titel links, Ritter gegen Vulkanus, Burg im Hintergrund.
- **Background:** `background.png` (1920×1080). Dunkle Lavahalle, Drache und Hexe an den Rändern; die Mitte bleibt ruhig für die Inhaltsspalte. Bei itch „Fit to page“ oder „cover“ wählen, nicht kacheln.
- **Embed background:** `embed-bg.png` (600×860 in doppelter Auflösung, genau die Größe des Spielfensters). Die Mitte ist frei für den „Run game“-Knopf.
- Passende Theme-Farben: Hintergrund `#140c08`, Text `#f3e2b8`, Links/Knöpfe `#ffb000`, Inhaltsfläche `#1e1611`.

## Einbettung (Embed options)

- Embed in page, Manually set size: **600 × 860 px**
- Mobile friendly, Orientation **Portrait**
- Automatically start on page load: an
- Fullscreen button: an
- **Enable scrollbars: an** (sonst lassen sich lange Bildschirme nicht scrollen)
- SharedArrayBuffer: aus
