module.exports = {
    HOST: process.env.NODE_ENV === "development" ? "localhost": process.env.DB_HOST,
    USER: process.env.NODE_ENV === "development" ? "root": process.env.DB_USER,
    PASSWORD: process.env.NODE_ENV === "development" ? "": process.env.DB_PASSWORD,
    DB: process.env.NODE_ENV === "development" ? "shopify_custom_options": process.env.DB_SCHEMA
};