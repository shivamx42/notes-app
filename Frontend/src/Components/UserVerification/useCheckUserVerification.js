import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOutSuccess } from '../../redux/user/userSlice';

const useCheckUserVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUserVerification = (res) => {
    if (res.status === 400) {
      dispatch(signOutSuccess());
      toast.error('Token not found!');
      navigate('/login');
      return true;
    }

    else return false;
  };

  return checkUserVerification;
};

export default useCheckUserVerification;
