import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
try {
const postFiles = import.meta.glob('../blog/*.{md,mdx}');
const posts = await Promise.all(
Object.keys(postFiles).map(async (path) => {
        const post = await postFiles[path]();
        return {
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          slug: post.frontmatter.slug,
          tags: post.frontmatter.tags || [],
          date: post.frontmatter.date
        };
      })
    );

    return new Response(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating posts data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate posts data' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
