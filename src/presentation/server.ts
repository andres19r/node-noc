import { CronJob } from "cron";

export class Server {
  public static start() {
    console.log("Server started...");

    const job = new CronJob(
      "*/2 * * * * *",
      () => {
        const date = new Date()
        console.log("2 seconds", date);
      },
    );

    job.start()
  }
}
