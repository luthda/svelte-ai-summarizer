import type { RequestHandler } from '@sveltejs/kit';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { texts } = await request.json();

		if (!texts || !Array.isArray(texts)) {
			return new Response(JSON.stringify({ error: 'Invalid input' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const prompt = `Please summarize the following texts into a cohesive markdown-formatted blog post:\n\n${texts.join(
			'\n\n'
		)}`;

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: prompt }],
			max_tokens: 1500
		});

		const content = response.choices[0]?.message?.content;
		const markdown = content ? content.trim() : '';

		if (!markdown) {
			return new Response(JSON.stringify({ error: 'No content received from OpenAI.' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(JSON.stringify({ markdown }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('OpenAI API Error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary';

		return new Response(JSON.stringify({ error: errorMessage }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
