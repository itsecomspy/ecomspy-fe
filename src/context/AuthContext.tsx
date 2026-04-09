import React, { createContext, useContext } from "react";
import firebaseService from "../services/firebase.service";
import { updateProfile } from "firebase/auth";
import useBilling from "../hooks/useBilling";

interface UserDataProps {
  email: string;
  password: string;
  fullName: string;
}

interface UpdateDataProps {
  collection: string;
  id: string;
  data: any;
}

const AuthContext = createContext<any | undefined>(undefined);

// create Auth context provider
export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { retrieveSubscriptionData } = useBilling();

  const [user, setUser] = React.useState<any>(null);
  const [userDetails, setUserDetails] = React.useState<any>();
  const [subscriptionData, setSubscriptionData] = React.useState<any>(0);
  const [subscriptionLoading, setSubscriptionLoading] =
    React.useState<boolean>(false);
  const [error, setError] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const register = React.useCallback(
    async ({ userData }: { userData: UserDataProps }) => {
      setLoading(true);
      return firebaseService
        .createNewUser(userData.email, userData.password)
        .then(async (res) => {
          firebaseService.setDocumentWithId(res.user.uid, "users", {
            ...userData,
            search: {
              count: 10,
              lastUpdated: new Date().toLocaleDateString("en-GB"),
            },
          });
          setUser(res.user);
          updateProfile(res.user, {
            displayName: userData.fullName,
          });
          setLoading(false);
          return { result: "success" };
        })
        .catch((err) => {
          console.log(err);
          setError({ err: true, msg: "Firebase error!" });
          setLoading(false);
          return { result: "error" };
        });
    },
    []
  );

  const login = React.useCallback(
    async ({ userData }: { userData: { email: string; password: string } }) => {
      setLoading(true);
      return firebaseService
        .loginWithEmail(userData.email, userData.password)
        .then(async (res) => {
          setUser(res.user);
          setLoading(false);
        })
        .finally(() => {
          // setError({ err: true, msg: err.code });
          setLoading(false);
        });
    },
    []
  );

  const loginWithGoogle = React.useCallback(async () => {
    await firebaseService
      .loginWithGoogle()
      .then(async (result) => {
        const user = result.user;

        let userExists = (
          await firebaseService.getDocument(`users/${user.uid}`)
        ).exists();
        if (!userExists) {
          let userData = {
            fullName: user.displayName,
            email: user.email,
            subscription: 0,
            createdAt: Date.now(),
            search: {
              count: 10,
              lastUpdated: new Date().toLocaleDateString("en-GB"),
            },
            uicon: Math.floor(Math.random() * (5 - 1 + 1) + 1),
          };
          firebaseService.setDocumentWithId(user.uid, "users", userData);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }, []);

  const forgotPassword = React.useCallback(async (email: string) => {
    return firebaseService.resetPassword(email);
  }, []);

  const resetPassword = React.useCallback(
    async (code: string, newPassword: string) => {
      return firebaseService.confirmPasswordReset(code, newPassword);
    },
    []
  );

  const updateUser = React.useCallback(
    ({ collection, id, data }: UpdateDataProps) => {
      firebaseService.updateDocument(collection, id, data);
    },
    []
  );

  // Update user details
  React.useMemo(async () => {
    if (user) {
      firebaseService
        .getDocument(`users/${user.uid}`)
        .then((res) => {
          const snapData = res.data();
          setUserDetails(snapData);
          // Set subscription data
          if (snapData?.subscription) {
            retrieveSubscriptionData({
              subscriptionId: snapData?.subscription?.subscriptionId,
              uid: user.uid,
            })
              .then((res: any) => {
                const normalizedStatus = res?.status || (!res?.next_billed_at ? "cancelled" : "active");
                const normalizedEndDate = res?.endDate || (!!res?.canceled_at ? res?.cancel_at : res?.current_billing_period?.ends_at);
                setSubscriptionData({
                  subscriptionId: snapData?.subscription?.subscriptionId,
                  cancelled: typeof res?.cancelled === "boolean" ? res.cancelled : !res?.next_billed_at,
                  endDate: normalizedEndDate,
                  status: normalizedStatus,
                  planId: res?.planId || snapData?.subscription?.planId,
                  lookupId: res?.lookupId || snapData?.subscription?.lookupId,
                });
              })
              .catch((err: any) => {
                err;
              })
              .finally(() => {
                setSubscriptionLoading(false);
              });
          }
        })
        .catch((err) => err);
    }
  }, [user?.uid]);

  // Check if user is authenticated
  React.useMemo(() => {
    firebaseService.onAuthChanged((auth) => {
      if (auth) {
        setUser(auth);
      } else {
        setUser(0);
      }
    });
  }, []);

  const logout = React.useCallback(() => {
    firebaseService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        userDetails,
        updateUser,
        forgotPassword,
        resetPassword,
        login,
        register,
        logout,
        user,
        error,
        setError,
        loading,
        subscriptionData,
        setSubscriptionData,
        subscriptionLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
