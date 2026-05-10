import {
  student,
  courseCatalog,
  initialPayments,
  initialRegisteredCourseCodes,
  performanceTrend,
  gradeDistribution,
} from './student.js'

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

let payments = [...initialPayments]
let registeredCourseCodes = [...initialRegisteredCourseCodes]

const MAX_HOURS = 18
const COURSE_FEE = 8000

function getRegisteredCoursesInternal() {
  return courseCatalog.filter((course) => registeredCourseCodes.includes(course.code))
.map((course) => ({
      ...course,
      payment: payments.some((payment) => payment.status === 'Pending')
        ? course.payment === 'Paid'
          ? course.payment
          : 'Pending'
        : course.payment,
      status: 'Approved',
    }))

}

function getAvailableCoursesInternal() {
  return courseCatalog.filter((course) => !registeredCourseCodes.includes(course.code))
}

function getRegisteredHoursInternal() {
  return getRegisteredCoursesInternal().reduce((sum, course) => sum + course.ch, 0)
}

function getPaidAmountInternal() {
  return payments
    .filter((payment) => payment.status === 'Paid')
    .reduce((sum, payment) => sum + payment.amount, 0)
}

function getOutstandingAmountInternal() {
  return payments
    .filter((payment) => payment.status === 'Pending')
    .reduce((sum, payment) => sum + payment.amount, 0)
}

function getPaymentStatusInternal() {
  const outstanding = getOutstandingAmountInternal()
  if (outstanding === 0) return 'Paid'
  if (getPaidAmountInternal() > 0) return 'Partially Paid'
  return 'Unpaid'
}

export async function getDashboardData() {
  await delay()
  return {
    student: {
      ...student,
      hours: getRegisteredHoursInternal(),
    },
    courses: getRegisteredCoursesInternal(),
    analytics: {
      performanceTrend,
      gradeDistribution,
      attendance: 91,
      completedCourses: 14,
      pendingFees: getOutstandingAmountInternal(),
    },
  }
}

export async function getProfileData() {
  await delay()
  return { student }
}

export async function getCoursesData(search = '') {
  await delay()
  const registeredCourses = getRegisteredCoursesInternal()

  if (!search.trim()) {
    return { courses: registeredCourses }
  }

  const query = search.trim().toLowerCase()

  return {
    courses: registeredCourses.filter(
      (course) =>
        course.code.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.method.toLowerCase().includes(query)
    ),
  }
}

export async function getRegistrationData(search = '') {
  await delay()

  const registeredCourses = getRegisteredCoursesInternal()
  const availableCourses = getAvailableCoursesInternal()
  const query = search.trim().toLowerCase()

  const filterCourses = (items) => {
    if (!query) return items
    return items.filter(
      (course) =>
        course.code.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query)
    )
  }

  return {
    summary: {
      academicLoad: getRegisteredHoursInternal(),
      approvedHours: getRegisteredHoursInternal(),
      registrationStatus: 'Approved',
      maxHours: MAX_HOURS,
    },
    registeredCourses: filterCourses(registeredCourses),
    availableCourses: filterCourses(availableCourses),
  }
}

export async function addCourse(courseCode) {
  await delay(700)

  const course = courseCatalog.find((item) => item.code === courseCode)

  if (!course) {
    throw new Error('Selected course was not found.')
  }

  if (registeredCourseCodes.includes(courseCode)) {
    throw new Error('This course is already registered.')
  }

  const nextHours = getRegisteredHoursInternal() + course.ch

  if (nextHours > MAX_HOURS) {
    throw new Error(`Cannot register more than ${MAX_HOURS} credit hours.`)
  }

  registeredCourseCodes = [...registeredCourseCodes, courseCode]

  const newPendingPayment = {
    id: `PAY-${Date.now()}`,
    date: new Date().toLocaleDateString('en-GB'),
    amount: COURSE_FEE,
    status: 'Pending',
    receipt: '-',
  }

  payments = [newPendingPayment, ...payments]

  return {
    registeredCourses: getRegisteredCoursesInternal(),
    availableCourses: getAvailableCoursesInternal(),
    hours: getRegisteredHoursInternal(),
  }
}

