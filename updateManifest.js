let request = require('request');
let fs = require('fs');
const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
let SZIP = require('node-stream-zip'); //use this

//the urls are hard coded for simplicity's sake
let man = 'https://www.bungie.net/';
let en = '/common/destiny2_content/sqlite/en/world_sql_content_281de46e3cd73e5747595936fd2dffa9.content'

//this is the entry name for the english manifest
//contained in the zip file that we need to extract
let en_path = 'world_sql_content_281de46e3cd73e5747595936fd2dffa9.content';


let options = {
	url: man + en,
	port: 443,
	method: 'GET',
	encoding: null,
	headers: {
		'Content-Type': 'application/json',
		'X-API-Key': '43e0503b64df4ebc98f1c986e73d92ac'
	}
};

//makes a request to the destiny manifest endpoint and 
//extracts it to the current directory as 'manifest.content'
//@manifest.zip: this is the compressed manifest downloaded from the destiny man endpoint
//@manifest.content: uncompressed manifest sqlite file which can be queried
function getManifest(manifestVersion){

	let outStream = fs.createWriteStream('manifest.zip');

	return request(options).on('response', (res, body) => {
		console.log(res.statusCode);
	}).pipe(outStream).on('finish', () => {
		let zip = new SZIP({
			file: './manifest.zip',
			storeEntries: true
		});

		zip.on('ready', function(){
			zip.extract(en_path, './manifest.content', function(err,count){
        if (err) console.log(err);
        
        const exporter = new SqliteToJson({
          client: new sqlite3.Database('./manifest.content')
        });
        
        exporter.tables(function (err, tables) {
          tables.forEach((table) => {
            exporter.save(table, `./public/manifest/${manifestVersion}/${table}.json`,(err) => console.error)
          });
        });
			});
		});
	});
}

getManifest('1.2.3')

