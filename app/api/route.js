import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://api.api-ninjas.com/v2/quotes?categories=success,wisdom", {
            headers: {
                "X-Api-Key": process.env.API_NINJAS_KEY,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("API Ninjas response:", text);
            return NextResponse.json({ error: text }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
