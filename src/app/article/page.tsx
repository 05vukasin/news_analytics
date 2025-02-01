"use client"; // Obavezno jer koristimo `localStorage` i `useEffect`

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header/component";
import Footer from "@/app/components/footer/component";
import "./style.css";
import { FaArrowLeft } from "react-icons/fa";
import defaultImage from "@/public/img/logo.png"; // Fallback slika

type AdditionalContent = {
  id: number;
  title: string;
  text: string;
};

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
    imageUrl?: string;
  };
  additionalContent?: AdditionalContent[];
};

const ArticlePage = () => {
  const router = useRouter();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    // 🔥 Učitavamo podatke iz `localStorage`
    const savedArticle = localStorage.getItem("selectedArticle");
    if (savedArticle) {
      setNewsItem(JSON.parse(savedArticle));
    } else {
      router.push("/"); // Ako nema podataka, vrati korisnika na početnu stranicu
    }
  }, [router]);

  if (!newsItem) {
    return <p>Loading article...</p>;
  }

  // 🔥 Ako nema slike ili je placeholder, koristi default logo
  const isPlaceholder =
    !newsItem.article.imageUrl ||
    newsItem.article.imageUrl === "https://via.placeholder.com/150";

  const articleImage = isPlaceholder ? defaultImage.src : newsItem.article.imageUrl;

  return (
    <div>
      <Header />
      <main className="articleScr-container">
        <button className="back-button" onClick={() => router.push("/")}>
          <FaArrowLeft /> Back
        </button>
        <div className="articleScr-content">
          <img src={articleImage} alt={newsItem.article.title} className="articleScr-image" />
          <h1 className="articleScr-title">{newsItem.article.title}</h1>
          <p className="articleScr-summary">{newsItem.article.summary}</p>
          <p className="articleScr-source">Source: {newsItem.article.source}</p>
          <p className="articleScr-published">
            Published on:{" "}
            {new Date(newsItem.article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {newsItem.additionalContent && (
            <div className="additional-content">
              {newsItem.additionalContent.map((content) => (
                <div key={content.id} className="content-sectionSrc">
                  <h2>{content.title}</h2>
                  <p>{content.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
