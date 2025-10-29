#!/usr/bin/env tsx
/**
 * Fetch blog posts to analyze content structure
 */

const WP_API_BASE = 'http://ctcbackend.local/wp-json/wp/v2';
const WP_USERNAME = 'admin';
const WP_PASSWORD = '123';

async function getPost(postId: number) {
  const authHeader = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');

  const response = await fetch(`${WP_API_BASE}/posts/${postId}`, {
    headers: {
      'Authorization': authHeader
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post ${postId}: ${response.statusText}`);
  }

  return await response.json();
}

async function main() {
  const postIds = [19, 17, 16, 15];

  for (const postId of postIds) {
    const post = await getPost(postId);
    console.log(`\n${'='.repeat(80)}`);
    console.log(`POST ID ${postId}: ${post.title.rendered}`);
    console.log(`Slug: ${post.slug}`);
    console.log(`${'='.repeat(80)}\n`);
    console.log(post.content.rendered.substring(0, 2000));
    console.log('\n... (truncated)\n');
  }
}

main().catch(console.error);
