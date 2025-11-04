"use server";

import { privyServerClient } from "@/lib/privy";
import { actionClient, type ActionResponse } from "@/lib/safe-action";
import { toDidPrivy } from "@/lib/utils";
import type { User } from "@privy-io/node";
import { cookies } from "next/headers";
import { z } from "zod";

export const getUser = actionClient.action<ActionResponse<User>>(async () => {
  const token = (await cookies()).get("privy-id-token")?.value;

  if (!token) {
    return {
      success: false,
      error: "No privy token found",
    };
  }

  try {
    const privyUser = await privyServerClient.users().get({ id_token: token });

    return {
      success: true,
      data: privyUser,
    };
  } catch (error) {
    console.error("[action][getUser] error:", error);

    return {
      success: false,
      error: "Authentication failed",
    };
  }
});

export const getUserByDid = actionClient
  .inputSchema(z.object({ did: z.string().length(25) }))
  .action<ActionResponse<User>>(async ({ parsedInput: { did } }) => {
    try {
      const privyUser = await privyServerClient.users()._get(toDidPrivy(did));

      return {
        success: true,
        data: privyUser,
      };
    } catch (error) {
      console.error("[action][getUserByDid] error:", error);

      return {
        success: false,
        error: "Failed to get user by DID",
      };
    }
  });
