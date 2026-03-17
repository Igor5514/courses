import { PropsWithChildren } from "react";

export function Container({ children  } : PropsWithChildren<{}>) {
  return <div className="mx-auto max-w-5xl p-4 md:p-8">{children}</div>;
}
