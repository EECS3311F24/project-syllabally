# /project/scripts/check_duplicates.py

from pathlib import Path
import json
import sys

def get_courses_json_path() -> Path:
    """
    Constructs the path to the courses.json file located in the public directory.
    
    Returns:
        Path: The absolute path to courses.json
    """
    # Get the absolute path to the current script
    script_path = Path(__file__).resolve()
    
    # Navigate to the project root by going up one directory from 'scripts'
    project_root = script_path.parent.parent
    
    # Define the path to 'public/courses.json'
    courses_json_path = project_root / 'public' / 'courses.json'
    
    return courses_json_path

def load_courses(courses_json_path: Path) -> list:
    """
    Loads the courses data from the JSON file.
    
    Args:
        courses_json_path (Path): The path to courses.json
    
    Returns:
        list: A list of course dictionaries
    """
    try:
        with courses_json_path.open('r', encoding='utf-8') as file:
            courses = json.load(file)
        return courses
    except FileNotFoundError:
        print(f"Error: The file {courses_json_path} does not exist.")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse JSON. {e}")
        sys.exit(1)

def check_duplicates(courses: list):
    """
    Checks for duplicate 'id's in courses and sections.
    
    Args:
        courses (list): A list of course dictionaries
    """
    # Check for duplicate Course IDs
    course_ids = set()
    duplicate_course_ids = set()
    
    for course in courses:
        course_id = course.get('id')
        if not course_id:
            print("Warning: A course is missing an 'id' field.")
            continue
        if course_id in course_ids:
            duplicate_course_ids.add(course_id)
        else:
            course_ids.add(course_id)
    
    if duplicate_course_ids:
        print("Duplicate Course IDs found:")
        for dup_id in duplicate_course_ids:
            print(f" - {dup_id}")
    else:
        print("No duplicate Course IDs found.")
    
    # Check for duplicate Section IDs
    section_ids = set()
    duplicate_section_ids = set()
    
    for course in courses:
        sections = course.get('sections', [])
        for section in sections:
            section_id = section.get('id')
            if not section_id:
                print(f"Warning: A section in course '{course.get('id')}' is missing an 'id' field.")
                continue
            if section_id in section_ids:
                duplicate_section_ids.add(section_id)
            else:
                section_ids.add(section_id)
    
    if duplicate_section_ids:
        print("\nDuplicate Section IDs found:")
        for dup_id in duplicate_section_ids:
            print(f" - {dup_id}")
    else:
        print("\nNo duplicate Section IDs found.")

def main():
    """
    Main function to execute the duplicate check.
    """
    courses_json_path = get_courses_json_path()
    courses = load_courses(courses_json_path)
    check_duplicates(courses)

if __name__ == "__main__":
    main()