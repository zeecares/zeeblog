import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ glob }) => {
  try {
    const posts = await glob('../blog/*.{md,mdx}');
    const searchData = await Promise.all(
      posts.map(async (post: any) => ({
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        slug: post.frontmatter.slug,
        tags: post.frontmatter.tags || [],
        date: post.frontmatter.date
      }))
    );

    return new Response(JSON.stringify(searchData), {
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