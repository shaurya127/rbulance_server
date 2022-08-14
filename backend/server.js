const app = require("./app");
const logger = require("./config/logger");

// const logger = require("./config/logger");
// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 🤯", err.name, err.message);
  console.log('Shutting down the server because of uncaught exception');
  process.exit(1);
});
if (process.env.environment === 'production') {
  app.use('/v1/auth', authLimiter);
}

const server = app.listen(process.env.PORT || 7000, () => {
  console.log(`Server is working on http://localhost:7000`);
});

// unhandled promise rejection
process.on("unhandledRejection" ,err=>{
  console.log(`Error : ${err.message}`);
  console.log('Shutting down...due to unhandled rejection');
  server.close(()=>{
    process.exit(1);
  });
  
})

// sigterm 
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});