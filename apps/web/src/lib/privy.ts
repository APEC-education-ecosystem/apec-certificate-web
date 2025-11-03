import { PrivyClient as NewPrivyClient } from "@privy-io/node";
import { PRIVY_APP_SECRET } from "./env";
const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;

export const privyServerClient = new NewPrivyClient({
  appId: PRIVY_APP_ID,
  appSecret: PRIVY_APP_SECRET,
});
