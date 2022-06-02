const User = require('../model/User');

const handleLogout = async (req,res) => {
    const cookies = req.cookies
    console.log(cookies)
    if(!cookies?.jwt)  return res.sendStatus(204);
    
    const refreshToken = cookies.jwt;

    // is refreshToken in DB?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) { 
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204)
    }
    
    //delete refreshToken in db
    foundUser.refreshToken = '';
    await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - only serves on https
    res.sendStatus(204);
};

module.exports = { handleLogout }