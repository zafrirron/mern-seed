import './profile.scss'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../core/store/store'
import { useAppDispatch } from '../../../../core/hooks/useStore'
import { authSlice } from '../../../content/auth/auth'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { apiUrl } = useSelector((state: RootState) => state.home)
  const { user } = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading...')
  const [userData, setUserData] = useState({} as any)

  useEffect(() => {
    check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const check = async () => {
    try {
      setLoading(true)
      setLoadingMessage('Loading...')
      const data = { id: user.id }
      const response: any = await axios.post(
        `${apiUrl}/user/profile/check`,
        data
      )
      const result = response.data.result
      setUserData(result)
    } catch (err: any) {
      console.warn(err)
      if (err.response?.status === 401) {
        navigate('/error/unauthorized')
      } else {
        toast.warn('Profile check failed!')
      }
    }
    setLoading(false)
  }

  const onRemove: () => Promise<void> = async () => {
    try {
      setLoading(true)
      setLoadingMessage('Removing account...')
      const data = { id: user.id }
      await axios.post(`${apiUrl}/user/profile/remove`, data)
      toast.success('Account removed successfully!')
      dispatch(authSlice.actions.setUser(false))
      navigate('/')
    } catch (err) {
      console.warn(err)
      toast.warn('Account remove failed!')
    }
  }

  return (
    <div className="profile-container">
      <div className="content">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faUser} />
          Profile
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress />
            <p>{loadingMessage}</p>
          </div>
        ) : (
          <>
            <div className="text">
              {JSON.stringify(userData, null, 2)}
            </div>
            <div className="button">
              <Button 
                variant="contained" 
                size="large"
                style={{ flex: 1 }}
                onClick={() => {
                  onRemove()
                }}
              >
                Remove account
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
