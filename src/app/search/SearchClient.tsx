// src/app/search/SearchClient.tsx

'use client';

import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Course, Time } from '@/types';
import debounce from 'lodash.debounce';
import styles from './SearchClient.module.css'; // Ensure this CSS module exists

interface SearchClientProps {
  courses: Course[];
}

const SearchClient: React.FC<SearchClientProps> = ({ courses }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Debounced search function to improve performance
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setIsLoading(true);
      const lowerCaseQuery = searchTerm.toLowerCase();

      const results = courses.filter((course) => {
        const courseName = course.name.toLowerCase();
        const subjectCode = course.subject.toLowerCase();
        // Extract courseNumber from the first section
        const courseNumber = course.sections[0]?.courseNumber.toLowerCase() || '';

        return (
          courseName.includes(lowerCaseQuery) ||
          `${subjectCode} ${courseNumber}`.includes(lowerCaseQuery)
        );
      });

      setFilteredCourses(results);
      setIsLoading(false);
    }, 300),
    [courses]
  );

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCourses([]); // Clear results when query is empty
    } else {
      debouncedSearch(query);
    }

    // Cleanup the debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
    setFilteredCourses([]);
  };

  // Utility function to escape RegExp special characters
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Function to highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const escapedQuery = escapeRegExp(query);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index} className={styles.highlight}>
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Course Search</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="e.g., ADMS 1000 or Introduction to Business"
          value={query}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        {query && (
          <button onClick={handleClearSearch} className={styles.clearButton} aria-label="Clear search">
            Clear
          </button>
        )}
      </div>

      <div className={styles.results}>
        {query.trim() === '' ? (
          <p>Please enter a search term to find courses.</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : filteredCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <h2 className={styles.courseTitle}>
                {highlightText(
                  `${course.subject} ${
                    course.sections.length > 0 ? course.sections[0].courseNumber : 'N/A'
                  } - ${course.name}`,
                  query
                )}
              </h2>
              <p>Faculty: {course.faculty}</p>
              <p>Term: {course.term}</p>
              <div className={styles.sections}>
                {course.sections.map((section) => (
                  <div
                    key={section.id} // Using the unique section.id as the key
                    className={styles.sectionCard}
                  >
                    <h3 className={styles.sectionTitle}>
                      Section {highlightText(section.letter, query)} ({section.type})
                    </h3>
                    <p>Instructor: {section.instructor || 'TBA'}</p>
                    <p>Credits: {section.credits}</p>
                    <p>Language: {section.language}</p>
                    <p>Notes: {section.notes || 'None'}</p>
                    {section.times.length > 0 ? (
                      <ul>
                        {section.times.map((time: Time, index: number) => (
                          <li key={index}>
                            {time.day} {time.startTime} ({time.duration} mins) at {time.campus} {time.room}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No scheduled times.</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchClient;