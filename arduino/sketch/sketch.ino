int serenityLatch = 2;
int growthLatch = 5;
int belongingLatch = 8;

int serenityData = 3;
int growthData = 6;
int belongingData = 9;

int serenityClock = 4;
int growthClock = 7;
int belongingClock = 10;

int serenityPot = A5;
int growthPot = A4;
int belongingPot = A3;

int led_a = 2;
int led_b = 16;
int led_c = 64;
int led_d = 128;
int led_e = 8;
int led_f = 4;
int led_g = 32;

int led_0 = led_a + led_b + led_c + led_d + led_e + led_f;
int led_1 = led_b + led_c;
int led_2 = led_a + led_b + led_d + led_e + led_g;
int led_3 = led_a + led_b + led_c + led_d + led_g;
int led_4 = led_b + led_c + led_f + led_g;
int led_5 = led_a + led_c + led_d + led_f + led_g;
int led_6 = led_a + led_c + led_d + led_e + led_f + led_g;
int led_7 = led_a + led_b + led_c;
int led_8 = led_a + led_b + led_c + led_d + led_e + led_f + led_g;
int led_9 = led_a + led_b + led_c + led_d + led_f + led_g;

int digits[10] = {led_0, led_1, led_2, led_3, led_4, led_5, led_6, led_7, led_8, led_9};
int dash = led_g;

void setup() {
    Serial.begin(9600);
  
    pinMode(serenityLatch, OUTPUT);
    pinMode(growthLatch, OUTPUT);
    pinMode(belongingLatch, OUTPUT);
    
    pinMode(serenityData, OUTPUT);
    pinMode(growthData, OUTPUT);
    pinMode(belongingData, OUTPUT);
    
    pinMode(serenityClock, OUTPUT);
    pinMode(growthClock, OUTPUT);
    pinMode(belongingClock, OUTPUT);
    
    display(-1, serenityLatch, serenityClock, serenityData);
    display(-1, growthLatch, growthClock, growthData);
    display(-1, belongingLatch, belongingClock, belongingData);
}

int serenityDisplay = 0;
int serenitySlider = 0;

int growthDisplay = 0;
int growthSlider = 0;

int belongingDisplay = 0;
int belongingSlider = 0;

void loop() {
  bool changed = false;
  
  int newSerenitySlider = read(serenityPot);
  if (newSerenitySlider != -1 && serenitySlider != newSerenitySlider) {
    changed = true;
    serenityDisplay = newSerenitySlider;
    serenitySlider = newSerenitySlider;
    display(serenityDisplay, serenityLatch, serenityClock, serenityData);
  }

  int newGrowthSlider = read(growthPot);
  if (newGrowthSlider != -1 && growthSlider != newGrowthSlider) {
    changed = true;
    growthDisplay = newGrowthSlider;
    growthSlider = newGrowthSlider;
    display(growthDisplay, growthLatch, growthClock, growthData);
  }

  int newBelongingSlider = read(belongingPot);
  if (newBelongingSlider != -1 && belongingSlider != newBelongingSlider) {
    changed = true;
    belongingDisplay = newBelongingSlider;
    belongingSlider = newBelongingSlider;
    display(belongingDisplay, belongingLatch, belongingClock, belongingData);
  }

  if (changed) {
    char strBuf[3];
    sprintf(strBuf, "%d%d%d", serenityDisplay, growthDisplay, belongingDisplay);
    Serial.println(strBuf);
  }

  if (Serial.available() > 0) {
    String dataString = Serial.readStringUntil('\n');
    
    serenityDisplay = dataString[0] - '0';
    growthDisplay = dataString[1] - '0';
    belongingDisplay = dataString[2] - '0';

    display(serenityDisplay, serenityLatch, serenityClock, serenityData);
    display(growthDisplay, growthLatch, growthClock, growthData);
    display(belongingDisplay, belongingLatch, belongingClock, belongingData);
  }

  delay(16);
}

int read(int potPin) {
  int sensorValue = analogRead(potPin);

  for (int i = 0; i < 10; i++) {
    if (sensorValue < i * 110 + 85) {
      return 9 - i;
    }
 
    if (sensorValue < i * 110 + 105) {
      return -1;
    }
  }

  return -1;
}

void display(int digit, int latchPin, int clockPin, int dataPin) {
  digitalWrite(latchPin, LOW);
  
  if (digit < 0 || digit > 9) {
    shiftOut(dataPin, clockPin, MSBFIRST, dash);
  } else {
    shiftOut(dataPin, clockPin, MSBFIRST, digits[digit]);
  }
  
  digitalWrite(latchPin, HIGH);
}
