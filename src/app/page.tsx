import Header from "@/app/components/header/component";
import Footer from "@/app/components/footer/component";
import ArticleCard from "@/app/components/article-card/component";
import fs from "fs";
import path from "path";

type NewsItem = {
  id: number;
  status: string;
  userName: string;
  article: {
    title: string;
    url: string;
    summary: string;
    source: string;
    publishedAt: string;
    imageUrl: string;
  };
};

export default function HomePage() {
  const newsJsonPath = path.join(process.cwd(),"src","app", "data", "news.json");

  // Učitavanje vesti iz `news.json`
  let news: NewsItem[] = [];
  try {
    console.log("Reading news.json...");
    const jsonData = fs.readFileSync(newsJsonPath, "utf8");
    news = JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading news.json:", error);
  }

  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to News Analytics</h1>
        <p>Stay updated with the latest news!</p>
        {news.length === 0 ? (
          <p>No news available at the moment.</p>
        ) : (
          <div className="news-container">
            {news.map((newsItem) => (
              <ArticleCard key={newsItem.id} newsItem={newsItem} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}