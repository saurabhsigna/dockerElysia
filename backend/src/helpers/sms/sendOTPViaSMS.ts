export const sendOTPViaSMS = async ({
  otp,
  number,
}: {
  otp: number;
  number: number;
}) => {
  const postUrl = "https://www.fast2sms.com/dev/bulkV2";

  const headers = {
    authorization: process.env.FAST2SMS_API_KEY,
    "Content-Type": "application/json",
  };

  const body = {
    route: "otp",
    variables_values: otp,
    numbers: number,
  };

  try {
    const response = await fetch(postUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    // Handle the response as needed (e.g., check status code)
    if (!response.ok) {
      throw new Error(`Failed to send OTP via SMS. Status: ${response.status}`);
    }

    // Additional handling if necessary
  } catch (error: any) {
    console.error("Error sending OTP via SMS:", error?.message);
  }
};
