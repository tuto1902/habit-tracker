import { beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

var habits = {
    data: [
        {
            name: 'Drink Water',
            times_per_day: 3,
            executions_count: 1
        }
    ]
}

var validationErrors = {
    errors: {
        name: [
            'The name field is required.'
        ],
        times_per_day: [
            'The times per day field is required.'
        ]
    }
}

export const requestHandlers = [
    rest.get('/api/habits', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(habits))
    }),

    rest.post('/api/habits/:habit/execution', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}))
    }),

    rest.post('/api/habits', async (req, res, ctx) => {
        const { name, times_per_day } = await req.json()
        if (name == '' || times_per_day == '') {
            return res(ctx.status(422), ctx.json(validationErrors))
        }
        habits.data.push({
            id: habits.data.length + 1,
            name: name,
            times_per_day: times_per_day,
            executions_count: 0
        })
        return res(ctx.status(200), ctx.json(habits))
    }),

    rest.put('/api/habits/:habit', async (req, res, ctx) => {
        const { name, times_per_day } = await req.json()
        if (name == '' || times_per_day == '') {
            return res(ctx.status(422), ctx.json(validationErrors))
        }
        habits.data[0].name = name
        habits.data[0].times_per_day = times_per_day
        return res(ctx.status(200), ctx.json(habits))
    }),

    rest.delete('/api/habits/:habit', async (req, res, ctx) => {
        habits.data.shift()
        return res(ctx.status(200), ctx.json(habits))
    }),
]

const server = setupServer(...requestHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())