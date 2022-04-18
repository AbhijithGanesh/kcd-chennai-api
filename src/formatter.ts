import { standings } from "../types/leaderboard_stats";

let formatter = (data: Array<standings>) => {
  let test_arr = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Blogathon 2022 Score board* :confetti_ball:",
      },
    },
    {
      type: "divider",
    },
  ];
  const divider = {
    type: "divider",
  };
  for (let i = 0; i < data.length; i++) {
    test_arr.push(
      JSON.parse(
        JSON.stringify({
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${data[i].user.name}*\n*Score*: ${data[i].score}`,
          },
          accessory: {
            type: "image",
            image_url: `${data[i].user.profile_image}`,
            alt_text: `${data[i].user.name}`,
          },
        })
      )
    );
    test_arr.push(divider);
  }
  return JSON.stringify({ blocks: test_arr });
};

export { formatter };
