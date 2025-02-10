export const env = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || 'your-database-url',
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret',
    NODE_ENV: process.env.NODE_ENV || 'development',
};