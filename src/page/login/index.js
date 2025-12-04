import { useParams, useSearchParams } from 'react-router-dom';
const Login = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  console.log(searchParams.get('name'));
  const name = params.id;
  return <h2>这是登录页面{name}</h2>;
};
export default Login;
