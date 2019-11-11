// requerimos express
var express = require('express');

// para hacer el servidor
var app = express();

//Libreria para las extensiones de los archivos
var extension = require('file-extension');

//requermos lo necesario para multer para hacer lo de guardar las imagenes
var multer  = require('multer');

//Requerimos el config.js
var config = require('./config');

//requerimos aws
var aws = require('aws-sdk');

//requerimos multer-s3
var multerS3 = require('multer-s3');

//creamos un s3
var s3 = new aws.S3({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey,
    sessionToken: config.aws.token,
    region : "us-east-1",
    Bucket: 'christofer-pictures-course',
});

//Hacemos el storage de aws-s3
var storage =  multerS3({
    s3: s3,
    bucket: 'christofer-pictures-course',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
        cb(null, +Date.now() + '.' + extension(file.originalname))
    }
});

// storage es para almacenar las fotos en el server local
/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + extension(file.originalname))
    }
});*/

// el nombre 'picture', es porque el name del input es picture, upload va a ser una funcion que recibe req, res y una funcion en caso de error
var upload = multer({ storage: storage }).single('picture');

//Para retornar los viewsa de pug
app.set('view engine', 'pug');

//Le indicamos al servidor que la carpeta public esta disponible de manera estatica
app.use(express.static('public'));

//Indicamos el link raiz
app.get('/', function (req, res) {
    res.render('index', { title: 'Platzigram' });
});

//Indicamos el link signup
app.get('/signup', function (req, res) {
    res.render('index', { title: 'Platzigram - Signup' });
});

//Indicamos el link signin
app.get('/signin', function (req, res) {
    res.render('index', { title: 'Platzigram - Signin' });
});

app.get('/api/pictures', function (req, res) {
    var pictures = [
        {
            user: {
                username: 'christofer',
                avatar: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/11248247_860492034003920_4254103667573577246_n.jpg?_nc_cat=102&_nc_oc=AQmN9LGkTVuLQXFuAUIL672y0W8EMAu0MJHRMSdbmoNucpJtjQC80gd-oHwsCQosm1A&_nc_ht=scontent.fsyq1-1.fna&oh=0df1264c9f4d45726cbf0380e3102ed0&oe=5E063015'
            },
            url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t31.0-8/1276912_647884011977192_531907739011678935_o.jpg?_nc_cat=107&_nc_oc=AQl06TF2bwRVVCmiUN_aZ6WPWp2hooBwmW7E0aoK3tkkhnM8I1tZwUywkYZF1nxnFho&_nc_ht=scontent.fsyq1-1.fna&oh=83158dceb5e646fa034b20e92d7ff3e8&oe=5E3A3137',
            likes: 0,
            liked: false,
            createdAt: new Date().getTime(),
        },
        {
            user: {
                username: 'selena',
                avatar: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/17991216_1408143802584331_5023623481533397047_n.jpg?_nc_cat=107&_nc_oc=AQmwYrUNwiQ_8TQMF-FAxXp97Bj9GYaXxb0W7re6rFasi0vV-YhvicHHUdKM6Sii3Ug&_nc_ht=scontent.fsyq1-1.fna&oh=b22cd65dc33ade06ad0da42409071fac&oe=5E045C84'
            },
            url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t31.0-8/15137450_1270427856355474_3356000246199048838_o.jpg?_nc_cat=108&_nc_oc=AQl6emRTQf3Wiv-94SJ2FUqUjaAm7TAVrsW3PeXf27vrwXo9qv8vjm5-Mv2zqOTFkSE&_nc_ht=scontent.fsyq1-1.fna&oh=1c32e10cfcbfef7450393b7b6e87466a&oe=5DF011E2',
            likes: 1,
            liked: true,
            createdAt: new Date().setDate(new Date().getDate() - 10),
        }
    ];
    setTimeout(function () {
        res.send(pictures);
    }, 2000);
});

//Post para guardar las imagenes
app.post('/api/pictures', function (req, res) {
    //el nombre 'picture', es porque el name del input es picture
    upload(req, res, function (err) {
        if(err){
            console.error(err);
            return res.send(500, 'Error uploading file');
        }
        res.send('File uploaded');
    })
});

