/**
 * Created by alembers on 5/11/16.
 */
// =========================================================================
// ==================== get the packages we need ===========================
// =========================================================================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var ip 			= require('ip');
var fs 			= require('fs');
var path		= require('path');
// =========================================================================
// ==================== Initialize Constants ===============================
// =========================================================================
var port 		= process.env.PORT || 9500;
// ==========================================================================
// ====================== start the webserver  ==============================
// ==========================================================================
var server = app.listen(port, 'localhost', function() {
    console.log('Server running at http://localhost:'+port);
});
// ===========================================================================
// ============= Initialize various express dependencies =====================
// ===========================================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./frontend'));
// Removing Angular's annoying # from the URL
// app.get('/main', function(req, res) {
//     res.sendFile(path.join(__dirname + "/app/index.html"));
// });
// ===========================================================================
// ================= Initialize the API routes ===============================
// ===========================================================================