int personalLatch = 2;
int professionalLatch = 5;
int spiritualLatch = 8;

int personalData = 3;
int professionalData = 6;
int spiritualData = 9;

int personalClock = 4;
int professionalClock = 7;
int spiritualClock = 10;

int personalPot = A5;
int professionalPot = A4;
int spiritualPot = A3;

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
  
    pinMode(personalLatch, OUTPUT);
    pinMode(professionalLatch, OUTPUT);
    pinMode(spiritualLatch, OUTPUT);
    
    pinMode(personalData, OUTPUT);
    pinMode(professionalData, OUTPUT);
    pinMode(spiritualData, OUTPUT);
    
    pinMode(personalClock, OUTPUT);
    pinMode(professionalClock, OUTPUT);
    pinMode(spiritualClock, OUTPUT);
    
    display(-1, personalLatch, personalClock, personalData);
    display(-1, professionalLatch, professionalClock, professionalData);
    display(-1, spiritualLatch, spiritualClock, spiritualData);
}

int personalValue = 0;
int professionalValue = 0;
int spiritualValue = 0;

void loop() {
  bool changed = false;
  
  int newPersonal = read(personalPot);
  if (newPersonal != -1 && personalValue != newPersonal) {
    changed = true;
    personalValue = newPersonal;
    display(personalValue, personalLatch, personalClock, personalData);
  }

  int newProfessional = read(professionalPot);
  if (newProfessional != -1 && professionalValue != newProfessional) {
    changed = true;
    professionalValue = newProfessional;
    display(newProfessional, professionalLatch, professionalClock, professionalData);
  }

  int newSpiritual = read(spiritualPot);
  if (newSpiritual != -1 && spiritualValue != newSpiritual) {
    changed = true;
    spiritualValue = newSpiritual;
    display(newSpiritual, spiritualLatch, spiritualClock, spiritualData);
  }

  if (changed) {
    char strBuf[3];
    sprintf(strBuf, "%d%d%d", personalValue, professionalValue, spiritualValue);
    Serial.println(strBuf);
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
