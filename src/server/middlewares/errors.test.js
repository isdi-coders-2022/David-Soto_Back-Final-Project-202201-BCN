const { notFoundError, generalError } = require("./errors");

describe("Given notFoundError", () => {
  describe("When it's called", () => {
    test("Then it should call res.status with 404 and res.json with 'Endpoint not found'", () => {
      const expectedMessage = {
        error: true,
        message: "Endpoint not found",
      };
      const expectedCode = 404;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});

describe("Given generalError", () => {
  describe("When it's called passing an unkown error", () => {
    test("Then it should call res.status with a 500 and res.json with the message 'General error has ocurred'", () => {
      const error = new Error("Task failed succesfuly");
      const expectedMessage = {
        error: true,
        message: "General error has ocurred",
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedCode = 500;

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's called passing an error with status 400 and a message 'Something'", () => {
    test("Then it should call res.status with a 400 and res.json with the message 'Something'", () => {
      const mockError = {
        code: 400,
        message: "Something",
      };

      const expectedError = {
        message: "Something",
        error: true,
      };

      const expectedCode = 400;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      generalError(mockError, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
