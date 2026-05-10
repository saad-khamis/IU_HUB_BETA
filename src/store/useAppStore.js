import { useState } from 'react'

export function useAppStore() {
  const [courses, setCourses] = useState([])
  const [payments, setPayments] = useState([])

  return {
    courses,
    payments,
    setCourses,
    setPayments,
  }
}