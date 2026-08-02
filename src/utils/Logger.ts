export class Logger {

    private static getTime(): string {

        return new Date().toLocaleTimeString();

    }

    static info(message: string): void {

        console.log(`[${this.getTime()}] INFO  : ${message}`);

    }

    static warn(message: string): void {

        console.warn(`[${this.getTime()}] WARN  : ${message}`);

    }

    static error(message: string): void {

        console.error(`[${this.getTime()}] ERROR : ${message}`);

    }

}