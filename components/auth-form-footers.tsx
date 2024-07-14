import Link from "next/link";

export const SignInFooter = () => {
  return (
    <p className="text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link href="/signin" className="hover:underline text-foreground">
        Sign In
      </Link>
    </p>
  );
};

export const SignUpFooter = () => {
  return (
    <p className="text-sm text-muted-foreground">
      Don&apos;t have an account?{" "}
      <Link href="/signup" className="hover:underline text-foreground">
        Sign Up
      </Link>
    </p>
  );
};

export const ForgotPasswordFooter = () => {
  return (
    <p className="text-sm">
      <Link href="/forgot-password" className="hover:underline">
        Forgot your password?
      </Link>
    </p>
  );
};
