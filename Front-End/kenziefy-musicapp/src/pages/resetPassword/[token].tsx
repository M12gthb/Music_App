import ResetPasswordForm from "@/components/resetPasswordForm";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ResetPassword: NextPage = () => {
  const router = useRouter();

  const { token } = router.query;
  return (
    <main className="body min-h-screen flex items-center justify-center">
      <ResetPasswordForm token={token as string} />
    </main>
  );
};

export default ResetPassword;
