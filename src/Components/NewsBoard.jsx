import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing.");
      return;
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles) {
          setArticles(data.articles);
        } else {
          console.error("Articles not found in the response.");
        }
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, [category]);

  return (
    <div>
      <h2 className="text-center mt-2 mb-3">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default NewsBoard;
