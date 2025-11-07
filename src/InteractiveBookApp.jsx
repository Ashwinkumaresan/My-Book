"use client"

import { useEffect, useRef, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import "bootstrap/dist/css/bootstrap.min.css"

export default function MobileBookView() {
  const flipBook = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 320, height: 480 })

  useEffect(() => {
    const calculateDimensions = () => {
      const viewportHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight
      const height = viewportHeight * 0.95
      const aspectRatio = 0.7
      const width = Math.min(height * aspectRatio, window.innerWidth * 0.9)
      setDimensions({ width, height })
    }

    calculateDimensions()
    window.addEventListener("resize", calculateDimensions)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", calculateDimensions)
    }

    return () => {
      window.removeEventListener("resize", calculateDimensions)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", calculateDimensions)
      }
    }
  }, [])

  return (
    <div className="mobile-book-container d-flex justify-content-center align-items-center bg-light">
      <div
        className="book-shell shadow-lg position-relative rounded"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          backgroundColor: "#fffef9",
        }}
      >
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          showCover={true}
          drawShadow={true}
          maxShadowOpacity={0.5}
          flippingTime={700}
          usePortrait={true}
          swipeDistance={30}
          ref={flipBook}
          className="w-100 h-100"
        >
          {/* ✅ COVER PAGE */}
          <div className="book-page text-center p-4 d-flex flex-column justify-content-center align-items-center">
            <h2 className="book-title mb-3">The Quiet Library</h2>
            <p className="book-subtitle mb-4">
              A short tale of late-night stories
            </p>
            <small className="text-muted">by Ashwin K.</small>
          </div>

          {/* ✅ TABLE OF CONTENTS */}
          <div className="book-page p-4 d-flex flex-column bg-white">
            <h3 className="chapter-title text-center mb-4">Table of Contents</h3>
            <div className="toc-list">
              <div className="toc-item">
                <span className="toc-title">Prologue</span>
                <span className="toc-dots"></span>
                <span className="toc-page">3</span>
              </div>
              <div className="toc-item">
                <span className="toc-title">The Lantern</span>
                <span className="toc-dots"></span>
                <span className="toc-page">5</span>
              </div>
              <div className="toc-item">
                <span className="toc-title">Keeper’s Note</span>
                <span className="toc-dots"></span>
                <span className="toc-page">7</span>
              </div>
            </div>
          </div>

          {/* ✅ CHAPTER 1 */}
          <div className="book-page p-4">
            <div className="chapter-header text-center mb-3">
              <div className="ornament mb-2">
                <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 10L60 30L80 40L60 50L50 70L40 50L20 40L40 30L50 10Z"
                    fill="#6b5d4f"
                  />
                </svg>
              </div>
              <h4 className="chapter-title">Prologue</h4>
            </div>
            <p className="story-text">
              Night had a way of tucking the city in like a soft blanket. The
              library, however, never quite slept.
            </p>
          </div>

          {/* ✅ CHAPTER 2 */}
          <div className="book-page p-4">
            <div className="chapter-header text-center mb-3">
              <div className="ornament mb-2">
                <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 10L60 30L80 40L60 50L50 70L40 50L20 40L40 30L50 10Z"
                    fill="#6b5d4f"
                  />
                </svg>
              </div>
              <h4 className="chapter-title">The Lantern</h4>
            </div>
            <p className="story-text">
              Rhea found the lantern wedged between two encyclopedias. It hummed
              when she touched it.
            </p>
          </div>

          {/* ✅ CHAPTER 3 */}
          <div className="book-page p-4">
            <div className="chapter-header text-center mb-3">
              <div className="ornament mb-2">
                <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M50 10L60 30L80 40L60 50L50 70L40 50L20 40L40 30L50 10Z"
                    fill="#6b5d4f"
                  />
                </svg>
              </div>
              <h4 className="chapter-title">Keeper’s Note</h4>
            </div>
            <p className="story-text">
              A scrawled note tucked into an atlas: “Keep what you borrow,
              return yourself.”
            </p>
          </div>
        </HTMLFlipBook>
      </div>

      <style>{css}</style>
    </div>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Merriweather:wght@300;400&display=swap');

  html, body {
    margin: 0;
    padding: 0;
    height: 100dvh;
    overflow: hidden;
    background: #faf8f5;
    width: 100%;
  }

  .mobile-book-container {
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #faf8f5;
  }

  .book-shell {
    border-radius: 10px;
    overflow: hidden;
    max-width: 95vw;
  }

  .book-page {
    background: linear-gradient(to bottom, #fffdf8 0%, #fffef9 50%, #fffdf8 100%);
    border: 1px solid #e6dcc9;
    height: 100%;
    width: 100%;
  }

  /* Ornament above chapter */
  .ornament svg {
    opacity: 0.85;
  }

  .book-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #2b2b2b;
  }

  .book-subtitle {
    font-family: 'Merriweather', serif;
    font-size: 14px;
    color: #4a4238;
    font-style: italic;
  }

  .chapter-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #2b2b2b;
  }

  .story-text {
    font-family: 'Merriweather', serif;
    font-size: 15px;
    line-height: 1.8;
    color: #2b2b2b;
    text-align: justify;
  }

  /* ✅ Table of Contents styling */
  .toc-list {
    width: 100%;
  }

  .toc-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Merriweather', serif;
    font-size: 15px;
    color: #4a4238;
    margin-bottom: 10px;
    position: relative;
  }

  .toc-title {
    flex-shrink: 0;
  }

  .toc-dots {
    flex-grow: 1;
    border-bottom: 1px dotted #bfa98f;
    margin: 0 8px;
    opacity: 0.7;
  }

  .toc-page {
    flex-shrink: 0;
  }

  .stf__block::after,
  .stf__wrapper::after {
    display: none !important;
  }
`
