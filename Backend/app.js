const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const { testConnection } = require('./utils/db');
const cors = require('cors');
const saltRounds = 10;
const port = 3000;

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// server halaman utama
app.get('/', (req, res) => {
    console.log(req.body)
    try{
        res.status(202).json({
            message: 'Success'
        });
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            message: 'Not Success'
        });
    }
});

// server halaman register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log({ username, password });

    try {
        const connection = await testConnection();
        const [checkResult] = await connection.query(
            "SELECT * FROM users WHERE username = ?", 
            [username]
        );

        if (checkResult.length > 0) {
            return res.status(400).json({ 
                message: 'Username already exists. Try logging in' 
            });
        }

        const hash = await bcrypt.hash(password, saltRounds);

        const result = await connection.query(
            "INSERT INTO users (username, password) VALUES (?, ?)", 
            [username, hash]
        );

        console.log(result);
        res.status(201).json({ 
            message: 'Successfully registered' 
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            message: 'Failed to register'
         });
    }
});

// server halaman login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });
    
    try{
        const connection = await testConnection();
        const [checkResult] = await connection.query(
            "SELECT * FROM users WHERE username = ?", 
            [username]
        );

        if (checkResult.length === 0){
            console.log('User not found');
            return res.status(401).json({
                error: 'User not found'
            })
        }   

        const user = checkResult[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            console.log('Password does not match');
            return res.status(401).json({
                error:'Password does not match'
            })
        }

        const token = jwt.sign({
            username: user.username
        }, 'your_jwt_secret_key', { 
            expiresIn: '1h' 
        });
        res.status(200).json({
            token, 
            username:user.username
        });
    }catch(err){
        console.log('error message:', err.message);
        res.status(500).json({
            message: 'Not Success',
            success: false
        });
    }
});

//server halaman log out
app.post('/logout', (req, res) => {
    console.log('Logout request received')
    try{
        res.clearCookie('token');
        console.log('Logout successful')
        return res.status(200).json({ 
            message: 'Logout successful' 
        });

    }catch(err){
        console.error('Logout error:', err);
        console.log('Failed to logout')
        return res.status(500).json({ 
            message: 'Failed to logout' 
        });

    }
})

//server master-data
app.post('/Master-data', async (req, res) => {
    console.log(req.body);
    const { partNumber, partName, uom } = req.body;

    try{
        const connection = await testConnection();
        await connection.query(
            'INSERT INTO input_data_barang (part_number, part_name, uom) VALUES (?, ?, ?)',
            [partNumber, partName, uom]
        );
        console.log('Data saved successfully');
        res.status(201).json({
            message:'Data successfully saved'
        });
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            message:'Failed to save data'
        })
    }
});

//server mengambil data
app.get('/Master-data', async (req, res) =>{
    console.log(req.body);
    try{
        const connection = await testConnection();
        const query = "SELECT * FROM input_data_barang";
        const [results] = await connection.query(query);
        console.log(results);
        res.status(200).json(results);
    }catch (err){
        console.log(err.message);
        res.status(500).json({
            message: 'Failed to retrieve data'
        })
    }
});

//server division data
app.post('/Division-data', async(req, res) => {
    console.log(req.body);
    const { divisionName, divisionCode } = req.body;

    try{
        const connection = await testConnection();
        await connection.query(
            'INSERT INTO master_data_division (division_name, division_code) VALUES (?, ?)',
            [divisionName, divisionCode]
        )
        console.log('Data save successfully');
        res.status(201).json({
            message:'Data saved successfully'
        });
    }catch (err){
        res.status(500).json({message: 'Failed to save data'})
        console.log(err.message)
    }
});

//server mengambil data division
app.get('/Division-data', async(req, res) => {
    console.log(req.body);
    try{
        const connection = await testConnection();
        const query = "SELECT * FROM master_data_division";
        const [results] = await connection.query(query);
        console.log(results)
        res.status(200).json(results);
    }catch (err){
        res.status(500).json({
            message:'Failed to fetch data'
        })
        console.log(err.message);
    }
});

