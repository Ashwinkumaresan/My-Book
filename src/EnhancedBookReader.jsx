import React, { useRef, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { BookPageContent } from "./BookPageContent";

const bookContent = {
  title: "The Quiet Library",
  subtitle: "A short tale of late-night stories",
  author: "Ashwin K.",
  chapters: [
    {
      title: "Cover",
      pages: ["Cover Page"],
      isCover: true,
    },
    {
      title: "Table of Contents",
      pages: ["Table of Contents"],
      isToc: true,
    },
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
        "A scrawled note tucked into an atlas: 'Keep what you borrow, return yourself.'",
        "It was unclear if the note warned or invited. Rhea chose the latter.",
      ],
    },
  ],
};

export function EnhancedBookReader() {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const allPages = bookContent.chapters.flatMap((ch) => ch.pages);

  const handlePageChange = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f9f5ef 0%, #fffdf8 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: '"Merriweather", serif',
      }}
    >
      {/* Ambient Lighting Effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "200%",
          height: "150%",
          background:
            "radial-gradient(circle at center top, rgba(255,255,255,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Book Container with Shadow */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: "relative",
          width: "90vw",
          height: "100vh",
          filter:
            "drop-shadow(0 60px 120px rgba(0, 0, 0, 0.35)) drop-shadow(0 30px 60px rgba(0, 0, 0, 0.15))",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoaded && (
            <HTMLFlipBook
              width={400}
              height={500}
              size="stretch"
              minWidth={315}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={handlePageChange}
              ref={bookRef}
              className="book-container"
              style={{ perspective: "1200px" }}
            >
              {allPages.map((pageContent, index) => (
                <BookPageContent
                  key={index}
                  pageNumber={index}
                  totalPages={allPages.length}
                  content={pageContent}
                  bookTitle={bookContent.title}
                  bookSubtitle={bookContent.subtitle}
                  bookAuthor={bookContent.author}
                  chapters={bookContent.chapters}
                  onChapterClick={(chapterIndex) => {
                    const pageIndex = bookContent.chapters
                      .slice(0, chapterIndex)
                      .reduce((sum, ch) => sum + ch.pages.length, 0);
                    bookRef.current?.pageFlip?.goToPage(pageIndex + 1);
                  }}
                />
              ))}
            </HTMLFlipBook>
          )}
        </div>
      </motion.div>

      {/* Page Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          position: "absolute",
          bottom: 20,
          right: 30,
          fontSize: "14px",
          color: "#2b2b2b",
          opacity: 0.6,
          fontFamily: '"Merriweather", serif',
        }}
      >
        Page {currentPage + 1}
      </motion.div>
    </motion.div>
  );
}
