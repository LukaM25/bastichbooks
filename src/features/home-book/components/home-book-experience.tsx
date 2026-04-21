"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import type { PublishedBookCard } from "@/features/books/queries";
import {
  homeChapters,
  type HomeChapterDefinition,
  type HomeChapterId,
} from "@/features/home-book/config/chapters";
import { formatCurrency } from "@/lib/format";
import styles from "./home-book-experience.module.css";

type HomeBookExperienceProps = {
  featuredBooks: PublishedBookCard[];
  latestBooks: PublishedBookCard[];
};

type ChapterPreview = {
  numeral: string;
  title: string;
  reference: string;
  paragraphs: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

type BorderVariant = "corners" | "frame";

function buildChapterPreview(
  chapter: HomeChapterDefinition | null,
  featuredBooks: PublishedBookCard[],
  latestBooks: PublishedBookCard[],
): ChapterPreview {
  if (!chapter) {
    return {
      numeral: "I",
      title: "Schlage ein Kapitel auf",
      reference: "Hausnotiz",
      paragraphs: [
        "Diese Startseite ist jetzt nur noch das Buch selbst: Deckel links, Titelseite rechts, Inhaltsverzeichnis im Umschlag und das gewählte Kapitel auf der offenen Seite.",
        latestBooks.length > 0
          ? `Zuletzt veröffentlicht: ${latestBooks.map((book) => book.title).slice(0, 3).join(", ")}.`
          : "Sobald veröffentlichte Titel im Katalog stehen, tauchen sie auch hier als Teil des Buchs auf.",
        "Öffne das Inhaltsverzeichnis und wähle ein Kapitel. Die rechte Seite wechselt sofort auf die jeweilige Vorschau.",
      ],
    };
  }

  if (chapter.id === "buecher") {
    const featuredLine =
      featuredBooks.length > 0
        ? `Im Vordergrund: ${featuredBooks
            .slice(0, 2)
            .map((book) => `${book.title}${book.priceInCents ? ` (${formatCurrency(book.priceInCents)})` : ""}`)
            .join(", ")}.`
        : "Veröffentlichte Titel erscheinen hier automatisch, sobald sie im Adminbereich auf PUBLISHED stehen.";

    return {
      numeral: chapter.index,
      title: chapter.title,
      reference: chapter.kicker,
      paragraphs: [chapter.description, featuredLine, `Motive: ${chapter.motifs.join(", ")}.`],
      ctaHref: chapter.href,
      ctaLabel: "Zum Katalog",
    };
  }

  if (chapter.id === "bibliothek") {
    const libraryLine =
      latestBooks.length > 0
        ? `Die Bibliothek bündelt Käufe, Downloads und Rückkehrpunkte rund um ${latestBooks
            .slice(0, 2)
            .map((book) => book.title)
            .join(" und ")}.`
        : "Die Bibliothek bündelt Käufe, Downloads und Rückkehrpunkte in einem privaten Regal.";

    return {
      numeral: chapter.index,
      title: chapter.title,
      reference: chapter.kicker,
      paragraphs: [chapter.description, libraryLine, `Motive: ${chapter.motifs.join(", ")}.`],
      ctaHref: chapter.href,
      ctaLabel: "Zur Bibliothek",
    };
  }

  return {
    numeral: chapter.index,
    title: chapter.title,
    reference: chapter.kicker,
    paragraphs: [chapter.subtitle, chapter.description, `Motive: ${chapter.motifs.join(", ")}.`],
    ctaHref: chapter.href,
    ctaLabel: "Kapitel öffnen",
  };
}

export function HomeBookExperience({
  featuredBooks,
  latestBooks,
}: HomeBookExperienceProps) {
  const router = useRouter();
  const inputId = useId().replace(/:/g, "");
  const resetPageId = `${inputId}-page-1`;
  const openPageId = `${inputId}-page-2`;
  const resetInputRef = useRef<HTMLInputElement | null>(null);
  const openInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<HomeChapterId | null>(null);
  const [borderVariant, setBorderVariant] = useState<BorderVariant>("corners");

  const chapter = useMemo(
    () => homeChapters.find((entry) => entry.id === selectedChapter) ?? null,
    [selectedChapter],
  );
  const preview = useMemo(
    () => buildChapterPreview(chapter, featuredBooks, latestBooks),
    [chapter, featuredBooks, latestBooks],
  );

  function openBook() {
    openInputRef.current?.click();
  }

  function closeBook() {
    resetInputRef.current?.click();
  }

  function handleRightPageClick() {
    if (preview.ctaHref) {
      router.push(preview.ctaHref);
      return;
    }

    openBook();
  }

  return (
    <section
      className={`${styles.bookExperience} ${
        borderVariant === "corners" ? styles.bookExperienceCorners : styles.bookExperienceFrame
      }`}
    >
      <div className={styles.siteBorderLayer} aria-hidden>
        {borderVariant === "corners" ? (
          <>
            <span className={`${styles.siteBorderCorner} ${styles.siteBorderCornerTopLeft}`} />
            <span className={`${styles.siteBorderCorner} ${styles.siteBorderCornerTopRight}`} />
            <span className={`${styles.siteBorderCorner} ${styles.siteBorderCornerBottomLeft}`} />
            <span className={`${styles.siteBorderCorner} ${styles.siteBorderCornerBottomRight}`} />
          </>
        ) : (
          <>
            <span className={`${styles.siteBorderSide} ${styles.siteBorderSideLeft}`} />
            <span className={`${styles.siteBorderSide} ${styles.siteBorderSideRight}`} />
          </>
        )}
      </div>

      <div className={styles.borderChooser}>
        <button
          type="button"
          className={`${styles.borderChoice} ${
            borderVariant === "corners" ? styles.borderChoiceActive : ""
          }`}
          onClick={() => setBorderVariant("corners")}
        >
          Vine Corners
        </button>
        <button
          type="button"
          className={`${styles.borderChoice} ${
            borderVariant === "frame" ? styles.borderChoiceActive : ""
          }`}
          onClick={() => setBorderVariant("frame")}
        >
          Side Frame
        </button>
      </div>

      <div className={styles.cover}>
        <div className={styles.book}>
          <label htmlFor={openPageId} className={`${styles.bookPage} ${styles.bookPage1}`}>
            <div className={styles.coverArt}>
              <Image
                src="/cover_art.png"
                alt="Buchcover Gedanken unterwegs und stille Orte von Dom Bastich"
                fill
                priority
                sizes="(max-width: 720px) 92vw, 75vw"
                className={styles.coverImage}
              />
              <span className={styles.coverAssistiveText}>Inhalt öffnen</span>
            </div>
          </label>

          <div
            className={`${styles.bookPage} ${styles.bookPage4}`}
            onClick={handleRightPageClick}
            role="link"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleRightPageClick();
              }
            }}
            aria-label={preview.ctaHref ? `${preview.title} öffnen` : "Inhalt öffnen"}
          >
            <div className={styles.pageContent}>
              <h1 className={styles.pageContentTitle}>{preview.numeral}</h1>

              <div className={styles.pageContentBlockquote}>
                <p className={styles.pageContentBlockquoteText}>{preview.title}</p>
                <span className={styles.pageContentBlockquoteReference}>{preview.reference}</span>
              </div>

              <div className={styles.pageContentText}>
                {preview.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {preview.ctaHref && preview.ctaLabel ? (
                <div className={styles.pageContentAction}>
                  <span className={styles.pageContentLink}>
                    {preview.ctaLabel}
                  </span>
                </div>
              ) : (
                <div className={styles.pageContentAction}>
                  <span className={styles.pageContentLink}>
                    Inhalt öffnen
                  </span>
                </div>
              )}

              <div className={styles.pageNumber}>3</div>
            </div>
          </div>

          <input
            ref={resetInputRef}
            type="radio"
            name={`${inputId}-page`}
            id={resetPageId}
            className={styles.pageInput}
            defaultChecked
          />

          <input
            ref={openInputRef}
            type="radio"
            name={`${inputId}-page`}
            id={openPageId}
            className={styles.pageInput}
          />

          <label className={`${styles.bookPage} ${styles.bookPage2}`}>
            <div className={styles.bookPageFront}>
              <div className={styles.pageContent}>
                <h1 className={styles.pageContentBookTitle}>Bastich Books</h1>
                <h2 className={styles.pageContentAuthor}>Dom Bastich</h2>

                <p className={styles.pageContentCredits}>
                  Kapitel
                  <span>{homeChapters.length} Eingänge</span>
                </p>

                <p className={styles.pageContentCredits}>
                  Öffentliche Seiten
                  <span>Bücher und Kapitel</span>
                </p>

                <div className={styles.pageContentCopyright}>
                  <p>Digital Bookhouse</p>
                  <p>Berlin - MMXXVI</p>
                </div>
              </div>
            </div>

            <div className={styles.bookPageBack} onClick={closeBook}>
              <div className={styles.pageContent}>
                <div className={styles.contentsHeader}>
                  <h1 className={styles.pageContentTitle}>Contents</h1>
                  <button
                    type="button"
                    className={styles.closeBook}
                    onClick={(event) => {
                      event.stopPropagation();
                      closeBook();
                    }}
                  >
                    Close
                  </button>
                </div>

                <table className={styles.pageContentTable}>
                  <tbody>
                    {homeChapters.map((entry, index) => (
                      <tr
                        key={entry.id}
                        className={selectedChapter === entry.id ? styles.chapterRowActive : undefined}
                      >
                        <td align="left">{entry.index}</td>
                        <td align="left">
                          <button
                            type="button"
                            className={styles.chapterButton}
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedChapter(entry.id);
                            }}
                          >
                            {entry.title}
                          </button>
                        </td>
                        <td align="right">{index + 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className={styles.contentsNote}>
                  Wähle links ein Kapitel. Klicke rechts, um es zu betreten, oder links daneben,
                  um zurück zum Cover zu gehen.
                </p>

                <div className={styles.pageNumber}>2</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </section>
  );
}
