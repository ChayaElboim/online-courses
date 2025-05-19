export interface Course {
    id: number;
    title: string;
    description: string;
    teacherId: number; // או פרטים על המורה אם ה-Backend שולח אותם
    // שדות נוספים בהתאם למבנה הקורס שלך
  }