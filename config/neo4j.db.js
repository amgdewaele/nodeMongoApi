const neo4j = require('neo4j-driver').v1;
//const db = new neo4j.GraphDatabase('http://admin:b.bqCWxt262Cu5.U6FOBqrivj0FdT7O@https://hobby-jekegclecffdgbkelaedmial.dbs.graphenedb.com:24786');
const driver = neo4j.driver('bolt://hobby-inhojckeehocgbkehmnojjal.dbs.graphenedb.com:24786', 
neo4j.auth.basic('admin', 'b.mIOCdKusg12a.JU4BSSMgoWfHV9Fi'));


//const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neo4j'));

const session = driver.session();

module.exports = session;