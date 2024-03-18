#include <SPI.h>
#include <RFID.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define SDA_DIO 9
#define RESET_DIO 8
RFID RC522(SDA_DIO, RESET_DIO);
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  lcd.begin(16, 2);
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Porfavor Acerque la Tarjeta");

  Serial.begin(9600);
  SPI.begin();
  RC522.init();
}

void loop() {
  if (RC522.isCard()) {
    RC522.readCardSerial();
    Serial.println("Card detected:");

    StaticJsonDocument<200> doc;
    JsonObject card_id = doc.to<JsonObject>();
    for (int i = 0; i < 5; i++) {
      card_id["card_id"][i] = RC522.serNum[i];
    }
    serializeJson(doc, Serial);
    Serial.println();

    Serial.print(F("Tarjeta nº UID:"));
    lcd.setCursor(0, 1);
    
    // Obtener el UID de la tarjeta
    byte buffer[5];
    for (byte i = 0; i < 5; i++) {
      buffer[i] = RC522.serNum[i];
      //Serial.print(buffer[i] < 0x10 ? " 0" : " ");
      //lcd.print(buffer[i] < 0x10 ? " 0" : " ");
      Serial.print(buffer[i], DEC);
      lcd.print(buffer[i], DEC);
    }

    Serial.println();
    delay(1000);
  }
}
