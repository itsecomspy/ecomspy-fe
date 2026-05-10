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

const buildDefaultUserProfile = (user: any) => ({
  fullName: user?.displayName || "",
  email: user?.email || "",
  subscription: 0,
  createdAt: Date.now(),
  search: {
    count: 10,
    lastUpdated: new Date().toLocaleDateString("en-GB"),
  },
  uicon: Math.floor(Math.random() * (5 - 1 + 1) + 1),
});

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

  const ensureUserProfile = React.useCallback(
    async (user: any, profileOverride?: Record<string, any>) => {
      if (!user?.uid) {
        return undefined;
      }

      const profilePath = `users/${user.uid}`;
      const snapshot = await firebaseService.getDocument(profilePath);
      const defaults = buildDefaultUserProfile(user);

      if (!snapshot.exists()) {
        const nextData = { ...defaults, ...profileOverride };
        await firebaseService.setDocument(profilePath, nextData);
        return nextData;
      }

      const currentData = snapshot.data() || {};
      const mergedData = {
        ...defaults,
        ...currentData,
        ...profileOverride,
      };

      if (
        !currentData.email ||
        !currentData.fullName ||
        !currentData.search ||
        typeof currentData.subscription === "undefined"
      ) {
        await firebaseService.mergeDocument(profilePath, mergedData);
      }

      return mergedData;
    },
    []
  );

  const register = React.useCallback(
    async ({ userData }: { userData: UserDataProps }) => {
      setLoading(true);
      return firebaseService
        .createNewUser(userData.email, userData.password)
        .then(async (res) => {
          await updateProfile(res.user, {
            displayName: userData.fullName,
          });
          await ensureUserProfile(res.user, {
            ...userData,
            search: {
              count: 10,
              lastUpdated: new Date().toLocaleDateString("en-GB"),
            },
          });
          setUser(res.user);
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
          await ensureUserProfile(res.user, {
            email: res.user?.email || userData.email,
          });
          setUser(res.user);
          setLoading(false);
        })
        .finally(() => {
          // setError({ err: true, msg: err.code });
          setLoading(false);
        });
    },
    [ensureUserProfile]
  );

  const loginWithGoogle = React.useCallback(async () => {
    setLoading(true);
    await firebaseService
      .loginWithGoogle()
      .then(async (result) => {
        const nextUser = result.user;
        await ensureUserProfile(nextUser, {
          fullName: nextUser.displayName || "",
          email: nextUser.email || "",
        });
        setUser(nextUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ensureUserProfile]);

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
  React.useEffect(() => {
    if (user) {
      let unsub = () => {};
      firebaseService
        .getDocument(`users/${user.uid}`)
        .then(async (res) => {
          if (!res.exists()) {
            const fallbackData = await ensureUserProfile(user);
            setUserDetails(fallbackData);
          } else {
            setUserDetails(res.data());
          }

          unsub = firebaseService.streamDocument(`users/${user.uid}`, (doc) => {
            if (doc.exists()) {
              setUserDetails(doc.data());
            }
          });
        })
        .catch(() => {
          setUserDetails(undefined);
        });

      firebaseService
        .getDocument(`users/${user.uid}`)
        .then((res) => {
          const snapData = res.data();
          // Set subscription data
          if (snapData?.subscription) {
            setSubscriptionLoading(true);
            retrieveSubscriptionData({
              subscriptionId: snapData?.subscription?.subscriptionId,
              uid: user.uid,
            })
              .then((res: any) => {
                const normalizedCancelled =
                  typeof res?.cancelled === "boolean"
                    ? res.cancelled
                    : !res?.next_billed_at;
                const normalizedStatus =
                  normalizedCancelled
                    ? "cancelled"
                    : res?.status || "active";
                const normalizedEndDate = res?.endDate || (!!res?.canceled_at ? res?.cancel_at : res?.current_billing_period?.ends_at);
                setSubscriptionData({
                  subscriptionId: snapData?.subscription?.subscriptionId,
                  cancelled: normalizedCancelled,
                  endDate: normalizedEndDate,
                  status: normalizedStatus,
                  planId: res?.planId || snapData?.subscription?.planId,
                  lookupId: res?.lookupId || snapData?.subscription?.lookupId,
                  provider: res?.provider || snapData?.subscription?.provider,
                });
              })
              .catch((err: any) => {
                err;
              })
              .finally(() => {
                setSubscriptionLoading(false);
              });
          } else {
            setSubscriptionLoading(false);
          }
        })
        .catch((err) => err);

      return () => {
        unsub();
      };
    }
  }, [ensureUserProfile, retrieveSubscriptionData, user?.uid]);

  // Check if user is authenticated
  React.useEffect(() => {
    const unsubscribe = firebaseService.onAuthChanged(async (auth) => {
      if (auth) {
        await ensureUserProfile(auth);
        setUser(auth);
      } else {
        setUser(0);
        setUserDetails(undefined);
      }
    });
    return unsubscribe;
  }, [ensureUserProfile]);

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
