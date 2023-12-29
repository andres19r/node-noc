import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("log.repository.impl.ts", () => {
  const logDatasource: LogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const logRepositoryImpl = new LogRepositoryImpl(logDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource", async () => {
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.low,
      origin: "test",
    });
    await logRepositoryImpl.saveLog(log);
    expect(logDatasource.saveLog).toHaveBeenCalled();
    expect(logDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource", async () => {
    await logRepositoryImpl.getLogs(LogSeverityLevel.low);
    expect(logDatasource.getLogs).toHaveBeenCalled();
    expect(logDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
  });
});
