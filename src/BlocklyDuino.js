import Blockly from "node-blockly/browser";

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino for blocks.
 * @author gasolin@gmail.com (Fred Lin)
 * @reboot scanet@libreduc.cc (SebCanet)
 */

Blockly.Arduino = {};


/*
 * Arduino Board profiles
 *
 */

var profile = {
	none: {
	    description: "",
		cpu:"",
		speed:"",
	    digital: [],
		PWM : [],
		dropdownPWM: [],
		analog : [],
		dropdownAnalog: [],
		/*irqonchange: [],*/
		I2C: [],
		SPI: [],
		interrupt: [],
		picture : "media/boards/Arduino_none.jpg",
		miniPicture : "media/boards/Arduino_none_mini.jpg",
		miniPicture_hor : "media/boards/Arduino_none_mini_hor.jpg",
		serial: [],
		serialPin: [],
		upload_arg: "none",
	},
	arduino_leonardo: {
	    description: "Arduino Leonardo",
		cpu:"atmega32u4",
		speed:"57600",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11", "13"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A6", "A7", "A8", "A9", "A10", "A11"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6(D4)", "4"], ["A7(D6)", "6"], ["A8(D8)", "8"], ["A9(D9)", "9"], ["A10(D10)", "10"], ["A11(D12)", "12"]],
		/*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
		I2C: ["2", "3"],
		SPI: ["connect"],
		interrupt: ["3", "2", "0", "1", "7"],
		picture : "media/boards/Arduino-Leonardo-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Leonardo-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:leonardo",
	},
	arduino_mega:{
		description: "Arduino Mega 2560 / ADK",
		cpu:"atmega2560",
		speed:"115200",
		digital : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52"],
		dropdownDigital: "attention",
		PWM : ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "44", "45", "46"],
		dropdownPWM: [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["44", "44"], ["45", "45"], ["46", "46"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
		/*irqonchange : [["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["A8", "62"], ["A9", "63"], ["A10", "64"], ["A11", "65"], ["A12", "66"], ["A13", "67"], ["A14", "68"], ["A15", "69"]],*/
		I2C: ["20", "21"],
		SPI: [["50 (SS)", "50"], ["51 (MOSI)", "51"], ["52 (MISO)", "52"], ["53 (SCK)", "53"]],
		interrupt: ["2", "3", "21", "20", "19", "18"],
		picture : "media/boards/Arduino-Mega-2560-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Mega-2560-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"], ["19 (Rx1) ; 18 (Tx1)", "19"], ["17 (Rx2) ; 16 (Tx2)", "17"], ["15 (Rx3) ; 14 (Tx3)", "15"]],
		upload_arg: "arduino:avr:mega:cpu=atmega2560",
	},
	arduino_micro: {
	    description: "Arduino Micro",
		cpu:"atmega32u4",
		speed:"57600",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11", "13"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A6", "A7", "A8", "A9", "A10", "A11"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6(D4)", "4"], ["A7(D6)", "6"], ["A8(D8)", "8"], ["A9(D9)", "9"], ["A10(D10)", "10"], ["A11(D12)", "12"]],
		/*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
		I2C: ["2", "3"],
		SPI: ["connect"],
		interrupt: [["0(Rx)", "0"], ["1(Tx)", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
		picture : "media/boards/Arduino-Micro-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Micro-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:micro",
	},
	arduino_mini: {
	    description: "Arduino Mini ATmega328",
		cpu:"atmega328p",
		speed:"115200",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
		I2C: ["A4", "A5"],
		SPI: [["10 (SS)", "10"], ["11 (MOSI)", "11"], ["12 (MISO)", "12"], ["13 (SCK)", "13"]],
		interrupt: [["2", "2"], ["3", "3"]],
		picture : "media/boards/Arduino-Mini-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Mini-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:mini",
	},
	arduino_nano: {
	    description: "Arduino Nano ATmega328",
		cpu:"atmega328p",
		speed:"115200",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
		/*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
		I2C: ["A4", "A5"],
		SPI: [["10 (SS)", "10"], ["11 (MOSI)", "11"], ["12 (MISO)", "12"], ["13 (SCK)", "13"]],
		interrupt: ["2", "3"],
		picture : "media/boards/Arduino-Nano-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Nano-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:nano:cpu=atmega328old",
	},
	arduino_pro8: {
	    description: "Arduino Pro Mini 3.3V ATmega328",
		cpu:"atmega328p",
		speed:"57600",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		I2C: ["A4", "A5"],
		SPI: [["10 (SS)", "10"], ["11 (MOSI)", "11"], ["12 (MISO)", "12"], ["13 (SCK)", "13"]],
		interrupt: [["2", "2"], ["3", "3"]],
		picture : "media/boards/Arduino-Pro-Mini-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Pro-Mini-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:pro:cpu=8MHzatmega328",
	},
	arduino_pro16: {
	    description: "Arduino Pro Mini 5V ATmega328",
		cpu:"atmega328p",
		speed:"57600",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		I2C: ["A4", "A5"],
		SPI: [["10 (SS)", "10"], ["11 (MOSI)", "11"], ["12 (MISO)", "12"], ["13 (SCK)", "13"]],
		interrupt: [["2", "2"], ["3", "3"]],
		picture : "media/boards/Arduino-Pro-Mini-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Pro-Mini-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:pro:cpu=16MHzatmega328",
	},
	arduino_uno: {
	    description: "Arduino Uno",
		cpu:"atmega328p",
		speed:"115200",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		/*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
		I2C: ["A4", "A5"],
		SPI: [["10 (SS)", "10"], ["11 (MOSI)", "11"], ["12 (MISO)", "12"], ["13 (SCK)", "13"]],
		interrupt: ["2", "3"],
		picture : "media/boards/Arduino-Uno-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Uno-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:uno",
	},
	arduino_yun: {
	    description: "Arduino Yùn",
		cpu:"atmega32u4",
		speed:"57600",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11", "13"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A6", "A7", "A8", "A9", "A10", "A11"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6(D4)", "4"], ["A7(D6)", "6"], ["A8(D8)", "8"], ["A9(D9)", "9"], ["A10(D10)", "10"], ["A11(D12)", "12"]],
		/*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
		I2C: ["A4", "A5"],
		SPI: ["connect"],
		interrupt: ["3", "2", "0", "1", "7"],
		picture : "media/boards/Arduino-Yun-Pinout.jpg",
		miniPicture : "media/boards/Arduino-Yun-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:yun",
	},
	lilypad: {
	    description: "LilyPad Arduino ATmega328P",
		cpu:"atmega328p",
		speed:"57600",
	    digital: ["0", "1",  "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
		dropdownDigital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		PWM : ["3", "5", "6", "9", "10", "11"],
		dropdownPWM: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
		analog : ["A0", "A1", "A2", "A3", "A4", "A5"],
		dropdownAnalog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		/*irqonchange: [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"],["A0", "14"], ["A1", "15"], ["A2", "16"], ["A3", "17"], ["A4", "18"], ["A5", "19"]],*/
		I2C: ["A4", "A5"],
		SPI: [["10 (SS)", "10"], ["11 (MOSI)", "11"], ["12 (MISO)", "12"], ["13 (SCK)", "13"]],
		interrupt: ["2", "3"],
		picture : "media/boards/LilyPad-Pinout.jpg",
		miniPicture : "media/boards/LilyPad-Pinout-mini.jpg",
		miniPicture_hor : "media/boards/Arduino-Leonardo-Pinout-mini_hor.jpg",
		serial: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
		serialPin: [["0 (Rx) ; 1 (Tx)", "0"]],
		upload_arg: "arduino:avr:lilypad",
	}
};

//set default profile to arduino standard-compatible board
profile["default"] = profile["arduino_uno"];

Blockly.Msg.colors = {};


// color definition
Blockly.Msg["ARDUINO_BASE_HUE"] = "#007481";
Blockly.Msg["GROVE_HUE"] = "#018770";
Blockly.Msg["SERVO_HUE"] = "#343434";
/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

//To support syntax defined in http://arduino.cc/en/Reference/HomePage

Blockly.Constants.arduino_base = {};



Blockly.Blocks['arduino_base_inout_buildin_led'] = {
   init: function() {
    this.setHelpUrl(Blockly.Msg.ARDUINO_INOUT_BUILDIN_LED_HELPURL);
	this.appendDummyInput()
      	.appendField(Blockly.Msg.ARDUINO_INOUT_BUILDIN_LED_INPUT)
		.appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), 'STAT');
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setTooltip(Blockly.Msg.ARDUINO_INOUT_BUILDIN_LED_TOOLTIP);
    this.setStyle('arduino_blocks');
   }
};

Blockly.Blocks['arduino_base_inout_digital_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./images/digital.jpg", 64, 64))
	    .appendField(Blockly.Msg.ARDUINO_INOUT_DIGITAL_WRITE_INPUT1)
	    .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN")
      	.appendField(Blockly.Msg.ARDUINO_INOUT_DIGITAL_WRITE_INPUT2)
		.appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), 'STAT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_INOUT_DIGITAL_WRITE_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_INOUT_DIGITAL_WRITE_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_inout_digital_read'] = {
  init: function() {
    this.appendDummyInput()
	    .appendField(Blockly.Msg.ARDUINO_INOUT_DIGITAL_READ_INPUT)
	    .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.ARDUINO_INOUT_DIGITAL_READ_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_INOUT_DIGITAL_READ_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_inout_highlow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.FIELDDROPDOWN), 'BOOL')
    this.setOutput(true, 'Boolean');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_INOUT_ONOFF_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_inout_analog_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./images/pwm.png", 64, 64))
        .appendField(Blockly.Msg.ARDUINO_INOUT_ANALOG_WRITE_INPUT1)
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownPWM), "PIN");
    this.appendValueInput("PWM", 'Number')
        .appendField(Blockly.Msg.ARDUINO_INOUT_ANALOG_WRITE_INPUT2)
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_INOUT_ANALOG_WRITE_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_INOUT_ANALOG_WRITE_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_inout_analog_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_INOUT_ANALOG_READ_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownAnalog), "PIN");
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.ARDUINO_INOUT_ANALOG_READ_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_INOUT_ANALOG_READ_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_delay'] = {
  init: function() {
    this.appendValueInput("DELAY_TIME", 'Number')
        .appendField(Blockly.Msg.ARDUINO_BASE_DELAY_DELAY_TIME)
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_BASE_DELAY_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_DELAY_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_BASE_ANGLE)
        .appendField(new Blockly.FieldAngle(90), 'ANGLE');
    this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.ARDUINO_BASE_ANGLE_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_BASE_ANGLE_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

 Blockly.Blocks['arduino_base_date'] = {
   init: function() {
     this.appendDummyInput()
         .appendField('date:')
         // according to docs, the field date adds 60% file size and might not be needed
         //.appendField(new Blockly.FieldDate(''), 'DATE');
         .appendField('DATE');
     this.setOutput(true, 'Number');
     this.setTooltip('Date entrie as yyyy-mm-dd');
     this.setHelpUrl('');
    this.setStyle('arduino_blocks');
   }
 };

Blockly.Blocks['arduino_base_map'] = {
  init: function() {
    this.appendValueInput("NUM", 'Number')
        .appendField("Map ")
        .setCheck('Number');
    this.appendValueInput("DMAX", 'Number')
        .appendField("value to [0-")
        .setCheck('Number');
    this.appendDummyInput()
	      .appendField("]");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Re-maps a number from [0-1024] to another.');
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/functions/math/map/');
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_inout_tone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_TONE_INPUT1)
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.appendValueInput("NUM", "Number")
        .appendField(Blockly.Msg.ARDUINO_TONE_INPUT2)
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_TONE_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_TONE_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_inout_notone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_NOTONE_INPUT)
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_NOTONE_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_NOTONE_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

Blockly.Blocks['arduino_base_serial_print'] = {
  init: function() {
    this.appendValueInput("CONTENT", 'String')
        .appendField(Blockly.Msg.ARDUINO_SERIAL_PRINT_CONTENT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_SERIAL_PRINT_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.ARDUINO_SERIAL_PRINT_HELPURL);
    this.setStyle('arduino_blocks');
  }
};

