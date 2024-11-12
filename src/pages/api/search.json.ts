import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
try {
const postFiles = import.meta.glob('../blog/*.{md,mdx}');
const posts = await Promise.all(
Object.entries(postFiles).map(async ([path, resolver]) => {
        const post = await resolver();
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
        'Cache-Control': 'max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating search data:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate search data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
