import * as fs from 'fs';
import { join } from 'path';

const getDirFile = (): string => {
  return join(__dirname, 'game.txt');
};

const readFile = (): string => {
  return fs.readFileSync(getDirFile(), 'utf8');
};

export const arrFile = (): Array<string> => {
  return readFile().split('\r\n');
};

export const findTrailerId = (arrFile: Array<string>): string | null => {
  for (let i = 0; i < arrFile.length; i++) {
    let splitTrailerMas = arrFile[i].split(':');

    if (splitTrailerMas[0] === ' my_trailer') {
      return splitTrailerMas[1];
    }
  }
  return null;
};

export const anyToDown = (arrFile: Array<string>, cargo_mass: number): void => {
  let arrFileCopy = arrFile.slice();

  for (let i = 0; i < arrFileCopy.length; i++) {
    let splitCargoMas = arrFileCopy[i].split(':');

    if (splitCargoMas[0] === ' cargo_mass') {
      arrFileCopy[i] = ` cargo_mass: ${cargo_mass}}`;
    }
  }
};

export const setCargoMassTrailer = (
  arrFile: Array<string>,
  id: string,
  cargo_mass: number
): boolean => {
  let arrFileCopy = arrFile.slice();

  const indexTrailer = arrFileCopy.indexOf(`trailer :${id} {`);

  for (let i = indexTrailer; i < arrFileCopy.length; i++) {
    let splitTrailerMas = arrFileCopy[i].split(':');

    if (splitTrailerMas[0] === ' cargo_mass') {
      arrFileCopy[i] = ` cargo_mass: ${cargo_mass}}`;
      return true;
    }
  }
  return false;
};

export const setChassisMassTrailer = (
  arrFile: Array<string>,
  id: string,
  chassis_mass: number,
  body_mass: number
): boolean => {
  let arrFileCopy = arrFile.slice();

  const indexTrailer = arrFileCopy.indexOf(`trailer :${id} {`);
  let trailerDefID = '';

  for (let i = indexTrailer; i < arrFileCopy.length; i++) {
    let splitTrailerMas = arrFileCopy[i].split(':');

    if (splitTrailerMas[0] === ' trailer_definition') {
      trailerDefID = splitTrailerMas[1];
      break;
    }
  }

  const indexTrailerDef = arrFileCopy.indexOf(`trailer_def :${trailerDefID} {`);
  let body_mass_redy = false;
  let chassis_mass_redy = false;
  for (let i = indexTrailerDef; i < arrFileCopy.length; i++) {
    let splitTrailerMas = arrFileCopy[i].split(':');

    if (splitTrailerMas[0] === ' chassis_mass') {
      arrFileCopy[i] = ` chassis_mass: ${chassis_mass}}`;
      chassis_mass_redy = true;
    } else if (splitTrailerMas[0] === ' body_mass') {
      arrFileCopy[i] = ` body_mass: ${body_mass}}`;
      body_mass_redy = true;
    }
    if (body_mass_redy && chassis_mass_redy) return true;
  }
  return false;
};
