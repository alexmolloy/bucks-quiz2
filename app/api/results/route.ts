import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function GET() {
  try {
    const keys = await redis.lrange('submissions_list', 0, -1)

    if (!keys || keys.length === 0) {
      return NextResponse.json({ submissions: [] })
    }

    const submissions = await Promise.all(
      (keys as string[]).map(key => redis.get(key))
    )

    return NextResponse.json({ submissions: submissions.filter(Boolean) })
  } catch (err) {
    console.error('Results error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
