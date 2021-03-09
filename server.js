const express = require('express');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const connectDB = require('./util/db_connection');
const app = express();

/**Load environmental variables.*/
dotenv.config({path: './config/config.env'});


/**File uploading*/
app.use(fileUpload());

/**Body parser*/
app.use(express.json());

/**Route files.*/
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const user = require('./routes/users');

/**Mount routers.*/
app.use('/api/v1/posts', posts);
app.use('/api/v1/auth',auth);
app.use('/api/v1/user',user);

/**Cookie parser*/
app.use(cookieParser);

connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
