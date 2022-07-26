declare module 'http' {
  interface IncomingHttpHeaders extends NodeJS.Dict<string | string[]> {
    phonenumber: string;
    email: string;
    userid: string;
    usertoken: string;
  }
}
