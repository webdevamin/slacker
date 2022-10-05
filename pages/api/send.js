import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Invalid request" });
  }

  const { password } = req.body;

  if (password !== process.env.PASSWORD) {
    return res.status(404).json({ message: `You are not authorized` });
  }

  await axios.post(
    "https://hooks.slack.com/services/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",
    {
      text: "Join video call for John Doe: https://video-call-54422.com",
    }
  );

  return res.status(200).json({
    message: `Done`,
  });
}
