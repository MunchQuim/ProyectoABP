/*
PINOUT:
RC522 MODULE    Uno/Nano     MEGA
SDA(SS)         D10          D9
SCK             D13          D52
MOSI            D11          D51
MISO            D12          D50
IRQ             N/A          N/A
GND             GND          GND
RST             D9           D8
3.3V            3.3V         3.3V
*/
#include <SPI.h>
#include <RFID.h>
#include <ArduinoJson.h>

#define SDA_DIO 9
#define RESET_DIO 8
RFID RC522(SDA_DIO, RESET_DIO);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  RC522.init();
}

void loop() {
  if (RC522.isCard()) {
    RC522.readCardSerial();
    Serial.println("Card detected:");
    
    // Crear un objeto JSON
    StaticJsonDocument<200> doc;
    JsonObject card_id = doc.to<JsonObject>();
    for (int i = 0; i < 5; i++) {
      card_id["card_id"][i] = RC522.serNum[i];
    }

    serializeJson(doc, Serial);
    Serial.println();
    delay(1000);
  }
}