export async function dropCourse(courseCode) {
  await delay(700)

  if (!registeredCourseCodes.includes(courseCode)) {
    throw new Error('This course is not currently registered.')
  }

  registeredCourseCodes = registeredCourseCodes.filter((code) => code !== courseCode)

  const pendingIndex = payments.findIndex((payment) => payment.status === 'Pending')
  if (pendingIndex !== -1) {
    payments = payments.filter((_, index) => index !== pendingIndex)
  }
  return {
    registeredCourses: getRegisteredCoursesInternal(),
    availableCourses: getAvailableCoursesInternal(),
    hours: getRegisteredHoursInternal(),
  }
}

export async function getPaymentsData(search = '') {
  await delay()

  let filteredPayments = [...payments]

  if (search.trim()) {
    const query = search.trim().toLowerCase()
    filteredPayments = filteredPayments.filter(
      (payment) =>
        payment.date.toLowerCase().includes(query) ||
        String(payment.amount).includes(query) ||
        payment.status.toLowerCase().includes(query) ||
        payment.receipt.toLowerCase().includes(query)
    )
  }

  return {
    summary: {
      outstanding: getOutstandingAmountInternal(),
      paid: getPaidAmountInternal(),
      status: getPaymentStatusInternal(),
      lastPaymentDate:
        payments.find((payment) => payment.status === 'Paid')?.date || '—',
    },
    payments: filteredPayments,
  }
}

export async function payNow() {
  await delay(900)

  const pendingPayment = payments.find((payment) => payment.status === 'Pending')

  if (!pendingPayment) {
    throw new Error('There are no pending payments right now.')
  }

  const receipt = Math.floor(Math.random() * 90000 + 10000).toString()

  payments = payments.map((payment) =>
    payment.id === pendingPayment.id
      ? {
          ...payment,
          status: 'Paid',
          receipt,
          date: new Date().toLocaleDateString('en-GB'),
        }
      : payment
  )

  return {
    summary: {
      outstanding: getOutstandingAmountInternal(),
      paid: getPaidAmountInternal(),
      status: getPaymentStatusInternal(),
      lastPaymentDate:
        payments.find((payment) => payment.status === 'Paid')?.date || '—',
    },
    payments,
    receipt,
  }
}

export async function searchAppData(query) {
  await delay(250)

  const search = query.trim().toLowerCase()
  if (!search) return []

  const pages = [
    { label: 'Dashboard', path: '/dashboard', keywords: ['overview', 'cgpa', 'hours', 'summary'] },
    { label: 'Profile', path: '/profile', keywords: ['student', 'email', 'mobile', 'nationality'] },
    { label: 'Courses', path: '/courses', keywords: ['courses', 'instructor', 'credit hours'] },
    { label: 'Registration', path: '/registration', keywords: ['register', 'drop', 'add course'] },
    { label: 'Payments', path: '/payments', keywords: ['payments', 'fees', 'receipt', 'pending'] },
  ]

  const matches = pages.filter(
    (page) =>
      page.label.toLowerCase().includes(search) ||
      page.keywords.some((keyword) => keyword.includes(search))
  )

  const courseMatches = courseCatalog
    .filter(
      (course) =>
        course.code.toLowerCase().includes(search) ||
        course.title.toLowerCase().includes(search) ||
        course.instructor.toLowerCase().includes(search)
    )
    .map((course) => ({
      label: `${course.code} — ${course.title}`,
      path: '/courses',
    }))

  return [
  ...matches.map(p => ({ ...p, type: 'page' })),
  ...courseMatches.map(c => ({ ...c, type: 'course' }))
].slice(0, 6)
}