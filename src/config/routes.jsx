import {
  LayoutDashboard,
  User,
  BookOpen,
  ClipboardList,
  CreditCard,
} from 'lucide-react'

import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Courses from '../pages/Courses'
import Registration from '../pages/Registration'
import Payments from '../pages/Payments'

export const appRoutes = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    fullPath: '/dashboard',
    icon: LayoutDashboard,
    element: <Dashboard />,
    showInNav: true,
  },
  {
    name: 'Profile',
    path: 'profile',
    fullPath: '/profile',
    icon: User,
    element: <Profile />,
    showInNav: true,
  },
  {
    name: 'Courses',
    path: 'courses',
    fullPath: '/courses',
    icon: BookOpen,
    element: <Courses />,
    showInNav: true,
  },
  {
    name: 'Registration',
    path: 'registration',
    fullPath: '/registration',
    icon: ClipboardList,
    element: <Registration />,
    showInNav: true,
  },
  {
    name: 'Payments',
    path: 'payments',
    fullPath: '/payments',
    icon: CreditCard,
    element: <Payments />,
    showInNav: true,
  },
]