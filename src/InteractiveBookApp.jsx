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
      const width = height * aspectRatio
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
          <div className="book-page text-center p-4 d-flex flex-column justify-content-center align-items-center">
            <h2 className="book-title mb-3">The Quiet Library</h2>
            <p className="book-subtitle mb-4">
              A short tale of late-night stories
            </p>
            <small className="text-muted">by Ashwin K.</small>
          </div>

          <div className="book-page p-4">
            <h4 className="chapter-title text-center mb-3">Prologue</h4>
            <p className="story-text">
              Night had a way of tucking the city in like a soft blanket. The
              library, however, never quite slept.
            </p>
          </div>

          <div className="book-page p-4">
            <h4 className="chapter-title text-center mb-3">The Lantern</h4>
            <p className="story-text">
              Rhea found the lantern wedged between two encyclopedias. It hummed
              when she touched it.
            </p>
          </div>

          <div className="book-page p-4">
            <h4 className="chapter-title text-center mb-3">Keeper's Note</h4>
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
  }

  .mobile-book-container {
    width: 100%;
    height: 100dvh;
    overflow: hidden;
  }

  .book-shell {
    border-radius: 10px;
    overflow: hidden;
  }

  .book-page {
    background: linear-gradient(to bottom, #fffdf8 0%, #fffef9 50%, #fffdf8 100%);
    border: 1px solid #e6dcc9;
    height: 100%;
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

  .stf__block::after,
  .stf__wrapper::after {
    display: none !important;
  }
`
