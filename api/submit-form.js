import { Resend } from 'resend';

export default async function handler(req, res) {
  // CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Extract Webflow form data (adjust field names to match your form)
    const {
      'Contact-12-First-Name': fullName,
      'Contact-12-Last-Name': city,
      'Contact-12-Email-2': email,
      'Contact-12-Phone': phone,
      'Contact-12-Select': service,
      'Contact-12-Radio': budget,
      'Contact-12-Message': message,
      'g-recaptcha-response': recaptchaToken
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing'
      });
    }

    // Initialize Resend with hardcoded API key for testing
    // In production, this should use process.env.RESEND_API_KEY
    const resendApiKey = 're_cULS7BvM_JA1bPvo3cXvQKUXWkb68FPNy';
    const resend = new Resend(resendApiKey);
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    
    // ⚠️ HARDCODE recipient to prevent environment variable overrides
    const businessEmail = 'wrivard@kua.quebec'; // Testing email

    // Budget mapping for better display
    const budgetMap = {
      'Contact 12 Radio 1': '25 000$ et moins',
      'Contact 12 Radio 2': '25 000$-50 000$',
      'Contact 12 Radio 3': '50 000$-100 000$',
      'Contact 12 Radio 4': '100 000$ et plus'
    };
    const budgetDisplay = budgetMap[budget] || budget || 'Non spécifié';

    // Create business email with table-based layout (prevents content collapsing)
    const businessEmailContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f4f0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #2c3e50; color: #ffffff; text-align: center; padding: 30px;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🏗️ Nouveau Projet</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Une nouvelle demande de soumission</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px; background-color: #ffffff;">
                    <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">👤 Informations du Client</h2>
                    <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 30px;">
                      <tr>
                        <td style="font-weight: bold; color: #2c3e50; width: 120px; vertical-align: top;">Nom:</td>
                        <td style="color: #34495e;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold; color: #2c3e50; vertical-align: top;">Email:</td>
                        <td style="color: #34495e;"><a href="mailto:${email}" style="color: #d4a574; text-decoration: none;">${email}</a></td>
                      </tr>
                      ${phone ? `
                      <tr>
                        <td style="font-weight: bold; color: #2c3e50; vertical-align: top;">Téléphone:</td>
                        <td style="color: #34495e;"><a href="tel:${phone}" style="color: #d4a574; text-decoration: none;">${phone}</a></td>
                      </tr>
                      ` : ''}
                      ${city ? `
                      <tr>
                        <td style="font-weight: bold; color: #2c3e50; vertical-align: top;">Ville:</td>
                        <td style="color: #34495e;">${city}</td>
                      </tr>
                      ` : ''}
                      ${service ? `
                      <tr>
                        <td style="font-weight: bold; color: #2c3e50; vertical-align: top;">Service:</td>
                        <td style="color: #34495e;">${service}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="font-weight: bold; color: #2c3e50; vertical-align: top;">Budget:</td>
                        <td style="color: #34495e;">${budgetDisplay}</td>
                      </tr>
                    </table>
                    
                    <h2 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">💬 Message</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #d4a574; line-height: 1.6; color: #34495e;">
                      ${message.replace(/\n/g, '<br>')}
          </div>
                  </td>
                </tr>
                
                <!-- Action Button -->
                <tr>
                  <td style="padding: 0 30px 40px 30px; text-align: center;">
                    <a href="mailto:${email}?subject=Re: Votre demande de soumission" style="display: inline-block; background-color: #d4a574; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">
                      📧 Répondre au Client
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send business email
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: businessEmail,
      subject: `🏗️ Nouveau Projet - ${fullName} (${city || 'Ville non spécifiée'})`,
      html: businessEmailContent,
      replyTo: email
    });

    if (error) {
      console.error('Business email error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email'
      });
    }

    // Send confirmation email to customer
    const confirmationContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f4f0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background-color: #d4a574; color: #ffffff; text-align: center; padding: 30px;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: bold;">✅ Merci !</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Votre demande a été reçue</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px; background-color: #ffffff; text-align: center;">
                    <p style="font-size: 18px; color: #2c3e50; margin: 0 0 20px 0;">Bonjour <strong>${fullName}</strong>,</p>
                    <p style="font-size: 16px; color: #34495e; line-height: 1.6; margin: 0 0 25px 0;">
                      Merci de nous avoir contactés ! Nous avons bien reçu votre demande de soumission et nous vous répondrons dans les <strong>24-48 heures</strong>.
                    </p>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4a574;">
                      <p style="margin: 0; color: #34495e; font-size: 14px;">
                        <strong>Votre demande:</strong><br>
                        Service: ${service || 'Non spécifié'}<br>
                        Budget: ${budgetDisplay}<br>
                        ${city ? `Ville: ${city}` : ''}
                      </p>
                    </div>
                    <p style="font-size: 16px; color: #34495e; margin: 25px 0 0 0;">
                      Cordialement,<br>
                      <strong style="color: #2c3e50;">L'équipe Rénovation Lacombe Connely</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send confirmation email (don't fail if this fails)
    try {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Merci pour votre demande de soumission',
        html: confirmationContent,
        replyTo: businessEmail
      });
    } catch (confirmationError) {
      console.warn('Confirmation email failed:', confirmationError);
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      data: data
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
