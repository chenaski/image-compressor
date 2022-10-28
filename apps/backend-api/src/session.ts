import { FastifyRequest } from 'fastify';

export interface Session {
  userId: string;
}

export async function getSessionFromRequest(request: FastifyRequest): Promise<Session | null> {
  const encodedSignedCookie = request.cookies.__session;

  if (!encodedSignedCookie) {
    return null;
  }

  const encodedCookie = request.unsignCookie(encodedSignedCookie);

  if (!encodedCookie?.value) {
    return null;
  }

  const session = decodeData(encodedCookie.value);
  const validatedSession = validateSession(session);

  if (!validatedSession) {
    return null;
  }

  return validatedSession;
}

function validateSession(session: Record<string, unknown> | null): Session | null {
  if (!session) return null;
  if (!session?.userId) return null;
  if (typeof session.userId !== 'string' || session.userId.length !== 36) return null;

  return {
    userId: session.userId,
  };
}

// All the code below needs to decode/encode a Remix cookie
// See: https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/cookies.ts#L150

function encodeData(value: unknown): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

function decodeData(value: string): Record<string, unknown> | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(value))));
  } catch (error) {
    return null;
  }
}

function btoa(b: string): string {
  return Buffer.from(b, 'binary').toString('base64');
}

function atob(a: string): string {
  return Buffer.from(a, 'base64').toString('binary');
}

// See: https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/es.escape.js
function escape(value: string): string {
  const str = value.toString();
  let result = '';
  let index = 0;
  let chr, code;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (/[\w*+\-./@]/.exec(chr)) {
      result += chr;
    } else {
      code = chr.charCodeAt(0);
      if (code < 256) {
        result += '%' + hex(code, 2);
      } else {
        result += '%u' + hex(code, 4).toUpperCase();
      }
    }
  }
  return result;
}

function hex(code: number, length: number): string {
  let result = code.toString(16);
  while (result.length < length) result = '0' + result;
  return result;
}

// See: https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/es.unescape.js
function unescape(value: string): string {
  const str = value.toString();
  let result = '';
  let index = 0;
  let chr, part;
  while (index < str.length) {
    chr = str.charAt(index++);
    if (chr === '%') {
      if (str.charAt(index) === 'u') {
        part = str.slice(index + 1, index + 5);
        if (/^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 5;
          continue;
        }
      } else {
        part = str.slice(index, index + 2);
        if (/^[\da-f]{2}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16));
          index += 2;
          continue;
        }
      }
    }
    result += chr;
  }
  return result;
}