//server barang-masuk
app.post('/Barang-masuk', async(req, res) => {
    console.log(req.body);
    const { tanggal, doc_no, part_number, part_name, uom, qty } = req.body;

    try {
        const connection = await testConnection();

        const [partExists] = await connection.query(
            "SELECT * FROM input_data_barang where part_number = ? AND part_name = ? AND uom = ?",
            [part_number, part_name, uom]
        );

        if(partExists.length === 0){
            return res.status(404).json({
                message: 'Part no found in input_data_barang'
            });
        }

        await connection.query(
            "INSERT INTO barang_masuk (doc_no, tanggal, part_number, part_name, uom, qty) VALUES (?, ?, ?, ?, ?, ?)",
            [doc_no, tanggal,  part_number, part_name, uom, qty]
        );
            
        console.log('Data saved successfully');
        res.status(201).json({
            message: 'Data saved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to save data"
        });
        console.log(err.message);
    }
});

// server mengambil barang masuk
app.get('/Barang-masuk', async(req, res) => {
    console.log(req.body);
    try{
        const connection = await testConnection();
        const query = `
            SELECT * FROM barang_masuk ORDER BY tanggal;
        `;
        const [results] = await connection.query(query);
        res.status(200).json(results);
        console.log(results)
    }catch(err){
        res.status(500).json({
            message:'Failed to result data'
        })
        console.log(err.message);
    }
})

//server menghapus data server 
app.delete('/Barang-masuk/:id', async(req, res) => {
    const {id} = req.params;

    try{
        const connection = await testConnection();
        await connection.query(
            'DELETE FROM barang_masuk WHERE id = ?',
            [id]
        );
        res.status(200).json({
            message:'Data deleted successfully'
        })
    }catch (err){
        res.status(500).json({
            message:'Failed to delete data'
        })
        console.log(err.message);
    }
});

// server untuk mengganti data server
app.put('/Barang-masuk/:id', async(req, res) => {
    const {id} = req.params;
    const {tanggal, part_number, part_name, uom, qty} = req.body;

    try{
        const connection = await testConnection();
        await  connection.query(
            'UPDATE barang_masuk SET tanggal = ?, part_number = ?, part_name = ?, uom = ?, qty = ? WHERE id = ?', 
            [tanggal, part_number, part_name, uom, qty, id]
        )
        res.status(200).json({
            message: 'Data updated successfully'
        })
    }catch(err){
        res.status(500).json({
            message:'Failed to update data'
        })
        console.log(err.message);
    }
})

//server status barang keluar
app.post("/Barang-keluar", async (req, res) => {
    console.log(req.body);
    const { tanggal, doc_no, part_number, part_name, uom, qty } = req.body;

    try {
        const connection = await testConnection();

        const [partExists] = await connection.query(
            "SELECT * FROM input_data_barang where part_number = ? AND part_name = ? AND uom = ?",
            [part_number, part_name, uom]
        );

        if(partExists.length === 0){
            return res.status(404).json({
                message: 'Part no found in input_data_barang'
            });
        }

        await connection.query(
            "INSERT INTO barang_keluar (doc_no, tanggal, part_number, part_name, uom, barang_keluar_qty) VALUES (?, ?, ?, ?, ?, ?)",
            [doc_no, tanggal,  part_number, part_name, uom, qty]
        );
        console.log('Data saved successfully');
        res.status(201).json({
            message: 'Data saved successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to save data"
        });
        console.log(err.message);
    }
});

