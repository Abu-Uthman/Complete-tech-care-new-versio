#!/usr/bin/env tsx
/**
 * Fix blog posts: Convert markdown to HTML and update posts
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const WP_API_BASE = 'http://ctcbackend.local/wp-json/wp/v2';
const WP_USERNAME = 'admin';
const WP_PASSWORD = '123';

// Post IDs from WordPress
const posts = [
  { id: 15, filename: 'post-1-regional-smart-hands-benefits.md', title: '5 Benefits of Using Regional Smart-Hands Contractors for Your MSP' },
  { id: 16, filename: 'post-2-sla-response-times.md', title: 'Understanding SLA Response Times: 4-Hour Regional Coverage Explained' },
  { id: 17, filename: 'post-3-retail-it-breakfix.md', title: 'Break/Fix Services for Retail IT: POS, SCO, and Specialized Systems' },
  { id: 18, filename: 'post-4-msp-partnership-guide.md', title: 'MSP Smart-Hands Partnership Guide: Extending Your Reach Without Extra Staff' },
  { id: 19, filename: 'post-5-equipment-rollouts.md', title: 'Equipment Rollout Best Practices: Multi-Site Deployments in Regional Victoria' }
];

/**
 * Extract content after SEO metadata
 */
function extractContent(markdown: string): string {
  // Split on the first --- separator after metadata
  const firstSeparator = markdown.indexOf('---');
  if (firstSeparator === -1) return markdown;

  const afterFirst = markdown.substring(firstSeparator + 3);
  return afterFirst.trim();
}

