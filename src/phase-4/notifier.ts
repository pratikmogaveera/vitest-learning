export interface User {
  id: number;
  email: string;
  name: string;
}

export interface EmailResponse {
  success: boolean;
  email: string;
  message: string;
}

export const notifyUser = (user: User, sendEmail: (email: string, message: string) => EmailResponse): EmailResponse => {
  const response = sendEmail(user.email, `Hello ${user.name}, your account is ready.`);
  return response;
};

export const sendEmail = (email: string, message: string): EmailResponse => {
  return { success: true, email, message };
};
