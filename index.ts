import axios, { AxiosResponse } from "axios";
import { User } from "./types/user";
import { Article } from "./types/articles";
import { stats } from "./types/leaderboard_stats";

const check = (Obj: Array<String>, Val: String) => {
  let flag: boolean = false;
  for (let i = 0; i < Obj.length; i++) {
    if (Obj[i] == Val) {
      flag = true;
      break;
    }
  }
  return flag;
};

let updateLeaderBoard = (
  leader_board_stats: Array<stats>,
  article: Article
): void => {
  for (let i = 0; i < leader_board_stats.length; i++) {
    if (leader_board_stats[i].user.username == article.user.username) {
      leader_board_stats[i].total_reactions += article.public_reactions_count;
      leader_board_stats[i].number_of_articles += 1;
    }
  }
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
      let data_board: Array<stats> = [];
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
            total_reactions: data[i].public_reactions_count,
            number_of_articles: 1,
          };
          data_board.push(stat_instance);
        } else {
          updateLeaderBoard(data_board, data[i]);
          // console.log(data[i]);
        }
      }
      console.log(data_board);
    });
};

All_articles_organization("kcdchennai");
