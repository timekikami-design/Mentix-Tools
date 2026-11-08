module.exports = {
  apps: [
    {
      name: "webapp",
      script: "./node_modules/serve/build/main.js",
      args: "out -l tcp://0.0.0.0:3000",
      cwd: "/home/user/webapp",
      watch: false,
    },
  ],
};
