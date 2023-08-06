
const bcrypt = require('bcryptjs');




//!! Encriptamos el pasword 
const encrypt = async (passwordTxtPlain) => {
    const hash = await bcrypt.hash(passwordTxtPlain, 10);
    return hash;
};

//!! Comparamos
const compare = async (passwordPLain, hashPasword) => {
    return await bcrypt.compare(passwordPLain, hashPasword);
};


module.exports = {
    encrypt,
    compare 
}