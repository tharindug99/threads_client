import { serviceURLs } from "@/constant";
import api from "../utils/api";

export const requestActivateLesson = async (
  lessonId: string,
  userId: string
) => {
  return await api.post(serviceURLs.http + "user/" + userId, {
    lessonId,
    type: "activate_lesson",
  });
};

export const requestDeactivateLesson = async (
  lessonId: string,
  sessionId: string,
  duration: number,
  userId: string
) => {
  return await api.post(serviceURLs.http + "user/" + userId, {
    lessonId,
    duration,
    type: "end_lesson",
    sessionId,
  });
};
