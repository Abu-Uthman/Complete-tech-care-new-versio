#!/usr/bin/env tsx
/**
 * Professional Blog Post Rewriter
 * Transforms list-heavy technical content into engaging, flowing blog posts
 * Written by an expert with 30 years of blogging experience
 */

const WP_API_BASE = 'http://ctcbackend.local/wp-json/wp/v2';
const WP_USERNAME = 'admin';
const WP_PASSWORD = '123';

const CORE_WEBHUB_URL = 'https://corewebhub.com.au';
const CTC_BOOKING_URL = 'http://localhost:3003/book';
const CTC_RATES_URL = 'http://localhost:3003/rates';

/**
 * Convert pros/cons checkmark lists into flowing paragraph format
 */
function convertProsConsToNarrative(content: string): string {
  // Find sections with multiple checkmark/X paragraphs
  const prosConsPattern = /<p>(<strong>Pros:<\/strong>|<strong>Advantages:<\/strong>)<\/p>\s*(<p>✅[^<]*<\/p>\s*)+/g;

  content = content.replace(prosConsPattern, (match) => {
    const items = match.match(/<p>✅([^<]*)<\/p>/g) || [];
    const points = items.map(item => item.replace(/<p>✅\s*/, '').replace(/<\/p>/, '').trim());

    if (points.length > 0) {
      return `<p><strong>The key advantages are clear:</strong> ${points.join(', ')}, making this approach highly effective for the right scenarios.</p>\n\n`;
    }
    return match;
  });

  // Convert Cons/Risks sections
  const consPattern = /<p>(<strong>Cons:<\/strong>|<strong>Risks:<\/strong>)<\/p>\s*(<p>❌[^<]*<\/p>\s*)+/g;

  content = content.replace(consPattern, (match) => {
    const items = match.match(/<p>❌([^<]*)<\/p>/g) || [];
    const points = items.map(item => item.replace(/<p>❌\s*/, '').replace(/<\/p>/, '').trim());

    if (points.length > 0) {
      return `<p><strong>However, there are important considerations:</strong> ${points.join('; ')}.  These factors should be carefully evaluated before proceeding.</p>\n\n`;
    }
    return match;
  });

  return content;
}

/**
 * Convert short bullet lists into flowing paragraphs where appropriate
 */
function convertListsToParagraphs(content: string): string {
  // Target short lists (3-5 items) that would read better as sentences
  const shortListPattern = /<ul class="wp-block-list">\s*(<li>[^<]{10,100}<\/li>\s*){3,5}<\/ul>/g;

  content = content.replace(shortListPattern, (match) => {
    const items = match.match(/<li>([^<]*)<\/li>/g) || [];
    if (items.length === 0) return match;

    const points = items.map(item =>
      item.replace(/<li>/, '').replace(/<\/li>/, '').trim()
    );

    // Convert to flowing sentence
    if (points.length <= 3) {
      return `<p>${points.join(', ')}</p>\n\n`;
    } else if (points.length === 4) {
      return `<p>${points.slice(0, -1).join(', ')}, and ${points[points.length - 1]}</p>\n\n`;
    }

    return match; // Keep as list if too many items
  });

  return content;
}

/**
 * Add engaging introductory context before lists
 */
function addListContext(content: string): string {
  // Add context before remaining lists
  content = content.replace(
    /<h3 class="wp-block-heading">([^<]+)<\/h3>\s*<ul class="wp-block-list">/g,
    (match, heading) => {
      return `<h3 class="wp-block-heading">${heading}</h3>\n<p>Let's explore the key elements that make this approach successful:</p>\n<ul class="wp-block-list">`;
    }
  );

  return content;
}

/**
 * Improve paragraph flow and readability
 */
function enhanceParagraphFlow(content: string): string {
  // Add transitions between sections
  content = content.replace(
    /<\/p>\s*<h2 class="wp-block-heading">/g,
    '</p>\n\n<p>Now that we\'ve covered the fundamentals, let\'s dive deeper into the specifics.</p>\n\n<h2 class="wp-block-heading">'
  );

  return content;
}

/**
 * Add Core Webhub byline
 */
function addCoreWebHubByline(content: string): string {
  const byline = `
<div style="background: #F8FAFC; border-left: 4px solid #2563EB; padding: 16px 20px; margin: 32px 0; border-radius: 8px;">
  <p style="margin: 0; font-size: 14px; color: #64748B;">
    <strong>Professional Website:</strong> This booking and management <a href="${CORE_WEBHUB_URL}" target="_blank" rel="noopener" style="color: #2563EB; text-decoration: none; font-weight: 600;">system</a> was built by
    <a href="${CORE_WEBHUB_URL}" target="_blank" rel="noopener" style="color: #2563EB; text-decoration: none; font-weight: 600;">Core Webhub</a>
    - Melbourne's specialists in custom web applications and IT service provider solutions.
  </p>
</div>
`;

  if (content.includes('<h2')) {
    // Add before the last H2 (usually conclusion)
    const h2Positions = [];
    const h2Regex = /<h2[^>]*>/g;
    let match;
    while ((match = h2Regex.exec(content)) !== null) {
      h2Positions.push(match.index);
    }

    if (h2Positions.length > 0) {
      const lastH2Pos = h2Positions[h2Positions.length - 1];
      content = content.slice(0, lastH2Pos) + byline + content.slice(lastH2Pos);
    }
  }

  return content;
}

/**
 * Fetch post
 */
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

/**
 * Update post
 */
async function updatePost(postId: number, content: string) {
  const authHeader = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');

  const response = await fetch(`${WP_API_BASE}/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: content
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to update post ${postId}: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Professional Blog Content Rewriter\n');
  console.log('=' .repeat(60));

  const postIds = [18, 17, 16, 15]; // Start with MSP, Break/Fix, SLA, 5 Benefits (skip Equipment for now)

  for (const postId of postIds) {
    try {
      console.log(`\n📝 Processing Post ID ${postId}...`);

      const post = await getPost(postId);
      console.log(`   Title: ${post.title.rendered}`);

      let content = post.content.rendered;

      // Apply transformations
      console.log('   ✓ Converting pros/cons to narrative');
      content = convertProsConsToNarrative(content);

      console.log('   ✓ Converting short lists to paragraphs');
      content = convertListsToParagraphs(content);

      console.log('   ✓ Adding list context');
      content = addListContext(content);

      console.log('   ✓ Enhancing paragraph flow');
      content = enhanceParagraphFlow(content);

      console.log('   ✓ Adding Core Webhub byline');
      content = addCoreWebHubByline(content);

      // Update post
      await updatePost(postId, content);
      console.log('   ✅ Post updated successfully!');

      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`   ❌ Error processing post ${postId}:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Blog posts have been professionally rewritten!');
  console.log('\n📊 Improvements Applied:');
  console.log('   • Converted pros/cons lists to flowing narrative');
  console.log('   • Transformed short bullet points into sentences');
  console.log('   • Added contextual introductions to remaining lists');
  console.log('   • Enhanced paragraph transitions');
  console.log('   • Added Core Webhub professional byline');
  console.log('\n🌐 View posts at: http://localhost:3003/blog\n');
}

main().catch(console.error);
