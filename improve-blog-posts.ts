#!/usr/bin/env tsx
/**
 * Professional Blog Post Formatter
 * Improves blog posts with SEO best practices, internal linking, and professional formatting
 */

const WP_API_BASE = 'http://ctcbackend.local/wp-json/wp/v2';
const WP_USERNAME = 'admin';
const WP_PASSWORD = '123';

const CORE_WEBHUB_URL = 'https://corewebhub.com.au';
const CTC_BOOKING_URL = 'http://localhost:3003/book';
const CTC_RATES_URL = 'http://localhost:3003/rates';

/**
 * Add Core Webhub byline to content
 */
function addCoreWebHubByline(content: string): string {
  const byline = `
<div style="background: #F8FAFC; border-left: 4px solid #2563EB; padding: 16px 20px; margin: 32px 0; border-radius: 8px;">
  <p style="margin: 0; font-size: 14px; color: #64748B;">
    <strong>Professional Website:</strong> This booking and management system was built by
    <a href="${CORE_WEBHUB_URL}" target="_blank" rel="noopener" style="color: #2563EB; text-decoration: none; font-weight: 600;">Core Webhub</a>
    - Melbourne's specialists in custom web applications and IT service provider solutions.
  </p>
</div>
`;

  // Add byline before the conclusion or at the end
  if (content.includes('<h2>Conclusion</h2>')) {
    return content.replace('<h2>Conclusion</h2>', byline + '<h2>Conclusion</h2>');
  }

  return content + byline;
}

/**
 * Add CTA boxes throughout content
 */
function addCTABoxes(content: string): string {
  // Add CTA after first major section
  const firstH2Match = content.match(/<h2>.*?<\/h2>/);
  if (firstH2Match) {
    const ctaBox = `
<div style="background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); color: white; padding: 24px; margin: 32px 0; border-radius: 12px; text-align: center;">
  <h3 style="color: white; margin: 0 0 12px 0; font-size: 20px;">Need 4-Hour Regional IT Support?</h3>
  <p style="margin: 0 0 16px 0; font-size: 16px; opacity: 0.95;">Professional smart-hands services across Victoria's regional hubs</p>
  <a href="${CTC_BOOKING_URL}" style="display: inline-block; background: white; color: #2563EB; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Request Service →</a>
</div>
`;

    // Find the end of the first section (next H2 or after a few paragraphs)
    const sections = content.split('<h2>');
    if (sections.length > 2) {
      sections[1] = sections[1] + ctaBox;
      content = sections.join('<h2>');
    }
  }

  return content;
}

/**
 * Break paragraphs into consistent 2-3 sentence chunks for professional readability
 */
function improveReadability(content: string): string {
  // Split content into paragraphs
  const paragraphs = content.split('</p>');

  const improved = paragraphs.map(para => {
    if (!para.includes('<p>')) return para;

    // Extract opening tag and text content
    const openTagMatch = para.match(/(<p[^>]*>)/);
    const openTag = openTagMatch ? openTagMatch[1] : '<p>';
    const text = para.replace(/<[^>]*>/g, '').trim();

    // Split into sentences
    const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];

    // If only 1-2 sentences, keep as is
    if (sentences.length <= 2) {
      return para;
    }

    // Break into 2-3 sentence chunks for consistent paragraph length
    const chunks: string[] = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const chunk = sentences.slice(i, Math.min(i + 2, sentences.length)).join(' ').trim();
      chunks.push(chunk);
    }

    // Return as multiple paragraphs with consistent formatting
    return chunks.map(chunk => `${openTag}${chunk}</p>`).join('\n\n');
  });

  return improved.join('</p>');
}

/**
 * Add internal links naturally
 */
