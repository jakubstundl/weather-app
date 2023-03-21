import { verifyCityCache } from "../src/functions/cacheValidation";
import "@testing-library/jest-dom";
import {
  hashPassword,
  login,
  getEmailFromToken,
  getUserIdFromToken,
  accessToken,
} from "../src/functions/auth";
import { getRandomCitiesData } from "../src/functions/randomCitiesData";

describe("Cache validator", () => {
  test("30min should be false", () => {
    expect(verifyCityCache(Date.now(), Date.now() + 1000 * 60 * 30)).toBe(
      false
    );
  });
});

describe("Cache validator", () => {
  test("30min -1s should be true", () => {
    expect(
      verifyCityCache(Date.now(), Date.now() + 1000 * 60 * 30 - 1000)
    ).toBe(true);
  });
});

describe("Password hash has length 128", () => {
  test("Should return true if length is 128", () => {
    expect(hashPassword("my-super-secret-password").length).toBe(128);
  });
});

describe("Login test 1", () => {
  test("Should return null if credentials are empty strings", async () => {
    expect(await login("", "")).toBe(null);
  });
});

describe("Login test 2", () => {
  test("Should return null if credentials are empty strings", async () => {
    const token = await login("test.jest@test.jest", "test.jest@test.jest");
    expect(typeof token).toBe("string");
  });
});

describe("Login test 3", () => {
  test("Should return null if credentials are random", async () => {
    const token = await login("nsiuninldf", "sfergg");
    expect(token).toBe(null);
  });
});

describe("Get email from token", () => {
  test("Passing test.jest@test.jest and 123456789 as ID to token generator and expect to get the same email from token", async () => {
    const token = await accessToken("test.jest@test.jest", "123456789");
    expect(getEmailFromToken(token)).toBe("test.jest@test.jest");
  });
});

describe("Get userID from token", () => {
  test("Passing test.jest@test.jest and 123456789 as ID to token generator and expect to get the same userID from token", async () => {
    const token = await accessToken("test.jest@test.jest", "123456789");
    expect(getUserIdFromToken(token)).toBe("123456789");
  });
});

describe("Get random cities data", () => {
  test("Ask for data of 10 cities and expect to get array of length of 10", async () => {
    expect((await getRandomCitiesData(10)).length).toBe(10);
  });
});
