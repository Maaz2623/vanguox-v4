import {tool as createTool} from 'ai'
import z from 'zod'


export const jokeTool = createTool({
    description: "Tells a joke",
    parameters: z.object({}),
    execute: async function () {
        await new Promise(resolve => setTimeout(resolve, 2000))
        return {
            joke: 'Haha a joke is something that can be joked about. lol',
        }
    }
})


export const tools = {
    tellJoke: jokeTool
}