function addInternalLinks(content: string, postTitle: string): string {
  // Add link to Core Webhub in first paragraph if tech/website mentioned
  if (content.match(/\b(website|web application|system|platform|technology)\b/i)) {
    content = content.replace(
      /(\b(?:website|web application|system|platform)s?\b)/i,
      (match) => `<a href="${CORE_WEBHUB_URL}" target="_blank" rel="noopener">${match}</a>`
    );
  }

  // Add link to booking page when "book" or "request" mentioned
  content = content.replace(
    /\b(request (?:a )?service|book (?:a )?(?:service|visit|call))\b/gi,
    (match) => `<a href="${CTC_BOOKING_URL}">${match}</a>`
  );

  // Add link to rates when pricing mentioned
  content = content.replace(
    /\b(view (?:our )?rates|pricing (?:information|details)?|service costs?)\b/gi,
    (match) => `<a href="${CTC_RATES_URL}">${match}</a>`
  );

  return content;
}

/**
 * Add professional callout boxes for tips
 */
function addTipBoxes(content: string): string {
  // Look for "Pro Tip", "Important", "Note", etc. and wrap in callout boxes
  const tipPatterns = [
    { regex: /<p><strong>(?:Pro Tip|Tip|💡 Tip):<\/strong>(.*?)<\/p>/gi, style: 'info' },
    { regex: /<p><strong>(?:Important|⚠️ Important|Warning):<\/strong>(.*?)<\/p>/gi, style: 'warning' },
    { regex: /<p><strong>(?:Best Practice|✅ Best Practice):<\/strong>(.*?)<\/p>/gi, style: 'success' }
  ];

  tipPatterns.forEach(({ regex, style }) => {
    const colors = {
      info: { bg: '#EFF6FF', border: '#2563EB', icon: '💡' },
      warning: { bg: '#FEF3C7', border: '#F59E0B', icon: '⚠️' },
      success: { bg: '#D1FAE5', border: '#10B981', icon: '✅' }
    };

    const { bg, border, icon } = colors[style as keyof typeof colors];

    content = content.replace(regex, (match, tipContent) => {
      return `
<div style="background: ${bg}; border-left: 4px solid ${border}; padding: 16px 20px; margin: 24px 0; border-radius: 8px;">
  <p style="margin: 0; font-size: 15px; line-height: 1.6;"><strong>${icon} Tip:</strong>${tipContent}</p>
</div>
`;
    });
  });

  return content;
}

/**
 * Fetch post by ID
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
 * Update post content
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
  console.log('🚀 Professional Blog Post Formatter\n');
  console.log('=' .repeat(60));

  // Post IDs to update (from WordPress)
  const postIds = [19, 18, 17, 16, 15]; // Equipment, MSP Partnership, Break/Fix, SLA, 5 Benefits

  for (const postId of postIds) {
    try {
      console.log(`\n📝 Processing Post ID ${postId}...`);

      // Fetch post
      const post = await getPost(postId);
      console.log(`   Title: ${post.title.rendered}`);

      let content = post.content.rendered;

      // Apply improvements
      console.log('   ✓ Breaking up long paragraphs');
      content = improveReadability(content);

      console.log('   ✓ Adding internal links');
      content = addInternalLinks(content, post.title.rendered);

      console.log('   ✓ Adding CTA boxes');
      content = addCTABoxes(content);

      console.log('   ✓ Adding tip boxes');
      content = addTipBoxes(content);

      console.log('   ✓ Adding Core Webhub byline');
      content = addCoreWebHubByline(content);

      // Update post
      await updatePost(postId, content);
      console.log('   ✅ Post updated successfully!');

      // Small delay between posts
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`   ❌ Error processing post ${postId}:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ All blog posts have been professionally formatted!');
  console.log('\n📊 Improvements Applied:');
  console.log('   • Shorter paragraphs for better readability');
  console.log('   • Internal links to Core Webhub and CTC services');
  console.log('   • Professional CTA boxes');
  console.log('   • Tip callout boxes');
  console.log('   • Core Webhub byline for branding');
  console.log('\n🌐 View posts at: http://localhost:3003/blog\n');
}

main().catch(console.error);
