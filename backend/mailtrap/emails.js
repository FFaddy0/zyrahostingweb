import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verifyToken, username) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verifyToken).replace("{username}", username).replace("{verifylink}", `${process.env.FRONTEND_URL}/verify-email?code=${verifyToken}`),
            category: "Email Verification",
        })

        console.log("Verification email sent successfully", response);
    } catch (error) {
        console.error("Failed to send verification email: ", error);
        throw new Error("Failed to send verification email: " + error.message);
    }
}



export const sendPasswordResetEmail = async (email, resetToken, username) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{username}", username).replace("{resetpasslink}", `${process.env.FRONTEND_URL}/reset-password/${resetToken}`),
            category: "Password Reset",
        })

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error("Failed to send password reset email: ", error);
        throw new Error("Failed to send password reset email: " + error.message);
       }
}

export const sendPasswordResetSuccessEmail = async (email, username) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{username}", username),
            category: "Password Reset",
        })

        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.error("Failed to send password reset success email: ", error);
        throw new Error("Failed to send password reset success email: " + error.message);
    }
}       