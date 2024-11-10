import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ glob }) => {
  try {
    const posts = await glob('./blog/*.{md,mdx}');
    const searchData = posts.map(post => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      slug: post.frontmatter.slug,
      tags: post.frontmatter.tags || []
    }));

    return new Response(JSON.stringify(searchData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating search data:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate search data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};