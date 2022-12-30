import './app.scss'
import { useEffect } from 'react'
import { RootState } from './core/store/store'
import { useAppDispatch } from './core/hooks/useStore'
import { useSelector } from 'react-redux'
import { homeSlice } from './features/content/home'
import { authSlice } from './features/content/auth/auth'
import { toast } from 'react-toastify'
import Notification from './components/notification/notification'
import axios from 'axios'
import useConfig from './core/hooks/useConfig'
import useSocket from './core/hooks/useSocket'
import Routing from './core/routing/routing'

function App() {
  const dispatch = useAppDispatch()
  const { apiUrl } = useSelector((state: RootState) => state.home)

  const { getApiUrl } = useConfig()
  const { socket } = useSocket()

  // Send cookies with every request
  axios.defaults.withCredentials = true
  // Set default request timeout to 5s
  axios.defaults.timeout = 5000

  // Request error handling middleware for 500 status code
  axios.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 500) {
      console.error(error)
      toast.error('Something went wrong, please try again later!')
    }
    return Promise.reject(error)
  })

  useEffect(() => {
    // Set backend url
    const url = getApiUrl()
    dispatch(homeSlice.actions.setApiUrl(url))

    // Get essential data from server
    getUser()

    // Listen for socket.io connection messages
    socket.on('connect', connectListener)
    socket.on('disconnected', disconnectListener)

    // The socket.io the listeners must be removed
    // In order to prevent multiple event registrations
    // https://socket.io/how-to/use-with-react-hooks
    return () => {
      socket.off('connect', connectListener)
      socket.off('disconnected', disconnectListener)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Socket.io connected event
   */
  const connectListener = () => {
    console.info('[SOCKET] Connected')
  }

  /**
   * Socket.io disconnected event
   */
  const disconnectListener = () => {
    console.info('[SOCKET] Disconnected')
  }

  /**
   * Get user data
   * @returns object
   */
  const getUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/local/check`)
      const user = response.data.result
      dispatch(authSlice.actions.setUser(user))
    } catch (err: any) {
      dispatch(authSlice.actions.setUser({}))
    }
  }

  return (
    <div className="app-container">
        <div className="app-content">
          <Routing />
          <Notification />
        </div>
    </div>
  )
}

export default App
