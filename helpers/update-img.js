const fs = require('fs');
const Hospital = require("../models/hospital");
const Medics = require("../models/medic");
const Users = require("../models/users");

const uploadImg = async (collection, id, fileName) => {

    switch (collection) {
        case 'users':

            const user = await Users.findById(id);

            if (!user) return false;

            const oldPathUser = `./uploads/users/${user.img}`;

            if (fs.existsSync(oldPathUser)) fs.unlinkSync(oldPathUser);

            user.img = fileName;
            await user.save();

            return true;

        case 'hospitals':

            const hoapital = await Hospital.findById(id);

            if (!hoapital) return false;

            const oldPathHospital = `./uploads/hospitals/${hoapital.img}`;

            if (fs.existsSync(oldPathHospital)) fs.unlinkSync(oldPathHospital);

            hoapital.img = fileName;
            await hoapital.save();

            return true;

        case 'medics':

            const medic = await Medics.findById(id);

            if (!medic) return false;

            const oldPathMedic = `./uploads/medics/${medic.img}`;

            if (fs.existsSync(oldPathMedic)) fs.unlinkSync(oldPathMedic);

            medic.img = fileName;
            await medic.save();

            return true;

        default:
            break;
    }
}

module.exports = {
    uploadImg
};