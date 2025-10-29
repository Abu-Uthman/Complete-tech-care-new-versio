import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Support & Smart-Hands Blog | CTC - Regional Victoria",
  description: "Expert insights on IT contractor services, smart-hands best practices, regional IT support, and technology trends for MSPs and service providers.",
  keywords: ["IT support blog", "smart hands tips", "MSP resources", "IT contractor insights", "regional IT support"],
  openGraph: {
    title: "IT Support & Smart-Hands Blog | CTC",
    description: "Expert insights on IT contractor services and smart-hands best practices",
    type: "website",
    url: "https://ctc.example.com/blog",
  },
};

// This will fetch blog posts from WordPress
async function getBlogPosts() {
  try {
    const apiBase = process.env.CTC_WP_API_BASE?.replace('/wp-json/ctc/v1', '') || 'http://ctcbackend.local';
    const res = await fetch(`${apiBase}/wp-json/wp/v2/posts?_embed&per_page=12`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!res.ok) {
      console.error('Failed to fetch blog posts');
      return [];
    }

    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-medium text-primary">Blog & Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              IT Support & Smart-Hands Insights
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Expert tips, industry insights, and best practices for MSPs, IT service providers, and technology professionals across regional Victoria.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <Card className="p-12 text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-text-tertiary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h2 className="text-2xl font-bold text-primary mb-2">No Blog Posts Yet</h2>
              <p className="text-text-secondary">
                Check back soon for expert insights and industry tips!
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => {
                const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                const author = post._embedded?.author?.[0]?.name || 'CTC Team';
                const date = new Date(post.date).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-border">
                      {featuredImage && (
                        <div className="relative w-full h-52 bg-bg-secondary overflow-hidden">
                          <Image
                            src={featuredImage}
                            alt={post.title.rendered.replace(/<[^>]*>/g, '')}
                            fill
                            unoptimized={true}
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <div className="flex items-center gap-3 text-sm text-text-tertiary mb-4">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{date}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{author}</span>
                          </div>
                        </div>
                        <h2
                          className="text-2xl font-bold text-primary mb-4 line-clamp-2 leading-tight"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <div
                          className="text-text-secondary text-base line-clamp-3 leading-relaxed mb-6"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                        <div className="flex items-center gap-2 text-secondary font-semibold text-base group-hover:gap-3 transition-all">
                          <span>Read Article</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bg-secondary border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-10 md:p-12 bg-primary text-white text-center border-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Regional IT Support?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                4-hour response guarantee across regional Victoria. Professional contractor services for ANY IT service provider.
              </p>
              <Link href="/book">
                <button className="h-12 px-8 text-base font-semibold bg-white text-primary rounded-md hover:bg-white/90">
                  Request Service
                </button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
