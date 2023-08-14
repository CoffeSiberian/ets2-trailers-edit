import { exec } from 'child_process';
import * as fs from 'fs';
import { join } from 'path';
import { Profile } from 'renderer/types/SaveGameTypes';

const SII_PATH = join('SII_Decrypt.exe');

const getProfileImage = async (path: string): Promise<Buffer | null> => {
  try {
    const pathImg = join(path, 'avatar.png');

    const imgBuffer = await fs.promises.readFile(pathImg);
    return imgBuffer;
  } catch (err) {
    return null;
  }
};

export const arrFile = (dir: string, fileName: string) => {
  const file = fs.readFileSync(join(dir, fileName), 'utf8');
  return file.split('\r\n');
};

export const descriptFiles = (dirFileStr: string, fileName: string) => {
  try {
    const cwd = join(process.cwd(), './src', 'utils');
    fs.copyFileSync(
      join(dirFileStr, fileName),
      join(dirFileStr, fileName + '.bak')
    );

    const cmdStr = `${SII_PATH} ${dirFileStr}/${fileName} ${dirFileStr}/${fileName}`;

    const work = exec(cmdStr, { cwd: cwd });
    work.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const readProfileNames = async (
  dirDocs: string
): Promise<Array<Profile>> => {
  try {
    const dirProfiles = join(dirDocs, 'Euro Truck Simulator 2', 'profiles');
    const profiles = fs.readdirSync(dirProfiles);

    const profileNames = profiles.map(async (profile) => {
      try {
        const profilesSaves = fs.readdirSync(
          join(dirProfiles, profile, 'save')
        );
        const profileImgBuffer = await getProfileImage(
          join(dirProfiles, profile)
        );
        const profileImgBase64 = profileImgBuffer?.toString('base64');
        return {
          name: Buffer.from(profile, 'hex').toString('utf-8'),
          hex: profile,
          saves: profilesSaves,
          avatar: profileImgBase64,
        };
      } catch (err) {
        return null;
      }
    });

    const filterNull = (await Promise.all(profileNames)).filter(
      (profile) => profile !== null
    ) as Array<Profile>;

    return filterNull;
  } catch (err) {
    return [];
  }
};

export const findTrailerId = (arrFile: Array<string>) => {
  for (let i = 0; i < arrFile.length; i++) {
    let splitTrailerMas = arrFile[i].split(':');

    if (splitTrailerMas[0] === ' my_trailer') {
      return splitTrailerMas[1];
    }
  }
  return null;
};

export const anyToDown = (arrFile: Array<string>, cargo_mass: string) => {
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
  cargo_mass: string
) => {
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
  chassis_mass: string,
  body_mass: string
) => {
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
