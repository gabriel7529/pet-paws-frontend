import { useState } from 'react'

const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues)

  const handleChange = (e) => {
    const {name, value} = e.target
    if (name === 'profilePicture') {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      })
      return
    }
    else{
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  return [formData, handleChange]
}

export default useForm
