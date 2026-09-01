// Drop-in replacement for the subset of react-router-dom's API this site used.
//
// Astro serves every route as its own static HTML file, so there is no
// client-side router: navigation is a normal full-page <a> request. This
// shim keeps every call site (`<Link to="...">`, `<NavLink>`, `useLocation()`,
// `<Navigate>`) working unchanged while rendering plain anchors and reading
// location straight off `window`.
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  replace?: boolean;
  children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, replace, children, ...rest }, ref) => (
    <a ref={ref} href={to} {...rest}>
      {children}
    </a>
  ),
);
Link.displayName = "Link";

export interface NavLinkRenderProps {
  isActive: boolean;
  isPending: boolean;
}

export interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href" | "children"> {
  to: string;
  className?: string | ((props: NavLinkRenderProps) => string);
  children?: ReactNode | ((props: NavLinkRenderProps) => ReactNode);
  end?: boolean;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, children, end, ...rest }, ref) => {
    const pathname = getPathname();
    const isActive = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
    const renderProps: NavLinkRenderProps = { isActive, isPending: false };

    return (
      <a
        ref={ref}
        href={to}
        className={typeof className === "function" ? className(renderProps) : className}
        {...rest}
      >
        {typeof children === "function" ? children(renderProps) : children}
      </a>
    );
  },
);
NavLink.displayName = "NavLink";

function getPathname(): string {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}

export interface Location {
  pathname: string;
  search: string;
  hash: string;
}

// Safe to call during server-side prerendering (returns a "/" fallback) and
// during client hydration (returns the real, current location). Each page is
// a full navigation, so — unlike react-router — there is no in-app route
// change for this to react to after mount.
export function useLocation(): Location {
  if (typeof window === "undefined") {
    return { pathname: "/", search: "", hash: "" };
  }
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export interface NavigateProps {
  to: string;
  replace?: boolean;
}

// Astro's getStaticPaths only ever generates pages for known slugs, so this
// branch is unreachable at runtime — kept for parity with the original
// react-router-dom call sites and as a defensive client-side fallback.
export function Navigate({ to, replace }: NavigateProps) {
  if (typeof window !== "undefined") {
    if (replace) window.location.replace(to);
    else window.location.assign(to);
  }
  return null;
}
