// src/presentation/components/UserSettings.js
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

const UserSettings = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block">Nombre de usuario</label>
        <input id="username" {...register('username')} className="border p-2 w-full" />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block">Contraseña</label>
        <input id="password" type="password" {...register('password')} className="border p-2 w-full" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Guardar</button>
    </form>
  );
};

export default UserSettings;
