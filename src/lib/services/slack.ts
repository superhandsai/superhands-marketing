const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

interface SlackMessage {
  text: string;
  blocks?: SlackBlock[];
}

interface SlackBlock {
  type: string;
  text?: {
    type: string;
    text: string;
    emoji?: boolean;
  };
  fields?: {
    type: string;
    text: string;
  }[];
}

export async function sendSlackNotification(message: SlackMessage): Promise<boolean> {
  if (!SLACK_WEBHOOK_URL) {
    console.warn("Slack webhook URL not configured");
    return false;
  }

  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("Failed to send Slack notification:", response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Slack notification:", error);
    return false;
  }
}

export async function notifyWaitlistSignup(email: string): Promise<boolean> {
  return sendSlackNotification({
    text: `New waitlist signup: ${email}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New Waitlist Signup",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Email:*\n${email}`,
          },
          {
            type: "mrkdwn",
            text: `*Time:*\n${new Date().toISOString()}`,
          },
        ],
      },
    ],
  });
}

export async function notifyContactSubmission(
  name: string,
  email: string,
  message: string
): Promise<boolean> {
  // Truncate message for Slack preview
  const messagePreview = message.length > 100
    ? message.substring(0, 100) + "..."
    : message;

  return sendSlackNotification({
    text: `New contact form submission from ${name}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New Contact Form Submission",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name:*\n${name}`,
          },
          {
            type: "mrkdwn",
            text: `*Email:*\n${email}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Message:*\n${messagePreview}`,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Time:*\n${new Date().toISOString()}`,
          },
        ],
      },
    ],
  });
}
