module.exports = ({ env }) => {
  if (env("NODE_ENV", "development") == "production") {
    return {
      host: env("HOST", "0.0.0.0"),
      port: env.int("PORT", 1337),
      url: "https://api.nftworld.com",
      admin: {
        url: "/",
        serveAdminPanel: false,
        auth: {
          secret: env("ADMIN_JWT_SECRET", "74c0c7ce5c8efb5a0793fd102a86c886"),
        },
      },
    };
  } else {
    return {
      host: env("HOST", "0.0.0.0"),
      port: env.int("PORT", 1337),
      admin: {
        watchIgnoreFiles: [
          '**/client/**',
        ],
        auth: {
          secret: env("ADMIN_JWT_SECRET", "74c0c7ce5c8efb5a0793fd102a86c886"),
        },
      },
    };
  }
};