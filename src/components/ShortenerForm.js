import React, { useState } from "react";
import axios from "axios";

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const response = await axios.post("https://url-production-42af.up.railway.app/shorten", {
        originalUrl,
      });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten the URL. Please ensure it is valid.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Shortened URL copied to clipboard!");
  };

  return (
    <div className="shortener-container">
      <h1>🚀 URL Shortener</h1>
      <p>Paste your long URL below to generate a short and shareable link!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter a long URL..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {shortUrl && (
        <div className="result">
          <p>Shortened URL:</p>
          <div className="result-box">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button onClick={handleCopy}>📋 Copy</button>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ShortenerForm;
