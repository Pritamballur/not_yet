/**
 * Seeds the database with an admin user, sample stations, and a week of
 * synthetic readings so the frontend has real data to render immediately.
 *
 * Run with: npm run seed   (from the backend/ directory)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Station = require('../models/Station');
const Reading = require('../models/Reading');
const Alert = require('../models/Alert');
const { computeAQI } = require('./aqiCalculator');

const STATIONS = [
  { name: 'MG Road Junction', stationCode: 'BLR-01', zone: 'MG Road', city: 'Bengaluru', location: { lat: 12.9752, lng: 77.6065 } },
  { name: 'Whitefield Tech Park', stationCode: 'BLR-02', zone: 'Whitefield', city: 'Bengaluru', location: { lat: 12.9698, lng: 77.7500 } },
  { name: 'Koramangala 5th Block', stationCode: 'BLR-03', zone: 'Koramangala', city: 'Bengaluru', location: { lat: 12.9352, lng: 77.6245 } },
  { name: 'Peenya Industrial Area', stationCode: 'BLR-04', zone: 'Peenya', city: 'Bengaluru', location: { lat: 13.0284, lng: 77.5202 } },
  { name: 'Hebbal Flyover', stationCode: 'BLR-05', zone: 'Hebbal', city: 'Bengaluru', location: { lat: 13.0358, lng: 77.5970 } },
  { name: 'Jayanagar 4th Block', stationCode: 'BLR-06', zone: 'Jayanagar', city: 'Bengaluru', location: { lat: 12.9250, lng: 77.5938 } },
];

function randomBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

async function seed() {
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([User.deleteMany({}), Station.deleteMany({}), Reading.deleteMany({}), Alert.deleteMany({})]);

  console.log('Creating admin & demo citizen users...');
  const admin = await User.create({
    name: 'System Administrator',
    email: 'admin@smartcity.io',
    password: 'Admin@123',
    role: 'admin',
  });

  await User.create({
    name: 'Demo Citizen',
    email: 'citizen@smartcity.io',
    password: 'Citizen@123',
    role: 'citizen',
    preferredZone: 'Koramangala',
  });

  console.log('Creating stations...');
  const createdStations = [];
  for (const s of STATIONS) {
    const station = await Station.create({ ...s, createdBy: admin._id, status: 'active' });
    createdStations.push(station);
  }

  console.log('Generating 7 days of historical readings per station...');
  const now = Date.now();
  const HOURS = 24 * 7;

  for (const station of createdStations) {
    // Give industrial/traffic zones a higher pollution baseline for realism
    const baseline = /Peenya|MG Road|Hebbal/.test(station.zone) ? 60 : 25;

    let lastReading = null;
    for (let h = HOURS; h >= 0; h -= 3) {
      const recordedAt = new Date(now - h * 60 * 60 * 1000);
      const drift = Math.sin(h / 12) * 15; // day/night cycle
      const pm25 = Math.max(5, randomBetween(baseline - 10, baseline + 20) + drift);
      const pm10 = pm25 * randomBetween(1.3, 1.8);
      const no2 = randomBetween(10, 60);
      const so2 = randomBetween(5, 30);
      const o3 = randomBetween(10, 50);
      const { aqi, category, dominantPollutant } = computeAQI({ pm25, pm10, no2, so2, o3 });

      lastReading = await Reading.create({
        station: station._id,
        pm25: Math.round(pm25 * 10) / 10,
        pm10: Math.round(pm10 * 10) / 10,
        co2: Math.round(randomBetween(380, 520)),
        no2: Math.round(no2 * 10) / 10,
        so2: Math.round(so2 * 10) / 10,
        o3: Math.round(o3 * 10) / 10,
        temperature: Math.round(randomBetween(22, 34) * 10) / 10,
        humidity: Math.round(randomBetween(40, 85)),
        aqi,
        category,
        dominantPollutant,
        source: 'sensor',
        recordedBy: admin._id,
        recordedAt,
      });

      if (aqi >= 150) {
        await Alert.create({
          station: station._id,
          reading: lastReading._id,
          severity: category,
          aqi,
          message: `${station.name} (${station.stationCode}) recorded AQI ${aqi} — ${category}. Dominant pollutant: ${dominantPollutant ? dominantPollutant.toUpperCase() : 'N/A'}.`,
        });
      }
    }

    station.latestReading = {
      aqi: lastReading.aqi,
      category: lastReading.category,
      dominantPollutant: lastReading.dominantPollutant,
      pm25: lastReading.pm25,
      pm10: lastReading.pm10,
      co2: lastReading.co2,
      no2: lastReading.no2,
      so2: lastReading.so2,
      o3: lastReading.o3,
      temperature: lastReading.temperature,
      humidity: lastReading.humidity,
      recordedAt: lastReading.recordedAt,
    };
    await station.save();
  }

  console.log('\nSeed complete!');
  console.log('Admin login  -> email: admin@smartcity.io    password: Admin@123');
  console.log('Citizen login-> email: citizen@smartcity.io  password: Citizen@123\n');

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
