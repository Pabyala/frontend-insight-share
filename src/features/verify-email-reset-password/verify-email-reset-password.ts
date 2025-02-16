import { apiSlice } from "../../app/api/apiSlice";

interface VerifyEmailResponse {
    message: string; 
}

interface VerifyEmailRequest {
    verificationCode?: string,
    email?: string,
    resetPasswordToken?: string,
    newPassword?: string,
    confirmPassword?: string,
}

export const verifyEmailAndResetPassword = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        verifyEmailUser: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
            query: ({ verificationCode }) => ({
                url: "signup/verify-email/",
                method: "POST",
                body: { verificationCode },
            }),
            invalidatesTags: ["UserInfo"],
        }),
        resendVerificationCode: builder.mutation<VerifyEmailResponse, { email: string }>({
            query: ({ email }) => ({
                url: "signup/resend-verification-code/",
                method: "POST",
                body: { email },
            }),
            invalidatesTags: ["UserInfo"],
        }),
        resetPassword: builder.mutation<VerifyEmailResponse, { email: string }>({
            query: ({ email }) => ({
                url: "signup/reset-password",
                method: "POST",
                body: { email },
            }),
            invalidatesTags: ["UserInfo"],
        }),
        setNewPassword: builder.mutation<VerifyEmailResponse, { resetPasswordToken: string; newPassword: string; confirmPassword: string }>({
            query: ({ resetPasswordToken, newPassword, confirmPassword }) => ({
                url: "signup/set-new-password-success",
                method: "POST",
                body: { resetPasswordToken, newPassword, confirmPassword }  ,
            }),
            invalidatesTags: ["UserInfo"],
        }),
        verifyTokenResetPass: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
            query: ({ verificationCode }) => ({
                url: "signup/verify-token-reset-password",
                method: "POST",
                body: { verificationCode },
            }),
            invalidatesTags: ["UserInfo"],
        }),
    }),
});

export const { 
    useVerifyEmailUserMutation,
    useResendVerificationCodeMutation,
    useResetPasswordMutation,
    useVerifyTokenResetPassMutation,
    useSetNewPasswordMutation,
} = verifyEmailAndResetPassword;
