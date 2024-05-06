import { SignIn } from "@clerk/nextjs";
const SignInPage = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <SignIn path="/sign-in" fallbackRedirectUrl="/journal" />
    </div>
  );
};

export default SignInPage;
