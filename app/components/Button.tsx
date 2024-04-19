import Link from "next/link";
import { PropsWithChildren } from "react";
import Loading from "./Loading";

type LinkProps = React.ComponentProps<typeof Link>;

type ButtonProps = React.ComponentProps<"button">;

type Props = {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  className?: string;
  isLoading?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  className,
  isLoading,
  ...props
}: PropsWithChildren<Props & ButtonProps>) => {
  const _className = `bg-black ${
    isLoading ? "" : " py-2 "
  } rounded-xl my-1 border ${
    variant === "primary" &&
    " bg-black text-white hover:bg-gray-800 transition-all"
  } ${
    variant === "secondary" &&
    "bg-white text-black hover:bg-gray-200 transition-all"
  }
    ${
      variant === "tertiary" &&
      "bg-gray-100 text-black border-gray-100 hover:bg-gray-200 transition-all disabled:bg-gray-50 disabled:text-black"
    }
    ${
      variant === "danger" &&
      "bg-transparent text-red-500 border-red-500   transition-all disabled:bg-red-400 disabled:text-white"
    }
    ${className}`;
  return (
    <button type="button" {...props} className={_className}>
      {isLoading ? (
        <div className="w-full py-1 flex justify-center">
          <Loading />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

const LinkButton = ({
  children,
  className,
  variant = "primary",
  ...props
}: PropsWithChildren<Props & LinkProps>) => {
  const rest = props as any;
  const _className = `bg-black text-center py-2 rounded-xl my-1 border ${
    variant === "primary" &&
    " bg-black text-white hover:bg-gray-800 transition-all"
  } ${
    variant === "secondary" &&
    "bg-white text-black border-white hover:text-primary transition-all"
  }
    ${
      variant === "tertiary" &&
      "bg-gray-100 text-black border-gray-100 hover:bg-gray-200 transition-all"
    }  ${className}`;
  return (
    <Link {...rest} className={_className}>
      {children}
    </Link>
  );
};

const SmallButton = ({
  children,
  className,
  variant = "primary",
  ...props
}: PropsWithChildren<Props & ButtonProps>) => {
  const _className = `bg-black text-center rounded-lg my-1 border py-1 px-3 text-sm md:px-5 ${
    variant === "primary" &&
    " bg-gray-200 text-primary border-0 hover:bg-gray-300 transition-all"
  } ${
    variant === "secondary" &&
    "bg-white text-black border-white hover:text-primary transition-all"
  }
    ${
      variant === "tertiary" &&
      "bg-transparent text-black border-none hover:text-primary transition-all"
    } 
    ${className}`;
  return (
    <button {...props} className={_className}>
      {children}
    </button>
  );
};

export { LinkButton, SmallButton };
