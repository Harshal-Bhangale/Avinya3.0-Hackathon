import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Define API route handler
export async function GET(req: NextRequest) {
    try {
        // Call the Python backend to fetch emotion data
        const response = await axios.get("http://localhost:5000/emotion");

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching emotion data:", error);
        return NextResponse.json(
            { error: "Failed to fetch emotion analysis" },
            { status: 500 }
        );
    }
}