export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
 
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
     secure: process.env.NODE_ENV === "production", // Enable only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Allow cross-site cookies
         expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

