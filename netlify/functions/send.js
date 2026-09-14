const webpush = require('web-push');

exports.handler = async (event) => {
  // Uniquement accepter les requêtes POST
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const data = JSON.parse(event.body);
    
    // Configuration avec tes variables d'environnement
    webpush.setVapidDetails(
      'mailto:cyprien.veyret@gmail.com', // Remplacer par ton email
      process.env.VAPID_PUBLIC,
      process.env.VAPID_PRIVATE
    );

    // Envoi de la notification
    await webpush.sendNotification(
      data.subscription, 
      JSON.stringify({ title: "Test Netlify", message: data.message })
    );

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
    
  } catch (error) {
    console.error("Erreur Push:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
