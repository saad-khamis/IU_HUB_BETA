export const student = {
  id: 'DEMO0001',
  name: 'Demo Student',
  fullName: 'Demo Student User',
  username: 'demo',
  level: 2,
  faculty: 'Computers & Information Technology',
  major: 'Computer Science',
  degree: 'Bachelor',
  cgpa: 3.2,
  hours: 18,
  status: 'Active',
  passedCH: 42,
  gender: 'Male',
  nationality: 'Egyptian',
  email: 'demo@example.com',
  mobile: '+20 10 0000 0000',
  birthDate: '2005-01-01',
  nationalId: '00000000000000',
}

export const courseCatalog = [
  {
    code: 'CF227',
    title: 'Operating Systems',
    section: 'G2',
    method: 'LAB',
    ch: 3,
    instructor: 'Dr. Hanan Elsayed',
    status: 'Approved',
    payment: 'Paid',
  },
  {
    code: 'CF223',
    title: 'Computer Networks',
    section: 'G8',
    method: 'LEC',
    ch: 3,
    instructor: 'Dr. Hossam',
    status: 'Approved',
    payment: 'Paid',
  },
  {
    code: 'CF216',
    title: 'Data Structures',
    section: '01',
    method: 'LEC',
    ch: 3,
    instructor: 'Dr. Salma',
    status: 'Approved',
    payment: 'Paid',
  },
  {
    code: 'CF123',
    title: 'Discrete Mathematics',
    section: 'G1',
    method: 'Tutorial',
    ch: 3,
    instructor: 'Dr. Mona',
    status: 'Approved',
    payment: 'Unpaid',
  },
  {
    code: 'CF241',
    title: 'Database Systems',
    section: 'G3',
    method: 'LEC',
    ch: 3,
    instructor: 'Dr. Ahmed',
    status: 'Available',
    payment: 'Unpaid',
  },
  {
    code: 'CF251',
    title: 'Software Engineering',
    section: 'G4',
    method: 'LEC',
    ch: 3,
    instructor: 'Dr. Nada',
    status: 'Available',
    payment: 'Unpaid',
  },
  {
    code: 'CF261',
    title: 'Web Development',
    section: 'LAB2',
    method: 'LAB',
    ch: 3,
    instructor: 'Dr. Omar',
    status: 'Available',
    payment: 'Unpaid',
  },
]

export const lectures = [
  {
    id: 'CF227',
    title: 'Operating Systems',
    lectures: [
      { id: 'L1', title: 'Intro to OS', date: '2026-03-20' },
    ],
    sections: [
      { id: 'S1', instructor: 'TA Ahmed', time: '10:00 AM' },
    ],
  },
]

export const initialRegisteredCourseCodes = ['CF227', 'CF223', 'CF216', 'CF123']

export const initialPayments = [
  { id: 'PAY-1001', date: '20/03/2025', amount: 8000, status: 'Paid', receipt: '81234' },
  { id: 'PAY-1002', date: '04/10/2025', amount: 42000, status: 'Paid', receipt: '56271' },
  { id: 'PAY-1003', date: '01/02/2026', amount: 28000, status: 'Pending', receipt: '-' },
]

export const performanceTrend = [
  { semester: 'Spring 2024', cgpa: 2.7 },
  { semester: 'Fall 2024', cgpa: 2.9 },
  { semester: 'Spring 2025', cgpa: 3.0 },
  { semester: 'Fall 2025', cgpa: 3.1 },
  { semester: 'Spring 2026', cgpa: 3.2 },
]

export const gradeDistribution = [
  { label: 'A', value: 5 },
  { label: 'B+', value: 7 },
  { label: 'B', value: 6 },
  { label: 'C+', value: 3 },
  { label: 'C', value: 2 },
]
