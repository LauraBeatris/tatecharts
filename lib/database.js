import { Redis } from '@upstash/redis'
import { isToday } from 'date-fns'

const redisConnection = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

/**
 * Creates a hash for reference in order to not post duplicated
 * tweets per day
 */
export async function updateTweetsPublishFlag () {
  const hashKey = 'tate-charts-tweets'

  const currentUpdatedAt = await redisConnection.hget(hashKey, 'updatedAt')
  const wasUpdatedToday = isToday(currentUpdatedAt)

  await redisConnection.hset(hashKey, {
    updatedAt: wasUpdatedToday ? currentUpdatedAt : Date.now(),
    wasUpdatedToday
  })

  return { wasUpdatedToday }
}
