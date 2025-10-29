import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const cleanTitle = post.title.rendered.replace(/<[^>]*>/g, '');
  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = post._embedded?.author?.[0]?.name || 'CTC Team';

  return {
    title: `${cleanTitle} | CTC Smart-Hands Blog`,
    description: cleanExcerpt,
    authors: [{ name: author }],
    keywords: post.tags || [],
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [author],
      images: featuredImage ? [{ url: featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanExcerpt,
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

async function getPostBySlug(slug: string) {
  try {
    const apiBase = process.env.CTC_WP_API_BASE?.replace('/wp-json/ctc/v1', '') || 'http://ctcbackend.local';
    const res = await fetch(
      `${apiBase}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      {
        next: { revalidate: 300 }
      }
    );

    if (!res.ok) {
      return null;
    }

    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = post._embedded?.author?.[0]?.name || 'CTC Team';
  const date = new Date(post.date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate Schema.org Article markup
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.rendered.replace(/<[^>]*>/g, ''),
    image: featuredImage || '',
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Complete Tech Care",
      logo: {
        "@type": "ImageObject",
        url: "https://ctc.example.com/logo.png",
      },
    },
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section with Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-96 bg-bg-secondary">
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              priority
              unoptimized={true}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-[1600px] mx-auto">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm text-text-tertiary">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">{post.title.rendered.replace(/<[^>]*>/g, '')}</span>
            </nav>

            {/* Article Header */}
            <header className="mb-12">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div className="flex items-center gap-4 text-base text-text-secondary">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 2z"
                    />
                  </svg>
                  <span>{date}</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="bg-white rounded-xl shadow-sm border border-border">
              <div className="p-8 md:p-12 lg:p-16">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:text-primary prose-headings:font-bold
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-6 prose-p:text-[17px]
                    prose-a:text-secondary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                    prose-strong:text-primary prose-strong:font-semibold
                    prose-ul:text-text-secondary prose-ul:my-6 prose-ul:space-y-2
                    prose-ol:text-text-secondary prose-ol:my-6 prose-ol:space-y-2
                    prose-li:my-2 prose-li:text-[17px] prose-li:leading-relaxed
                    prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                    prose-blockquote:border-l-4 prose-blockquote:border-secondary
                    prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8
                    prose-code:text-secondary prose-code:bg-bg-secondary
                    prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link href="/blog">
                <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold text-base">
                  ← Back to Blog
                </button>
              </Link>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="bg-bg-secondary border-t border-border py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-[1600px] mx-auto">
              <Card className="p-12 md:p-16 bg-primary text-white text-center border-0 rounded-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Need Professional IT Support?
                </h2>
                <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto">
                  4-hour response across regional Victoria. Professional contractor services for MSPs and IT service providers.
                </p>
                <Link href="/book">
                  <button className="h-14 px-10 text-lg font-semibold bg-white text-primary rounded-lg hover:bg-white/90 transition-colors">
                    Request Service
                  </button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
