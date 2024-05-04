import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignUp path="/sign-up" fallbackRedirectUrl="/new-user" />;
    </div>
  );
};

export default SignUpPage;
