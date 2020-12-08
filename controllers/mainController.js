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

    var query = `select id, username from login where id != ${userId} and username like "%${req.query.recherche}%"`;

    var data = await makeDbQuery(query);
    res.json({
        success: true,
        data
    })
}

exports.isAutorise = async (req, res) => {
    var user = await makeDbQuery(`select * from login where username='${req.username}'`)
    if (!user[0]) {
        return res.status(401)
        .json({
            error: 'incorrect login'
        });
    } 
    var userId = user[0].id;

    var {autoId} = req.query;

    var query = `select * from autorisation where autorisant=${userId} and autorise=${autoId}`;
    var res1 = await makeDbQuery(query);

    var query2 = `select * from autorisation where autorisant=${autoId} and autorise=${userId}`;
    var res2 = await makeDbQuery(query2);

    var visitable = true;
    var autorise = false;


    if(!res1[0]) {
        autorise = true;
    }

    if(!res2[0]) {
        visitable = false;
    }

    return res.json({
        success: true,
        data: {
            autorise, visitable
        }
    });
}

exports.addAutorisation = async (req, res) => {
    var user = await makeDbQuery(`select * from login where username='${req.username}'`)
    if (!user[0]) {
        return res.status(401)
        .json({
            error: 'incorrect login'
        });
    } 
    var userId = user[0].id;

    var {autoriseId} = req.body;
    var query = `insert into autorisation values (${userId}, ${autoriseId})`;

    await makeDbQuery(query);
    
    res.json({
        success: true,
        data: true
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