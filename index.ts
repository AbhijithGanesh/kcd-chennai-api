import axios, { AxiosResponse } from "axios";
import { User } from "./types/user";
import { Article } from "./types/articles";
import { stats } from "./types/leaderboard_stats";

const check = (Obj: Array<String>, Val: String) => {
  let flag: boolean = false;
  for (let i = 0; i < Obj.length; i++) {
    if (Obj[0] == Val) {
      flag = true;
      break;
    }
  }
  return flag;
};

let updateLeaderBoard = (
  leader_board_stats: Array<stats>,
  article: Article
): Number => {
  return 0;
};

const All_articles_organization = (org_name: String) => {
  const base_url: string = "https://dev.to";
  const config = { "api-key": "QRVJwhgosVtYdcf9csUS7z5U" };
  axios
    .get(`${base_url}/api/organizations/${org_name}/articles`, {
      headers: config,
    })
    .then((res: AxiosResponse) => {
      let data: Array<Article> = res.data; /// This will contain all the articles posted to the kcd-chennai Organization
      let leader_board: Array<stats> = [
        {
          user: {
            name: "Abhijith Ganesh",
            username: "AbhijithGanesh",
            github_username: "AbhijithGanesh",
            profile_image:
              "https://res.cloudinary.com/practicaldev/image/fetch/s--GcO1PaG7--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5401/d20e8500-bc09-47b6-9bce-00f0f80cf008.png'",
          },
          total_views: 5000,
          total_reactions: 1,
          number_of_articles: 1,
        },
      ];
      let ref_list: Array<String> = [];

      for (let i = 0; i < data.length; i++) {
        if (check(ref_list, data[i].user.username) == false) {
          ref_list.push(data[i].user.username);
          let stat_instance: stats = {
            user: {
              name: data[i].user.name,
              username: data[i].user.username,
              github_username: data[i].user.github_username,
              profile_image: data[i].user.profile_image,
            },
            total_views: 0,
            total_reactions: 0,
            number_of_articles: 1,
          };
          leader_board.push(stat_instance);
        } else {
          updateLeaderBoard(leader_board, data[i]);
        }
      }
      console.log(leader_board);
    });
};

All_articles_organization("kcdchennai"); /// Add your organization name

