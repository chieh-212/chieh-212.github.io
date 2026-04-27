// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({ // 這裡可以簡化回 z.object
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        // heroImage: z.string().optional(), // 不再需要了
    }),
});

export const collections = { blog };