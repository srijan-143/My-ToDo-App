// server/utils/sendEmail.js
const { Resend } = require('resend');

// Initialize Resend with API key - with better error handling
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    console.error('❌ RESEND_API_KEY environment variable is not set!');
    console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('RESEND')));
}

const resend = new Resend(resendApiKey);

const sendPasswordResetEmail = async (to, resetToken, username) => {
    try {
        // Check if Resend is properly initialized
        if (!resendApiKey) {
            console.error('❌ Cannot send email: RESEND_API_KEY is not configured');
            return { 
                success: false, 
                error: 'Email service not configured. Please check environment variables.' 
            };
        }

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        
        console.log('🔄 Attempting to send email to:', to);
        console.log('📧 Reset URL:', resetUrl);
        console.log('🔑 API Key status:', resendApiKey ? '✅ Present' : '❌ Missing');
        console.log('📨 From email:', process.env.FROM_EMAIL);

        const emailContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; text-align: center; margin-bottom: 30px;">Password Reset Request</h2>
                    
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">Hi ${username},</p>
                    
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">
                        You requested a password reset for your To-Do List account. Click the button below to reset your password:
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; line-height: 1.6;">
                        If the button doesn't work, copy and paste this link into your browser:
                        <br>
                        <a href="${resetUrl}" style="color: #007bff; word-break: break-all;">${resetUrl}</a>
                    </p>
                    
                    <p style="color: #666; font-size: 14px; line-height: 1.6;">
                        This link will expire in 10 minutes for security reasons.
                    </p>
                    
                    <p style="color: #666; font-size: 14px; line-height: 1.6;">
                        If you didn't request this password reset, please ignore this email.
                    </p>
                    
                    <hr style="border: none; height: 1px; background-color: #eee; margin: 30px 0;">
                    
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        This email was sent from your To-Do List application.
                    </p>
                </div>
            </div>
        `;

        const { data, error } = await resend.emails.send({
            from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
            to: to,
            subject: 'Password Reset Request - To-Do List App',
            html: emailContent
        });

        if (error) {
            console.error('❌ Resend API error:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Email sent successfully:', data);
        return { success: true, data };
        
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendPasswordResetEmail
};
