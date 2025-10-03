// Email verification script
const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend('re_cULS7BvM_JA1bPvo3cXvQKUXWkb68FPNy');

// Configuration
const config = {
  fromEmail: 'onboarding@resend.dev', // Using Resend test email for verification
  toEmail: 'wrivard@kua.quebec', // Your test email
  businessName: 'Rénovation Lacombe Connely'
};

async function sendTestEmail() {
  console.log('🚀 Starting email verification test...');
  console.log(`📧 Sending test email to: ${config.toEmail}`);

  try {
    // Send a test email
    const { data, error } = await resend.emails.send({
      from: config.fromEmail,
      to: config.toEmail,
      subject: '✅ Email Configuration Test - Rénovation Lacombe Connely',
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f4f0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="background-color: #2c3e50; color: #ffffff; text-align: center; padding: 30px;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">✅ Email Test Successful!</h1>
                      <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your email configuration is working</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px; background-color: #ffffff; text-align: center;">
                      <p style="font-size: 18px; color: #2c3e50; margin: 0 0 20px 0;">Hello,</p>
                      <p style="font-size: 16px; color: #34495e; line-height: 1.6; margin: 0 0 25px 0;">
                        This is a test email to verify that your Resend API configuration is working correctly. If you're seeing this email, your setup is successful!
                      </p>
                      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4a574;">
                        <p style="margin: 0; color: #34495e; font-size: 14px; text-align: left;">
                          <strong>Configuration Details:</strong><br>
                          From Email: ${config.fromEmail}<br>
                          To Email: ${config.toEmail}<br>
                          API Status: Working ✓
                        </p>
                      </div>
                      <p style="font-size: 16px; color: #34495e; margin: 25px 0 0 0;">
                        You're ready to deploy!<br>
                        <strong style="color: #2c3e50;">${config.businessName}</strong>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('❌ Error sending test email:', error);
      console.log('\nTroubleshooting tips:');
      console.log('1. Check if your Resend API key is correct');
      console.log('2. Verify that the sender email is authorized in Resend');
      console.log('3. Check your network connection');
      process.exit(1);
    }

    console.log('✅ Test email sent successfully!');
    console.log(`📝 Email ID: ${data.id}`);
    console.log('\n🎉 Your email configuration is working correctly!');
    console.log('👉 Next steps:');
    console.log('1. Deploy your application to Vercel');
    console.log('2. Set up environment variables in Vercel Dashboard:');
    console.log('   - RESEND_API_KEY');
    console.log('   - FROM_EMAIL (use a verified domain email)');
    console.log('\n📧 Check your inbox to confirm receipt of the test email.');
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

// Run the test
sendTestEmail();
