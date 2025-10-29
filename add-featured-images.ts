#!/usr/bin/env tsx
/**
 * Add featured images to blog posts
 */

const WP_API_BASE = 'http://ctcbackend.local/wp-json/wp/v2';
const WP_USERNAME = 'admin';
const WP_PASSWORD = '123';

// Professional stock images for each post theme
const postImages = [
  {
    id: 15,
    title: '5 Benefits of Using Regional Smart-Hands Contractors',
    // Business partnership/handshake - professional collaboration
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop',
    altText: 'Business professionals shaking hands in modern office'
  },
  {
    id: 16,
    title: 'Understanding SLA Response Times',
    // Clock/time management - SLA concept
    imageUrl: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1200&h=630&fit=crop',
    altText: 'Modern clock representing SLA response time management'
  },
  {
    id: 17,
    title: 'Break/Fix Services for Retail IT',
    // POS/retail technology
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&h=630&fit=crop',
    altText: 'Modern retail POS system and checkout technology'
  },
  {
    id: 18,
    title: 'MSP Smart-Hands Partnership Guide',
    // Business collaboration/teamwork
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=630&fit=crop',
    altText: 'Business team collaborating in modern workspace'
  },
  {
    id: 19,
    title: 'Equipment Rollout Best Practices',
    // Server room/data center/IT infrastructure
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop',
    altText: 'Modern data center server room with IT infrastructure'
  }
];

/**
 * Upload image from URL to WordPress media library
 */
async function uploadImage(imageUrl: string, altText: string, filename: string): Promise<number> {
  const authHeader = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');

  // Download image
  console.log(`  Downloading image...`);
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`Failed to download image: ${imageResponse.statusText}`);
  }

  const imageBlob = await imageResponse.blob();
  const arrayBuffer = await imageBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to WordPress
  console.log(`  Uploading to WordPress...`);
  const uploadResponse = await fetch(`${WP_API_BASE}/media`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': imageBlob.type,
      'Content-Disposition': `attachment; filename="${filename}"`
    },
    body: buffer
  });

  if (!uploadResponse.ok) {
    const error = await uploadResponse.json();
    throw new Error(`Upload failed: ${JSON.stringify(error)}`);
  }

  const media = await uploadResponse.json();

  // Update alt text
  await fetch(`${WP_API_BASE}/media/${media.id}`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      alt_text: altText
    })
  });

  return media.id;
}

/**
 * Set featured image for post
 */
async function setFeaturedImage(postId: number, mediaId: number): Promise<void> {
  const authHeader = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString('base64');

  const response = await fetch(`${WP_API_BASE}/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      featured_media: mediaId
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to set featured image: ${JSON.stringify(error)}`);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('Adding featured images to blog posts...\n');
  console.log('='.repeat(60));

  for (const post of postImages) {
    console.log(`\nPost ${post.id}: ${post.title}`);

    try {
      // Generate filename
      const filename = `post-${post.id}-featured.jpg`;

      // Upload image
      const mediaId = await uploadImage(post.imageUrl, post.altText, filename);
      console.log(`  ✓ Image uploaded (Media ID: ${mediaId})`);

      // Set as featured image
      await setFeaturedImage(post.id, mediaId);
      console.log(`  ✓ Featured image set`);

      // Small delay between posts
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`  ✗ Error:`, error);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ All featured images added!');
  console.log('\nView posts at: http://ctcbackend.local/wp-admin/edit.php\n');
}

main().catch(console.error);
