const makeDbQuery = require("../makeDbQuery.js");

exports.storeHistoric = async (req, res) => {
    var user = await makeDbQuery(`select * from login where username='${req.username}'`)
    const { aliment, idAliment, urlAliment } = req.body;
    if (!user[0]) {
        return res.status(401)
        .json({
            error: 'incorrect login'
        });
    } 
    var userId = user[0].id;

    try {
        await makeDbQuery(`insert into historique (userId, aliment, idAliment, urlAliment) values (${userId}, "${aliment}", '${idAliment}', "${urlAliment}")`);
        res.json({
            success: true
        })
    } catch(e) {
        console.log(e);
        res.json({
            success: false
        })
    }
}

exports.getUserHistoric = async (req, res ) => {
    var user = await makeDbQuery(`select * from login where username='${req.username}'`)
    if (!user[0]) {
        return res.status(401)
        .json({
            error: 'incorrect login'
        });
    } 
    var userId = user[0].id;

    var data = await makeDbQuery(`select * from historique where userId=${userId}`);
    res.json({
        success: true,
        data
    })
}

exports.getProfiles = async (req, res) => {
    var user = await makeDbQuery(`select * from login where username='${req.username}'`)
    if (!user[0]) {
        return res.status(401)
        .json({
            error: 'incorrect login'
        });
    } 
    var userId = user[0].id;

    var data = await makeDbQuery(`select id, username from login where id != ${userId} and username like "%${req.query.recherche}%"`);
    res.json({
        success: true,
        data
    })
}

exports.getSpecificUserHistoric = async (req, res ) => {
    var {userId} = req.query;

    var data = await makeDbQuery(`select * from historique where userId=${userId}`);
    res.json({
        success: true,
        data
    })
}