//Funcion post para pedir la informacion del usuario
app.get('/api/user/:id', function (req, res) {
    var id = req.params.id;
    var users = [
        {
            user: {
                username: 'christofer',
                avatar: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/11248247_860492034003920_4254103667573577246_n.jpg?_nc_cat=102&_nc_oc=AQmN9LGkTVuLQXFuAUIL672y0W8EMAu0MJHRMSdbmoNucpJtjQC80gd-oHwsCQosm1A&_nc_ht=scontent.fsyq1-1.fna&oh=0df1264c9f4d45726cbf0380e3102ed0&oe=5E063015'
            },
            photos: [
                {
                    id: 0,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t31.0-8/1276912_647884011977192_531907739011678935_o.jpg?_nc_cat=107&_nc_oc=AQl06TF2bwRVVCmiUN_aZ6WPWp2hooBwmW7E0aoK3tkkhnM8I1tZwUywkYZF1nxnFho&_nc_ht=scontent.fsyq1-1.fna&oh=83158dceb5e646fa034b20e92d7ff3e8&oe=5E3A3137',
                    likes: 0,
                    liked: false,
                    createdAt: new Date().setDate(new Date().getDate() - 1),
                },
                {
                    id: 1,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t31.0-8/10710411_647883925310534_754992669978239202_o.jpg?_nc_cat=102&_nc_oc=AQnKNS6-b1m37MgwZQbWOssuwEHXPzWlZ24pl3syzAQ7WibchOD22tDOFhr_A6xVAZ0&_nc_ht=scontent.fsyq1-1.fna&oh=f1e6c6f0a8c2da6a349fc3cdfbdfc136&oe=5DEF3E40',
                    likes: 1,
                    liked: true,
                    createdAt: new Date().setDate(new Date().getDate() - 2),
                },
                {
                    id: 2,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/10441198_601687813263479_925629323786626094_n.jpg?_nc_cat=105&_nc_oc=AQnSuHdZWIEVA3jSscIYsKSqG5bjg6iHQIt5IvmvetS9XGe58-O72u6Zm4xt1gQqs1A&_nc_ht=scontent.fsyq1-1.fna&oh=10342f7c8951b37358e60775dd4a52eb&oe=5E08997B',
                    likes: 2,
                    liked: false,
                    createdAt: new Date().setDate(new Date().getDate() - 3),
                },
                {
                    id: 3,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/1898126_669283623117338_1390891379_n.jpg?_nc_cat=107&_nc_oc=AQkB95TU2Eud7a_d05YgfTl2IlmmdRTtuDHbA5C18Qbyi0OxHPdGTsTiBR6B3AKCIa4&_nc_ht=scontent.fsyq1-1.fna&oh=2b2eb1c7e3f20fa23567f4a1c90961e0&oe=5DEFE244',
                    likes: 3,
                    liked: true,
                    createdAt: new Date().setDate(new Date().getDate() - 4),
                },
                {
                    id: 4,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/1904082_548041105294817_936582414_n.jpg?_nc_cat=109&_nc_oc=AQmzmaWPGzcXXw1-m2yfqijxODi3s453OjH9K9cl-rkRtGzIdjbIfxzIegD05SsrUBw&_nc_ht=scontent.fsyq1-1.fna&oh=f7f233696074e383a9b262724043e6bf&oe=5DF44679',
                    likes: 4,
                    liked: false,
                    createdAt: new Date().setDate(new Date().getDate() - 5),
                },
                {
                    id: 5,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/1474410_1419082154994261_1767384178_n.jpg?_nc_cat=110&_nc_oc=AQlArXhXsYoJeZVGJ6oPtvJf6XKQL720aQYIACNU08rz-mOPSb9zdRAf6o4Sg2dXO9c&_nc_ht=scontent.fsyq1-1.fna&oh=4de32de94bb3160bf863d8cd91c49e51&oe=5E08029F',
                    likes: 5,
                    liked: true,
                    createdAt: new Date().setDate(new Date().getDate() - 5),
                }
            ]
        },
        {
            user: {
                username: 'selena',
                avatar: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t31.0-8/17990236_1408143802584331_5023623481533397047_o.jpg?_nc_cat=107&_nc_oc=AQmJwIZuaJ3wtNdfOqsaH6ECShZl4SYH5euH1MaxPmYSIblyTu5xoZ613vgcxmgzLzw&_nc_ht=scontent.fsyq1-1.fna&oh=07b9ad21d11741350c098d87f530fda8&oe=5E007B7D'
            },
            photos: [
                {
                    id: 0,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t31.0-8/15137450_1270427856355474_3356000246199048838_o.jpg?_nc_cat=108&_nc_oc=AQl6emRTQf3Wiv-94SJ2FUqUjaAm7TAVrsW3PeXf27vrwXo9qv8vjm5-Mv2zqOTFkSE&_nc_ht=scontent.fsyq1-1.fna&oh=1c32e10cfcbfef7450393b7b6e87466a&oe=5DF011E2',
                    likes: 0,
                    liked: false,
                    createdAt: new Date().setDate(new Date().getDate() - 1),
                },
                {
                    id: 1,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/13731580_1742832455992278_2185297380930098520_n.jpg?_nc_cat=108&_nc_oc=AQkpNLhRuIT_pyzqf-wY6S_nqi9IGli8ZPpWXk445mY-F9Qi0uxG_L5Xjoq-LIWzMoY&_nc_ht=scontent.fsyq1-1.fna&oh=497158ca490f744ae8e52512737d5a79&oe=5E0C1378',
                    likes: 1,
                    liked: true,
                    createdAt: new Date().setDate(new Date().getDate() - 2),
                },
                {
                    id: 2,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t31.0-8/12087646_406558769543190_5351484278985723388_o.jpg?_nc_cat=104&_nc_oc=AQnN5gySZWInAMjO_VxnAH_CSfl0lC_lZZU6Tv-_riGSQ8YRZM_6ZVOap6D7T8rnTcA&_nc_ht=scontent.fsyq1-1.fna&oh=89ab8ceb249823725cf9d4b0d7cd0e9e&oe=5DF41B21',
                    likes: 2,
                    liked: false,
                    createdAt: new Date().setDate(new Date().getDate() - 3),
                },
                {
                    id: 3,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/11666150_924581324273917_4584680756726028816_n.jpg?_nc_cat=111&_nc_oc=AQlrQegiW5zi3PPTPNCz1L5wv8J8woTTiqoTKWQWhkn9g6ZXNp7UkPVTXnvwZ8Lpj-Q&_nc_ht=scontent.fsyq1-1.fna&oh=96644c773ff652b464c8be745efd62b1&oe=5DFE7296',
                    likes: 3,
                    liked: true,
                    createdAt: new Date().setDate(new Date().getDate() - 4),
                },
                {
                    id: 4,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/10336623_835263336531070_193723732323564299_n.jpg?_nc_cat=105&_nc_oc=AQlAIN7UMeaqta3EGWe7F7g9YLieHdpMBfLjzUghnbic-2musa_K_1fF7My5EvfITUA&_nc_ht=scontent.fsyq1-1.fna&oh=16a36988c2a9e6aa8310ad10be2c8f77&oe=5DFEEA8F',
                    likes: 4,
                    liked: false,
                    createdAt: new Date().setDate(new Date().getDate() - 5),
                }
            ]
        },
        {
            user: {
                username: 'selena2',
                avatar: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/263602_168387346559989_915092_n.jpg?_nc_cat=103&_nc_oc=AQnZ9yF_Af-ZsxdGzM_yfrpZlf2KYeMl40rlVdS5DOpbavJby0OQ3ixoK71zVmNy1Gw&_nc_ht=scontent.fsyq1-1.fna&oh=aad36f5f9c43b69c9610b5fc252e6fd6&oe=5DF2E0D6'
            },
            photos: [
                {
                    id: 0,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/249697_158063454259045_2326785_n.jpg?_nc_cat=103&_nc_oc=AQmejY_z0tYQxAoWQC_tNzk5m_zoP4p2g3E0M8JRBvCRc4W3tzexEjF61yQmbfAttZM&_nc_ht=scontent.fsyq1-1.fna&oh=f18992b0d4458a699ddbf703cf1ead00&oe=5E0352C1',
                    likes: 0,
                    liked: false,
                    createdAt: new Date().setDate(new Date().getDate() - 1),
                },
                {
                    id: 1,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/77108_121488394582765_2302959_n.jpg?_nc_cat=101&_nc_oc=AQlWuIf5ufZcetmmyQ6Eu4NXJCxvt04bnumAyXjbilsbs132eeDV2B12K4zX-51HEQ4&_nc_ht=scontent.fsyq1-1.fna&oh=68fd1cc5b39c14d8a37ba2b2709068ab&oe=5E3D9B94',
                    likes: 1,
                    liked: true,
                    createdAt: new Date().setDate(new Date().getDate() - 2),
                },
                {
                    id: 2,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/68601_10151184565871003_228541926_n.jpg?_nc_cat=108&_nc_oc=AQnEueXolfe_p_HNLAep_BRc4Pjuf1p5H8KvFmaCGVBQKuVPmsIjLOxoBqKnFRV_pkQ&_nc_ht=scontent.fsyq1-1.fna&oh=01c1beb034f27517fd058150f0976d95&oe=5DFF57EF',
                    likes: 2,
                    liked: false,
                    createdAt: new Date().setDate(new Date().getDate() - 3),
                },
                {
                    id: 3,
                    url: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/945256_386602451454178_804586388_n.jpg?_nc_cat=108&_nc_oc=AQnUNde91Ru3vDoYrCC3xzlT2EcUJhILQlk3lOI0paAdi5TUX7MV8wpUmWaS__VGbdg&_nc_ht=scontent.fsyq1-1.fna&oh=3b13321c6a9bf84efd76e63498b0593f&oe=5E106C03',
                    likes: 3,
                    liked: true,
                    createdAt: new Date().setDate(new Date().getDate() - 4),
                }
            ]
        },
    ];
    var user;
    for(var i = 0; i < users.length; i++){
        if(users[i].user.username === id){
            user = users[i];
        }
    }
    res.send(user);
    /*setTimeout(function () {
        res.send(user);
    }, 1000);*/
});

//Indicamos el link user
app.get('/:id', function (req, res) {
    //console.log(req.params.id);
    res.render('index', { title: 'Platzigram - ' + req.params.id });
    /*setTimeout(function () {
    }, 1000);*/
});

//Indicamos el link user
app.get('/:id/:photo', function (req, res) {
    //console.log(req.params.id);
    res.render('index', { title: 'Platzigram - ' + req.params.id });
    /*setTimeout(function () {
    }, 1000);*/
});

//Arranca el servidor en el puerto 3000
app.listen(3000, function (err) {
   if (err) return console.log('Hubo un error', process.exit(1));
   console.log('Platzigram escuhando en el puerto 3000')
});