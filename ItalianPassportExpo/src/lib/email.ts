const RESEND_API_KEY = process.env.EXPO_PUBLIC_RESEND_API_KEY;

export const sendWelcomeEmail = async (email: string, firstName: string) => {
    if (!RESEND_API_KEY) {
        console.log("Nessuna chiave Resend fornita, email di benvenuto ignorata.");
        return;
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Italian Passport <onboarding@resend.dev>', // resend.dev allows sending to verified emails only on free tier, or requires a custom domain
                to: email,
                subject: 'Benvenuto in Italian Passport! 🇮🇹',
                html: `
                    <div style="font-family: sans-serif; color: #333;">
                        <h2>Ciao ${firstName}!</h2>
                        <p>Siamo felicissimi di darti il benvenuto in <strong>Italian Passport</strong>.</p>
                        <p>Inizia subito a esplorare l'Italia, completa le attività e sblocca i trofei esclusivi delle nostre bellissime città!</p>
                        <br/>
                        <p>Buon viaggio,<br/>Il Team di Italian Passport</p>
                    </div>
                `
            })
        });

        const data = await response.json();
        console.log("Email inviata:", data);
    } catch (error) {
        console.error("Errore nell'invio dell'email:", error);
    }
};
