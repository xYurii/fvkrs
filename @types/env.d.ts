declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_TOKEN: string;
    DB_USER: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PASSWORD: string;
    DB_PORT: number;
  }
}
