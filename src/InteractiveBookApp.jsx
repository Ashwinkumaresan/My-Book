"use client"

import { useRef, useEffect, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import "bootstrap/dist/css/bootstrap.min.css"

const bookData = {
  title: "The Quiet Library",
  subtitle: "A short tale of late-night stories",
  author: "Ashwin K.",
  chapters: [
    {
      title: "Prologue",
      pages: [
        "Night had a way of tucking the city in like a soft blanket. The library, however, never quite slept.",
        "Shelves whispered the stories of a thousand lives; some in ink, some in memory.",
      ],
    },
    {
      title: "The Lantern",
      pages: [
        "Rhea found the lantern wedged between two encyclopedias. It hummed when she touched it.",
        "Light spilled like warm tea, and for a moment, the dust motes looked like tiny planets.",
      ],
    },
    {
      title: "Keeper's Note",
      pages: [
        'A scrawled note tucked into an atlas: "Keep what you borrow, return yourself."',
        "It was unclear if the note warned or invited. Rhea chose the latter.",
      ],
    },
  ],
}

function buildPages(data) {
  const pages = []
  pages.push({ type: "blank" })
  pages.push({ type: "cover", ...data })

  const toc = []
  let pageNumber = 3
  data.chapters.forEach((ch) => {
    toc.push({ title: ch.title, page: pageNumber })
    pageNumber += ch.pages.length
  })
  pages.push({ type: "toc", toc, pageNumber: 2 })

  let currentPageNum = 3
  data.chapters.forEach((ch) => {
    ch.pages.forEach((pg, idx) => {
      pages.push({
        type: "content",
        chapter: ch.title,
        text: pg,
        isFirstPage: idx === 0,
        pageNumber: currentPageNum,
      })
      currentPageNum++
    })
  })

  return pages
}

export default function EnhancedBookReader() {
  const pages = buildPages(bookData)
  const flipBook = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 450, height: 600 })

  useEffect(() => {
    const calculateDimensions = () => {
      const height = window.innerHeight * 0.9
      const aspectRatio = 0.75
      const width = height * aspectRatio
      setDimensions({ width, height })
    }

    calculateDimensions()
    window.addEventListener("resize", calculateDimensions)

    return () => {
      window.removeEventListener("resize", calculateDimensions)
    }
  }, [])

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center overflow-hidden bg-light">
      <div
        className="rounded-0 overflow-hidden shadow-lg position-relative"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          backgroundColor: "#fffef9",
        }}
      >
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          ref={flipBook}
          className="w-100 h-100"
          startPage={0}
          flippingTime={800}
          usePortrait={true}
          showPageCorners={true}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
        >
          {pages.map((p, i) => (
            <div className="book-page" key={i}>
              <BookPageContent page={p} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      <style>{css}</style>
    </div>
  )
}

function BookPageContent({ page }) {
  if (page.type === "blank") return <div className="blank-page" />

  if (page.type === "cover")
    return (
      <div className="cover-page text-center d-flex flex-column justify-content-around align-items-center h-100">
        <div>
          <div className="cover-ornament">❖</div>
          <h1 className="book-title">{page.title}</h1>
          <p className="book-subtitle">{page.subtitle}</p>
        </div>
        <div className="cover-image-placeholder">
          <svg width="85" height="85" viewBox="0 0 100 100" className="book-icon-svg">
            <rect x="20" y="15" width="60" height="70" rx="3" fill="#6b5d4f" opacity="0.6" />
            <rect x="25" y="20" width="50" height="60" rx="2" fill="#8b7d6b" opacity="0.5" />
            <line x1="50" y1="25" x2="50" y2="75" stroke="#6b5d4f" strokeWidth="1" opacity="0.7" />
          </svg>
        </div>
        <div>
          <p className="book-author mb-1">by {page.author}</p>
          <small className="text-muted">Est. 2025</small>
        </div>
      </div>
    )

  if (page.type === "toc")
    return (
      <div className="toc-page p-4 d-flex flex-column h-100 bg-white">
        <h2 className="chapter-heading text-center mb-5">Table of Contents</h2>
        <div className="flex-grow-1">
          {page.toc.map((t, idx) => (
            <div key={idx} className="d-flex justify-content-between align-items-center mb-3 toc-item px-2 py-1 rounded">
              <span className="toc-title">{t.title}</span>
              <hr className="flex-grow-1 mx-2 border-dotted text-secondary" />
              <span className="toc-page-num">{t.page}</span>
            </div>
          ))}
        </div>
        <div className="text-center text-secondary small mt-3">i</div>
      </div>
    )

  return (
    <div className="story-page d-flex flex-column h-100 p-4 bg-white position-relative">
      {page.isFirstPage && (
        <div className="chapter-header text-center mb-4">
          <div className="chapter-ornament mb-2">✦</div>
          <h2 className="chapter-title">{page.chapter}</h2>
          <div className="chapter-divider mx-auto my-3"></div>
        </div>
      )}
      <p className="story-text flex-grow-1">{page.text}</p>
      <div className="page-number position-absolute bottom-0 end-0 m-3 small text-secondary">{page.pageNumber}</div>
    </div>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Merriweather:wght@300;400;700&display=swap');

  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  /* Remove reflection under book */
  .stf__block::after,
  .stf__wrapper::after {
    display: none !important;
    box-shadow: none !important;
  }

  .book-page {
    background: linear-gradient(to bottom, #fffdf8 0%, #fffef9 50%, #fffdf8 100%);
    border: 1px solid #e6dcc9;
    overflow: hidden;
  }

  .cover-page {
    background: linear-gradient(135deg, #bfa98f 0%, #d4c4a8 50%, #bfa98f 100%);
    border: 8px solid #a89378;
  }

  .cover-ornament { font-size: 32px; color: #6b5d4f; }
  .book-title { font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 700; color: #2b2b2b; }
  .book-subtitle { font-family: 'Merriweather', serif; font-style: italic; color: #4a4238; font-size: 16px; }
  .book-author { font-family: 'Merriweather', serif; font-size: 18px; color: #2b2b2b; }

  .story-text {
    font-family: 'Merriweather', serif;
    font-size: 17px;
    line-height: 1.9;
    color: #2b2b2b;
    text-align: justify;
    text-indent: 30px;
  }

  .chapter-ornament { font-size: 28px; color: #bfa98f; }
  .chapter-divider { width: 80px; height: 2px; background: linear-gradient(to right, transparent, #bfa98f, transparent); }
  .toc-item:hover { background: rgba(191, 169, 143, 0.1); }
`
