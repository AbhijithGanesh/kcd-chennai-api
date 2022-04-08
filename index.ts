import axios, { AxiosResponse } from "axios";
import { Article } from "./types/articles";
import { Config } from "./types/config";
import { Stats } from "./types/leaderboard_stats";

import { calculate_score, updateLeaderBoard } from "./src/crud_leader_board";

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

const All_articles_organization = (org_name: String) => {
  const base_url: string = "https://dev.to";
  const config: Config = { api_key: "QRVJwhgosVtYdcf9csUS7z5U" };
  axios
    .get(`${base_url}/api/organizations/${org_name}/articles`, {
      headers: { api_key: config.api_key },
    })
    .then((res: AxiosResponse) => {
      let data: Array<Article> = res.data; /// This will contain all the articles posted to the kcd-chennai Organization
      let data_board: Array<Stats> = [];
      let ref_list: Array<String> = [];
      for (let i = 0; i < data.length; i++) {
        if (
          check(ref_list, data[i].user.username) == false &&
          new Date(data[i].published_at) >= new Date("2022-01-01T00:00:00.000Z")
        ) {
          ref_list.push(data[i].user.username);

          let stat_instance: Stats = {
            user: {
              name: data[i].user.name,
              username: data[i].user.username,
              github_username: data[i].user.github_username,
              profile_image: data[i].user.profile_image,
            },
            total_reactions: data[i].public_reactions_count,
            number_of_articles: 1,
          };
          data_board.push(stat_instance);
        } else {
          updateLeaderBoard(data_board, data[i]);
          continue;
        }
      }
      console.log(calculate_score(data_board));
    });
};

All_articles_organization("kcdchennai"); /// Add your organization names
