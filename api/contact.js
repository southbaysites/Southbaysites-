import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    business,
    email,
    phone,
    website,
    message
  } = req.body;

  try {

    await resend.emails.send({

      from: "South Bay Sites <onboarding@resend.dev>",

      to: "southbaysites@gmail.com",

      subject: `New Website Lead from ${name}`,

      html: `
        <h2>New Website Lead</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Business:</strong> ${business}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Website:</strong> ${website}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>

      `
    });

    res.status(200).json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false
    });

  }

}
