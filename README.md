# Balance Box

I built a box that lets me publicly share how I'm feeling.

[Read the blog post for more info](https://stevenwaterman.uk/balance-box)

## Instructions

These are going to be fairly vague, because you probably shouldn't follow my instructions directly.
Feel free to get in touch if you need help.

### Tools

- Soldering Iron
- 3D Printer, min 20x12x12cm bed
- Multimeter, unless you're a sadist

### Parts

Generic things:

- Breadboard jumper wires, male-male and male-female
- Wire
- Solder
- (Recommended) TriPad stripboard
  - Use whatever you're comfortable with for wiring up the shift registers and the resistors
- Approx 300g printer filament
  - I used PETG for the case and PLA for the sliders, anything will work

These are just the parts I used, alternatives will work

- 1x Arduino Uno & USB Cable
- 3x SN74HC595N shift registers
- 3x LDS-C814RI 7-segment displays
- 3x PTB0143-2010BPB103 slide potentiometers
- 21x 273-158-RC resistor, 158 ohm, 1/2 watt
- 4x M6 bolts, 30mm-ish length

### Steps

*This is from memory, no guarantees*

**Electronics:**

1. Print all the pieces in the `printerFiles` folder. It will take about 24hrs in multiple runs.
1. Put the 3 shift registers with resistors on the outputs on the stripboard. See `circuit.svg`.
1. Use male-female jumper cables to connect from the stripboard to the display, or plug the display into more stripboard.
1. Use male-male jumper cables to connect the 3 logic pins of the shift register to the arduino.
1. Solder wires to the display cathodes, and potentiometer power pins.
1. Solder a male-male jumper cable to the potentiometer signal pin.
1. Place the components into the housing, and bolt the face plate on to hold it together. The bolts should self-tap into the plastic.
1. Connect all the negatives together, and all the positives together, and plug them into the Arduino with a jumper cable.
1. Plug the display in with the jumper cables from before. The order doesn't really matter, just make sure it's consistent between them.
1. Plug everything in to the Arduino.
1. Put the back case on, bolt everything together
1. Add the 3d-printed sliders on the potentiometers. If your printer is dialed in, they should push-fit nicely.

**Arduino:**

1. Plug in the Arduino, update the pin configs to match your setup, and flash the provided sketch.
1. Swap the `LED` constants around until the numbers display correctly. See [the datasheet](https://eu.mouser.com/datasheet/2/244/LUMX_S_A0001418642_1-2551748.pdf) for a segment label reference.
1. Check that everything is working and you can see the current score in the Serial Monitor.

**Firebase:**

1. Create a new project
1. Under the project settings, download the service account key, and save it as `credentials.json` in the `serial` folder.
1. Add a web app, and copy the `firebaseConfig` out of the `npm` SDK setup and configuration, into `web/src/routes/index.svelte`.
1. Enable Firestore.
1. Create two collections - `current` and `historic`.
1. Set the Firestore rules, something like:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	match /historic/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /current/current {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Web:**

This part's mostly automated, once you have updated the `firebaseConfig`.

1. If your repo is not called `Balance`, update the base path in `svelte.config.js`.
1. The web app should automatically build, storing the static site in the `gh-pages` branch. You might have to give it permission to push to your repo.
1. Enable GitHub pages, selecting the `gh-pages` branch.
1. Wait for it to build, then go to `<YOUR_GH_USERNAME>.github.io/Balance`

Then it should all be working!
