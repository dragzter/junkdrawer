import { useAuth0 } from '@auth0/auth0-vue'
export const useAuth = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  const login = () => {
    loginWithRedirect()
  }
  const logOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return { logOut, login, user, isAuthenticated }
}
