import type { UserRole, WorldKey } from "@little-muslim/shared";

type ApiWorldState = {
  key: WorldKey;
  unlocked: boolean;
  previewEnabled: boolean;
};

type GameWorldsResponse = {
  worlds: ApiWorldState[];
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    hasLifetimeAccess: boolean;
  };
};

export type CurrentUserResponse = {
  user: {
    id: string;
    email: string;
    role: UserRole;
    hasLifetimeAccess: boolean;
  };
};

export type CheckoutResponse = {
  userId: string;
  status: string;
  checkoutUrl: string;
};

export type ParentOverviewResponse = {
  user: {
    id: string;
    email: string;
    role: UserRole;
    hasLifetimeAccess: boolean;
  };
  paymentStatus: string;
  activeChild: {
    id: string;
    name: string;
    stars: number;
    coins: number;
    currentWorldKey: string | null;
    level: number;
    completedLevels: number;
    unlockedWorlds: number;
  } | null;
  childProfiles: Array<{
    id: string;
    name: string;
    stars: number;
    coins: number;
    currentWorldKey: string | null;
    level: number;
    completedLevels: number;
    unlockedWorlds: number;
  }>;
};

export type SaveChildProgressPayload = {
  childId: string;
  starsEarned: number;
  coinsEarned: number;
  currentWorldKey: WorldKey | null;
};

export type SaveChildProgressResponse = {
  child: {
    id: string;
    name: string;
    stars: number;
    coins: number;
    currentWorldKey: string | null;
    level: number;
    completedLevels: number;
  };
};

const defaultApiBaseUrl = "http://localhost:4000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || defaultApiBaseUrl;
}

async function parseJson<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => null)) as
    | T
    | { message?: string }
    | null;

  if (!response.ok) {
    const message =
      body && typeof body === "object" && "message" in body && typeof body.message === "string"
        ? body.message
        : "Request failed";

    throw new ApiError(message, response.status);
  }

  return body as T;
}

export async function fetchGameWorldStates() {
  const response = await fetch(`${getApiBaseUrl()}/game-worlds`, {
    cache: "no-store"
  });

  return parseJson<GameWorldsResponse>(response);
}

export async function signInParent(payload: SignInPayload) {
  const response = await fetch(`${getApiBaseUrl()}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return parseJson<SignInResponse>(response);
}

export async function signUpParent(payload: SignUpPayload) {
  const response = await fetch(`${getApiBaseUrl()}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return parseJson<SignInResponse>(response);
}

export async function fetchCurrentUser(token: string) {
  const response = await fetch(`${getApiBaseUrl()}/auth/me`, {
    headers: {
      authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  return parseJson<CurrentUserResponse>(response);
}

export async function createCheckoutSession(userId: string) {
  const response = await fetch(`${getApiBaseUrl()}/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId })
  });

  return parseJson<CheckoutResponse>(response);
}

export async function fetchParentOverview(token: string) {
  const response = await fetch(`${getApiBaseUrl()}/parent/overview`, {
    headers: {
      authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  return parseJson<ParentOverviewResponse>(response);
}

export async function saveChildProgress(token: string, payload: SaveChildProgressPayload) {
  const response = await fetch(`${getApiBaseUrl()}/parent/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  return parseJson<SaveChildProgressResponse>(response);
}
