import { defineCollection, z } from 'astro:content';

const people = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		name: z.string(),
        description: z.string().optional(),
        avatar: z.string().optional(),
        personal_site: z.string().url().optional(),
		company: z.string().optional(),
        company_site: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        github: z.string().url().optional(),
	}),
});

export const collections = { people };
