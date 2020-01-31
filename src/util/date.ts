/** A date from the Geometry Dash servers */
type GDDate = {
  /** The human-readable time in the "how long ago" format. */
  pretty: string;
  /** The time as a date. Note that this may not be completely accurate. Will only be present if the `ms` module is installed */
  date?: Date;
};

/**
 * Creates a date from the human-readable response returned by the Geometry Dash servers
 * @param pretty The pretty string to parse
 * @returns A date ready for use by a client
 */
let generateDate = (pretty: string): GDDate => {
  const data: GDDate = { pretty };
  const possibleDate = new Date(pretty); // Only on private servers will this work
  if (possibleDate.getTime()) data.date = possibleDate;
  return data;
};

try {
  const ms: typeof import('ms') = require('ms');
  generateDate = (pretty: string): GDDate => {
    const data: GDDate = { pretty };
    const possibleDate = new Date(pretty); // Only on private servers will this work
    if (possibleDate.getTime()) data.date = possibleDate;
    else data.date = new Date(Date.now() - ms(pretty));
    return data;
  };
} catch (e) {}

export { GDDate, generateDate };