import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 160000) // 1 minute timeout

    const response = await fetch('https://api.langflow.astra.datastax.com/lf/5628d9f3-2ba9-4939-aaf7-c0699079f94b/api/v1/run/4c1c95b9-636a-4584-977d-fb1c9045259c?stream=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LANGFLOW_API_TOKEN}`
      },
      body: JSON.stringify({
        input_value: message,
        output_type: 'chat',
        input_type: 'chat',
        tweaks: {
        }
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      console.error('Failed to parse JSON:', text)
      throw new Error('Invalid JSON response from API')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timed out. Please try again.' }, { status: 504 })
    }
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
  }
}
