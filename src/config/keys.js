const key = "c0cc62d905c9e3b1cb40b9cb822ac1a7d3bac049922e7cc170ec78324a38ca3b8048276bd34589dc6448e61282f6f9df";

module.exports = {
    SECRET_KEY: process.env.JWT_SECRET || key,
    SYS_ROLE: "ivan_system_admin",
    SYS_USER: "SYSTEM_ADMIN"
}