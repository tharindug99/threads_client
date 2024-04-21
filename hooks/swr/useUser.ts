import { useAuth, useAuthUser } from "@/context/AuthContext";
import api from "@/utils/api";
import { serviceURLs } from "@/constant";
import useSWR, { Fetcher } from "swr";

export type TTSubscription = {
  type: "monthly" | "yearly" | "quarterly";
  price: number;
  id: string;
  startDate: string;
  isSubscribed: boolean;
  endDate: string;
};
export type TTLesson = {
  id: number;
  startedAt: string;
  lastUpdated: string;
  duration: number;
  userScore: number;
};
export type TTUserStats = {
  totalLessons: number;
  totalMinutes: number;
  streak: number;
  longestStreak: number;
};

export type TTUserDetails = {
  name: string;
  email: string;
  phone: string;
  occupation: string;
  level: "beginner" | "intermediate" | "advanced";
  lessonDuration: "short" | "medium" | "long";
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  age: number;
  country: string;
};

export type TTUserData = {
  uuid: string;
  startDate: string;
  subscription?: TTSubscription;
  lessons?: TTLesson[];
  stats: TTUserStats;
  details: TTUserDetails;
  subscriptionType:
    | "monthly"
    | "yearly"
    | "quarterly"
    | "none"
    | "trial"
    | undefined;
  intercomeUserHash?: string;
};

const initialUser = {
  uuid: "",
  startDate: "",
  subscription: undefined,
  lessons: [
    {
      id: 0,
      startedAt: "2021-09-01T00:00:00.000Z",
      lastUpdated: "2021-09-01T00:00:00.000Z",
    },
  ],
  stats: {
    totalLessons: 0,
    totalMinutes: 0,
    streak: 0,
    longestStreak: 0,
  },
  details: {
    name: "",
    email: "",
    phone: "",
    occupation: "",
    level: "beginner",
    lessonDuration: "short",
    isPhoneVerified: false,
    isEmailVerified: false,
    country: "",
    age: -1,
  },
  subscriptionType: undefined,
} as TTUserData;

export type TTUseUserResponse = TTUserData;

const fetcher: Fetcher<TTUseUserResponse, string> = (url: string) =>
  api.get(serviceURLs.http + url).then((res) => res.data);

export const useUser = () => {
  const { data: user, error, mutate, isLoading } = useSWR("user", fetcher);
  const _user = user || initialUser;
  return {
    user: _user,
    isLoading,
    isError: error,
    error,
    mutate,
  };
};

export type TTSaveUserType = "user_details";
export type TTSaveUserDetails = {
  phone?: string;
  name?: string;
  occupation?: string;
  age?: number;
  country?: string;
};
export type TTSaveUserActivateLesson = {
  lessonId: string;
};
export const useSaveUser = () => {
  const { mutate, user } = useUser();
  const { uuid } = useAuthUser();
  const saveUser = (type: TTSaveUserType) => {
    if (type === "user_details") {
      return async (data: TTSaveUserDetails) => {
        const _user = user as TTUserData;
        mutate({
          ..._user,
          details: {
            ..._user.details,
            ...data,
          },
        });
        await api.post(serviceURLs.http + "user/" + uuid, {
          ...data,
          type,
        });
      };
    }
    return async () => {};
  };
  return saveUser;
};
