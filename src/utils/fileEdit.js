import { exec } from 'child_process'
import * as fs from 'fs';
import { join } from 'path';

const SII_PATH = join('SII_Decrypt.exe');

export const arrFile = (dir, fileName) => {
    const file = fs.readFileSync(join(dir, fileName), 'utf8')
    return file.split('\r\n');
};

export const descriptFiles = (dirFileStr, fileName) => {
    try {
        const cwd = join(process.cwd(), './src', 'utils')
        fs.copyFileSync(join(dirFileStr, fileName), join(dirFileStr, fileName + '.bak'));

        const cmdStr = `${SII_PATH} ${dirFileStr}/${fileName} ${dirFileStr}/${fileName}`;

        const work = exec(cmdStr, { cwd: cwd });
        work.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        }
        );
        return true;
    }
    catch (err) {
        return false;
    }
}

export const readProfileNames = (dirDocs) => {
    try {
        const dirProfiles = join(dirDocs, 'Euro Truck Simulator 2', 'profiles');
        const profiles = fs.readdirSync(dirProfiles);

        const profileNames = profiles.map((profile) => {
            return { name: Buffer.from(profile, 'hex').toString('utf-8'), hex: profile };
        });

        return profileNames;
    }
    catch (err) {
        return null;
    }
}

export const findTrailerId = (arrFile) => {
    for (let i = 0; i < arrFile.length; i++) {
        let splitTrailerMas = arrFile[i].split(':');

        if (splitTrailerMas[0] === ' my_trailer') {
            return splitTrailerMas[1];
        }
    }
    return null;
};

export const anyToDown = (arrFile, cargo_mass) => {
    let arrFileCopy = arrFile.slice();

    for (let i = 0; i < arrFileCopy.length; i++) {
        let splitCargoMas = arrFileCopy[i].split(':');

        if (splitCargoMas[0] === ' cargo_mass') {
            arrFileCopy[i] = ` cargo_mass: ${cargo_mass}}`;
        }
    }
};

export const setCargoMassTrailer = (
    arrFile,
    id,
    cargo_mass
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
    arrFile,
    id,
    chassis_mass,
    body_mass
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
