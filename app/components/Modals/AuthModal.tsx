import React, { useEffect } from "react";
import Modal from "../Modal";
import Logo from "../Logo";
import Input from "../Input";
import { FaHandshake } from "react-icons/fa";
import Button, { LinkButton } from "../Button";
import { useTransition, animated } from "@react-spring/web";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import useInputs from "@/app/hooks/useInputs";

export default function WaitListModal() {
  const { values, onChange, setValue } = useInputs({
    email: "",
    password: "",
    name: "",
    code: "",
    newPassword: "",
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, loading, signUp, forgotPassword, forgotPasswordSubmit } =
    useAuth();
  const [error, setError] = React.useState({
    email: "",
    password: "",
    name: "",
    code: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const closeModal = () => {
    router.push("/", {
      scroll: false,
    });
  };

  const layoutTransitions = useTransition(searchParams.get("modal"), {
    from: { opacity: 0, transform: "translate3d(0, -10px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    exitBeforeEnter: true,
  });

  const handleOnContinue = async () => {
    const { email } = values;
    const response = await login(email, "123");
    if (response && !response.success) {
      const { errorCode } = response;
      if (errorCode === "UserNotFoundException") {
        router.push(`/?modal=signup&email=${email}`, {
          scroll: false,
        });
      } else if (errorCode === "NotAuthorizedException") {
        router.push(`/?modal=login&email${email}`, {
          scroll: false,
        });
      } else if (errorCode === "UserNotConfirmedException") {
      } else {
        setError({
          ...error,
          email: "If the issue presist, contact us.",
        });
      }
    } else {
      setError({
        ...error,
        email: "If the issue presist, contact us.",
      });
    }
  };
  const handleOnLogin = async () => {
    const { email, password } = values;
    const response = await login(email, password);
    if (response.success) {
      router.push("/auth/dashboard");
    } else {
      setError({
        ...error,
        password: response.errorMessage,
      });
    }
  };
  const handleOnSignup = async () => {
    const { email, password, name } = values;
    const response = await signUp(email, password, name, "english_learner");
    if (response.success) {
      router.push("/auth/dashboard?modal=user-details");
    } else {
      setError({
        ...error,
        password: response.errorMessage,
      });
    }
  };
  const handleFogotPassword = async () => {
    const { code, newPassword, email } = values;
    const response = await forgotPasswordSubmit(email, code, newPassword);
    if (response.success) {
      router.push("?modal=login");
    } else {
      setError({
        ...error,
        newPassword: response.errorMessage,
      });
    }
  };
  const handleResendErrorCode = async () => {
    const { email } = values;
    await forgotPassword(email);
  };

  return (
    <Modal
      isOpen={
        searchParams.get("modal") === "signup" ||
        searchParams.get("modal") === "login" ||
        searchParams.get("modal") === "auth" ||
        searchParams.get("modal") === "forgot-password"
      }
      closeModal={closeModal}
      isLoading={loading}
    >
      <div
        id="modal-body"
        className="p-12 mx-4 flex justify-center items-center h-screen sm:h-auto"
      >
        <div className="flex flex-1 flex-col items-center mt-2">
          <Logo className="text-black" />

          {layoutTransitions((style, item) => {
            if (item === "signup") {
              return (
                <animated.div style={style}>
                  <div>
                    <div className="text-center">
                      <div className="flex flex-col items-center">
                        <h1 className="text-xl py-4">Welcome to Scholalify</h1>
                        <div className="flex flex-col">
                          <Input
                            type="text"
                            placeholder="Enter your first name"
                            className={`min-w-[300px] sm:min-w-[350px]`}
                            onChange={onChange}
                            value={values.name}
                            error={error["name"]}
                            name="name"
                          />
                          <Input
                            type="password"
                            placeholder="Enter a new password"
                            className={`min-w-[300px] sm:min-w-[350px]`}
                            onChange={onChange}
                            value={values.password}
                            error={error["password"]}
                            name="password"
                            onKeyUp={(e) => {
                              e.preventDefault();
                              if (e.key === "Enter") {
                                handleOnSignup();
                              }
                            }}
                          />
                          <div className="flex justify-center flex-col items-center pt-8 pb-4">
                            <Link
                              href="/?modal=auth"
                              className="text-sm text-primary"
                            >
                              Already have an account? Log in.
                            </Link>
                          </div>
                          <Button
                            onClick={handleOnSignup}
                            type="button"
                            isLoading={isLoading}
                          >
                            Sign up
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </animated.div>
              );
            } else if (item === "login") {
              return (
                <animated.div style={style}>
                  <div className="text-center">
                    <h1 className="text-xl py-4">Welcome back to Scholalify</h1>
                    <div className="flex flex-col">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className={`min-w-[300px] sm:min-w-[350px]`}
                        onChange={onChange}
                        error={error["email"]}
                        value={values.email}
                        name="email"
                      />
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className={`min-w-[300px] sm:min-w-[350px]`}
                        error={error["password"]}
                        onChange={onChange}
                        value={values.password}
                        name="password"
                        onKeyUp={(e) => {
                          e.preventDefault();
                          if (e.key === "Enter") {
                            handleOnLogin();
                          }
                        }}
                      />
                      <div className="flex justify-center flex-col items-center pt-8 pb-4">
                        <Link
                          href="/?modal=forgot-password"
                          className="text-sm text-primary underline"
                          onClick={handleResendErrorCode}
                        >
                          Forgot your password? Reset it.
                        </Link>
                      </div>
                      <Button
                        onClick={handleOnLogin}
                        type="button"
                        isLoading={isLoading}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </animated.div>
              );
            } else if (item === "forgot-password") {
              return (
                <animated.div style={style}>
                  <div className="text-center">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xl py-4">
                        Enter the code we sent to your email
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter the code"
                        className={`min-w-[300px] sm:min-w-[350px]`}
                        onChange={onChange}
                        value={values.code}
                        error={error["code"]}
                        name="code"
                      />
                      <Input
                        type="new-password"
                        placeholder="Enter your new password"
                        className={`min-w-[300px] sm:min-w-[350px]`}
                        error={error["newPassword"]}
                        onChange={onChange}
                        value={values.newPassword}
                        name="newPassword"
                        onKeyUp={(e) => {
                          e.preventDefault();
                          if (e.key === "Enter") {
                            handleFogotPassword();
                          }
                        }}
                      />
                      <div className="flex justify-center flex-col items-center pt-8 pb-4">
                        <p
                          className="text-sm text-primary underline"
                          onClick={handleResendErrorCode}
                        >
                          Did not receive the code? Resend it.
                        </p>
                      </div>
                      <Button
                        onClick={handleFogotPassword}
                        type="button"
                        isLoading={isLoading}
                      >
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </animated.div>
              );
            } else if (item === "auth") {
              return (
                <animated.div style={style}>
                  <div className="text-center">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xl py-4">
                        Enter your email address
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className={`min-w-[300px] sm:min-w-[350px]`}
                        onChange={onChange}
                        value={values.email}
                        error={error["email"]}
                        name="email"
                        onKeyUp={async (e) => {
                          e.preventDefault();
                          if (e.key === "Enter") {
                            await handleOnContinue();
                          }
                        }}
                      />
                      <div className="flex justify-center flex-col items-center py-4">
                        <FaHandshake className="text-2xl text-primary mb-3" />
                        <p className="text-xs max-w-[350px] text-gray-500">
                          Your email information is used to allow you to sign in
                          securely and access your data. Scholalify records
                          certain data for the personalization of content,
                          security, support, and reporting purposes.
                        </p>
                      </div>
                      <Button onClick={handleOnContinue} type="button">
                        Continue
                      </Button>
                    </div>
                  </div>
                </animated.div>
              );
            }
          })}
        </div>
      </div>
    </Modal>
  );
}
