import React from "react";

export function BookPageContent({
  pageNumber,
  totalPages,
  content,
  bookTitle,
  bookSubtitle,
  bookAuthor,
  chapters,
  onChapterClick,
}) {
  const isCoverPage = pageNumber === 0;
  const isTocPage = pageNumber === 1;

  const styles = {
    page: {
      width: "100%",
      height: "100%",
      padding: "60px 50px",
      backgroundColor: "#fffdf8",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3CfeColorMatrix in='noise' type='saturate' values='0.3' /%3E%3C/filter%3E%3Crect width='100' height='100' fill='%23fffdf8' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E\")",
      backgroundSize: "200px 200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.02)",
      position: "relative",
      overflow: "hidden",
      fontFamily: '"Merriweather", serif',
      color: "#2b2b2b",
      lineHeight: 1.8,
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    coverTitle: {
      fontSize: "56px",
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      marginBottom: "16px",
      textAlign: "center",
      color: "#2b2b2b",
      letterSpacing: "-1px",
    },
    coverSubtitle: {
      fontSize: "20px",
      fontFamily: '"Merriweather", serif',
      fontStyle: "italic",
      marginBottom: "40px",
      textAlign: "center",
      color: "#5a5a5a",
      letterSpacing: "0.5px",
    },
    coverAuthor: {
      fontSize: "16px",
      fontFamily: '"Playfair Display", serif',
      textAlign: "center",
      color: "#7a7a7a",
      marginTop: "100px",
      letterSpacing: "1px",
    },
    monogram: {
      fontSize: "48px",
      fontFamily: '"Playfair Display", serif',
      color: "#bfa98f",
      marginBottom: "30px",
      opacity: 0.7,
    },
    chapterTitle: {
      fontSize: "28px",
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      marginBottom: "30px",
      color: "#2b2b2b",
      borderBottom: "2px solid #bfa98f",
      paddingBottom: "12px",
    },
    chapterText: {
      fontSize: "16px",
      lineHeight: 1.8,
      color: "#2b2b2b",
      textAlign: "justify",
      marginBottom: "24px",
    },
    tocContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    tocTitle: {
      fontSize: "32px",
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      marginBottom: "30px",
      color: "#2b2b2b",
      textAlign: "center",
      borderBottom: "2px solid #bfa98f",
      paddingBottom: "12px",
    },
    tocItem: {
      fontSize: "16px",
      padding: "12px 16px",
      cursor: "pointer",
      color: "#2b2b2b",
      borderLeft: "3px solid transparent",
      paddingLeft: "16px",
      transition: "all 0.3s ease",
    },
    pageFooter: {
      fontSize: "12px",
      color: "#8a8a8a",
      textAlign: "center",
      paddingTop: "20px",
      borderTop: "1px solid #e5e5e5",
    },
    decorativeLine: {
      height: "1px",
      background: "linear-gradient(to right, transparent, #bfa98f, transparent)",
      margin: "30px 0",
    },
  };

  // Cover Page
  if (isCoverPage) {
    return (
      <div style={styles.page}>
        <div style={styles.content}>
          <div style={styles.monogram}>✦</div>
          <h1 style={styles.coverTitle}>{bookTitle}</h1>
          <p style={styles.coverSubtitle}>{bookSubtitle}</p>
          <div style={styles.decorativeLine} />
          <p style={styles.coverAuthor}>by {bookAuthor}</p>
        </div>
      </div>
    );
  }

  // Table of Contents Page
  if (isTocPage) {
    return (
      <div style={styles.page}>
        <div style={styles.content}>
          <h2 style={styles.tocTitle}>Table of Contents</h2>
          <div style={styles.tocContainer}>
            {chapters.map((chapter, index) => (
              <div
                key={index}
                style={styles.tocItem}
                onClick={() => onChapterClick(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = "#bfa98f";
                  e.currentTarget.style.paddingLeft = "24px";
                  e.currentTarget.style.backgroundColor =
                    "rgba(191, 169, 143, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = "transparent";
                  e.currentTarget.style.paddingLeft = "16px";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {chapter.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Regular Content Page
  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <div>
          <h2 style={styles.chapterTitle}>
            {chapters[Math.floor(pageNumber / 2)]?.title || "Story"}
          </h2>
          <p style={styles.chapterText}>{content}</p>
        </div>
      </div>
      <div style={styles.pageFooter}>
        <span style={{ color: "#bfa98f" }}>✦ {pageNumber + 1} ✦</span>
      </div>
    </div>
  );
}
