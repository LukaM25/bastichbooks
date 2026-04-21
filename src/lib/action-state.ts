export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export const idleActionState: ActionState = {
  status: "idle",
};

export function errorActionState(
  message: string,
  fieldErrors?: Record<string, string[]>,
): ActionState {
  return {
    status: "error",
    message,
    fieldErrors,
  };
}

export function successActionState(message: string): ActionState {
  return {
    status: "success",
    message,
  };
}
