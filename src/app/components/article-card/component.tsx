"use client";

import { useRouter } from "next/navigation";
import "./style.css";
import defaultImage from "@/public/img/logo.png"; // Fallback image

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
  additionalContent?: { id: number; title: string; text: string }[];
};

type ArticleCardProps = {
  newsItem: NewsItem;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ newsItem }) => {
  const router = useRouter();

  // Helper function to validate the image URL
  const validateImageUrl = (url: string | undefined): string => {
    if (url && url.startsWith("http") && /\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
      return url;
    }
    return typeof defaultImage === "string" ? defaultImage : defaultImage.src;
  };

  const handleReadMore = () => {
    // 🔥 Čuvamo ceo objekat članka u `localStorage`
    localStorage.setItem("selectedArticle", JSON.stringify(newsItem));
    router.push("/article"); // Idemo na stranicu članka
  };

  return (
    <div className="article-card">
      <div className="article-image-container">
        <img
          src={validateImageUrl(newsItem.article.imageUrl)}
          alt={newsItem.article.title}
          className="article-image"
        />
      </div>
      <div className="article-content">
        <h2 className="article-title">{newsItem.article.title}</h2>
        <p className="article-summary">{newsItem.article.summary}</p>
        <p className="article-source">Source: {newsItem.article.source}</p>
        <p className="article-published">
          Published on:{" "}
          {new Date(newsItem.article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <button className="read-more-link" onClick={handleReadMore}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