//http://www.seeedstudio.com/wiki/GROVE_System
//http://www.seeedstudio.com/depot/index.php?main_page=advanced_search_result&search_in_description=1&keyword=grovefamily
//support starter bundle example http://www.seeedstudio.com/wiki/GROVE_-_Starter_Kit_V1.1b

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating seeeduino grove blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

Blockly.Constants.grove = {};



Blockly.Blocks['grove_led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldImage("./blocks/grove/Red_LED_s.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN")
        .appendField("stat")
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('green LED');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Red_LED/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Button")
        .appendField(new Blockly.FieldImage("./blocks/grove/Button.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip('Basic digital input');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Button/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_rotary_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Rotary Angle")
        .appendField(new Blockly.FieldImage("./blocks/grove/Grove-Rotary_Angle_Sensor-P-.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownAnalog), "PIN");
    this.setOutput(true, 'Number');
    this.setTooltip('Analog output between 0 and Vcc');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_tilt_switch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tilt Switch")
        .appendField(new Blockly.FieldImage("./blocks/grove/Tilt1.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip('When the switch is level it is open, and when tilted, the switch closes.');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Tilt_Switch/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_piezo_buzzer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Piezo Buzzer")
        .appendField(new Blockly.FieldImage("./blocks/grove/Grove_Buzzer.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN")
        .appendField("stat")
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Emit a tone when the output is high');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Buzzer/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_relay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Relay")
        .appendField(new Blockly.FieldImage("./blocks/grove/Twig-Relay.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN")
        .appendField("stat")
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('capable of switching a much higher voltages and currents. The maximum voltage and current that can be controlled by this module upto 250V at 10 amps.');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Relay/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_temperature_sensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Temperature Sensor")
        .appendField(new Blockly.FieldImage("./blocks/grove/Temperature1.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownAnalog), "PIN")
    this.setOutput(true, 'Number');
    this.setTooltip('return number of ambient temperature in ℃');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Temperature_Sensor/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_serial_lcd_print'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Serial LCD")
        .appendField(new Blockly.FieldImage("./blocks/grove/Lcdnew1.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.appendValueInput("TEXT1")
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("print line1");
    this.appendValueInput("TEXT2")
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("print line2")
    this.appendValueInput("DELAY_TIME")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Delay");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('print text on an 16 character by 2 line LCD.');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Serial_LCD_V1.0/');
    this.setStyle('grove_blocks');
  }
};

//grove lcd power on/off
Blockly.Blocks['grove_serial_lcd_power'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Serial LCD")
        .appendField(new Blockly.FieldImage("./blocks/grove/Lcdnew1.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Power")
        .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turn LCD power on/off');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Serial_LCD_V1.0/');
    this.setStyle('grove_blocks');
  }
};

//scroll left/right/no scroll/blink/noblink
Blockly.Blocks['grove_serial_lcd_effect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Serial LCD")
        .appendField(new Blockly.FieldImage("./blocks/grove/Lcdnew1.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Effect")
        .appendField(new Blockly.FieldDropdown([["Scroll Left", "LEFT"], ["Scroll Right", "RIGHT"], ["Scroll Auto", "AUTO"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Turn LCD power on/off');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Serial_LCD_V1.0/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_sound_sensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Sound Sensor")
        .appendField(new Blockly.FieldImage("./blocks/grove/sound_sensor.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownAnalog), "PIN")
    this.setOutput(true, 'Number');
    this.setTooltip('Detect the sound strength of the environment');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Sound_Sensor/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_pir_motion_sensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("PIR Motion Sensor")
        .appendField(new Blockly.FieldImage("./blocks/grove/Grove_-_PIR_Motion_Sensor.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN")
    this.setOutput(true, 'Number');
    this.setTooltip('When anyone moves in it\'s detecting range, the sensor outputs HIGH.');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-PIR_Motion_Sensor/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_line_finder'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Line Finder")
        .appendField(new Blockly.FieldImage("./blocks/grove/Grovelinefinder1.jpg", 64, 64))
	      .appendField("PIN#")
	      .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.setOutput(true, 'Boolean');
    this.setTooltip('Output digital signal so the robot can reliably follow a black line on a white background');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Line_Finder/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_ultrasonic_ranger'] = {
  init: function() {
    this.appendDummyInput()
	      .appendField("Ultrasonic Ranger")
        .appendField(new Blockly.FieldImage("./blocks/grove/Ultrasonic.jpg", 64, 64))
	      .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN")
        .appendField("unit")
        .appendField(new Blockly.FieldDropdown([["cm", "cm"],  ["inch", "inch"]]), "UNIT");
    this.setOutput(true, 'Number');
    this.setTooltip('Non-contact distance measurement module');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_motor_shield'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor")
        .appendField(new Blockly.FieldImage("./blocks/grove/Smotoshield2.jpg", 64, 64))
        .appendField(new Blockly.FieldDropdown([["Stop", "stop"], ["Forward", "forward"], ["Right", "right"], ["Left", "left"], ["Backward", "backward"]]), "DIRECTION");
    /*this.appendValueInput("SPEED", 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Speed");*/
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Drive two brushed DC motors');
    this.setHelpUrl('http://wiki.seeedstudio.com/Motor_Shield/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_thumb_joystick'] = {
  init: function() {
    this.appendDummyInput()
		.appendField("Thumb Joystick")
        .appendField(new Blockly.FieldImage("./blocks/grove/Bgjoy1.jpg", 64, 64))
		.appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownAnalog), "PIN")
        .appendField("axis")
        .appendField(new Blockly.FieldDropdown([["x", "x"],  ["y", "y"]]), "AXIS");
    this.setOutput(true, 'Number');
	this.setTooltip('output two analog values(200~800) representing two directions');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Thumb_Joystick/');
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_rgb_led'] = {
  init: function() {
    this.appendDummyInput()
		.appendField("Chainable RGB LED")
        .appendField(new Blockly.FieldImage("./blocks/grove/Chanbalelednb1.jpg", 64, 64))
		.appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN")
    this.appendDummyInput("COLOR0")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Color 1")
        .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    this.setMutator(new Blockly.Mutator(['grove_rgb_led_item']));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('256 color LED, currently Chainable feature is not support');
    this.itemCount_ = 1;
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Chainable_RGB_LED/');
    this.setStyle('grove_blocks');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    for (var x = 0; x < this.itemCount_; x++) {
      var colour_rgb = this.getFieldValue('RGB0');
      //alert(colour_rgb);
      container.setAttribute('RGB' + x, colour_rgb);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('COLOR' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var color = window.parseInt(xmlElement.getAttribute('RGB'+x), "#00ff00");
      var input = this.appendDummyInput('COLOR' + x);
      //if (x == 0) {
        input.setAlign(Blockly.ALIGN_RIGHT)
             .appendField("Color "+(x+1))
             .appendField(new Blockly.FieldColour(color), "RGB" + x);
      //}
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('COLOR0')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Color 1")
          .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    }
  },
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('grove_rgb_led_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = workspace.newBlock('grove_rgb_led_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('COLOR0');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        //console.log("cnt:"+x);
        this.removeInput('COLOR' + x);
      }
    }
    /*var top;
    if(this.itemCount_ > 0){
      top = this.itemCount_-1;
    } else {
      top = 0;
    }
    console.log("top:"+top);*/
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var colour_rgb = this.getFieldValue('RGB' + this.itemCount_);
      if(colour_rgb==null){
          colour_rgb = "00ff00";
      }
      //console.log("blk:"+this.itemCount_);
      /*if(top>this.itemCount_){
        this.removeInput('COLOR' + this.itemCount_);
      }*/
      var input = this.appendDummyInput('COLOR' + this.itemCount_);
      //if (this.itemCount_ == 0) {
        input.setAlign(Blockly.ALIGN_RIGHT)
             .appendField("Color " + (this.itemCount_+1))
             .appendField(new Blockly.FieldColour(colour_rgb), "RGB" + this.itemCount_);
      //}
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('COLOR0')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Color 1")
          .appendField(new Blockly.FieldColour("#00ff00"), "RGB0");
    }
  }
  /*saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('COLOR' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }*/
};

Blockly.Blocks['grove_rgb_led_container'] = {
  // Container.
  init: function() {
    this.appendDummyInput()
        .appendField("Container");
    this.appendStatementInput('STACK');
    this.setTooltip("Add, remove items to reconfigure this chain");
    this.contextMenu = false;
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_rgb_led_item'] = {
  // Add items.
  init: function() {
    this.appendDummyInput()
        .appendField("Item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add an item to the chain");
    this.contextMenu = false;
    this.setStyle('grove_blocks');
  }
};

Blockly.Blocks['grove_bluetooth_slave'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Bluetooth Slave")
      .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/File:Twigbt00.jpg", 64, 64))
      .appendField("PIN#")
      .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN")
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Name")
      .appendField(new Blockly.FieldTextInput('blocklyduino'), 'NAME');
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Pincode")
      .appendField(new Blockly.FieldTextInput('0000'), 'PINCODE');
    this.appendStatementInput("RCV")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Receive");
    this.appendStatementInput("SNT")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Send");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Bluetooth V2.0+EDR slave. Support single slave per board');
    this.setHelpUrl('http://wiki.seeedstudio.com/Grove-Serial_Bluetooth/');
    this.setStyle('grove_blocks');
  }
};
//http://www.seeedstudio.com/wiki/File:Twig-Temp%26Humi.jpg
//http://www.seeedstudio.com/wiki/Grove-_Temperature_and_Humidity_Sensor

//http://www.seeedstudio.com/wiki/Grove_-_125KHz_RFID_Reader

/*
void setup()
{
	pinMode( 3 , OUTPUT);
	pinMode( 1 , INPUT);
}

void loop()
{
	if (digitalRead( 1))
	{
		digitalWrite( 3 , HIGH);
	}
	else
	{
		digitalWrite( 1 , LOW);
	}
}
*/

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

Blockly.Constants.servo = {};



//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Blocks['servo_move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Servo")
        .appendField(new Blockly.FieldImage("./blocks/servo/servo.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.appendValueInput("DEGREE")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Degree (0~180)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('move between 0~180 degree');
    this.setHelpUrl('http://playground.arduino.cc/ComponentLib/servo');
    this.setStyle('servo_blocks');
  }
};

Blockly.Blocks['servo_read_degrees'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Servo")
        .appendField(new Blockly.FieldImage("./blocks/servo/servo.jpg", 64, 64))
        .appendField("PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.dropdownDigital), "PIN");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Read Degrees")
    this.setOutput(true, 'Number');
    this.setTooltip('return that degree with the last servo move.');
    this.setHelpUrl('http://playground.arduino.cc/ComponentLib/servo');
    this.setStyle('servo_blocks');
  }
};
/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino for blocks.
 * @author gasolin@gmail.com (Fred Lin)
 * @reboot scanet@libreduc.cc (SebCanet)
 */

Blockly.Arduino = {};


/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Arduino.addReservedWords(
  // http://arduino.cc/en/Reference/HomePage
  'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
);

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4;       // + -
Blockly.Arduino.ORDER_SHIFT = 5;          // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6;     // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8;    // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9;    // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99;          // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Arduino.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_FUNCTION_CALL],
  // !(!foo) -> !!foo
  [Blockly.Arduino.ORDER_LOGICAL_NOT, Blockly.Arduino.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.Arduino.ORDER_MULTIPLICATION, Blockly.Arduino.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.Arduino.ORDER_ADDITION, Blockly.Arduino.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.Arduino.ORDER_LOGICAL_AND, Blockly.Arduino.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.Arduino.ORDER_LOGICAL_OR, Blockly.Arduino.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function(workspace) {
	// Create a dictionary of definitions to be printed before setups.
	Blockly.Arduino.definitions_ = Object.create(null);
	// Create a dictionary of setups to be printed before the code.
	Blockly.Arduino.setups_ = Object.create(null);
	// Create a dictionary mapping desired function names in definitions_
	// to actual function names (to avoid collisions with user functions).
	Blockly.Arduino.functionNames_ = Object.create(null);

	if (!Blockly.Arduino.variableDB_) {
		Blockly.Arduino.variableDB_ =
			new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
	} else {
		Blockly.Arduino.variableDB_.reset();
	}

	Blockly.Arduino.variableDB_.setVariableMap(workspace.getVariableMap());

	var defvars = [];
	// Add developer variables (not created or named by the user).
	var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
	for (var i = 0; i < devVarList.length; i++) {
		defvars.push('int ' + Blockly.Arduino.variableDB_.getName(devVarList[i], Blockly.Names.DEVELOPER_VARIABLE_TYPE) + ';\n');
	}
		
	// Add user variables, but only ones that are being used.	
	var variables = Blockly.Variables.allUsedVarModels(workspace);
	for (var i = 0; i < variables.length; i++) {
		defvars.push(Blockly.Arduino.variableDB_.getName(variables[i].getId(), Blockly.Variables.NAME_TYPE));
	}

	Blockly.Arduino.definitions_['variables'] = defvars.join('\n');

	// Declare all of the variables.
	if (defvars.length) {
	Blockly.Arduino.definitions_['variables'] =
		'int ' + defvars.join(', ') + ';\n';
	}
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Arduino.finish = function(code) {
  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  code = 'void loop() \n{\n' + code + '\n}';

  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Arduino.definitions_) {
    var def = Blockly.Arduino.definitions_[name];
    if (def.match(/^#include/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }

  // Convert the setups dictionary into a list.
  var setups = [];
  for (var name in Blockly.Arduino.setups_) {
	setups.push(Blockly.Arduino.setups_[name]);
  }
  // Clean up temporary data.
  delete Blockly.Arduino.definitions_;
  delete Blockly.Arduino.functionNames_;
  Blockly.Arduino.variableDB_.reset();

  var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n') + '\nvoid setup() \n{\n  ' + setups.join('\n  ') + '\n}'+ '\n\n';
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Arduino.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Arduino.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Arduino.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.Arduino.colour = {};



Blockly.Arduino['colour_picker'] = function(block) {
  // Colour picker.
  var code = '\'' + block.getFieldValue('COLOUR') + '\'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['colour_random'] = function(block) {
  // Generate a random colour.
  var functionName = Blockly.Arduino.provideFunction_(
      'colourRandom',
      ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ + '() {',
        '  var num = Math.floor(Math.random() * Math.pow(2, 24));',
        '  return \'#\' + (\'00000\' + num.toString(16)).substr(-6);',
        '}']);
  var code = functionName + '()';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var red = Blockly.Arduino.valueToCode(block, 'RED',
      Blockly.Arduino.ORDER_COMMA) || 0;
  var green = Blockly.Arduino.valueToCode(block, 'GREEN',
      Blockly.Arduino.ORDER_COMMA) || 0;
  var blue = Blockly.Arduino.valueToCode(block, 'BLUE',
      Blockly.Arduino.ORDER_COMMA) || 0;
  var functionName = Blockly.Arduino.provideFunction_(
      'colourRgb',
      ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(r, g, b) {',
       '  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;',
       '  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;',
       '  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;',
       '  r = (\'0\' + (Math.round(r) || 0).toString(16)).slice(-2);',
       '  g = (\'0\' + (Math.round(g) || 0).toString(16)).slice(-2);',
       '  b = (\'0\' + (Math.round(b) || 0).toString(16)).slice(-2);',
       '  return \'#\' + r + g + b;',
       '}']);
  var code = functionName + '(' + red + ', ' + green + ', ' + blue + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['colour_blend'] = function(block) {
  // Blend two colours together.
  var c1 = Blockly.Arduino.valueToCode(block, 'COLOUR1',
      Blockly.Arduino.ORDER_COMMA) || '\'#000000\'';
  var c2 = Blockly.Arduino.valueToCode(block, 'COLOUR2',
      Blockly.Arduino.ORDER_COMMA) || '\'#000000\'';
  var ratio = Blockly.Arduino.valueToCode(block, 'RATIO',
      Blockly.Arduino.ORDER_COMMA) || 0.5;
  var functionName = Blockly.Arduino.provideFunction_(
      'colourBlend',
      ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(c1, c2, ratio) {',
       '  ratio = Math.max(Math.min(Number(ratio), 1), 0);',
       '  var r1 = parseInt(c1.substring(1, 3), 16);',
       '  var g1 = parseInt(c1.substring(3, 5), 16);',
       '  var b1 = parseInt(c1.substring(5, 7), 16);',
       '  var r2 = parseInt(c2.substring(1, 3), 16);',
       '  var g2 = parseInt(c2.substring(3, 5), 16);',
       '  var b2 = parseInt(c2.substring(5, 7), 16);',
       '  var r = Math.round(r1 * (1 - ratio) + r2 * ratio);',
       '  var g = Math.round(g1 * (1 - ratio) + g2 * ratio);',
       '  var b = Math.round(b1 * (1 - ratio) + b2 * ratio);',
       '  r = (\'0\' + (r || 0).toString(16)).slice(-2);',
       '  g = (\'0\' + (g || 0).toString(16)).slice(-2);',
       '  b = (\'0\' + (b || 0).toString(16)).slice(-2);',
       '  return \'#\' + r + g + b;',
       '}']);
  var code = functionName + '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.Arduino.lists = {};



Blockly.Arduino['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Arduino.valueToCode(block, 'ADD' + i,
        Blockly.Arduino.ORDER_COMMA) || 'null';
  }
  var code = '[' + elements.join(', ') + ']';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var functionName = Blockly.Arduino.provideFunction_(
      'listsRepeat',
      ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(value, n) {',
       '  var array = [];',
       '  for (var i = 0; i < n; i++) {',
       '    array[i] = value;',
       '  }',
       '  return array;',
       '}']);
  var element = Blockly.Arduino.valueToCode(block, 'ITEM',
      Blockly.Arduino.ORDER_COMMA) || 'null';
  var repeatCount = Blockly.Arduino.valueToCode(block, 'NUM',
      Blockly.Arduino.ORDER_COMMA) || '0';
  var code = functionName + '(' + element + ', ' + repeatCount + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['lists_length'] = function(block) {
  // String or array length.
  var list = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_MEMBER) || '[]';
  return [list + '.length', Blockly.Arduino.ORDER_MEMBER];
};

Blockly.Arduino['lists_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var list = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_MEMBER) || '[]';
  return ['!' + list + '.length', Blockly.Arduino.ORDER_LOGICAL_NOT];
};

Blockly.Arduino['lists_indexOf'] = function(block) {
  // Find an item in the list.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var item = Blockly.Arduino.valueToCode(block, 'FIND',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  var list = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_MEMBER) || '[]';
  var code = list + '.' + operator + '(' + item + ')';
  if (block.workspace.options.oneBasedIndex) {
    return [code + ' + 1', Blockly.Arduino.ORDER_ADDITION];
  }
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var listOrder = (where == 'RANDOM') ? Blockly.Arduino.ORDER_COMMA :
      Blockly.Arduino.ORDER_MEMBER;
  var list = Blockly.Arduino.valueToCode(block, 'VALUE', listOrder) || '[]';

  switch (where) {
    case ('FIRST'):
      if (mode == 'GET') {
        var code = list + '[0]';
        return [code, Blockly.Arduino.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.shift()';
        return [code, Blockly.Arduino.ORDER_MEMBER];
      } else if (mode == 'REMOVE') {
        return list + '.shift();\n';
      }
      break;
    case ('LAST'):
      if (mode == 'GET') {
        var code = list + '.slice(-1)[0]';
        return [code, Blockly.Arduino.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop()';
        return [code, Blockly.Arduino.ORDER_MEMBER];
      } else if (mode == 'REMOVE') {
        return list + '.pop();\n';
      }
      break;
    case ('FROM_START'):
      var at = Blockly.Arduino.getAdjusted(block, 'AT');
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.Arduino.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.splice(' + at + ', 1)[0]';
        return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.splice(' + at + ', 1);\n';
      }
      break;
    case ('FROM_END'):
      var at = Blockly.Arduino.getAdjusted(block, 'AT', 1, true);
      if (mode == 'GET') {
        var code = list + '.slice(' + at + ')[0]';
        return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.splice(' + at + ', 1)[0]';
        return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.splice(' + at + ', 1);';
      }
      break;
    case ('RANDOM'):
      var functionName = Blockly.Arduino.provideFunction_(
          'listsGetRandomItem',
          ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(list, remove) {',
           '  var x = Math.floor(Math.random() * list.length);',
           '  if (remove) {',
           '    return list.splice(x, 1)[0];',
           '  } else {',
           '    return list[x];',
           '  }',
           '}']);
      code = functionName + '(' + list + ', ' + (mode != 'GET') + ')';
      if (mode == 'GET' || mode == 'GET_REMOVE') {
        return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + ';\n';
      }
      break;
  }
  throw 'Unhandled combination (lists_getIndex).';
};

Blockly.Arduino['lists_setIndex'] = function(block) {
  // Set element at index.
  // Note: Until February 2013 this block did not have MODE or WHERE inputs.
  var list = Blockly.Arduino.valueToCode(block, 'LIST',
      Blockly.Arduino.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var value = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || 'null';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  // Closure, which accesses and modifies 'list'.
  function cacheList() {
    if (list.match(/^\w+$/)) {
      return '';
    }
    var listVar = Blockly.Arduino.variableDB_.getDistinctName(
        'tmpList', Blockly.Variables.NAME_TYPE);
    var code = 'var ' + listVar + ' = ' + list + ';\n';
    list = listVar;
    return code;
  }
  switch (where) {
    case ('FIRST'):
      if (mode == 'SET') {
        return list + '[0] = ' + value + ';\n';
      } else if (mode == 'INSERT') {
        return list + '.unshift(' + value + ');\n';
      }
      break;
    case ('LAST'):
      if (mode == 'SET') {
        var code = cacheList();
        code += list + '[' + list + '.length - 1] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        return list + '.push(' + value + ');\n';
      }
      break;
    case ('FROM_START'):
      var at = Blockly.Arduino.getAdjusted(block, 'AT');
      if (mode == 'SET') {
        return list + '[' + at + '] = ' + value + ';\n';
      } else if (mode == 'INSERT') {
        return list + '.splice(' + at + ', 0, ' + value + ');\n';
      }
      break;
    case ('FROM_END'):
      var at = Blockly.Arduino.getAdjusted(block, 'AT', 1, false,
          Blockly.Arduino.ORDER_SUBTRACTION);
      var code = cacheList();
      if (mode == 'SET') {
        code += list + '[' + list + '.length - ' + at + '] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        code += list + '.splice(' + list + '.length - ' + at + ', 0, ' + value +
            ');\n';
        return code;
      }
      break;
    case ('RANDOM'):
      var code = cacheList();
      var xVar = Blockly.Arduino.variableDB_.getDistinctName(
          'tmpX', Blockly.Variables.NAME_TYPE);
      code += 'var ' + xVar + ' = Math.floor(Math.random() * ' + list +
          '.length);\n';
      if (mode == 'SET') {
        code += list + '[' + xVar + '] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        code += list + '.splice(' + xVar + ', 0, ' + value + ');\n';
        return code;
      }
      break;
  }
  throw 'Unhandled combination (lists_setIndex).';
};

/**
 * Returns an expression calculating the index into a list.
 * @private
 * @param {string} listName Name of the list, used to calculate length.
 * @param {string} where The method of indexing, selected by dropdown in Blockly
 * @param {string=} opt_at The optional offset when indexing from start/end.
 * @return {string} Index expression.
 */
Blockly.Arduino.lists.getIndex_ = function(listName, where, opt_at) {
  if (where == 'FIRST') {
    return '0';
  } else if (where == 'FROM_END') {
    return listName + '.length - 1 - ' + opt_at;
  } else if (where == 'LAST') {
    return listName + '.length - 1';
  } else {
    return opt_at;
  }
};

Blockly.Arduino['lists_getSublist'] = function(block) {
  // Get sublist.
  var list = Blockly.Arduino.valueToCode(block, 'LIST',
      Blockly.Arduino.ORDER_MEMBER) || '[]';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = list + '.slice(0)';
  } else if (list.match(/^\w+$/) ||
      (where1 != 'FROM_END' && where2 == 'FROM_START')) {
    // If the list is a variable or doesn't require a call for length, don't
    // generate a helper function.
    switch (where1) {
      case 'FROM_START':
        var at1 = Blockly.Arduino.getAdjusted(block, 'AT1');
        break;
      case 'FROM_END':
        var at1 = Blockly.Arduino.getAdjusted(block, 'AT1', 1, false,
            Blockly.Arduino.ORDER_SUBTRACTION);
        at1 = list + '.length - ' + at1;
        break;
      case 'FIRST':
        var at1 = '0';
        break;
      default:
        throw 'Unhandled option (lists_getSublist).';
    }
    switch (where2) {
      case 'FROM_START':
        var at2 = Blockly.Arduino.getAdjusted(block, 'AT2', 1);
        break;
      case 'FROM_END':
        var at2 = Blockly.Arduino.getAdjusted(block, 'AT2', 0, false,
            Blockly.Arduino.ORDER_SUBTRACTION);
        at2 = list + '.length - ' + at2;
        break;
      case 'LAST':
        var at2 = list + '.length';
        break;
      default:
        throw 'Unhandled option (lists_getSublist).';
    }
    code = list + '.slice(' + at1 + ', ' + at2 + ')';
  } else {
    var at1 = Blockly.Arduino.getAdjusted(block, 'AT1');
    var at2 = Blockly.Arduino.getAdjusted(block, 'AT2');
    var getIndex_ = Blockly.Arduino.lists.getIndex_;
    var wherePascalCase = {'FIRST': 'First', 'LAST': 'Last',
        'FROM_START': 'FromStart', 'FROM_END': 'FromEnd'};
    var functionName = Blockly.Arduino.provideFunction_(
        'subsequence' + wherePascalCase[where1] + wherePascalCase[where2],
        ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
            '(sequence' +
            // The value for 'FROM_END' and'FROM_START' depends on `at` so
            // we add it as a parameter.
            ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', at1' : '') +
            ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', at2' : '') +
            ') {',
          '  var start = ' + getIndex_('sequence', where1, 'at1') + ';',
          '  var end = ' + getIndex_('sequence', where2, 'at2') + ' + 1;',
          '  return sequence.slice(start, end);',
          '}']);
    var code = functionName + '(' + list +
        // The value for 'FROM_END' and 'FROM_START' depends on `at` so we
        // pass it.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', ' + at1 : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', ' + at2 : '') +
        ')';
  }
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['lists_sort'] = function(block) {
  // Block for sorting a list.
  var list = Blockly.Arduino.valueToCode(block, 'LIST',
      Blockly.Arduino.ORDER_FUNCTION_CALL) || '[]';
  var direction = block.getFieldValue('DIRECTION') === '1' ? 1 : -1;
  var type = block.getFieldValue('TYPE');
  var getCompareFunctionName = Blockly.Arduino.provideFunction_(
      'listsGetSortCompare',
      ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(type, direction) {',
       '  var compareFuncs = {',
       '    "NUMERIC": function(a, b) {',
       '        return parseFloat(a) - parseFloat(b); },',
       '    "TEXT": function(a, b) {',
       '        return a.toString() > b.toString() ? 1 : -1; },',
       '    "IGNORE_CASE": function(a, b) {',
       '        return a.toString().toLowerCase() > ' +
          'b.toString().toLowerCase() ? 1 : -1; },',
       '  };',
       '  var compare = compareFuncs[type];',
       '  return function(a, b) { return compare(a, b) * direction; }',
       '}']);
  return [list + '.slice().sort(' +
      getCompareFunctionName + '("' + type + '", ' + direction + '))',
      Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['lists_split'] = function(block) {
  // Block for splitting text into a list, or joining a list into text.
  var input = Blockly.Arduino.valueToCode(block, 'INPUT',
      Blockly.Arduino.ORDER_MEMBER);
  var delimiter = Blockly.Arduino.valueToCode(block, 'DELIM',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  var mode = block.getFieldValue('MODE');
  if (mode == 'SPLIT') {
    if (!input) {
      input = '\'\'';
    }
    var functionName = 'split';
  } else if (mode == 'JOIN') {
    if (!input) {
      input = '[]';
    }
    var functionName = 'join';
  } else {
    throw 'Unknown mode: ' + mode;
  }
  var code = input + '.' + functionName + '(' + delimiter + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['lists_reverse'] = function(block) {
  // Block for reversing a list.
  var list = Blockly.Arduino.valueToCode(block, 'LIST',
      Blockly.Arduino.ORDER_FUNCTION_CALL) || '[]';
  var code = list + '.slice().reverse()';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */

Blockly.Arduino.logic = {};



Blockly.Arduino['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Arduino.valueToCode(block, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
    branchCode = Blockly.Arduino.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Arduino.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.Arduino['controls_ifelse'] = Blockly.Arduino['controls_if'];

Blockly.Arduino['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND :
      Blockly.Arduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order);
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Arduino.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.Arduino['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Arduino.valueToCode(block, 'IF',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.Arduino.valueToCode(block, 'THEN',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.Arduino.valueToCode(block, 'ELSE',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.Arduino.ORDER_CONDITIONAL];
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.Arduino.loops = {};



Blockly.Arduino['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.Arduino.valueToCode(block, 'TIMES',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.Arduino.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'int ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.Arduino['controls_repeat'] =
    Blockly.Arduino['controls_repeat_ext'];

Blockly.Arduino['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL',
      until ? Blockly.Arduino.ORDER_LOGICAL_NOT :
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Arduino['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.Arduino.valueToCode(block, 'BY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      startVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.Arduino.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.Arduino.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + '; ' +
        incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + '; ' +
        variable0 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.Arduino['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(block, 'LIST',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
  var code = '';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  var listVar = argument0;
  if (!argument0.match(/^\w+$/)) {
    listVar = Blockly.Arduino.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.Variables.NAME_TYPE);
    code += 'var ' + listVar + ' = ' + argument0 + ';\n';
  }
  var indexVar = Blockly.Arduino.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  branch = Blockly.Arduino.INDENT + variable0 + ' = ' +
      listVar + '[' + indexVar + '];\n' + branch;
  code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Arduino['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */

Blockly.Arduino.math = {};



Blockly.Arduino['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.Arduino.ORDER_ATOMIC : 
              Blockly.Arduino.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.Arduino['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.Arduino.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.Arduino.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.Arduino.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.Arduino.ORDER_DIVISION],
    'POWER': [null, Blockly.Arduino.ORDER_COMMA]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in Arduino requires a special case since it has no operator.
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Arduino['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] == '-') {
      // --3 is not legal in JS.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.Arduino.ORDER_UNARY_NEGATION];
  }
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_DIVISION) || '0';
  } else {
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'Math.abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Math.sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'Math.log(' + arg + ')';
      break;
    case 'EXP':
      code = 'Math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Math.pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'Math.round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'Math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'Math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'Math.sin(' + arg + ' / 180 * Math.PI)';
      break;
    case 'COS':
      code = 'Math.cos(' + arg + ' / 180 * Math.PI)';
      break;
    case 'TAN':
      code = 'Math.tan(' + arg + ' / 180 * Math.PI)';
      break;
  }
  if (code) {
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'LOG10':
      code = 'Math.log(' + arg + ') / Math.log(10)';
      break;
    case 'ASIN':
      code = 'Math.asin(' + arg + ') / Math.PI * 180';
      break;
    case 'ACOS':
      code = 'Math.acos(' + arg + ') / Math.PI * 180';
      break;
    case 'ATAN':
      code = 'Math.atan(' + arg + ') / Math.PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.Arduino.ORDER_DIVISION];
};

Blockly.Arduino['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['Math.PI', Blockly.Arduino.ORDER_MEMBER],
    'E': ['Math.E', Blockly.Arduino.ORDER_MEMBER],
    'GOLDEN_RATIO':
        ['(1 + Math.sqrt(5)) / 2', Blockly.Arduino.ORDER_DIVISION],
    'SQRT2': ['Math.SQRT2', Blockly.Arduino.ORDER_MEMBER],
    'SQRT1_2': ['Math.SQRT1_2', Blockly.Arduino.ORDER_MEMBER],
    'INFINITY': ['Infinity', Blockly.Arduino.ORDER_ATOMIC]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.Arduino['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.Arduino.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.Arduino.ORDER_MODULUS) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    // Prime is a special case as it is not a one-liner test.
    var functionName = Blockly.Arduino.provideFunction_(
        'mathIsPrime',
        ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ + '(n) {',
         '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
         '  if (n == 2 || n == 3) {',
         '    return true;',
         '  }',
         '  // False if n is NaN, negative, is 1, or not whole.',
         '  // And false if n is divisible by 2 or 3.',
         '  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 ||' +
            ' n % 3 == 0) {',
         '    return false;',
         '  }',
         '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
         '  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {',
         '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
         '      return false;',
         '    }',
         '  }',
         '  return true;',
         '}']);
    code = functionName + '(' + number_to_check + ')';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' % 1 == 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.Arduino.valueToCode(block, 'DIVISOR',
          Blockly.Arduino.ORDER_MODULUS) || '0';
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.Arduino.ORDER_EQUALITY];
};

Blockly.Arduino['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.Arduino.valueToCode(block, 'DELTA',
      Blockly.Arduino.ORDER_ADDITION) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = (typeof ' + varName + ' == \'number\' ? ' + varName +
      ' : 0) + ' + argument0 + ';\n';
};

// Rounding functions have a single operand.
Blockly.Arduino['math_round'] = Blockly.Arduino['math_single'];
// Trigonometry functions have a single operand.
Blockly.Arduino['math_trig'] = Blockly.Arduino['math_single'];

Blockly.Arduino['math_on_list'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.Arduino.valueToCode(block, 'LIST',
          Blockly.Arduino.ORDER_MEMBER) || '[]';
      code = list + '.reduce(function(x, y) {return x + y;})';
      break;
    case 'MIN':
      list = Blockly.Arduino.valueToCode(block, 'LIST',
          Blockly.Arduino.ORDER_COMMA) || '[]';
      code = 'Math.min.apply(null, ' + list + ')';
      break;
    case 'MAX':
      list = Blockly.Arduino.valueToCode(block, 'LIST',
          Blockly.Arduino.ORDER_COMMA) || '[]';
      code = 'Math.max.apply(null, ' + list + ')';
      break;
    case 'AVERAGE':
      // mathMean([null,null,1,3]) == 2.0.
      var functionName = Blockly.Arduino.provideFunction_(
          'mathMean',
          ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(myList) {',
            '  return myList.reduce(function(x, y) {return x + y;}) / ' +
                  'myList.length;',
            '}']);
      list = Blockly.Arduino.valueToCode(block, 'LIST',
          Blockly.Arduino.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'MEDIAN':
      // mathMedian([null,null,1,3]) == 2.0.
      var functionName = Blockly.Arduino.provideFunction_(
          'mathMedian',
          ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(myList) {',
            '  var localList = myList.filter(function (x) ' +
              '{return typeof x == \'number\';});',
            '  if (!localList.length) return null;',
            '  localList.sort(function(a, b) {return b - a;});',
            '  if (localList.length % 2 == 0) {',
            '    return (localList[localList.length / 2 - 1] + ' +
              'localList[localList.length / 2]) / 2;',
            '  } else {',
            '    return localList[(localList.length - 1) / 2];',
            '  }',
            '}']);
      list = Blockly.Arduino.valueToCode(block, 'LIST',
          Blockly.Arduino.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'MODE':
      // As a list of numbers can contain more than one mode,
      // the returned result is provided as an array.
      // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
      var functionName = Blockly.Arduino.provideFunction_(
          'mathModes',
          ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(values) {',
            '  var modes = [];',
            '  var counts = [];',
            '  var maxCount = 0;',
            '  for (var i = 0; i < values.length; i++) {',
            '    var value = values[i];',
            '    var found = false;',
            '    var thisCount;',
            '    for (var j = 0; j < counts.length; j++) {',
            '      if (counts[j][0] === value) {',
            '        thisCount = ++counts[j][1];',
            '        found = true;',
            '        break;',
            '      }',
            '    }',
            '    if (!found) {',
            '      counts.push([value, 1]);',
            '      thisCount = 1;',
            '    }',
            '    maxCount = Math.max(thisCount, maxCount);',
            '  }',
            '  for (var j = 0; j < counts.length; j++) {',
            '    if (counts[j][1] == maxCount) {',
            '        modes.push(counts[j][0]);',
            '    }',
            '  }',
            '  return modes;',
            '}']);
      list = Blockly.Arduino.valueToCode(block, 'LIST',
          Blockly.Arduino.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'STD_DEV':
      var functionName = Blockly.Arduino.provideFunction_(
          'mathStandardDeviation',
          ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(numbers) {',
            '  var n = numbers.length;',
            '  if (!n) return null;',
            '  var mean = numbers.reduce(function(x, y) {return x + y;}) / n;',
            '  var variance = 0;',
            '  for (var j = 0; j < n; j++) {',
            '    variance += Math.pow(numbers[j] - mean, 2);',
            '  }',
            '  variance = variance / n;',
            '  return Math.sqrt(variance);',
            '}']);
      list = Blockly.Arduino.valueToCode(block, 'LIST',
          Blockly.Arduino.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'RANDOM':
      var functionName = Blockly.Arduino.provideFunction_(
          'mathRandomList',
          ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(list) {',
            '  var x = Math.floor(Math.random() * list.length);',
            '  return list[x];',
            '}']);
      list = Blockly.Arduino.valueToCode(block, 'LIST',
          Blockly.Arduino.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.Arduino.valueToCode(block, 'DIVIDEND',
      Blockly.Arduino.ORDER_MODULUS) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'DIVISOR',
      Blockly.Arduino.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.Arduino.ORDER_MODULUS];
};

Blockly.Arduino['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_COMMA) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'LOW',
      Blockly.Arduino.ORDER_COMMA) || '0';
  var argument2 = Blockly.Arduino.valueToCode(block, 'HIGH',
      Blockly.Arduino.ORDER_COMMA) || 'Infinity';
  var code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
      Blockly.Arduino.ORDER_COMMA) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_COMMA) || '0';
  var functionName = Blockly.Arduino.provideFunction_(
      'mathRandomInt',
      ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(a, b) {',
       '  if (a > b) {',
       '    // Swap a and b to ensure a is smaller.',
       '    var c = a;',
       '    a = b;',
       '    b = c;',
       '  }',
       '  return Math.floor(Math.random() * (b - a + 1) + a);',
       '}']);
  var code = functionName + '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  return ['Math.random()', Blockly.Arduino.ORDER_FUNCTION_CALL];
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.Arduino.procedures = {};



Blockly.Arduino['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Arduino.prefixLines(
        Blockly.Arduino.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + id + '\''), Blockly.Arduino.INDENT) + branch;
  }
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN',
      Blockly.Arduino.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = Blockly.Arduino.INDENT + 'return ' + returnValue + ';\n';
  }
  var returnType = returnValue ? 'int' : 'void';
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = 'int ' + Blockly.Arduino.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}\n';
  code = Blockly.Arduino.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Arduino.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Arduino['procedures_defnoreturn'] =
    Blockly.Arduino['procedures_defreturn'];

Blockly.Arduino['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Arduino.valueToCode(block, 'ARG' + i,
        Blockly.Arduino.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Arduino.valueToCode(block, 'ARG' + i,
        Blockly.Arduino.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.Arduino['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || 'null';
    code += Blockly.Arduino.INDENT + 'return ' + value + ';\n';
  } else {
    code += Blockly.Arduino.INDENT + 'return;\n';
  }
  code += '}\n';
  return code;
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.Arduino.texts = {};



Blockly.Arduino['text'] = function(block) {
  // Text value.
  var code = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  switch (block.itemCount_) {
    case 0:
      return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
    case 1:
      var element = Blockly.Arduino.valueToCode(block, 'ADD0',
          Blockly.Arduino.ORDER_NONE) || '\'\'';
      var code = 'String(' + element + ')';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
    case 2:
      var element0 = Blockly.Arduino.valueToCode(block, 'ADD0',
          Blockly.Arduino.ORDER_NONE) || '\'\'';
      var element1 = Blockly.Arduino.valueToCode(block, 'ADD1',
          Blockly.Arduino.ORDER_NONE) || '\'\'';
      var code = 'String(' + element0 + ') + String(' + element1 + ')';
      return [code, Blockly.Arduino.ORDER_ADDITION];
    default:
      var elements = new Array(block.itemCount_);
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Arduino.valueToCode(block, 'ADD' + i,
            Blockly.Arduino.ORDER_COMMA) || '\'\'';
      }
      var code = '[' + elements.join(',') + '].join(\'\')';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
};

Blockly.Arduino['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var value = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  return varName + ' = String(' + varName + ') + String(' + value + ');\n';
};

Blockly.Arduino['text_length'] = function(block) {
  // String or array length.
  var text = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_FUNCTION_CALL) || '\'\'';
  return [text + '.length', Blockly.Arduino.ORDER_MEMBER];
};

Blockly.Arduino['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_MEMBER) || '\'\'';
  return ['!' + text + '.length', Blockly.Arduino.ORDER_LOGICAL_NOT];
};

Blockly.Arduino['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var substring = Blockly.Arduino.valueToCode(block, 'FIND',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  var text = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + substring + ')';
  // Adjust index if using one-based indices.
  if (block.workspace.options.oneBasedIndex) {
    return [code + ' + 1', Blockly.Arduino.ORDER_ADDITION];
  }
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var textOrder = (where == 'RANDOM') ? Blockly.Arduino.ORDER_NONE :
      Blockly.Arduino.ORDER_MEMBER;
  var text = Blockly.Arduino.valueToCode(block, 'VALUE',
      textOrder) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = text + '.slice(-1)';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      var at = Blockly.Arduino.getAdjusted(block, 'AT');
      // Adjust index if using one-based indices.
      var code = text + '.charAt(' + at + ')';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
    case 'FROM_END':
      var at = Blockly.Arduino.getAdjusted(block, 'AT', 1, true);
      var code = text + '.slice(' + at + ').charAt(0)';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      var functionName = Blockly.Arduino.provideFunction_(
          'textRandomLetter',
          ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
              '(text) {',
           '  var x = Math.floor(Math.random() * text.length);',
           '  return text[x];',
           '}']);
      var code = functionName + '(' + text + ')';
      return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};

/**
 * Returns an expression calculating the index into a string.
 * @private
 * @param {string} stringName Name of the string, used to calculate length.
 * @param {string} where The method of indexing, selected by dropdown in Blockly
 * @param {string=} opt_at The optional offset when indexing from start/end.
 * @return {string} Index expression.
 */
Blockly.Arduino.text.getIndex_ = function(stringName, where, opt_at) {
  if (where == 'FIRST') {
    return '0';
  } else if (where == 'FROM_END') {
    return stringName + '.length - 1 - ' + opt_at;
  } else if (where == 'LAST') {
    return stringName + '.length - 1';
  } else {
    return opt_at;
  }
};

Blockly.Arduino['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.Arduino.valueToCode(block, 'STRING',
      Blockly.Arduino.ORDER_FUNCTION_CALL) || '\'\'';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
  } else if (text.match(/^'?\w+'?$/) ||
      (where1 != 'FROM_END' && where1 != 'LAST' &&
      where2 != 'FROM_END' && where2 != 'LAST')) {
    // If the text is a variable or literal or doesn't require a call for
    // length, don't generate a helper function.
    switch (where1) {
      case 'FROM_START':
        var at1 = Blockly.Arduino.getAdjusted(block, 'AT1');
        break;
      case 'FROM_END':
        var at1 = Blockly.Arduino.getAdjusted(block, 'AT1', 1, false,
            Blockly.Arduino.ORDER_SUBTRACTION);
        at1 = text + '.length - ' + at1;
        break;
      case 'FIRST':
        var at1 = '0';
        break;
      default:
        throw 'Unhandled option (text_getSubstring).';
    }
    switch (where2) {
      case 'FROM_START':
        var at2 = Blockly.Arduino.getAdjusted(block, 'AT2', 1);
        break;
      case 'FROM_END':
        var at2 = Blockly.Arduino.getAdjusted(block, 'AT2', 0, false,
            Blockly.Arduino.ORDER_SUBTRACTION);
        at2 = text + '.length - ' + at2;
        break;
      case 'LAST':
        var at2 = text + '.length';
        break;
      default:
        throw 'Unhandled option (text_getSubstring).';
    }
    code = text + '.slice(' + at1 + ', ' + at2 + ')';
  } else {
    var at1 = Blockly.Arduino.getAdjusted(block, 'AT1');
    var at2 = Blockly.Arduino.getAdjusted(block, 'AT2');
    var getIndex_ = Blockly.Arduino.text.getIndex_;
    var wherePascalCase = {'FIRST': 'First', 'LAST': 'Last',
      'FROM_START': 'FromStart', 'FROM_END': 'FromEnd'};
    var functionName = Blockly.Arduino.provideFunction_(
        'subsequence' + wherePascalCase[where1] + wherePascalCase[where2],
        ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
        '(sequence' +
        // The value for 'FROM_END' and'FROM_START' depends on `at` so
        // we add it as a parameter.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', at1' : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', at2' : '') +
        ') {',
          '  var start = ' + getIndex_('sequence', where1, 'at1') + ';',
          '  var end = ' + getIndex_('sequence', where2, 'at2') + ' + 1;',
          '  return sequence.slice(start, end);',
          '}']);
    var code = functionName + '(' + text +
        // The value for 'FROM_END' and 'FROM_START' depends on `at` so we
        // pass it.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', ' + at1 : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', ' + at2 : '') +
        ')';
  }
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': '.toUpperCase()',
    'LOWERCASE': '.toLowerCase()',
    'TITLECASE': null
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var textOrder = operator ? Blockly.Arduino.ORDER_MEMBER :
      Blockly.Arduino.ORDER_NONE;
  var text = Blockly.Arduino.valueToCode(block, 'TEXT',
      textOrder) || '\'\'';
  if (operator) {
    // Upper and lower case are functions built into Arduino.
    var code = text + operator;
  } else {
    // Title case is not a native Arduino function.  Define one.
    var functionName = Blockly.Arduino.provideFunction_(
        'textToTitleCase',
        ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
            '(str) {',
         '  return str.replace(/\\S+/g,',
         '      function(txt) {return txt[0].toUpperCase() + ' +
            'txt.substring(1).toLowerCase();});',
         '}']);
    var code = functionName + '(' + text + ')';
  }
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': ".replace(/^[\\s\\xa0]+/, '')",
    'RIGHT': ".replace(/[\\s\\xa0]+$/, '')",
    'BOTH': '.trim()'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_MEMBER) || '\'\'';
  return [text + operator, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  return 'window.alert(' + msg + ');\n';
};

Blockly.Arduino['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.Arduino.valueToCode(block, 'TEXT',
        Blockly.Arduino.ORDER_NONE) || '\'\'';
  }
  var code = 'window.prompt(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'parseFloat(' + code + ')';
  }
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['text_prompt'] = Blockly.Arduino['text_prompt_ext'];

Blockly.Arduino['text_count'] = function(block) {
  var text = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_MEMBER) || '\'\'';
  var sub = Blockly.Arduino.valueToCode(block, 'SUB',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  var functionName = Blockly.Arduino.provideFunction_(
      'textCount',
      ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(haystack, needle) {',
       '  if (needle.length === 0) {',
       '    return haystack.length + 1;',
       '  } else {',
       '    return haystack.split(needle).length - 1;',
       '  }',
       '}']);
  var code = functionName + '(' + text + ', ' + sub + ')';
  return [code, Blockly.Arduino.ORDER_SUBTRACTION];
};

Blockly.Arduino['text_replace'] = function(block) {
  var text = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_MEMBER) || '\'\'';
  var from = Blockly.Arduino.valueToCode(block, 'FROM',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  var to = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_NONE) || '\'\'';
  // The regex escaping code below is taken from the implementation of
  // goog.string.regExpEscape.
  var functionName = Blockly.Arduino.provideFunction_(
      'textReplace',
      ['function ' + Blockly.Arduino.FUNCTION_NAME_PLACEHOLDER_ +
          '(haystack, needle, replacement) {',
       '  needle = ' +
           'needle.replace(/([-()\\[\\]{}+?*.$\\^|,:#<!\\\\])/g,"\\\\$1")',
       '                 .replace(/\\x08/g,"\\\\x08");',
       '  return haystack.replace(new RegExp(needle, \'g\'), replacement);',
       '}']);
  var code = functionName + '(' + text + ', ' + from + ', ' + to + ')';
  return [code, Blockly.Arduino.ORDER_MEMBER];
};

Blockly.Arduino['text_reverse'] = function(block) {
  var text = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_MEMBER) || '\'\'';
  var code = text + '.split(\'\').reverse().join(\'\')';
  return [code, Blockly.Arduino.ORDER_MEMBER];
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */

Blockly.Arduino.variables = {};



Blockly.Arduino['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2018 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for dynamic variable blocks.
 * @author fenichel@google.com (Rachel Fenichel)
 */

Blockly.Arduino.variablesDynamic = {};




// Arduino is dynamically typed.
Blockly.Arduino['variables_get_dynamic'] =
    Blockly.Arduino['variables_get'];
Blockly.Arduino['variables_set_dynamic'] =
    Blockly.Arduino['variables_set'];

/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

Blockly.Arduino.arduino_base = {};


Blockly.Arduino['arduino_base_inout_buildin_led'] = function(block) {
  var dropdown_stat = block.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
  var code = 'digitalWrite(13, ' + dropdown_stat + ');\n'
  return code;
};

Blockly.Arduino['arduino_base_inout_digital_write'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_stat = block.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
  return code;
};

Blockly.Arduino['arduino_base_inout_digital_read'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_base_inout_highlow'] = function(block) {
  // Boolean values HIGH and LOW.
  var code = (block.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_base_inout_analog_write'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var value_num = Blockly.Arduino.valueToCode(this, 'PWM', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
  return code;
};

Blockly.Arduino['arduino_base_inout_analog_read'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_base_delay'] = function(block) {
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  var code = 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino['arduino_base_angle'] = function(block) {
  var angle = this.getFieldValue('ANGLE');
  return [angle, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_base_date'] = function(block) {
  var angle = this.getFieldValue('DATE');
  return [angle, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_base_map'] = function(block) {
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
  var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'map(' + value_num + ', 0, 1024, 0, ' + value_dmax + ')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['arduino_base_inout_tone'] = function(block) {
  var dropdown_pin = block.getFieldValue("PIN");
  var value_num = Blockly.Arduino.valueToCode(this, "NUM", Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = "tone(" + dropdown_pin + ", " + value_num + ");\n";
  return code;
};

Blockly.Arduino['arduino_base_inout_notone'] = function(block) {
  var dropdown_pin = block.getFieldValue("PIN");
  Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = "noTone(" + dropdown_pin + ");\n";
  return code;
};

Blockly.Arduino['arduino_base_serial_print'] = function(block) {
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
  //content = content.replace('(','').replace(')','');

  Blockly.Arduino.setups_['setup_serial_' + profile.default.serial] = 'Serial.begin(9600);\n';

  var code = 'Serial.println(' + content + ');\n';
  return code;
};
//http://www.seeedstudio.com/wiki/GROVE_System
//http://www.seeedstudio.com/depot/index.php?main_page=advanced_search_result&search_in_description=1&keyword=grovefamily
//support starter bundle example http://www.seeedstudio.com/wiki/GROVE_-_Starter_Kit_V1.1b

/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating seeeduino grove blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

Blockly.Arduino.grove = {};



Blockly.Arduino['grove_led'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_stat = block.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_green_led_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino['grove_button'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_button_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['grove_rotary_angle'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['grove_tilt_switch'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_tilt_switch_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
int buttonPin = 1;
int buzzerPin = 2;

char notes[] = "cdefgabC "; // a space represents a rest
const int length = sizeof(notes); // the number of notes
int beats[length] = { 1,1,1,1,1,1,1,1,1};

int tempo = 300;

void playTone(int tone, int duration) {
  for (long i = 0; i < duration * 1000L; i += tone * 2) {
    digitalWrite(buzzerPin, HIGH);
    delayMicroseconds(tone);
    digitalWrite(buzzerPin, LOW);
    delayMicroseconds(tone);
  }
}

void playNote(char note, int duration) {
  char names[] = { 'c', 'd', 'e', 'f', 'g', 'a', 'b', 'C'};
  int tones[] = { 1915, 1700, 1519, 1432, 1275, 1136, 1014, 956 };

  // play the tone corresponding to the note name
  for (int i = 0; i < length; i++) {
    if (names[i] == note) {
      playTone(tones[i], duration);
    }
  }
}

void setup() {
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonPin,INPUT);
}

void loop() {
  if(digitalRead(buttonPin))
  {
  for (int i = 0; i < length; i++) {
    if (notes[i] == ' ') {
      delay(beats[i] * tempo); // rest
    } else {
      playNote(notes[i], beats[i] * tempo);
    }

    // pause between notes
    delay(tempo / 20);
  }
  }
}
*/
Blockly.Arduino['grove_piezo_buzzer'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_stat = block.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_piezo_buzzer_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino['grove_relay'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_stat = block.getFieldValue('STAT');
  Blockly.Arduino.setups_['setup_relay_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino['grove_temperature_sensor'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  /*
  a=analogRead(0);
  resistance=(float)(1023-a)*10000/a;
  temperature=1/(log(resistance/10000)/B+1/298.15)-273.15;
  */
  var code = 'round('+'(1/(log((float)(1023-analogRead('+dropdown_pin+'))*10000/analogRead('+dropdown_pin+'))/10000)/3975+1/298.15)-273.15'+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
#include <SerialLCD.h>
#include <SoftwareSerial.h> //block is a must
SerialLCD slcd(11,12);//block is a must, assign soft serial pins

void setup()
{
  slcd.begin();// set up :
}

void loop()
{
  slcd.backlight();// Turn on the backlight: //noBacklight
  slcd.setCursor(0,0); // set the cursor to (0,0):
  slcd.print("  Seeed Studio"); // Print a message to the LCD.
  slcd.setCursor(0,1); //line 2
  slcd.print("   Starter kit   ");
  delay(5000);
  //slcd.scrollDisplayLeft();//scrollDisplayRight/autoscroll/
  //slcd.clear();
  //Power/noPower
}
*/

var _get_next_pin = function(dropdown_pin) {
  var NextPIN = dropdown_pin;
  if (parseInt(NextPIN)) {
	NextPIN = parseInt(dropdown_pin)+1;
	} else {
		NextPIN = 'A'+(parseInt(NextPIN.slice(1,NextPIN.length))+1);
  }
  //check if NextPIN in bound
  var pinlen = profile.default.dropdownDigital.length;
  var notExist = true;
  for(var i=0;i<pinlen;i++){
    if(profile.default.dropdownDigital[i][1] == NextPIN){
      notExist = false;
    }
  }
  if(notExist){
    alert("Grove Sensor needs PIN#+1 port, current setting is out of bound.");
    return null;
  } else {
    return NextPIN;
  }
}

Blockly.Arduino['grove_serial_lcd_print'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var text = Blockly.Arduino.valueToCode(block, 'TEXT1',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var text2 = Blockly.Arduino.valueToCode(block, 'TEXT2',
      Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var delay_time = Blockly.Arduino.valueToCode(block, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  /*if(text.length>16||text2.length>16){
      alert("string is too long");
  }*/
  Blockly.Arduino.definitions_['define_seriallcd'] = '#include <SerialLCD.h>\n';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';
  //generate PIN#+1 port
  var NextPIN = _get_next_pin(dropdown_pin);

  Blockly.Arduino.definitions_['var_lcd_'+dropdown_pin] = 'SerialLCD slcd_'+dropdown_pin+'('+dropdown_pin+','+NextPIN+');\n';

  Blockly.Arduino.setups_['setup_lcd_'+dropdown_pin] = 'slcd_'+dropdown_pin+'.begin();\n';
  var code = 'slcd_'+dropdown_pin+'.backlight();\n';
  code    += 'slcd_'+dropdown_pin+'.setCursor(0,0);\n';
  code    += 'slcd_'+dropdown_pin+'.print('+text+');\n';//text.replace(new RegExp('\'',"gm"),'')
  code    += 'slcd_'+dropdown_pin+'.setCursor(0,1);\n';
  code    += 'slcd_'+dropdown_pin+'.print('+text2+');\n';
  code    += 'delay('+delay_time+');\n';
  return code;
};

Blockly.Arduino['grove_serial_lcd_power'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_stat = block.getFieldValue('STAT');

  Blockly.Arduino.definitions_['define_seriallcd'] = '#include <SerialLCD.h>\n';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';
  //generate PIN#+1 port
  var NextPIN = _get_next_pin(dropdown_pin);

  Blockly.Arduino.definitions_['var_lcd'+dropdown_pin] = 'SerialLCD slcd_'+dropdown_pin+'('+dropdown_pin+','+NextPIN+');\n';
  var code = 'slcd_'+dropdown_pin;
  if(dropdown_stat==="ON"){
    code += '.Power();\n';
  } else {
    code += '.noPower();\n';
  }
  return code;
};

Blockly.Arduino['grove_serial_lcd_effect'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_stat = block.getFieldValue('STAT');

  Blockly.Arduino.definitions_['define_seriallcd'] = '#include <SerialLCD.h>\n';
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';
  //generate PIN#+1 port
  var NextPIN = _get_next_pin(dropdown_pin);

  Blockly.Arduino.definitions_['var_lcd'+dropdown_pin] = 'SerialLCD slcd_'+dropdown_pin+'('+dropdown_pin+','+NextPIN+');\n';
  var code = 'slcd_'+dropdown_pin;
  if(dropdown_stat==="LEFT"){
    code += '.scrollDisplayLeft();\n';
  } else if(dropdown_stat==="RIGHT"){
    code += '.scrollDisplayRight();\n';
  } else {
    code += '.autoscroll();\n';
  }
  return code;
};

Blockly.Arduino['grove_sound_sensor'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['grove_pir_motion_sensor'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['grove_line_finder'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['grove_ultrasonic_ranger'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_unit = block.getFieldValue('UNIT');
  Blockly.Arduino.definitions_['define_ultrasonic'] = '#include <Ultrasonic.h>\n';
  Blockly.Arduino.definitions_['var_ultrasonic'+dropdown_pin] = 'Ultrasonic ultrasonic_'+dropdown_pin+'('+dropdown_pin+');';
  var code;
  if(dropdown_unit==="cm"){
    code = 'ultrasonic_'+dropdown_pin+'.MeasureInCentimeters()';
  } else {
    code = 'ultrasonic_'+dropdown_pin+'.MeasureInInches()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['grove_motor_shield'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var speed = 127;//Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '127';
  Blockly.Arduino.setups_["setup_motor"] = "pinMode(8,OUTPUT);//I1\n"+
  "  pinMode(11,OUTPUT);//I2\n"+
  "  pinMode(9,OUTPUT);//speedPinA\n"+
  "  pinMode(12,OUTPUT);//I3\n"+
  "  pinMode(13,OUTPUT);//i4\n"+
  "  pinMode(10,OUTPUT);//speedPinB\n";
  var code = "";
  if(dropdown_direction==="forward"){
    Blockly.Arduino.definitions_['define_forward'] = "void forward()\n"+
"{\n"+
     "  analogWrite(9,"+speed+");//input a simulation value to set the speed\n"+
     "  analogWrite(10,"+speed+");\n"+
     "  digitalWrite(13,HIGH);//turn DC Motor B move clockwise\n"+
     "  digitalWrite(12,LOW);\n"+
     "  digitalWrite(11,LOW);//turn DC Motor A move anticlockwise\n"+
     "  digitalWrite(8,HIGH);\n"+
"}\n";
    code="forward();\n";
  } else if (dropdown_direction==="right") {
    Blockly.Arduino.definitions_['define_right'] = "void right()\n"+
"{\n"+
     "  analogWrite(9,"+speed+");//input a simulation value to set the speed\n"+
     "  analogWrite(10,"+speed+");\n"+
     "  digitalWrite(13,LOW);//turn DC Motor B move anticlockwise\n"+
     "  digitalWrite(12,HIGH);\n"+
     "  digitalWrite(11,LOW);//turn DC Motor A move anticlockwise\n"+
     "  digitalWrite(8,HIGH);\n"+
"}\n\n";
    code="right();\n";
  } else if (dropdown_direction==="left") {
    Blockly.Arduino.definitions_['define_left'] = "void left()\n"+
"{\n"+
     "  analogWrite(9,"+speed+");//input a simulation value to set the speed\n"+
     "  analogWrite(10,"+speed+");\n"+
     "  digitalWrite(13,HIGH);//turn DC Motor B move clockwise\n"+
     "  digitalWrite(12,LOW);\n"+
     "  digitalWrite(11,HIGH);//turn DC Motor A move clockwise\n"+
     "  digitalWrite(8,LOW);\n"+
"}\n\n";
    code="left();\n";
  } else if (dropdown_direction==="backward"){
    Blockly.Arduino.definitions_['define_backward'] = "void backward()\n"+
"{\n"+
     "  analogWrite(9,"+speed+");//input a simulation value to set the speed\n"+
     "  analogWrite(10,"+speed+");\n"+
     "  digitalWrite(13,LOW);//turn DC Motor B move anticlockwise\n"+
     "  digitalWrite(12,HIGH);\n"+
     "  digitalWrite(11,HIGH);//turn DC Motor A move clockwise\n"+
     "  digitalWrite(8,LOW);\n"+
"}\n\n";
    code="backward();\n";
  } else if (dropdown_direction==="stop"){
    Blockly.Arduino.definitions_['define_stop'] = "void stop()\n"+
"{\n"+
     "digitalWrite(9,LOW);// Unenble the pin, to stop the motor. block should be done to avid damaging the motor.\n"+
     "digitalWrite(10,LOW);\n"+
     "delay(1000);\n"+
"}\n\n"
    code="stop();\n";
  }
  return code;
};

Blockly.Arduino['grove_thumb_joystick'] =  function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var dropdown_axis = block.getFieldValue('AXIS');
  var stickPIN = "0"
  if(dropdown_axis==="y"){
    stickPIN = _get_next_pin(dropdown_pin);
  } else {
    stickPIN = dropdown_pin
  }
  var code = 'analogRead('+stickPIN+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

Blockly.Arduino['grove_rgb_led'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var NextPIN = _get_next_pin(dropdown_pin);

  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  Blockly.Arduino.setups_['setup_input_'+NextPIN] = 'pinMode('+NextPIN+', OUTPUT);';
  Blockly.Arduino.definitions_['define_uint8'] = "#define uint8 unsigned char";
  Blockly.Arduino.definitions_['define_uint16'] = "#define uint16 unsigned int";
  Blockly.Arduino.definitions_['define_uint32'] = "#define uint32 unsigned long int";
  Blockly.Arduino.definitions_['define_clkproduce_'+dropdown_pin] = "void ClkProduce_"+dropdown_pin+"(void)\n"+
  "{\n"+
  "  digitalWrite("+dropdown_pin+", LOW);\n"+
  "  delayMicroseconds(20);\n"+
  "  digitalWrite("+dropdown_pin+", HIGH);\n"+
  "  delayMicroseconds(20);\n"+
  "}\n";
  Blockly.Arduino.definitions_['define_send32zero_'+dropdown_pin] = "void Send32Zero_"+dropdown_pin+"(void)\n"+
  "{\n"+
  "  uint8 i;\n"+
  "  for (i=0; i<32; i++)\n"+
  "  {\n"+
  "    digitalWrite("+NextPIN+", LOW);\n"+
  "    ClkProduce_"+dropdown_pin+"();\n"+
  "  }\n"+
  "}\n";
  Blockly.Arduino.definitions_['define_taskanticode'] = "uint8 TakeAntiCode(uint8 dat)\n"+
  "{\n"+
  "  uint8 tmp = 0;\n"+
  "  if ((dat & 0x80) == 0)\n"+
  "  {\n"+
  "    tmp |= 0x02;\n"+
  "  }\n"+
  "  \n"+
  "  if ((dat & 0x40) == 0)\n"+
  "  {\n"+
  "    tmp |= 0x01;\n"+
  "  }\n"+
  "  return tmp;\n"+
  "}\n";
  Blockly.Arduino.definitions_['define_datasend_'+dropdown_pin] = "// gray data\n"+
  "void DatSend_"+dropdown_pin+"(uint32 dx)\n"+
  "{\n"+
  "  uint8 i;\n"+
  "  for (i=0; i<32; i++)\n"+
  "  {\n"+
  "    if ((dx & 0x80000000) != 0)\n"+
  "    {\n"+
  "      digitalWrite("+NextPIN+", HIGH);\n"+
  "    }\n"+
  "    else\n"+
  "    {\n"+
  "      digitalWrite("+NextPIN+", LOW);\n"+
  "    }\n"+
  "  dx <<= 1;\n"+
  "  ClkProduce_"+dropdown_pin+"();\n"+
  "  }\n"+
  "}\n";
  Blockly.Arduino.definitions_['define_datadealwithsend_'+dropdown_pin] = "// data processing\n"+
"void DataDealWithAndSend_"+dropdown_pin+"(uint8 r, uint8 g, uint8 b)\n"+
"{\n"+
  "  uint32 dx = 0;\n"+
  "  dx |= (uint32)0x03 << 30;             // highest two bits 1，flag bits\n"+
  "  dx |= (uint32)TakeAntiCode(b) << 28;\n"+
  "  dx |= (uint32)TakeAntiCode(g) << 26;\n"+
  "  dx |= (uint32)TakeAntiCode(r) << 24;\n"+
 "\n"+
  "  dx |= (uint32)b << 16;\n"+
  "  dx |= (uint32)g << 8;\n"+
  "  dx |= r;\n"+
 "\n"+
  "  DatSend_"+dropdown_pin+"(dx);\n"+
"}\n";
  var code = "Send32Zero_"+dropdown_pin+"(); // begin\n";
  //console.log(block.itemCount_);
  if (block.itemCount_ == 0) {
    return '';
  } else {
    for (var n = 0; n < block.itemCount_; n++) {
      var colour_rgb = block.getFieldValue('RGB'+n);
      //console.log(colour_rgb);
      code += "DataDealWithAndSend_"+dropdown_pin+"("+hexToR(colour_rgb)+", "+hexToG(colour_rgb)+", "+hexToB(colour_rgb)+"); // first node data\n";
    }
  }
  code += "Send32Zero_"+dropdown_pin+"();  // send to update data\n";
  return code;
};

Blockly.Arduino['grove_bluetooth_slave'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var NextPIN = _get_next_pin(dropdown_pin);
  var name = block.getFieldValue('NAME')
  var pincode = block.getFieldValue('PINCODE');
  var statement_receive = Blockly.Arduino.statementToCode(block, "RCV")
  var statement_send = Blockly.Arduino.statementToCode(block, "SNT")
  /* if(pincode.length != 4){
    alert("pincode length should be 4");
  } */
  Blockly.Arduino.definitions_['define_softwareserial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['var_bluetooth_'+dropdown_pin] = 'SoftwareSerial blueToothSerial_'+dropdown_pin+'('+dropdown_pin+','+NextPIN+');\n';

  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] = 'Serial.begin(9600);\n';
  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] += '  pinMode('+dropdown_pin+', INPUT);\n';
  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] += '  pinMode('+NextPIN+', OUTPUT);\n';
  Blockly.Arduino.setups_['setup_bluetooth_'+dropdown_pin] += '  setupBlueToothConnection_'+dropdown_pin+'();\n';

  Blockly.Arduino.definitions_['define_setupBlueToothConnection_'+dropdown_pin] = 'void setupBlueToothConnection_'+dropdown_pin+'()\n'+
  '{\n'+
  '  blueToothSerial_'+dropdown_pin+'.begin(38400); //Set BluetoothBee BaudRate to default baud rate 38400\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STWMOD=0\\r\\n"); //set the bluetooth work in slave mode\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STNA='+name+'\\r\\n"); //set the bluetooth name as "'+name+'"\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STPIN=0000\\r\\n");//Set SLAVE pincode"0000"\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STOAUT=1\\r\\n"); // Permit Paired device to connect me\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+STAUTO=0\\r\\n"); // Auto-connection should be forbidden here\n'+
  '  delay(2000); // This delay is required.\n'+
  '  blueToothSerial_'+dropdown_pin+'.print("\\r\\n+INQ=1\\r\\n"); //make the slave bluetooth inquirable \n'+
  '  Serial.println("The slave bluetooth is inquirable!");\n'+
  '  delay(2000); // This delay is required.\n'+
  '  blueToothSerial_'+dropdown_pin+'.flush();\n'+
  '}\n';
  var code = 'char recvChar_'+dropdown_pin+';\n'+
  'while(1) {\n'+
  '  if(blueToothSerial_'+dropdown_pin+'.available()) {//check if there is any data sent from the remote bluetooth shield\n'+
  '    recvChar_'+dropdown_pin+' = blueToothSerial_'+dropdown_pin+'.read();\n'+
  '    Serial.print(recvChar_'+dropdown_pin+');\n'+
       statement_receive+
  '  }\n'+
  '  if(Serial.available()){//check if there is any data sent from the local serial terminal, you can add the other applications here\n'+
  '    recvChar_'+dropdown_pin+' = Serial.read();\n'+
  '    blueToothSerial_'+dropdown_pin+'.print(recvChar_'+dropdown_pin+');\n'+
       statement_send+
  '  }\n'+
  '}\n';
  return code;
};

/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

Blockly.Arduino.servo = {};


/*
//servo
#include <Servo.h>

Servo servo_11;

void setup() {
  servo_11.attach(11);
}

void loop() {
servo_11.write(0);

servo_11.write(150); //0~180
}
*/
Blockly.Arduino['servo_move'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(block, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

  var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n';
  return code;
};

Blockly.Arduino['servo_read_degrees'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');

  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

  var code = 'servo_' + dropdown_pin + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2018 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview black & white contrast theme.
 */

Blockly.Themes.BlackWhite = {};


var defaultBlockStyles = {
  "colour_blocks":{
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "list_blocks": {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "logic_blocks": {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "loop_blocks": {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "math_blocks": {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "procedure_blocks": {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "text_blocks": {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "variable_blocks": {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "hat_blocks" : {
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000",
    "hat": "cap"
  },
  "arduino_blocks":{
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "grove_blocks":{
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  },
  "servo_blocks":{
    "colourPrimary": "#000000",
    "colourSecondary":"#000000",
    "colourTertiary":"#000000"
  }
};

var categoryStyles = {
  "colour_category":{
    "colour": "#000000",
  },
  "list_category": {
    "colour": "#000000",
  },
  "logic_category": {
    "colour": "#000000",
  },
  "loop_category": {
    "colour": "#000000",
  },
  "math_category": {
    "colour": "#000000",
  },
  "procedure_category": {
    "colour": "#000000",
  },
  "text_category": {
    "colour": "#000000",
  },
  "variable_category": {
    "colour": "#000000",
  },
  "variable_dynamic_category":{
    "colour": "#000000",
  },
  "arduino_category":{
    "colour":"#000000"
  },
  "grove_category":{
    "colour":"#000000"
  },
  "servo_category":{
    "colour":"#000000"
  }
};

//This style is still being fleshed out and may change.
Blockly.Themes.BlackWhite = new Blockly.Theme(defaultBlockStyles, categoryStyles);

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2018 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Classic theme.
 * Contains multi colored border to create shadow effect.
 */


Blockly.Themes.Classic = {};


var defaultBlockStyles = {
  "colour_blocks":{
    "colourPrimary": "20"
  },
  "list_blocks": {
    "colourPrimary": "260"
  },
  "logic_blocks": {
    "colourPrimary": "210"
  },
  "loop_blocks": {
    "colourPrimary": "120"
  },
  "math_blocks": {
    "colourPrimary": "230"
  },
  "procedure_blocks": {
    "colourPrimary": "290"
  },
  "text_blocks": {
    "colourPrimary": "160"
  },
  "variable_blocks": {
    "colourPrimary": "330"
  },
  "variable_dynamic_blocks":{
    "colourPrimary": "310"
  },
  "hat_blocks":{
    "colourPrimary":"330",
    "hat":"cap"
  },
  "arduino_blocks":{
    "colourPrimary":"#007481"
  },
  "grove_blocks":{
    "colourPrimary":"#018770"
  },
  "servo_blocks":{
    "colourPrimary":"#343434"
  }
};

var categoryStyles = {
  "colour_category":{
    "colour": "20"
  },
  "list_category": {
    "colour": "260"
  },
  "logic_category": {
    "colour": "210"
  },
  "loop_category": {
    "colour": "120"
  },
  "math_category": {
    "colour": "230"
  },
  "procedure_category": {
    "colour": "290"
  },
  "text_category": {
    "colour": "160"
  },
  "variable_category": {
    "colour": "330"
  },
  "variable_dynamic_category":{
    "colour": "310"
  },
  "arduino_category":{
    "colour":"#007481"
  },
  "grove_category":{
    "colour":"#018770"
  },
  "servo_category":{
    "colour":"#343434"
  }
};

Blockly.Themes.Classic = new Blockly.Theme(defaultBlockStyles, categoryStyles);

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2018 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview High contrast theme.
 * Darker colors to contrast the white font.
 */

Blockly.Themes.HighContrast = {};


var defaultBlockStyles = {
  "colour_blocks":{
    "colourPrimary": "#a52714",
    "colourSecondary":"#FB9B8C",
    "colourTertiary":"#FBE1DD"
  },
  "list_blocks": {
    "colourPrimary": "#4a148c",
    "colourSecondary":"#AD7BE9",
    "colourTertiary":"#CDB6E9"
  },
  "logic_blocks": {
    "colourPrimary": "#01579b",
    "colourSecondary":"#64C7FF",
    "colourTertiary":"#C5EAFF"
  },
  "loop_blocks": {
    "colourPrimary": "#33691e",
    "colourSecondary":"#9AFF78",
    "colourTertiary":"#E1FFD7"
  },
  "math_blocks": {
    "colourPrimary": "#1a237e",
    "colourSecondary":"#8A9EFF",
    "colourTertiary":"#DCE2FF"
  },
  "procedure_blocks": {
    "colourPrimary": "#006064",
    "colourSecondary":"#77E6EE",
    "colourTertiary":"#CFECEE"
  },
  "text_blocks": {
    "colourPrimary": "#004d40",
    "colourSecondary":"#5ae27c",
    "colourTertiary":"#D2FFDD"
  },
  "variable_blocks": {
    "colourPrimary": "#880e4f",
    "colourSecondary":"#FF73BE",
    "colourTertiary":"#FFD4EB"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "#880e4f",
    "colourSecondary":"#FF73BE",
    "colourTertiary":"#FFD4EB"
  },
  "hat_blocks" : {
    "colourPrimary": "#880e4f",
    "colourSecondary":"#FF73BE",
    "colourTertiary":"#FFD4EB",
    "hat": "cap"
  },
  "arduino_blocks":{
    "colourPrimary": "#007481",
    "colourSecondary":"#007481",
    "colourTertiary":"#007481"
  },
  "grove_blocks":{
    "colourPrimary": "#018770",
    "colourSecondary":"#018770",
    "colourTertiary":"#018770"
  },
  "servo_blocks":{
    "colourPrimary": "#343434",
    "colourSecondary":"#343434",
    "colourTertiary":"#343434"
  }
};

var categoryStyles = {
  "colour_category":{
    "colour": "#a52714",
  },
  "list_category": {
    "colour": "#4a148c",
  },
  "logic_category": {
    "colour": "#01579b",
  },
  "loop_category": {
    "colour": "#33691e",
  },
  "math_category": {
    "colour": "#1a237e",
  },
  "procedure_category": {
    "colour": "#006064",
  },
  "text_category": {
    "colour": "#004d40",
  },
  "variable_category": {
    "colour": "#880e4f",
  },
  "variable_dynamic_category":{
    "colour": "#880e4f",
  },
  "arduino_category":{
    "colour":"#007481"
  },
  "grove_category":{
    "colour":"#018770"
  },
  "servo_category":{
    "colour":"#343434"
  }
};

//This style is still being fleshed out and may change.
Blockly.Themes.HighContrast = new Blockly.Theme(defaultBlockStyles, categoryStyles);

/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2018 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Modern theme.
 * Same colors as classic, but single colored border.
 */

Blockly.Themes.Modern = {};


var defaultBlockStyles = {
  "colour_blocks": {
    "colourPrimary": "#a5745b",
    "colourSecondary": "#dbc7bd",
    "colourTertiary": "#845d49"
  },
  "list_blocks": {
    "colourPrimary": "#745ba5",
    "colourSecondary": "#c7bddb",
    "colourTertiary": "#5d4984"
  },
  "logic_blocks": {
    "colourPrimary": "#5b80a5",
    "colourSecondary": "#bdccdb",
    "colourTertiary": "#496684"
  },
  "loop_blocks": {
    "colourPrimary": "#5ba55b",
    "colourSecondary": "#bddbbd",
    "colourTertiary": "#498449"
  },
  "math_blocks": {
    "colourPrimary": "#5b67a5",
    "colourSecondary": "#bdc2db",
    "colourTertiary": "#495284"
  },
  "procedure_blocks": {
    "colourPrimary": "#995ba5",
    "colourSecondary": "#d6bddb",
    "colourTertiary": "#7a4984"
  },
  "text_blocks": {
    "colourPrimary": "#5ba58c",
    "colourSecondary": "#bddbd1",
    "colourTertiary": "#498470"
  },
  "variable_blocks": {
    "colourPrimary": "#a55b99",
    "colourSecondary": "#dbbdd6",
    "colourTertiary": "#84497a"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "#a55b99",
    "colourSecondary": "#dbbdd6",
    "colourTertiary": "#84497a"
  },
  "hat_blocks": {
    "colourPrimary": "#a55b99",
    "colourSecondary": "#dbbdd6",
    "colourTertiary": "#84497a",
    "hat": "cap"
  },
  "arduino_blocks":{
    "colourPrimary": "#007481",
    "colourSecondary":"#007481",
    "colourTertiary":"#007481"
  },
  "grove_blocks":{
    "colourPrimary": "#018770",
    "colourSecondary":"#018770",
    "colourTertiary":"#018770"
  },
  "servo_blocks":{
    "colourPrimary": "#343434",
    "colourSecondary":"#343434",
    "colourTertiary":"#343434"
  }
};

var categoryStyles = {
  "colour_category":{
    "colour": "#a5745b",
  },
  "list_category": {
    "colour": "#745ba5",
  },
  "logic_category": {
    "colour": "#5b80a5",
  },
  "loop_category": {
    "colour": "#5ba55b",
  },
  "math_category": {
    "colour": "#5b67a5",
  },
  "procedure_category": {
    "colour": "#995ba5",
  },
  "text_category": {
    "colour": "#5ba58c",
  },
  "variable_category": {
    "colour": "#a55b99",
  },
  "variable_dynamic_category":{
    "colour": "#a55b99",
  },
  "arduino_category":{
    "colour":"#007481"
  },
  "grove_category":{
    "colour":"#018770"
  },
  "servo_category":{
    "colour":"#343434"
  }
};

//This style is still being fleshed out and may change.
Blockly.Themes.Modern = new Blockly.Theme(defaultBlockStyles, categoryStyles);

var MSG = {
  blocks: "Blocks",
  trashTooltip: "Discard all blocks.",
  catLogic: "Logic",
  catLoops: "Loops",
  catMath: "Math",
  catText: "Text",
  catLists: "Lists",
  catColour: "Colour",
  catVariables: "Variables",
  catFunctions: "Functions",
  listVariable: "list",
  textVariable: "text",
  xmlError: "Could not load your saved file. Perhaps it was created with a different version of Blockly?",
  badXml: "Error parsing XML:\n%1\n\nSelect 'OK' to abandon your changes or 'Cancel' to further edit the XML.",
  uploadButton_span: "Upload",
  resetButton_span: "Reset",
  trashButton_span: "Delete",
  saveCodeButton_span: "Save Arduino Code",
  saveXMLButton_span: "Save XML",
  loadXMLfakeButton_span: "Load XML"
};


Blockly.Msg.en = {};


Blockly.Msg.TITLE2 = " > web-based visual programming editor for arduino";

// toolbox categories name
Blockly.Msg.CAT_ARDUINO_BASE = "Input / Output";
Blockly.Msg.CAT_SERVO = "Servo";
Blockly.Msg.CAT_GROVE = "Grove";
Blockly.Msg.CAT_GROVE_ANALOG = "Grove Analog";
Blockly.Msg.CAT_GROVE_LCD = "Grove LCD";
Blockly.Msg.CAT_GROVE_MOTOR = "Grove Motor";

//text in blocks
Blockly.Msg.FIELDDROPDOWN = [["HIGH", "HIGH"], ["LOW", "LOW"]];

//Arduino base cateory blocks
Blockly.Msg.ARDUINO_INOUT_BUILDIN_LED_HELPURL = "http://arduino.cc/en/Reference/DigitalWrite";
Blockly.Msg.ARDUINO_INOUT_BUILDIN_LED_INPUT = "put the LEDs on the card to logic";
Blockly.Msg.ARDUINO_INOUT_BUILDIN_LED_TOOLTIP = "off or turn on the LED on the Arduino board";
Blockly.Msg.ARDUINO_INOUT_DIGITAL_WRITE_INPUT1 = "put the pin Digital";
Blockly.Msg.ARDUINO_INOUT_DIGITAL_WRITE_INPUT2 = "to logic state";
Blockly.Msg.ARDUINO_INOUT_DIGITAL_WRITE_TOOLTIP = "write a 0 or 1 state numeric on a specific output";
Blockly.Msg.ARDUINO_INOUT_DIGITAL_WRITE_HELPURL = "http://arduino.cc/en/Reference/DigitalWrite";
Blockly.Msg.ARDUINO_INOUT_DIGITAL_READ_INPUT = "the logic state of PIN#";
Blockly.Msg.ARDUINO_INOUT_DIGITAL_READ_TOOLTIP = "reading the digital state 0 or 1 of the digital pin";
Blockly.Msg.ARDUINO_INOUT_DIGITAL_READ_HELPURL = "http://arduino.cc/en/Reference/DigitalRead";
Blockly.Msg.ARDUINO_INOUT_ONOFF_HELPURL = "http://arduino.cc/en/Reference/Constants";
Blockly.Msg.ARDUINO_INOUT_ANALOG_WRITE_INPUT1 = "write about Analog pin";
Blockly.Msg.ARDUINO_INOUT_ANALOG_WRITE_INPUT2 = "value";
Blockly.Msg.ARDUINO_INOUT_ANALOG_WRITE_TOOLTIP = "send a value between 0 and 255 on a specific output";
Blockly.Msg.ARDUINO_INOUT_ANALOG_WRITE_HELPURL = "http://arduino.cc/en/Reference/AnalogWrite";
Blockly.Msg.ARDUINO_INOUT_ANALOG_READ_INPUT = "read value on the analog input";
Blockly.Msg.ARDUINO_INOUT_ANALOG_READ_TOOLTIP = "returns a value between 0 and 1023";
Blockly.Msg.ARDUINO_INOUT_ANALOG_READ_HELPURL = "http://arduino.cc/en/Reference/AnalogRead";
Blockly.Msg.ARDUINO_BASE_DELAY_DELAY_TIME = "delay (in ms)";
Blockly.Msg.ARDUINO_BASE_DELAY_TOOLTIP = "specify the pause time in milliseconds";
Blockly.Msg.ARDUINO_BASE_DELAY_HELPURL = "http://arduino.cc/en/Reference/delay";
Blockly.Msg.ARDUINO_BASE_ANGLE = "angle: ";
Blockly.Msg.ARDUINO_BASE_ANGLE_TOOLTIP = "angle between 0~180°";
Blockly.Msg.ARDUINO_BASE_ANGLE_HELPURL = "";
Blockly.Msg.ARDUINO_TONE_INPUT1 = "emits sound on the pin";
Blockly.Msg.ARDUINO_TONE_INPUT2 = "on frequency (Hz)";
Blockly.Msg.ARDUINO_TONE_TOOLTIP = "emits sound on the selected pin";
Blockly.Msg.ARDUINO_TONE_HELPURL = "http://arduino.cc/en/Reference/AnalogWrite";
Blockly.Msg.ARDUINO_NOTONE_INPUT = "stop sound on the pin";
Blockly.Msg.ARDUINO_NOTONE_TOOLTIP = "mutes the sound on the selected pin";
Blockly.Msg.ARDUINO_NOTONE_HELPURL = "http://arduino.cc/en/Reference/AnalogWrite";
Blockly.Msg.ARDUINO_SERIAL_PRINT_CONTENT = "send the data to the serial port:";
Blockly.Msg.ARDUINO_SERIAL_PRINT_TOOLTIP = "sends data over the serial port for sruvaillance by the monitor in ASCII";
Blockly.Msg.ARDUINO_SERIAL_PRINT_HELPURL = "http://www.arduino.cc/en/Serial/Print";

export default Blockly;