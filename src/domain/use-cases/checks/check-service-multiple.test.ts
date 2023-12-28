import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("check-service.ts", () => {
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const checkService = new CheckServiceMultiple(
    [mockRepository1, mockRepository2, mockRepository3],
    successCallback,
    errorCallback,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call success callback when fetch returns true", async () => {
    const wasOk = await checkService.execute("https://google.com");
    expect(wasOk).toBeTruthy();

    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call error callback when fetch returns false", async () => {
    const wasOk = await checkService.execute("https://asdfasdfgoogle.com");
    expect(wasOk).toBeFalsy();

    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