function formatInline(text: string): string {
  let formatted = text;
  formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
  formatted = formatted.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  return formatted;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Convert markdown to WordPress Gutenberg blocks
 */
function markdownToGutenberg(markdown: string): string {
  const lines = markdown.split('\n');
  const blocks: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines
    if (line === '') {
      i++;
      continue;
    }

    // Code block
    if (line.startsWith('```')) {
      const language = line.substring(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```

      const codeContent = escapeHtml(codeLines.join('\n'));

      blocks.push('<!-- wp:code -->');
      blocks.push(`<pre class="wp-block-code"><code>${codeContent}</code></pre>`);
      blocks.push('<!-- /wp:code -->');
      blocks.push('');
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().substring(1).trim());
        i++;
      }

      const innerBlocks: string[] = [];
      let qIndex = 0;
      while (qIndex < quoteLines.length) {
        if (quoteLines[qIndex] === '') {
          qIndex++;
          continue;
        }

        if (quoteLines[qIndex].startsWith('- ') || quoteLines[qIndex].startsWith('* ')) {
          innerBlocks.push('<ul>');
          while (qIndex < quoteLines.length && (quoteLines[qIndex].startsWith('- ') || quoteLines[qIndex].startsWith('* '))) {
            const item = formatInline(quoteLines[qIndex].substring(2));
            innerBlocks.push(`<li>${item}</li>`);
            qIndex++;
          }
          innerBlocks.push('</ul>');
          continue;
        }

        const paragraphLines: string[] = [];
        while (
          qIndex < quoteLines.length &&
          quoteLines[qIndex] !== '' &&
          !quoteLines[qIndex].startsWith('- ') &&
          !quoteLines[qIndex].startsWith('* ')
        ) {
          paragraphLines.push(formatInline(quoteLines[qIndex]));
          qIndex++;
        }

        if (paragraphLines.length > 0) {
          innerBlocks.push(`<p>${paragraphLines.join(' ')}</p>`);
        }
      }

      blocks.push('<!-- wp:quote -->');
      blocks.push('<blockquote class="wp-block-quote">');
      blocks.push(innerBlocks.join('\n'));
      blocks.push('</blockquote>');
      blocks.push('<!-- /wp:quote -->');
      blocks.push('');
      continue;
    }

    // Markdown table
    if (/^\|.+\|$/.test(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headers = tableLines[0]
          .split('|')
          .map(cell => cell.trim())
          .filter(cell => cell !== '');
        const bodyLines = tableLines.slice(2);

        blocks.push('<!-- wp:table -->');
        blocks.push('<figure class="wp-block-table"><table>');
        blocks.push('<thead><tr>' + headers.map(h => `<th>${formatInline(h)}</th>`).join('') + '</tr></thead>');

        if (bodyLines.length > 0) {
          blocks.push('<tbody>');
          for (const bodyLine of bodyLines) {
            const cells = bodyLine
              .split('|')
              .map(cell => cell.trim())
              .filter(cell => cell !== '');
            if (cells.length === 0) continue;
            blocks.push('<tr>' + cells.map(c => `<td>${formatInline(c)}</td>`).join('') + '</tr>');
          }
          blocks.push('</tbody>');
        }

        blocks.push('</table></figure>');
        blocks.push('<!-- /wp:table -->');
        blocks.push('');
        continue;
      }
    }

    // H2 heading
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      const text = line.substring(3);
      blocks.push('<!-- wp:heading -->');
      blocks.push(`<h2 class="wp-block-heading">${formatInline(text)}</h2>`);
      blocks.push('<!-- /wp:heading -->');
      blocks.push('');
      i++;
      continue;
    }

    // H3 heading
    if (line.startsWith('### ')) {
      const text = line.substring(4);
      blocks.push('<!-- wp:heading {"level":3} -->');
      blocks.push(`<h3 class="wp-block-heading">${formatInline(text)}</h3>`);
      blocks.push('<!-- /wp:heading -->');
      blocks.push('');
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push('<!-- wp:list -->');
      blocks.push('<ul class="wp-block-list">');

      while (i < lines.length) {
        const listLine = lines[i].trim();
        if (!listLine.startsWith('- ') && !listLine.startsWith('* ')) break;

        let content = formatInline(listLine.substring(2));

        // Check for nested items
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        if (nextLine.trim().startsWith('  - ') || nextLine.trim().startsWith('  * ')) {
          blocks.push(`<li>${content}`);
          blocks.push('<ul>');
          i++;
          while (i < lines.length && (lines[i].trim().startsWith('  - ') || lines[i].trim().startsWith('  * '))) {
            let nestedContent = formatInline(lines[i].trim().substring(2).trim());
            blocks.push(`<li>${nestedContent}</li>`);
            i++;
          }
          blocks.push('</ul>');
          blocks.push('</li>');
          continue;
        }

        blocks.push(`<li>${content}</li>`);
        i++;
      }

      blocks.push('</ul>');
      blocks.push('<!-- /wp:list -->');
      blocks.push('');
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      blocks.push('<!-- wp:list {"ordered":true} -->');
      blocks.push('<ol class="wp-block-list">');

      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        let content = formatInline(lines[i].trim().replace(/^\d+\.\s/, ''));

        // Check for nested items
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        if (nextLine.trim().startsWith('  - ') || nextLine.trim().startsWith('   -')) {
          blocks.push(`<li>${content}`);
          blocks.push('<ul>');
          i++;
          while (i < lines.length && (lines[i].trim().startsWith('  - ') || lines[i].trim().startsWith('   -'))) {
            let nestedContent = formatInline(lines[i].trim().replace(/^\s*-\s/, ''));
            blocks.push(`<li>${nestedContent}</li>`);
            i++;
          }
          blocks.push('</ul>');
          blocks.push('</li>');
          continue;
        }

        blocks.push(`<li>${content}</li>`);
        i++;
      }

      blocks.push('</ol>');
      blocks.push('<!-- /wp:list -->');
      blocks.push('');
      continue;
    }

    // Horizontal rule
    if (line === '---') {
      blocks.push('<!-- wp:separator -->');
      blocks.push('<hr class="wp-block-separator has-alpha-channel-opacity"/>');
      blocks.push('<!-- /wp:separator -->');
      blocks.push('');
      i++;
      continue;
    }

    // Paragraph / default handling
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('### ') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('```') &&
      !/^\|.+\|$/.test(lines[i].trim())
    ) {
      paragraphLines.push(formatInline(lines[i].trim()));
      i++;
    }

    if (paragraphLines.length > 0) {
      const content = paragraphLines.join(' ');
      blocks.push('<!-- wp:paragraph -->');
      blocks.push(`<p>${content}</p>`);
      blocks.push('<!-- /wp:paragraph -->');
      blocks.push('');
      continue;
    }
  }

  return blocks.join('\n');
}

/**
 * Update a post
 */
async function updatePost(id: number, filename: string, title: string): Promise<void> {
  console.log(`\nUpdating Post ${id}: ${title}`);

  try {
    // Read and convert markdown
    const filePath = join(__dirname, 'blog-posts', filename);
    const markdown = readFileSync(filePath, 'utf-8');
    const content = extractContent(markdown);
    const gutenberg = markdownToGutenberg(content);

    console.log(`  Content length: ${gutenberg.length} characters`);

    // Update post
    const authHeader = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');

    const response = await fetch(`${WP_API_BASE}/posts/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: gutenberg
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`  ✗ Failed:`, error);
      return;
    }

    const result = await response.json();
    console.log(`  ✓ Updated successfully`);
    console.log(`  URL: ${result.link}`);

  } catch (error) {
    console.error(`  ✗ Error:`, error);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('Fixing blog post formatting...\n');
  console.log('='.repeat(60));

  for (const post of posts) {
    await updatePost(post.id, post.filename, post.title);
    // Small delay between updates
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ All posts updated!');
  console.log('\nView posts at: http://ctcbackend.local/wp-admin/edit.php');
  console.log('View blog at: http://localhost:3003/blog\n');
}

main().catch(console.error);
