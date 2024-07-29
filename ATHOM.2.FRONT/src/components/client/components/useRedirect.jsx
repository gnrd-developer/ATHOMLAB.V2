import { useHistory } from 'react-router-dom'

export const useRedirect = () => {
  const history = useHistory()

  const redirect = (path) => {
    history.push(path)
  }

  return redirect
}