const Hero = require("../../db/models/HeroModel");
const getAllHeroes = require("./heroController");

describe("Given a heroController controller", () => {
  describe("When it receives a response", () => {
    test("Then it should send a list of heroes", async () => {
      const hero = {
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
          aliases: ["test"],
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
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Hero.find = jest.fn().mockResolvedValue(hero);

      await getAllHeroes(null, res);

      expect(Hero.find).toHaveBeenCalled();
    });
  });
  describe("When it receibes an error", () => {
    test("Then it should call method next", async () => {
      const res = null;
      const req = null;
      const next = jest.fn();

      await getAllHeroes(res, req, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
