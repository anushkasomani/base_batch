// Next.js API route to handle Telegram bot posting
// Save this file as: /app/api/telegram-post/route.ts

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const payload = await request.json();

    // Extract payload data
    const { chat_id, photo, caption, parse_mode } = payload;

    // Validate required fields
    if (!chat_id || !photo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "7848094922:AAEoTvbZgu58SUiauyu4TNP61ZWo5F9NNqg";

    // Send to Telegram API
    const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

    const telegramResponse = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        photo,
        caption,
        parse_mode
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error("Telegram API error:", errorData);
      return NextResponse.json(
        { error: "Failed to post to Telegram" },
        { status: 500 }
      );
    }

    const data = await telegramResponse.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}