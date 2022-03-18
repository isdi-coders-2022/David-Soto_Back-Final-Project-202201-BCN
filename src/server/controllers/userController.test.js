const User = require("../../db/models/UserModel");
const { loginController } = require("./userController");

describe("Given a userController controller", () => {
  describe("When it receives a post method with /login endpoint and a existing user", () => {
    test("Then it should find if the user exists", async () => {
      const req = {
        body: {
          username: "TestGuy",
          password: "testPassword",
        },
      };

      const res = {
        json: jest.fn().mockReturnThis(req.body),
        status: jest.fn(),
      };

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(req.body);

      await loginController(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
    });
  });
});
