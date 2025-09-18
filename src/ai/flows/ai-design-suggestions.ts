'use server';

/**
 * @fileOverview An AI-powered design suggestion flow for neon LED designs.
 *
 * - aiDesignSuggestions - A function that takes business details, product information, and desired mood as input and suggests tailored neon LED design elements, layouts, color schemes, and relevant SEO keywords.
 * - AiDesignSuggestionsInput - The input type for the aiDesignSuggestions function.
 * - AiDesignSuggestionsOutput - The return type for the aiDesignSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDesignSuggestionsInputSchema = z.object({
  prompt: z.string().describe('A freeform description of the business, product, desired mood, and any ideas the user has.'),
});
export type AiDesignSuggestionsInput = z.infer<typeof AiDesignSuggestionsInputSchema>;

const AiDesignSuggestionsOutputSchema = z.object({
  designElements: z.string().describe('Suggested neon LED design elements.'),
  layoutSuggestions: z.string().describe('Suggestions for the layout of the neon LED design.'),
  colorSchemeSuggestions: z.string().describe('Suggested color schemes for the neon LED design.'),
  imageUrl: z.string().describe('A data URI of a generated image representing the design concept.'),
});
export type AiDesignSuggestionsOutput = z.infer<typeof AiDesignSuggestionsOutputSchema>;

export async function aiDesignSuggestions(input: AiDesignSuggestionsInput): Promise<AiDesignSuggestionsOutput> {
  return aiDesignSuggestionsFlow(input);
}

const suggestionsPrompt = ai.definePrompt({
  name: 'aiDesignSuggestionsPrompt',
  input: {schema: AiDesignSuggestionsInputSchema},
  output: {
    schema: AiDesignSuggestionsOutputSchema.pick({
      designElements: true,
      layoutSuggestions: true,
      colorSchemeSuggestions: true,
    }),
  },
  prompt: `You are an AI assistant specializing in neon LED design. A user will provide a description of their business, product, desired mood, or general idea for their space. Based on this information, suggest tailored neon LED design elements, layouts, and color schemes.

User's Idea: {{{prompt}}}

Provide the suggestions in a clear and concise manner.

Design Elements: 
Layout Suggestions: 
Color Scheme Suggestions:`,
});

const aiDesignSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiDesignSuggestionsFlow',
    inputSchema: AiDesignSuggestionsInputSchema,
    outputSchema: AiDesignSuggestionsOutputSchema,
  },
  async input => {
    const [suggestionsResponse, imageResponse] = await Promise.all([
      suggestionsPrompt(input),
      ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Generate a high-quality, photorealistic image of a neon LED sign based on the following description. The sign should be the main focus, well-lit, and in an appropriate setting (like a store, office, or cafe wall). Description: ${input.prompt}`,
        config: {
          aspectRatio: '1:1',
        },
      }),
    ]);

    const suggestions = suggestionsResponse.output!;
    const imageUrl = imageResponse.media.url;

    return {
      ...suggestions,
      imageUrl,
    };
  }
);