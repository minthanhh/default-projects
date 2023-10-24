import { useMutation } from '@apollo/client';
import { useState, useContext } from 'react';
import { LOGIN } from '../../apollo/queries';
import { AuthContext } from '../../context/auth.context';

export default function Login() {
   const initialValues = {
      username: '',
      password: '',
   };
   const context = useContext(AuthContext);

   const [loginValues, setLoginValues] = useState(initialValues);
   const [login] = useMutation(LOGIN);

   const hanldeChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setLoginValues((prevValues) => ({ ...prevValues, [id]: value }));
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         await login({
            update(proxy, { data: { login: userData } }) {
               context.login(userData);
            },
            variables: { loginDto: loginValues },
         });
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="w-2/5 mx-auto px-3 flex flex-col gap-5">
         <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 mb-4">
               <label htmlFor="username">Username: </label>
               <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={hanldeChangeValues}
                  placeholder="Please enter your username"
                  className="outline-none py-2 px-3 rounded-md"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="password">Password: </label>
               <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={hanldeChangeValues}
                  placeholder="Please enter your password"
                  className="outline-none py-2 px-3 rounded-md"
               />
            </div>

            <button type="submit">Login</button>
         </form>

         <div className=""></div>
      </div>
   );
}
