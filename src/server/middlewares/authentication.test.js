const { JsonWebTokenError } = require("jsonwebtoken");
const auth = require("./authentication");

require("dotenv").config();

describe("Given an auth middleware", () => {
  describe("When it gets a request, a response and a non valid token", () => {
    test("Then it should call the response res method with status 403", async () => {
      const authHeader =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMwOGU1NTU5Y2Q2MjA5ODg1MDNjMWYiLCJ1c2VybmFtZSI6ImtlZXhzIiwicGFzc3dvcmQiOiIkMmIkMTAkVW9VUDNxZ1lzVS9oTW1ETkdzaUQydThKMW5jTWxSL052aWsxSFBDZUFnRkpGcWxoV3hNQy4iLCJjcmVhdGVkSGVyb2VzIjoiNjIzNDdjMTk1OWNkNjIwOTg4NTAzYzNhIiwiZmF2b3JpdGVIZXJvZXM6IjoiNjIzNDdjNTU1OWNkNjIwOTg4NTAzYzQxIiwiaWF0IjoxNjQ3OTU5MjMyLCJleHAiOjE2NDg1NjQwMzJ9.3152r9d77FQFqiGi9SonVaFoBCbuvMmbXee2x3sy4Ww";
      const req = {
        headers: {
          authorization: authHeader,
        },
      };

      const res = { sendStatus: jest.fn() };
      const next = jest.fn();
      const status = 403;

      await auth(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(status);
    });
  });

  describe("When it gets a request with no token", () => {
    test("Then it should call the response method with status 401", async () => {
      const authHeader = null;
      const req = {
        headers: {
          authorization: authHeader,
        },
      };

      const res = { sendStatus: jest.fn() };
      const next = jest.fn();
      const status = 401;

      await auth(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(status);
    });
  });
});
