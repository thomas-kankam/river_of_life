import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../../seo/SEO';
import { getArticleSchema, getBreadcrumbSchema } from '../../seo/schemas';
import { getBlogBySlug, getRelatedPosts } from '../../data/blogs';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import LazyImage from '../../components/ui/LazyImage';
import CTASection from '../../components/ui/CTASection';
import BlogArticleSidebar from '../../components/ui/BlogArticleSidebar';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) return <Navigate to="/404" replace />;

  const related = getRelatedPosts(slug);
  const sections = post.content.split('\n## ').filter(Boolean);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.image}
        jsonLd={[
          getArticleSchema(post),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <section className="pt-32 pb-12">
          <div className="container-custom">
            <Breadcrumbs items={[
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${post.slug}` },
            ]} />
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold text-royal-600">{post.category}</span>
              <h1 className="mt-3 font-heading text-4xl font-bold text-deep-900 sm:text-5xl">{post.title}</h1>
              <p className="mt-4 text-lg text-deep-500">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-deep-400">
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-royal-50 px-3 py-1 text-xs font-medium text-royal-700">{tag}</span>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl shadow-card">
              <LazyImage src={post.image} alt={post.title} className="aspect-[21/9]" />
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container-custom">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12">
              <BlogArticleSidebar sections={sections} title={post.title} />

              <div className="lg:col-span-9">
                <div className="max-w-none text-deep-600">
                  {sections.map((section) => {
                    const lines = section.split('\n');
                    const titleText = lines[0].replace(/^#+\s*/, '');
                    const id = slugify(titleText);
                    const body = lines.slice(1).join('\n').trim();
                    return (
                      <div key={id} id={id} className="mb-10 scroll-mt-28">
                        <h2 className="font-heading text-2xl font-bold text-deep-900">{titleText}</h2>
                        {body.split('\n\n').map((para) => (
                          <p key={para.slice(0, 40)} className="mt-4 text-lg leading-relaxed">{para}</p>
                        ))}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 rounded-2xl border border-deep-100 bg-deep-50 p-6">
                  <p className="font-semibold text-deep-900">{post.author}</p>
                  <p className="text-sm text-royal-600">{post.authorRole}</p>
                  <p className="mt-2 text-sm text-deep-500">Dedicated to helping families navigate home care with clarity and compassion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section-padding bg-deep-50">
            <div className="container-custom">
              <h2 className="font-heading text-2xl font-bold text-deep-900">Related Articles</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="group card-premium overflow-hidden p-0">
                    <LazyImage src={r.image} alt={r.title} className="aspect-video" />
                    <div className="p-5">
                      <h3 className="font-semibold text-deep-900 group-hover:text-royal-700">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection title="Need Personalized Care Guidance?" />
    </>
  );
}
