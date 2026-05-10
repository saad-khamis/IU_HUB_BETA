const AUTH_STORAGE_KEY = 'iu_hub_user'

const MOCK_USER = {
  username: 'saad',
  password: '1234',
  profile: {
    name: 'Saad Mohamed',
    username: 'saad',
    level: 2,
  },
}

function persistUser(user) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalizedUsername = username.trim().toLowerCase()
      const normalizedPassword = password.trim()

      if (
        normalizedUsername === MOCK_USER.username &&
        normalizedPassword === MOCK_USER.password
      ) {
        persistUser(MOCK_USER.profile)
        resolve(MOCK_USER.profile)
        return
      }

      reject(new Error('Invalid username or password'))
    }, 700)
  })
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function getUser() {
  try {
    const rawUser = localStorage.getItem(AUTH_STORAGE_KEY)
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function isAuthenticated() {
  return Boolean(getUser())
}