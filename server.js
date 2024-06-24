import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5501;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    const { name, email, tel, message, company, country, select, social1, social2, social3, services } = req.body;

    try {
        const response = await fetch('https://api.postmarkapp.com/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Postmark-Server-Token': '27812eba-5e50-4b81-8ae5-71b3949b4329'
            },
            body: JSON.stringify({
                "From": "order@flashguyscleaning.com",
                "To": "bregadiolli.contato@gmail.com",
                "Subject": "Novo Contato do Formulário",
                "TextBody": `Name: ${name}\nEmail: ${email}\nTel: ${tel}\nMessage: ${message}\nCompany: ${company}\nCountry: ${country}\nI am a: ${select}\nInstagram: ${social1}\nTikTok: ${social2}\nWebsite: ${social3}\nServices: ${services}`
            })
        });

        const data = await response.json();

        if (data.ErrorCode === 0) {
            res.status(200).json({ message: 'Email successfully sent!' });
        } else {
            res.status(500).json({ message: 'Error sending email: ' + data.Message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error sending email: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
