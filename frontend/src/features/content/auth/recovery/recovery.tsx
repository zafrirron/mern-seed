import './recovery.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../core/store/store'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import Button from '@mui/material/Button'

type Inputs = {
  email: string
}

const Recovery = () => {
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
      const response = await axios.post(`${apiUrl}/auth/local/recover`, {
        email: data.email,
      })
      toast.success('Check your emails!')
      navigate(`/auth/reset/${response.data.result.id}`)
    } catch (err) {
      console.warn(err)
      toast.warn('Recovery failed!')
    }
    reset()
    setLoading(false)
  }

  return (
    <div className="recovery-container">
      <div className="content">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faCircleQuestion} />
          Recovery
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress />
            <p>Recovering account...</p>
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
            <div><Button type="submit" variant="contained" size="large" style={{ flex: 1, width:"30%", margin:"20px"  }}>Recover</Button></div>

          </form>
        )}
      </div>
    </div>
  )
}

export default Recovery
