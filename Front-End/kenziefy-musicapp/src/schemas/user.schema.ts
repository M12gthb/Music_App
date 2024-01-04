import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Deve ser um e-mail válido"),
  password: z.string().nonempty("Senha é obrigatória")
});

export const LoginSchema = UserSchema.omit({
  name: true
});

export const SendEmailResetPasswordSchema = LoginSchema.omit({
  password: true
});

export const ResetPasswordSchema = UserSchema.omit({
  name: true,
  email: true
})
  .extend({
    passwordConfirm: z.string().min(1, "A confirmação de senha é obrigatória")
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "As senhas precisam corresponderem",
    path: ["passwordConfirm"]
  });

export type UserData = z.infer<typeof UserSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
export type SendEmailResetPasswordData = z.infer<typeof SendEmailResetPasswordSchema>;
