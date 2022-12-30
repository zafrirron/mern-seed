//import './login.scss'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../core/store/store'
import { useAppDispatch } from '../../../../core/hooks/useStore'
import { authSlice } from '../auth'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const { apiUrl } = useSelector((state: RootState) => state.home)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(`${apiUrl}/auth/local/login`, data)
      const user = response.data.result
      dispatch(authSlice.actions.setUser(user))
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (err: any) {
      console.warn(err)
      toast.warn('Login failed!')
    }
    reset()
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="content">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faUser} />
          Login
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress />
            <p>Logging In...</p>
          </div>
        ) : (
          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <input
              className={`text-input ${errors.email && 'input-error'}`}
              type="text"
              placeholder="Email"
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <input
              className={`password-input ${errors.password && 'input-error'}`}
              type="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 5 })}
            />
            <div><Button type="submit" variant="contained" size="large" style={{ flex: 1, width:"30%", margin:"20px"  }}>Login</Button></div>
            <div><Link className="button" to="/auth/recovery">Forgot Email</Link></div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
