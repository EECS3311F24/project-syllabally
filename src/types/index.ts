// src/types/index.ts

export interface Time {
  day: string;
  startTime: string;
  duration: string; // Consider changing to number if it's always numeric
  campus: string;
  room: string;
}

export interface Section {
  id: string; // Unique identifier, e.g., "ADMS-1000-N51Y01-A"
  letter: string; // Section letter, e.g., "A"
  term: string; // Term code, e.g., "F" for Fall
  session: string; // Session code, e.g., "FW" for Fall-Winter
  year: string; // Year, e.g., "2024"
  courseNumber: string; // Course number, e.g., "1000"
  credits: string; // Credits, e.g., "3.00"
  language: string; // Language code, e.g., "EN" for English
  type: string; // Section type, e.g., "LECT" for Lecture
  meetNumber: string; // Meeting number, e.g., "01"
  catalogueCode: string; // Catalogue code, e.g., "N51Y01" or "Cancelled"
  times: Time[]; // Array of meeting times
  instructor: string; // Instructor name
  notes: string; // Additional notes
}

export interface Course {
  id: string; // Unique course identifier, e.g., "ADMS-1000-Introduction to Business"
  subject: string; // Subject code, e.g., "ADMS"
  courseNumber: string; // Course number, e.g., "1000"
  name: string; // Course name, e.g., "Introduction to Business"
  faculty: string; // Faculty code, e.g., "AP"
  term: string; // Term code, e.g., "F" for Fall
  sections: Section[]; // Array of sections
}