// server mengambil data barang keluar
app.get("/Barang-keluar", async(req, res) => {
    console.log(req.body);
    try{
        const connection = await testConnection();
        const query = `SELECT 
                            bk.id,
                            bk.tanggal,
                            bk.doc_no,
                            ib.part_number,
                            ib.part_name,
                            ib.uom,
                            bk.barang_keluar_qty,
                            md.division_name
                        FROM 
                            barang_keluar bk
                        JOIN 
                            input_data_barang ib ON bk.part_number = ib.part_number 
                                                AND bk.part_name = ib.part_name 
                                                AND bk.uom = ib.uom
                        JOIN 
                            master_data_division md ON bk.doc_no = md.division_code
                        ORDER BY    
                            bk.tanggal;
                        `;
        const [results] = await connection.query(query);
        res.status(200).json(results)
        console.log(results);
    }catch(err){
        res.status(500).json({
            message:'Failed to result data'
        })
        console.log(err.message);
    }
});

// server menghapus data barang keluar 
app.delete("/Barang-keluar/:id", async(req, res) => {
    const {id} = req.params;
    console.log(id);

    try{
        const connection = await testConnection();
        await connection.query(
            'DELETE FROM barang_keluar WHERE id = ?',
            [id]
        );
        res.status(200).json({
            message:'Data deleted successfully'
        })
    }catch (err){
        res.status(500).json({
            message:'Failed to delete data'
        })
        console.log(err.message);
    }
})

// server mengupdate data barang keluar 
app.put("/Barang-keluar/:id", async(req, res) => {
    const {id} = req.params;
    const {tanggal, part_number, part_name, uom, qty} = req.body;
    console.log(id, tanggal, part_number, part_name, uom, qty);

    try{
        const connection = await testConnection();
        await  connection.query(
            'UPDATE barang_keluar SET tanggal = ?, part_number = ?, part_name = ?, uom = ?, barang_keluar_qty = ? WHERE id = ?', 
            [tanggal, part_number, part_name, uom, qty, id]
        )
        res.status(200).json({
            message: 'Data updated successfully'
        })
    }catch{
        res.status(500).json({
            message:'Failed to update data'
        })
        console.log(res.message);
    } 
})

// server barang keluar detail
app.get('/Barang-keluar-detail', async(req, res) => {
    
    const tanggalKeluar = req.query.tanggal_keluar;
    const tanggalMasuk = req.query.tanggal_masuk;

    try{
        const connection = await testConnection();
        let query = ` SELECT 
                            DATE_FORMAT(bm.tanggal, '%m/%d/%y') AS IncomingDate,
                            CASE 
                                WHEN bm.qty - COALESCE(SUM(bk.barang_keluar_qty), 0) <= 0 THEN 0 
                                ELSE bm.qty - COALESCE(SUM(bk.barang_keluar_qty), 0) 
                            END AS IncomingQty,
                            DATE_FORMAT(bk.tanggal, '%m/%d/%y') AS OutgoingDate,
                            bm.part_number AS PartNumber,
                            bm.part_name AS PartName,
                            bm.uom AS UOM,
                            COALESCE(SUM(bk.barang_keluar_qty), 0) AS OutgoingQty
                        FROM 
                            barang_masuk bm
                        LEFT JOIN 
                            barang_keluar bk ON bm.part_number = bk.part_number 
                                            AND bm.part_name = bk.part_name 
                                            AND bm.uom = bk.uom `
                         
                       
        if (tanggalKeluar !== undefined && tanggalKeluar !== null && tanggalMasuk !== null && tanggalKeluar !== '' && tanggalMasuk !== '' && tanggalMasuk !== undefined) {
            query += `WHERE
            bm.tanggal BETWEEN ? AND ?
            AND (bk.tanggal BETWEEN ? AND ?) `;
        }

        query += ` GROUP BY 
                            bm.id, bm.tanggal, bm.qty, bm.part_number, bm.part_name, bm.uom, bk.tanggal
                        ORDER BY 
                            bm.tanggal;`;

        let [results] = [];
        if (tanggalKeluar !== undefined && tanggalKeluar !== null && tanggalMasuk !== null && tanggalKeluar !== '' && tanggalMasuk !== '' && tanggalMasuk !== undefined) {
            [results] = await connection.query(query, [tanggalMasuk, tanggalKeluar,tanggalMasuk, tanggalKeluar]);
        } else {
            [results] = await connection.query(query);
        }

        res.status(200).json(results);
        console.log(results);              
    }catch(err){
        res.status(500).json({
            message:'Failed to result data'
        });
        console.log(err.message);
    }
});

