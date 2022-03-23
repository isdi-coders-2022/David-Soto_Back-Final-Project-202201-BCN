const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDB = require("../../db/index");
const Hero = require("../../db/models/HeroModel");
const app = require("../index");
require("dotenv").config();

let server;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const connectionString = server.getUri();

  await connectDB(connectionString);
});

beforeEach(async () => {
  await Hero.create({
    id: 12,
    name: "TestingHero",
    slug: "string",
    powerstats: {
      intelligence: 1,
      strength: 1,
      speed: 1,
      durability: 1,
      power: 1,
      combat: 1,
    },
    appearance: {
      gender: "no binary",
      race: "Superior Testig Race",
      height: ["1m", "1m"],
      weight: ["1m", "1m"],
      eyeColor: "Black",
      hairColor: "Rainbow",
    },
    biography: {
      fullName: "Sir Test Von Ing Hero",
      alterEgos: "test",
      aliases: ["test", "otherTest"],
      placeOfBirth: "jestTesting",
      firstAppearance: "In HeroCard Test",
      publisher: "DavidSoto",
      alignment: "Hopefully good enought",
    },
    work: {
      occupation: "Testing Guy",
      base: "Jest House",
    },
    connections: {
      groupAffiliation: "Jest Group",
      relatives: "TestingRobinJunior",
    },
    images: {
      xs: "IMG",
      sm: "IMG",
      md: "IMG",
      lg: "IMG",
    },
  });
  await Hero.create({
    id: 12,
    name: "TestingRobinJunior",
    slug: "string",
    powerstats: {
      intelligence: 1,
      strength: 1,
      speed: 1,
      durability: 1,
      power: 1,
      combat: 1,
    },
    appearance: {
      gender: "no binary",
      race: "Superior Testig Race",
      height: ["1m", "1m"],
      weight: ["1m", "1m"],
      eyeColor: "Black",
      hairColor: "Rainbow",
    },
    biography: {
      fullName: "Sir Test Von Ing Hero Junior",
      alterEgos: "test",
      aliases: ["test", "miniTest"],
      placeOfBirth: "jestTesting",
      firstAppearance: "In HeroCard Test",
      publisher: "DavidSoto",
      alignment: "Hopefully good enought",
    },
    work: {
      occupation: "Testing Boy",
      base: "Jest House",
    },
    connections: {
      groupAffiliation: "Jest Group",
      relatives: "TestingHero",
    },
    images: {
      xs: "IMG",
      sm: "IMG",
      md: "IMG",
      lg: "IMG",
    },
  });
});

afterEach(async () => {
  await Hero.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a /hero/listAll/ endpoint", () => {
  describe("When it receives a get method without token", () => {
    test("Then it should return a 200 status code", async () => {
      await request(app).get("/hero/listAll").expect(401);
    });
  });
});
