import express from 'express';
import mysql2 from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql2.createConnection({
  user: process.env.MYSQLUSER || 'admin',
  host: process.env.MYSQLHOST || 'localhost',
  password: process.env.MYSQLPASSWORD || 'vHCMkV0@wb5c',
  database: process.env.MYSQLDATABASE || 'datubaze',
  port: process.env.MYSQLPORT || '3306',
});

app.listen(process.env.PORT || 5001, () => {
  console.log('Connected to backend.');
});

/*Klienta info*/

app.get('/klientaPirkumuInfo/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'SELECT a.kopsumma, a.id, a.pasutijuma_datums,Lietotaji_id  FROM pasutijumi a  WHERE Lietotaji_id = ?;';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/klientaInfo/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'SELECT Lietotaji_id,adrese,pilseta,zip_kods,vards,uzvards FROM informacija WHERE Lietotaji_id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put('/klientaInfo/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE informacija SET `adrese`= ?, `pilseta` = ?, `zip_kods` = ?, `vards` = ?, `uzvards` = ?  WHERE Lietotaji_id = ?';

  const values = [
    req.body.adrese,
    req.body.pilseta,
    req.body.zip_kods,
    req.body.vards,
    req.body.uzvards,
  ];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

/*Klienta info Beigas*/

/*Apmaksa*/
app.put('/produktaInfoMaina/:id', (req, res) => {
  const id = req.params.id;
  const values = [req.body.daudzums_noliktava];
  const query = 'UPDATE produkta_info SET `daudzums_noliktava`= ? WHERE id = ?';

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get('/apmaksasInfo/', (req, res) => {
  const query = `select max(id)+1 as infoID from informacija;`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/apmaksasInfo1/', (req, res) => {
  const query = `select max(id) as pasID from pasutijumi;`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/apmaksasInfo2/', (req, res) => {
  const query = `select max(id)+1 as statID from pasutijuma_status;`;
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/getId/:id', (req, res) => {
  const id = req.params.id;
  const query = `select id from informacija where Lietotaji_id = ?`;
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
/*Apmaksa BEIGAS*/

/*Admin parskats*/
app.get('/precuInfo/', (req, res) => {
  const query =
    'select count(produkta_info.id) as skaits, sum(produkta_info.daudzums_noliktava) as daudzums from produkta_info;';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get('/klientuInfo/', (req, res) => {
  const query = 'select count(id) as skaits from lietotaji;';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get('/pasutijumuInfo/', (req, res) => {
  const query = 'select count(id) as skaits from pasutijumi;';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
/*Admin parskats BEIGAS*/

/*grozaprodukti*/
app.get('/grozaprodukti/', (req, res) => {
  const query =
    'select DISTINCT produkti.id, produkti.nosaukums, produkti.attels, produkta_info.cena, produkta_info.daudzums_noliktava from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id inner join produkta_info_has_variacijas_dati on produkta_info.id = produkta_info_has_variacijas_dati.Produkta_info_id inner join variacijas_dati on produkta_info_has_variacijas_dati.Variacijas_dati_id = variacijas_dati.id inner join variacijas on variacijas.id = variacijas_dati.Variacijas_id;';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
/*grozaprodukti beigas*/

/*Item page fetch*/
app.get('/prece/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'select produkti.id, produkti.nosaukums,produkti.apraksts, produkti.attels, produkta_info.cena , produkta_info.daudzums_noliktava from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id inner join produkta_info_has_variacijas_dati on produkta_info.id = produkta_info_has_variacijas_dati.Produkta_info_id inner join variacijas_dati on produkta_info_has_variacijas_dati.Variacijas_dati_id = variacijas_dati.id inner join variacijas on variacijas.id = variacijas_dati.Variacijas_id where produkti.id = ? limit 1;';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get('/variacijasDati/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'select  variacijas.nosaukums as variacijas_nos, variacijas_dati.vertiba as variacijas_vert from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id inner join produkta_info_has_variacijas_dati on produkta_info.id = produkta_info_has_variacijas_dati.Produkta_info_id inner join variacijas_dati on produkta_info_has_variacijas_dati.Variacijas_dati_id = variacijas_dati.id inner join variacijas on variacijas.id = variacijas_dati.Variacijas_id where produkti.id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
/*Item page fetch beigas*/

/*Home page fetch*/

app.get('/kategorijasPreces/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'select produkti.id, produkti.nosaukums, produkti.attels, kategorijas.nosaukums as kategorija, produkta_info.cena, produkta_info.daudzums_noliktava from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id where kategorijas.id = ?;';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/visasPreces', (req, res) => {
  const query =
    'select produkti.id, produkti.nosaukums, produkti.attels, kategorijas.nosaukums as kategorija, produkta_info.cena, produkta_info.daudzums_noliktava from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id;';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get('/jaunakie', (req, res) => {
  const query =
    'select produkti.id, produkti.nosaukums, produkti.attels, kategorijas.nosaukums as kategorija, produkta_info.cena, produkta_info.daudzums_noliktava from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id order by produkta_info.pievienosanas_datums desc limit 8;';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get('/popularakie', (req, res) => {
  const query =
    'select produkti.id, produkti.nosaukums, produkti.attels, kategorijas.nosaukums as kategorija, produkta_info.cena, produkta_info.daudzums_noliktava from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id order by produkta_info.pirkumu_skaits desc limit 8;';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
/*Home page fetch beigas*/

/*Login and registration*/

app.post('/authClient', function (req, response) {
  const epasts = req.body.epasts;
  const parole = req.body.parole;
  const jwtToken = jwt.sign({ lietotajvards: epasts }, process.env.JWT_KEY);
  if (epasts && parole) {
    db.query(
      'SELECT * FROM lietotaji WHERE parole = ? AND epasts = ?',
      [parole, epasts],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          response.send({ token: jwtToken, id: results[0].id });
        } else {
          response.send('Nepareizs epasts un/vai parole!');
        }
        response.end();
      }
    );
  }
});

app.post('/clientReg', function (req, response) {
  const epasts = req.body.epasts;
  const parole = req.body.parole;
  const values = [parole, epasts];
  if (epasts && parole) {
    db.query(
      'SELECT * FROM lietotaji WHERE epasts = ?',
      [epasts],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
          db.query('INSERT INTO lietotaji(`parole`,`epasts`) VALUES (?)', [
            values,
          ]);
          response.send('Konts veiksmīgi izveidots!');
        } else {
          response.send('Konts ar šo epastu pastāv!');
        }
        response.end();
      }
    );
  }
});

app.post('/authAdmin', function (req, response) {
  const lietotajvards = req.body.lietotajvards;
  const parole = req.body.parole;
  const jwtToken = jwt.sign(
    { lietotajvards: lietotajvards },
    process.env.JWT_KEY
  );
  if (lietotajvards && parole) {
    db.query(
      'SELECT * FROM administracija WHERE parole = ? AND lietotajvards = ?',
      [parole, lietotajvards],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          response.send({ token: jwtToken });
        } else {
          response.send('Nepareizs lietotājvārds un/vai parole!');
        }
        response.end();
      }
    );
  }
});

/*Login beigas*/

/*ADMINISTRĀCIJA*/

app.get('/administracija', (req, res) => {
  const query = 'SELECT * FROM administracija';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/administracija/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM administracija WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/administracija', (req, res) => {
  const query =
    'INSERT INTO administracija(`lietotajvards`, `parole`, `vards`, `uzvards`) VALUES (?)';

  const values = [
    req.body.lietotajvards,
    req.body.parole,
    req.body.vards,
    req.body.uzvards,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/administracija/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM administracija WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/administracija/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE administracija SET `lietotajvards`= ?, `parole`= ?, `vards`= ?, `uzvards`= ? WHERE id = ?';

  const values = [
    req.body.lietotajvards,
    req.body.parole,
    req.body.vards,
    req.body.uzvards,
  ];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

/*ADMINISTRĀCIJA BEIGAS*/

/*informacija*/

app.get('/informacija', (req, res) => {
  const query = 'SELECT * FROM informacija';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/informacija/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM informacija WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/informacija', (req, res) => {
  const query =
    'INSERT INTO informacija(`adrese`, `pilseta`, `zip_kods`, `vards`, `uzvards`, Lietotaji_id) VALUES (?)';

  const values = [
    req.body.adrese,
    req.body.pilseta,
    req.body.zip_kods,
    req.body.vards,
    req.body.uzvards,
    req.body.Lietotaji_id,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/informacija/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM informacija WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/informacija/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE informacija SET `adrese`= ?, `pilseta` = ?, `zip_kods` = ?, `vards` = ?, `uzvards` = ?, `Lietotaji_id` = ? WHERE id = ?';

  const values = [
    req.body.adrese,
    req.body.pilseta,
    req.body.zip_kods,
    req.body.vards,
    req.body.uzvards,
    req.body.Lietotaji_id,
  ];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

/*informacija BEIGAS*/

/*`kategorijas`*/
app.get('/kategorijas', (req, res) => {
  const query = 'SELECT * FROM kategorijas';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/kategorijas/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM kategorijas WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/kategorijas', (req, res) => {
  const query = 'INSERT INTO kategorijas(`nosaukums`) VALUES (?)';

  const values = [req.body.nosaukums];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/kategorijas/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM kategorijas WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/kategorijas/:id', (req, res) => {
  const id = req.params.id;
  const query = 'UPDATE kategorijas SET `nosaukums`= ? WHERE id = ?';

  const values = [req.body.nosaukums];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`kategorijas` BEIGAS*/

/*`lietotaji`*/
app.get('/lietotaji', (req, res) => {
  const query = 'SELECT * FROM lietotaji';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/lietotaji/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM lietotaji WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/lietotaji', (req, res) => {
  const query = 'INSERT INTO lietotaji(`epasts`,`parole`) VALUES (?)';

  const values = [req.body.epasts, req.body.parole];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/lietotaji/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM lietotaji WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/lietotaji/:id', (req, res) => {
  const id = req.params.id;
  const query = 'UPDATE lietotaji SET `epasts`= ?, `parole`= ? WHERE id = ?';

  const values = [req.body.epasts, req.body.parole];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`lietotaji` BEIGAS*/

/*`pasutijuma_pakalpojums`*/
app.get('/pasutijuma_pakalpojums', (req, res) => {
  const query = 'SELECT * FROM pasutijuma_pakalpojums';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/pasutijuma_pakalpojums/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM pasutijuma_pakalpojums WHERE id ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/pasutijuma_pakalpojums', (req, res) => {
  const query =
    'INSERT INTO pasutijuma_pakalpojums(`Pakalpojuma_sniedzejs`,`Cena`) VALUES (?)';

  const values = [req.body.Pakalpojuma_sniedzejs, req.body.Cena];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/pasutijuma_pakalpojums/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM pasutijuma_pakalpojums WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/pasutijuma_pakalpojums/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE pasutijuma_pakalpojums SET `Pakalpojuma_sniedzejs`= ?, `Cena`= ? WHERE id = ?';

  const values = [req.body.Pakalpojuma_sniedzejs, req.body.Cena];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`pasutijuma_pakalpojums` BEIGAS*/

/*`pasutijuma_status`*/
app.get('/pasutijuma_status', (req, res) => {
  const query = 'SELECT * FROM pasutijuma_status';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/pasutijuma_status/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM pasutijuma_status WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/pasutijuma_status', (req, res) => {
  const query = 'INSERT INTO pasutijuma_status(`status`) VALUES (?)';

  const values = [req.body.status];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/pasutijuma_status/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM pasutijuma_status WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/pasutijuma_status/:id', (req, res) => {
  const id = req.params.id;
  const query = 'UPDATE pasutijuma_status SET `status`= ? WHERE id = ?';

  const values = [req.body.status];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`pasutijuma_status` BEIGAS*/

/*`pasutijumi`*/
app.get('/pasutijumi', (req, res) => {
  const query = 'SELECT * FROM pasutijumi';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/pasutijumi/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM pasutijumi WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/pasutijumi', (req, res) => {
  const query =
    'INSERT INTO pasutijumi(`kopsumma`,`pasutijuma_datums`,`Pasutijuma_pakalpojums_id`,`Pasutijuma_status_id`,`informacija_id`,`Lietotaji_id`) VALUES (?)';

  const values = [
    req.body.kopsumma,
    req.body.pasutijuma_datums,
    req.body.Pasutijuma_pakalpojums_id,
    req.body.Pasutijuma_status_id,
    req.body.informacija_id,
    req.body.Lietotaji_id,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/pasutijumi/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM pasutijumi WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/pasutijumi/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE pasutijumi SET `kopsumma`= ?, `pasutijuma_datums`= ?, `Lietotaji_id`= ?, `Pasutijuma_pakalpojums_id`= ? ,`Pasutijuma_status_id`= ? ,`informacija_id`= ? WHERE id = ?';

  const values = [
    req.body.kopsumma,
    req.body.pasutijuma_datums,
    req.body.Lietotaji_id,
    req.body.Pasutijuma_pakalpojums_id,
    req.body.Pasutijuma_status_id,
    req.body.informacija_id,
  ];
  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`pasutijumi` BEIGAS*/

/*`produkta_info`*/
app.get('/produkta_info', (req, res) => {
  const query = 'SELECT * FROM produkta_info';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/produkta_info/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM produkta_info WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/produkta_info', (req, res) => {
  const query =
    'INSERT INTO produkta_info(`Produkti_id`,`daudzums_noliktava`,`cena`,`attels`) VALUES (?)';

  const values = [
    req.body.Produkti_id,
    req.body.daudzums_noliktava,
    req.body.cena,
    req.body.attels,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/produkta_info/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM produkta_info WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/produkta_info/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE produkta_info SET `Produkti_id`= ?, `daudzums_noliktava`= ?, `cena`= ?, `attels`= ? WHERE id = ?';

  const values = [
    req.body.Produkti_id,
    req.body.daudzums_noliktava,
    req.body.cena,
    req.body.attels,
  ];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`produkta_info` BEIGAS*/

/*`produkta_info_has_variacijas_dati`*/
app.get('/produkta_info_has_variacijas_dati', (req, res) => {
  const query = 'SELECT * FROM Produkta_info_has_variacijas_dati';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/produkta_info_has_variacijas_dati/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM produkta_info_has_variacijas_dati WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/produkta_info_has_variacijas_dati', (req, res) => {
  const query =
    'INSERT INTO produkta_info_has_variacijas_dati(`Produkta_info_id`,`Variacijas_dati_id`) VALUES (?)';

  const values = [req.body.Produkta_info_id, req.body.Variacijas_dati_id];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/produkta_info_has_variacijas_dati/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM produkta_info_has_variacijas_dati WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/produkta_info_has_variacijas_dati/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE produkta_info_has_variacijas_dati SET `Produkta_info_id`= ?, `Variacijas_dati_id`= ? WHERE id = ?';

  const values = [req.body.Produkta_info_id, req.body.Variacijas_dati_id];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`produkta_info_has_variacijas_dati` BEIGAS*/

/*`produkti` */
app.get('/produkti', (req, res) => {
  const query = 'SELECT * FROM produkti';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/produkti/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM produkti WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/produkti', (req, res) => {
  const query =
    'INSERT INTO produkti(`nosaukums`,`apraksts`,`attels`,`Kategorijas_id`) VALUES (?)';

  const values = [
    req.body.nosaukums,
    req.body.apraksts,
    req.body.attels,
    req.body.Kategorijas_id,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/produkti/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM produkti WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/produkti/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE produkti SET `nosaukums`= ?, `apraksts`= ?, `attels`= ?, `Kategorijas_id`= ? WHERE id = ?';

  const values = [
    req.body.nosaukums,
    req.body.apraksts,
    req.body.attels,
    req.body.Kategorijas_id,
  ];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`produkti` BEIGAS*/

/*`variacijas`*/
app.get('/variacijas', (req, res) => {
  const query = 'SELECT * FROM variacijas';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/variacijas/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM variacijas WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/variacijas', (req, res) => {
  const query =
    'INSERT INTO variacijas(`nosaukums`,`Kategorijas_id`) VALUES (?)';

  const values = [req.body.nosaukums, req.body.Kategorijas_id];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/variacijas/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM variacijas WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/variacijas/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE variacijas SET `nosaukums`= ?, `Kategorijas_id`= ? WHERE id = ?';

  const values = [req.body.nosaukums, req.body.Kategorijas_id];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`variacijas` BEIGAS*/

/*`variacijas_dati`*/
app.get('/variacijas_dati', (req, res) => {
  const query = 'SELECT * FROM variacijas_dati';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/variacijas_dati/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM variacijas_dati WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/variacijas_dati', (req, res) => {
  const query =
    'INSERT INTO variacijas_dati(`vertiba`,`Variacijas_id`) VALUES (?)';

  const values = [req.body.vertiba, req.body.Variacijas_id];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/variacijas_dati/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM variacijas_dati WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/variacijas_dati/:id', (req, res) => {
  const id = req.params.id;
  const query = 'UPDATE variacijas_dati SET `vertiba`= ?, `Variacijas_id`= ?';

  const values = [req.body.vertiba, req.body.Variacijas_id];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`variacijas_dati` BEIGAS*/

/*`produkti_has_pasutijumi`*/
app.get('/produkti_has_pasutijumi', (req, res) => {
  const query = 'SELECT * FROM produkti_has_pasutijumi';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/produkti_has_pasutijumi/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM produkti_has_pasutijumi WHERE id = ?';
  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/produkti_has_pasutijumi', (req, res) => {
  const query =
    'INSERT INTO produkti_has_pasutijumi(`Produkti_id`,`Pasutijumi_id`, daudzums) VALUES (?)';

  const values = [
    req.body.Produkti_id,
    req.body.Pasutijumi_id,
    req.body.daudzums,
  ];
  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/produkti_has_pasutijumi/:id', (req, res) => {
  const id = req.params.id;
  const query = ' DELETE FROM produkti_has_pasutijumi WHERE id = ? ';

  db.query(query, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/produkti_has_pasutijumi/:id', (req, res) => {
  const id = req.params.id;
  const query =
    'UPDATE produkti_has_pasutijumi SET `Produkti_id`= ?, `Pasutijumi_id`= ?, `daudzums`= ?';

  const values = [
    req.body.Produkti_id,
    req.body.Pasutijumi_id,
    req.body.daudzums,
  ];

  db.query(query, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
/*`produkti_has_pasutijumi` BEIGAS*/