//server status sisa stock barang
app.get('/Sisa-stock', async(req, res) => {
    console.log(req.body)
    try{
        const connection = await testConnection();
        const query = `SELECT 
                            NULL AS doc_no,  -- Anda bisa sesuaikan dengan nilai yang diinginkan
                            NULL AS division_no,  -- Sesuaikan sesuai kebutuhan
                            idb.part_number,
                            idb.part_name,
                            idb.uom,
                            COALESCE(SUM(bm.qty), 0) - COALESCE((SELECT SUM(bk.barang_keluar_qty) 
                                                                FROM barang_keluar bk 
                                                                WHERE bk.part_number = idb.part_number 
                                                                    AND bk.part_name = idb.part_name 
                                                                    AND bk.uom = idb.uom), 0) AS sisa_stock_barang
                        FROM 
                            input_data_barang idb
                        LEFT JOIN 
                            barang_masuk bm ON idb.part_number = bm.part_number AND idb.part_name = bm.part_name AND idb.uom = bm.uom
                        GROUP BY 
                            idb.part_number, idb.part_name, idb.uom;
                        `;
        const [results] = await connection.query(query);
        res.status(200).json(results);
        console.log(results);   
    }catch(err){
        res.status(500).json({
            message:'Failed to result data'
        })
        console.log(err.message);
    }
});

//server status sisa stock detail barang
app.get('/Sisa-stock-detail', async(req, res) => {
    const { partNumber, partName , uom } = req.query;
    console.log("Query Params:", partNumber, partName, uom)

    try{
        const connection = await testConnection();
        const query = `SELECT * 
                        FROM (
                            SELECT 
                                bm.tanggal,
                                bm.doc_no,
                                md.division_code AS division_id,  
                                ib.part_number,
                                ib.part_name,
                                ib.uom,
                                bm.qty AS barang_qty,
                                'In' AS transaction_type
                            FROM 
                                barang_masuk bm
                            JOIN 
                                input_data_barang ib ON bm.part_number = ib.part_number 
                                                    AND bm.part_name = ib.part_name 
                                                    AND bm.uom = ib.uom
                            JOIN 
                                master_data_division md ON bm.doc_no = md.division_code  -- Joining to get division info

                            UNION ALL

                            SELECT 
                                bk.tanggal,
                                bk.doc_no,
                                md.division_code AS division_id,  
                                ib.part_number,
                                ib.part_name,
                                ib.uom,
                                bk.barang_keluar_qty AS barang_qty,
                                'Out' AS transaction_type
                            FROM 
                                barang_keluar bk
                            JOIN 
                                input_data_barang ib ON bk.part_number = ib.part_number 
                                                    AND bk.part_name = ib.part_name
                                                    AND bk.uom = ib.uom
                            JOIN 
                                master_data_division md ON bk.doc_no = md.division_code
                        ) AS combined_transactions
                        ORDER BY 
                            tanggal; -- Sort by the date column
                        `;
        const [results] = await connection.query(query, [partNumber, partName, uom, partNumber, partName, uom]);
        res.status(200).json(results);
        console.log(results);
    }catch(err){
        res.status(500).json({
            message:'Failed to result data'
        })
        console.log(err.message);
    };
});

//server 404 error
app.use((req, res, next) => {
    console.log(req.body);
    res.status(404).json({
        message:'404 - Page Not Found'
    });
});

//server status error 
app.use((error, req, res, next) => {
    console.log(req.body);
    res.status(500).json({   
        message: 'Error' 
    });
});

//server status hidup
testConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    }).catch(err => {
        console.error('Failed to start server due to database connection error:', err);
});