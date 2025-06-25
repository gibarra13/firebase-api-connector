const express = require("express");
const app = express();

app.use(express.json());
app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/auth', require("./routes/authRoutes"));
app.use('/auth', require('./routes/signRoutes'));
app.use('/api/rconfig', require('./routes/remoteConfigRoutes')); 

const port = process.env.PORT || 81;
app.listen(port, () => {
  console.log(`IVAN-Firebase Server is running on port ${port}`);
});