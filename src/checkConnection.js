const oracledb = require('oracledb');
// hr schema password
var password = 'Pasword2024' 
// checkConnection asycn function
async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "system",
        password: "Pasword2024",
        connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 172.17.128.120 )(PORT = 1521))(CONNECT_DATA =(SID= OscarQuintan)))"
    });
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();