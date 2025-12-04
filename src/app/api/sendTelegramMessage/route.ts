export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Your bot token and chat ID
    const botToken = "8082658472:AAFhn_nKb7ZeKlTc7L9_fF0BZYjefEZ21qw";
    const chatId = "7562465487";

    // Telegram API URL
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Send message
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
