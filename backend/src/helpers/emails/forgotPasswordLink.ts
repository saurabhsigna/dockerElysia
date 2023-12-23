import { Resend } from "resend";
import { magicLinkEmailTemplate } from "../../files/magicLink";
import { httpError } from "../HTTPError";

export const forgotPasswordLink = async (
  magicLink: string,
  email: string,
  set: any,
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const data: any = await resend.emails.send({
    from: "Abhinav Dhangar <transaction@email.freeschooool.com>",
    to: email,
    subject: "Your OTP",
    text: "bye sab logs",
    react: magicLinkEmailTemplate({ magicLink }),
  });

  if (data.error) {
    throw new httpError(
      data.error?.statusCode,
      data?.error.message,
      set,
    ).default();
  }

  return new Response(JSON.stringify(data));
};
