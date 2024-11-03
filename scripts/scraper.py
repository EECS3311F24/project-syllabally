import os
from bs4 import BeautifulSoup
import json

# Get the directory where the script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the resources directory
RESOURCES_DIR = os.path.join(SCRIPT_DIR, '..', 'resources')

# Construct the path to the public directory
PUBLIC_DIR = os.path.join(SCRIPT_DIR, '..', 'public')

# List of HTML file names
HTML_FILES = [
    "FW2024AP.html",
    "FW2024LE.html"
]

# Construct full paths to the HTML files
HTML_FILE_PATHS = [os.path.join(RESOURCES_DIR, file_name) for file_name in HTML_FILES]

courses = []

for file_path in HTML_FILE_PATHS:
    file_name = os.path.basename(file_path)
    print(f"Processing {file_path}")

    # Extract session and year from the file name
    session_year = os.path.splitext(file_name)[0]  # Removes the .html extension
    session = session_year[:2]
    year = session_year[2:6]

    # Read the HTML content from the local file with correct encoding
    try:
        with open(file_path, "r", encoding="utf-16") as f:
            html_content = f.read()
        print(f"Successfully read {file_name}")
    except UnicodeError as e:
        print(f"Failed to read {file_name}: {e}")
        continue

    # Parse the HTML content with 'html5lib' parser
    soup = BeautifulSoup(html_content, 'html5lib')

    # Find the main table
    table = soup.find('table')
    if not table:
        print(f"No table found in {file_name}")
        continue

    # Get all rows from the table
    rows = table.find_all('tr')

    # Skip the header row
    rows = rows[1:]

    course = None
    section = None

    # Define header titles to skip
    header_titles = ['Fac', 'Faculty', 'Day', 'Term', 'Course ID', 'Dept', 'Time', 'Dur', 'Campus', 'Course Outline']

    for row in rows:
        columns = row.find_all('td', recursive=False)
        if not columns:
            continue  # Skip empty rows

        # Get the text from the first column
        first_col_text = columns[0].get_text(strip=True)

        # Skip the row if it contains header titles
        if first_col_text in header_titles:
            continue

        # Check for course row
        if len(columns) >= 4 and columns[0].find('strong'):
            # This is a new course
            faculty = columns[0].get_text(strip=True)
            subject = columns[1].get_text(strip=True)
            term = columns[2].get_text(strip=True)
            course_name = columns[3].get_text(strip=True)
            course = {
                'faculty': faculty,
                'subject': subject,
                'term': term,
                'name': course_name,
                'sections': []
            }
            courses.append(course)
            section = None  # Reset current section
        elif len(columns) >= 8:
            # Check for colspan
            colspan = columns[0].get('colspan')
            if colspan:
                index_offset = 1
            else:
                index_offset = 0

            # Extract and split number_credits_section
            number_credits_section = columns[index_offset].get_text(separator=' ', strip=True)
            num_credit_sect = number_credits_section.split()

            if len(num_credit_sect) >= 3:
                course_number = num_credit_sect[0]
                credits = num_credit_sect[1]
                section_letter = num_credit_sect[2]

                # Validate that credits is a number
                if not credits.replace('.', '', 1).isdigit():
                    print(f"Invalid credits value: '{credits}'")
                    continue

                language = columns[index_offset + 1].get_text(strip=True)
                type_ = columns[index_offset + 2].get_text(strip=True)
                meet_number = columns[index_offset + 3].get_text(strip=True)
                cat_no = columns[index_offset + 4].get_text(strip=True)

                # Initialize times, instructor, and notes
                times = []
                instructor = ''
                notes = ''

                # Check for 'Cancelled' in cat_no or absence of time_table
                time_column = columns[index_offset + 5] if len(columns) > index_offset + 5 else None
                time_table = time_column.find('table') if time_column else None

                if cat_no == 'Cancelled' or not time_table:
                    # No time table; adjust indices
                    instructor_idx = index_offset + 5
                    notes_idx = index_offset + 6
                else:
                    # Extract time and location
                    time_rows = time_table.find_all('tr')
                    for time_row in time_rows:
                        time_columns = time_row.find_all('td')
                        if len(time_columns) == 5:
                            day = time_columns[0].get_text(strip=True)
                            start_time = time_columns[1].get_text(strip=True)
                            duration = time_columns[2].get_text(strip=True)
                            campus = time_columns[3].get_text(strip=True)
                            room = time_columns[4].get_text(strip=True)
                            times.append({
                                'day': day,
                                'startTime': start_time,
                                'duration': duration,
                                'campus': campus,
                                'room': room
                            })
                    instructor_idx = index_offset + 6
                    notes_idx = index_offset + 7

                # Extract instructor and notes
                instructor = columns[instructor_idx].get_text(strip=True) if len(columns) > instructor_idx else ''
                notes = columns[notes_idx].get_text(strip=True) if len(columns) > notes_idx else ''

                # Generate unique ID by combining subject, courseNumber, and catalogueCode
                unique_id = f"{subject}-{course_number}-{cat_no}-{section_letter}"

                # Build section data
                section = {
                    'id': unique_id, # Unique identifier
                    'letter': section_letter,
                    'term': course['term'],
                    'session': session,
                    'year': year,
                    'courseNumber': course_number,
                    'credits': credits,
                    'language': language,
                    'type': type_,
                    'meetNumber': meet_number,
                    'catalogueCode': cat_no,
                    'times': times,
                    'instructor': instructor,
                    'notes': notes
                }

                # Add section to course
                course['sections'].append(section)
            else:
                # Not a section row
                continue
        else:
            # Skip any rows that arent relevant
            pass

# After parsing all files, write the data to JSON
OUTPUT_FILE = os.path.join(PUBLIC_DIR, "courses.json")
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(courses, f, ensure_ascii=False, indent=4)

print(f"Finished writing courses to {OUTPUT_FILE}")