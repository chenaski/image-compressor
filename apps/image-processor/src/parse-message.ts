import { z as zod } from 'zod';

export const MessageSchema = zod
  .array(
    zod.object({
      userId: zod.string().uuid(),
      fileName: zod.string().min(1),
    })
  )
  .min(1);
export type Message = zod.infer<typeof MessageSchema>;

export function parseMessage<Input>(
  message: Input
): { success: true; data: Message } | { success: false; error: string } {
  const parsingError = { success: false, error: 'Parsing error' } as const;

  if (!message || typeof message !== 'string') return parsingError;

  let data: unknown;

  try {
    data = JSON.parse(message);
  } catch (error) {
    return parsingError;
  }

  const result = MessageSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.message };
  }

  return { success: true, data: result.data };
}
